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
