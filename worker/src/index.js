/*
  Ick Check helper (Cloudflare Worker, free plan).

  GET  /lookup?code=BARCODE   extra product lookups after Open Beauty Facts misses
  POST /label                 save a label someone typed or snapped, for everyone
  GET  /explain?name=NAME     short plain-language note on a flagged ingredient

  Nothing here decides what is flagged. Flags come only from the EU endocrine
  disruptor lists in app/data/flags.js. The AI only explains a flag that exists.
*/
import DATA from './flags.json';

const ORIGINS = ['https://ickcheck.ai', 'https://www.ickcheck.ai'];
const DAY = 86400;
const MODEL = '@cf/meta/llama-3.1-8b-instruct-fast';
const ORDER = ['I', 'II', 'III'];
const FLAGS = new Map(DATA.flags.map(f => [f.name.toLowerCase(), f]));

function cors(req) {
  const o = req.headers.get('Origin') || '';
  const ok = ORIGINS.includes(o) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o);
  return { 'Access-Control-Allow-Origin': ok ? o : ORIGINS[0], 'Vary': 'Origin', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' };
}
function json(req, body, status = 200, cache = 0) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': cache ? 'public, max-age=' + cache : 'no-store', ...cors(req) } });
}
const cleanCode = c => { c = String(c || '').replace(/\D/g, ''); return c.length >= 8 && c.length <= 14 ? c : ''; };
const getJ = async (env, k) => { try { return await env.STORE.get(k, 'json'); } catch (e) { return null; } };
const putJ = async (env, k, v, ttl) => { try { await env.STORE.put(k, JSON.stringify(v), ttl ? { expirationTtl: ttl } : undefined); } catch (e) { /* out of free writes for today: carry on */ } };

/* Counts uses against a cap. Returns false once the cap is reached. */
async function underCap(env, key, cap, ttl) {
  const n = Number(await env.STORE.get(key).catch(() => null)) || 0;
  if (n >= cap) return false;
  try { await env.STORE.put(key, String(n + 1), { expirationTtl: ttl }); } catch (e) { return false; }
  return true;
}
async function limited(req, env) {
  if (!env.LIMIT) return false;
  try { const r = await env.LIMIT.limit({ key: req.headers.get('CF-Connecting-IP') || 'anon' }); return !r.success; } catch (e) { return false; }
}
async function fetchJson(url, init, ms = 6000) {
  const c = new AbortController(), t = setTimeout(() => c.abort(), ms);
  try { const r = await fetch(url, { ...init, signal: c.signal }); return { status: r.status, body: r.ok ? await r.json() : null }; }
  catch (e) { return { status: 0, body: null }; }
  finally { clearTimeout(t); }
}

/* ---------- product lookups ---------- */
async function inci(env, code) {
  if (!env.INCI_KEY) return null;
  const hit = await getJ(env, 'inci:' + code);
  if (hit) return hit.miss ? null : hit;
  const month = new Date().toISOString().slice(0, 7);
  if (!(await underCap(env, 'cap:inci:' + month, Number(env.INCI_MONTHLY_CAP) || 1900, 40 * DAY))) return null;
  const r = await fetchJson('https://inciapi.com/v1/products/' + code, { headers: { 'X-API-Key': env.INCI_KEY } });
  if (r.status !== 200 && r.status !== 404) return null;              // their outage: do not remember it
  const p = r.body && r.body.product;
  const list = p && p.details && Array.isArray(p.details.inci) ? p.details.inci.join(', ') : '';
  const ingredients = String((p && p.ingredients) || list || '').slice(0, 4000);
  if (!p || !ingredients) { await putJ(env, 'inci:' + code, { miss: true }, 7 * DAY); return null; }
  const out = { name: [p.brand, p.name].filter(Boolean).join(' ').slice(0, 120), ingredients };
  await putJ(env, 'inci:' + code, out, 60 * DAY);
  return out;
}
async function upcName(env, code) {
  const hit = await getJ(env, 'upc:' + code);
  if (hit) return hit.miss ? null : hit.name;
  const r = await fetchJson('https://api.upcitemdb.com/prod/trial/lookup?upc=' + code, { headers: { Accept: 'application/json' } });
  if (r.status !== 200) return null;                                  // includes their daily limit
  const it = r.body && r.body.items && r.body.items[0];
  const name = it ? String(it.title || [it.brand, it.model].filter(Boolean).join(' ')).slice(0, 120) : '';
  await putJ(env, 'upc:' + code, name ? { name } : { miss: true }, name ? 30 * DAY : 2 * DAY);
  return name || null;
}
async function lookup(req, env, url) {
  const code = cleanCode(url.searchParams.get('code'));
  if (!code) return json(req, { error: 'bad_code' }, 400);
  const codes = [code]; if (code.length === 12) codes.push('0' + code); if (code.length === 13 && code[0] === '0') codes.push(code.slice(1));
  for (const c of codes) {
    const shared = await getJ(env, 'label:' + c);
    if (shared) return json(req, { source: 'community', code: c, name: shared.name, ingredients: shared.text });
  }
  for (const c of codes) {
    const p = await inci(env, c);
    if (p) return json(req, { source: 'inci', code: c, name: p.name, ingredients: p.ingredients });
  }
  const name = await upcName(env, code);
  return json(req, name ? { source: 'upcitemdb', code, name, ingredients: '' } : { source: null, code });
}

/* ---------- shared labels ---------- */
async function saveLabel(req, env) {
  let b; try { b = await req.json(); } catch (e) { return json(req, { error: 'bad_json' }, 400); }
  const code = cleanCode(b && b.code), text = String((b && b.text) || '').replace(/\s+/g, ' ').trim().slice(0, 3000);
  const name = String((b && b.name) || '').replace(/\s+/g, ' ').trim().slice(0, 80);
  if (!code || text.split(/[,;]/).filter(s => /[a-z]{3}/i.test(s)).length < 3 || /https?:\/\/|<[a-z]/i.test(text + name)) return json(req, { error: 'bad_label' }, 400);
  if (await getJ(env, 'label:' + code)) return json(req, { saved: false, reason: 'exists' });   // first save wins
  await putJ(env, 'label:' + code, { name, text, at: Date.now() });
  return json(req, { saved: true });
}

/* ---------- AI explanations ---------- */
async function explain(req, env, url) {
  const f = FLAGS.get(String(url.searchParams.get('name') || '').toLowerCase());
  if (!f) return json(req, { error: 'unknown_ingredient' }, 404);       // only flagged ingredients, never free-form questions
  const tier = ORDER.find(l => f.lists.includes(l)) || 'III', list = DATA.lists[tier];
  const key = 'explain:v1:' + f.name.toLowerCase();
  const hit = await getJ(env, key);
  if (hit) return json(req, { name: f.name, text: hit.text, ai: true }, 200, DAY);
  if (!env.AI || !(await underCap(env, 'cap:ai:' + new Date().toISOString().slice(0, 10), Number(env.AI_DAILY_CAP) || 60, 2 * DAY))) return json(req, { name: f.name, text: '' });
  let text = '';
  try {
    const r = await env.AI.run(MODEL, {
      max_tokens: 110, temperature: 0.2,
      messages: [
        { role: 'system', content: 'You write short, calm notes for shoppers reading a cosmetics label. Write exactly two plain sentences, 45 words at most in total. Sentence one: what this ingredient typically does in beauty or personal care products. Sentence two: restate its regulatory status using only the status given to you. Do not give medical advice, do not say it is safe or unsafe, do not mention diseases, do not tell the reader what to do, and do not add facts about its status beyond what is given. No lists, no emojis, no headings.' },
        { role: 'user', content: 'Ingredient: ' + f.name + '\nStatus: on ' + list.label + ' (' + list.desc + ').' }
      ]
    });
    text = String((r && r.response) || '').replace(/\s+/g, ' ').replace(/^["']|["']$/g, '').trim();
  } catch (e) { text = ''; }
  if (text.length < 40 || text.length > 420) return json(req, { name: f.name, text: '' });
  await putJ(env, key, { text, model: MODEL, at: Date.now() });
  return json(req, { name: f.name, text, ai: true }, 200, DAY);
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(req) });
    if (url.pathname === '/') return json(req, { ok: true, service: 'ickcheck-api' });
    if (await limited(req, env)) return json(req, { error: 'slow_down' }, 429);
    try {
      if (req.method === 'GET' && url.pathname === '/lookup') return await lookup(req, env, url);
      if (req.method === 'POST' && url.pathname === '/label') return await saveLabel(req, env);
      if (req.method === 'GET' && url.pathname === '/explain') return await explain(req, env, url);
    } catch (e) { console.error(e && e.stack || e); return json(req, { error: 'server' }, 500); }
    return json(req, { error: 'not_found' }, 404);
  }
};
