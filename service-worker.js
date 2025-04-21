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
    // Previene que el navegador muestre el banner automáticamente
    e.preventDefault();
    deferredPrompt = e;
  
    // Muestra el botón
    installBtn.style.display = 'block';
  
    installBtn.addEventListener('click', async () => {
      installBtn.style.display = 'none';
  
      if (deferredPrompt) {
        deferredPrompt.prompt(); // Lanza el modal
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`El usuario eligió: ${outcome}`);
        deferredPrompt = null;
      }
    });
  });
  
