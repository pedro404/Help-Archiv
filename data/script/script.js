var TopMenuFolder;
var TopMenuId;
var LeftMenuSlovo;
var LeftMenuId;
var IdKod;
var Rez = ", "; // Разделитель между словами хештега

window.onload = function () {
  OpFolder(); //Выписать Список папок
};

var fso = new ActiveXObject("Scripting.FileSystemObject");

//----------------------- Popup Menu 2 --------------------------

document.oncontextmenu = function () {
  ShowMenu(true);
  return false;
};

var ScrollTop = 0;
window.onscroll = function () {
  var scrollTop = window.pageYOffset
    ? window.pageYOffset
    : document.documentElement.scrollTop
    ? document.documentElement.scrollTop
    : document.body.scrollTop;
  ScrollTop = scrollTop;
};
//document.onclick=Context;
document.onkeydown = ContextKey;

function ShowMenu(Show) {
  if (Show) {
    var wiMenu = document.getElementById("MyMenu").offsetWidth;
    var wi = document.body.offsetWidth - wiMenu;
    var Xx = window.event.clientX;
    if (Xx > wi) {
      var Xx = Xx - wiMenu;
    }
    var heMenu = document.getElementById("MyMenu").offsetHeight;
    var he = document.body.offsetHeight - heMenu + ScrollTop;

    var Yy = window.event.clientY + ScrollTop;
    if (Yy > he) {
      var Yy = Yy - heMenu;
    }

    MyMenu.style.left = Xx;
    MyMenu.style.top = Yy;
    MyMenu.style.visibility = "visible";
  } else {
    MyMenu.style.visibility = "hidden";
  }
}

function Context() {
  if (MyMenu.style.visibility == "visible") {
    ShowMenu(false);
  }
}

function ContextKey() {
  Key = window.event.keyCode;
  Vis = MyMenu.style.visibility;
  if (Vis == "visible" && Key == 27) ShowMenu(false);
}
