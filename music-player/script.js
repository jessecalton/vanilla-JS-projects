const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// How we match the song title and image file names
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Load initial song into DOM
loadSong(songs[songIndex]);

//Function to update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  // Change the play button to a pause button
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
  audio.play();
}
// pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  // Change the pause button back to a play button
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  // If it's greater than the "last" index, reset it to 0
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  // Get the duration and current time from source element
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  // All you need to do to change the progress bar is adjust the width!
  progress.style.width = `${progressPercent}%`;
}

// Set the progress bar
function setProgress(e) {
  // Get the total width of the clicked object
  const width = this.clientWidth;
  // offsetX is where you clicked
  const clickX = e.offsetX;
  // Get the full duration of the song playing
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  // First, check if something is already playing
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Clicking on the progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends, player goes to next song
audio.addEventListener('ended', nextSong);
