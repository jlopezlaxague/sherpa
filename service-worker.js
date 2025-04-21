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

window.addEventListener('beforeinstallprompt', (e) => {
  // Evita que se muestre el prompt automáticamente
  e.preventDefault();
  deferredPrompt = e;

  // Mostrá tu botón de "Instalar"
  const installBtn = document.getElementById('installBtn');
  installBtn.style.display = 'block';

  installBtn.addEventListener('click', async () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Instalación: ${outcome}`);
    deferredPrompt = null;
  });
});
