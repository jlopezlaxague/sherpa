self.addEventListener("install", event => {
    event.waitUntil(
      caches.open("pwa-cache").then(cache =>
        cache.addAll(["./", "./index.html", "./manifest.json"])
      )
    );
  });
  
  self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  });
  
  let deferredPrompt;
  const installBtn = document.getElementById('installBtn');
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  
    installBtn.disabled = false;
    installBtn.textContent = "📲 Instalar Sherpa";
  });
  
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`El usuario eligió: ${outcome}`);
      deferredPrompt = null;
    } else {
      alert("Esta app no es instalable en este momento.");
    }
  });
  
  
