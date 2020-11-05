const container = document.getElementById('container');

const text = document.getElementById('text');

// All these values have to add up to what's in the JS and CSS
// 7.5s to breathe, 3s to grow and shrink, 1.5s for the hold
const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
breathAnimation();

function breathAnimation() {
  text.innerText = 'Breathe in!';
  container.className = 'container grow';

  setTimeout(() => {
    text.innerText = 'Hold...';
    setTimeout(() => {
      text.innerText = 'Breathe it out!';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
}

// Without this, the breathAnimation would only occur once (upon calling it)
setInterval(breathAnimation, totalTime);
