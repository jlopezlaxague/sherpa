let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// Escuchamos el evento 'beforeinstallprompt'
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevenimos el comportamiento automático
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false; // Mostramos el botón

  installBtn.addEventListener('click', async () => {
    installBtn.hidden = true;
    deferredPrompt.prompt(); // Mostramos el popup

    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('👍 El usuario aceptó la instalación');
    } else {
      console.log('👎 El usuario rechazó la instalación');
    }
    deferredPrompt = null;
  });
});
