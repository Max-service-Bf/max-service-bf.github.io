const V="ms-v1",CORE=["./","index.html","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
const cdn=/fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com/.test(u.host);if(u.origin!==location.origin&&!cdn)return;
if(r.mode==="navigate"){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put("index.html",c));return x}).catch(()=>caches.match("index.html")));return}
e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok||x.type==="opaque"){const c=x.clone();caches.open(V).then(h=>h.put(r,c))}return x})))});
