if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    this.navigator.serviceWorker.register('sw.js');
  })
}