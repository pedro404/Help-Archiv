document.onkeyup = function () {
  var elem = window.event.srcElement;

  if (elem.className.indexOf("input-search") != -1) {
    hashtagSeArch();
  }
};

function hashtagSeArch() {
  var input = void 0,
    filter = void 0,
    ul = void 0,
    li = void 0,
    a = void 0,
    i = void 0,
    txtValue = void 0;

  input = document.getElementById("inSearch");

  filter = input.value.toUpperCase();

  ul = document.getElementById("left");
  li = ul.getElementsByTagName("a");
  //alert(li);

  for (i = 0; i < li.length; i++) {
    a = li[i];
    txtValue = a.textContent || a.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].parentNode.style.display = "";
    } else {
      li[i].parentNode.style.display = "none";
    }
  }
}

setTimeout(function () {
  document.getElementById("inSearch").focus();
}, 1000);
