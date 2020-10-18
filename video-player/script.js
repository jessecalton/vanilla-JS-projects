// Playing, pausing, stopping the video by clicking the buttons or screen

const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play and pause video
function toggleVideoStatus() {
  // There's a `pause` property in the HTML5 video tag
  if (video.paused) {
    // `video` tag also has a `play` method
    video.play();
  } else {
    video.pause();
  }
}

// Update the play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// Update the progress and timestamp
function updateProgress() {
  // `progress.value` controls where our slider is along the bar,
  // in terms of percentage, hence our formula here.
  progress.value = (video.currentTime / video.duration) * 100;

  // Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video timestamp value
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
function stopVideo() {
  // The `currentTime` property can set the position of the video
  video.currentTime = 0;
  video.pause();
}

// Event listeners!
//
// Starts and stops the videos
video.addEventListener('click', toggleVideoStatus);

// Changing the play/pause icon when clicked
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);

// Updating the timestamp
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);

// Range input has a `change` event
progress.addEventListener('change', setVideoProgress);
