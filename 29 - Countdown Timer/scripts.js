window.onload = function () {
  $.get("../nav.html", function (data) {
    $("#nav-placeholder").html(data);
  })
}

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');
let countdown;

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    };

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  const leadingZero = (secondsRemaining < 10) ? '0' : '';
  const display = `${minutes}:${leadingZero}${secondsRemaining}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = (hour > 12) ? hour - 12 : hour;
  const minutes = end.getMinutes();
  const leadingZero = (minutes < 10) ? '0' : '';
  endTime.textContent = `Be back at ${adjustedHour}:${leadingZero}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log(this)
  const minutes = this.minutes.value;
  timer(minutes * 60);
  this.reset();
});