// DOM elements
const player = document.querySelector('.player');
const video = player.querySelector('video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggleBtn = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipBtns = player.querySelectorAll('[data-skip]');

function togglePlay() {
  (video.paused) ? video.play() : video.pause();
}

function updateToggleBtn() {
  toggleBtn.textContent = (this.paused) ? '►' : '❚ ❚';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const timeStamp = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = timeStamp;
}

// event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggleBtn);
video.addEventListener('pause', updateToggleBtn);
video.addEventListener('timeupdate', handleProgress);

toggleBtn.addEventListener('click', togglePlay);
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
});
skipBtns.forEach(btn => btn.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => (mousedown) ? scrub(e) : null);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);