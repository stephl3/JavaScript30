window.onload = function () {
  $.get("../nav.html", function (data) {
    $("#nav-placeholder").html(data);
  })
}
