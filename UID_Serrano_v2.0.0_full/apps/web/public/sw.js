self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>{e.waitUntil(clients.claim());});
self.addEventListener("fetch",e=>{
  e.respondWith(
    caches.open("v1").then(cache=>
      cache.match(e.request).then(resp=>{
        const fetchPromise=fetch(e.request).then(netRes=>{
          cache.put(e.request,netRes.clone());
          return netRes;
        });
        return resp||fetchPromise;
      })
    )
  );
});
