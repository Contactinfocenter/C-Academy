document.addEventListener('DOMContentLoaded', () => { 
  const videoElement = document.querySelector('#player');
  
  if (!videoElement) {
    console.error('Plyr player not found!');
    return;
  }

  const player = new Plyr(videoElement);
  window.player = player; // Expose globally if needed

  // Function to add event listeners
  function on(selector, type, callback) {
    const element = document.querySelector(selector);
    if (element) {
      element.addEventListener(type, callback, false);
    } else {
      console.warn(`Element ${selector} not found!`);
    }
  }

  // Event bindings
  on('.js-play', 'click', () => player.play());
  on('.js-pause', 'click', () => player.pause());
  on('.js-stop', 'click', () => player.stop());
  on('.js-rewind', 'click', () => player.rewind(10)); // 10s rewind
  on('.js-forward', 'click', () => player.forward(10)); // 10s forward
});
