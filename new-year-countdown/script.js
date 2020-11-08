const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

// Set background year
year.innerText = currentYear + 1;

// Update countdown time
function updateCountdown() {
  const currentTime = new Date();
  // Milliseconds until next year
  const diff = newYearTime - currentTime;

  // Days until next year
  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  // Hours are remaining in the current day.
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  // Minutes remaining
  const m = Math.floor(diff / 1000 / 60) % 60;
  // Seconds remaining
  const s = Math.floor(diff / 1000) % 60;

  // Change the UI
  days.innerHTML = d;
  // Append the zeroes if need be
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
}

// Show spinner before countdown
setTimeout(() => {
  loading.remove();
  // Setting the display value from "none" to "flex". Amazing.
  countdown.style.display = 'flex';
}, 1000);

// Runs every second
setInterval(updateCountdown, 1000);
