window.onload = function () {
  $.get("../nav.html", function (data) {
    $("#nav-placeholder").html(data);
  })
}

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  // const mediaStream = new MediaStream();
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(localMediaStream => {
    // console.log(localMediaStream);
    video.srcObject = localMediaStream;
    video.play();
  })
  .catch(err => console.error('OH NO!', err));
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  [canvas.width, canvas.height] = [width, height];

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    ctx.globalAlpha = 0.5;
    pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // photo sound
  snap.currentTime = 0;
  snap.play();

  // take data out of canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'selfie');
  link.textContent = 'Download Image';
  strip.insertBefore(link, strip.firstChild);
}

// filter funcs
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    // RED
    pixels.data[i + 0] += 100;
    // GREEN
    pixels.data[i + 1] -= 50;
    // BLUE
    pixels.data[i + 2] *= 0.5;
  }

  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    // RED
    pixels.data[i - 100] = pixels.data[i + 0];
    // GREEN
    pixels.data[i + 100] = pixels.data[i + 1];
    // BLUE
    pixels.data[i - 200] = pixels.data[i + 2];
  }

  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach(input => {
    levels[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i += 4) {
    let red = pixels.data[i + 0];
    let green = pixels.data[i + 1];
    let blue = pixels.data[i + 2];
    let alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);