//---------------------- OnMouseover ---------------------------------

document.onmouseover = function () {
  var elem = window.event.srcElement;

  if (elem.className == "TextFile") {
    RunKod = elem.innerText;
    elem.value = elem.value.replace(new RegExp("textaroa", "g"), "textarea");
    elem.style.backgroundColor = "#f1f8e9";
    titleHelp("Copy");
  }
  if (elem.id == "inSearch") {
    titleHelp("Hashtags search");
  }
};

//---------------------- OnMouseOut ---------------------------------

document.onmouseout = function () {
  var elem = window.event.srcElement;

  if (elem.className == "TextFile") {
    elem.style.backgroundColor = "#FFFFEB";
  }

  if (elem.className == "TextFile" || elem.id == "inSearch") {
    titleHelp("");
  }
};

function titleHelp(text) {
  document.getElementById("helpContent").innerHTML = text;
}

//---------------------- OnClick ---------------------------------

document.onclick = function () {
  Context(); // Меню правой кнопки мыши script.js
  var elem = window.event.srcElement;

  // --------------- Клик на Папку -------------------

  if (elem.className == "folderMenu") {
    document.getElementById("left").innerHTML = "";
    document.getElementById("right").innerHTML = "";
    IdKod = "";
    TopMenuFolder = elem.innerHTML;
    SaveData(); // Сохранить настройки data.js
    elem.className = "folderMenu folderClick";
    OpenFileAll(); // Выписать все text boxy
    OpenFileSlovo(); // Выписать ключевые слова
    if (TopMenuId > "") {
      document.getElementById(TopMenuId).className = "folderMenu";
    }
    TopMenuId = elem.id;
    Help();
    clearInput();
    return false;
  }

  if (elem.className == "folderMenu folderClick") {
    return false;
  }
  // -------------- Клик на слово --------------

  if (elem.className == "slovoMenu") {
    var SlovoFile = elem.innerHTML + ".txt";
    var papkaSlovo = FileDir + "data\\Archiv\\" + TopMenuFolder + "\\slovo\\";
    var papkaKod = FileDir + "data\\Archiv\\" + TopMenuFolder + "\\";
    IdKod = "";
    OpenFile777(papkaSlovo + SlovoFile);
    var names = Global_txt_1.replace(Rez, "");
    var arr = names.split(Rez);
    document.getElementById("right").innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
      var m = arr[i];
      OpenFileUTF(papkaKod + m);
      document.getElementById("right").innerHTML += GlobalTxtUTF;
    }
    LeftMenuSlovo = elem.innerHTML;
    SaveData(); // Сохранить настройки data.js
    if (LeftMenuId > "" && document.getElementById(LeftMenuId)) {
      document.getElementById(LeftMenuId).className = "slovoMenu";
    }
    elem.className = "slovoMenu folderClick";
    LeftMenuId = elem.id;
    Help();
    return false;
  }

  if (elem.className == "slovoMenu folderClick") {
    return false;
  }
  // ----------- Открыть / Закрыть код ---------------

  if (elem.className == "TopTextFile") {
    if (elem.childNodes[2].className == "TextareaBox") {
      element = elem.childNodes[2];
      element.style.display =
        element.style.display == "block" ? "none" : "block";
      if (IdKod > "" && IdKod != elem.id) {
        document.getElementById(IdKod).childNodes[2].style.display = "none";
      }
      IdKod = elem.id;
    }
  }

  if (elem.className == "SpanTopTextFile") {
    elem.parentNode.click();
    Help();
    return false;
  }

  if (elem.className == "TextFile") {
    window.clipboardData.setData("text", elem.innerText);
    elem.style.backgroundColor = "#b9f6ca";
    titleHelp("Copied");

    setTimeout(function () {
      elem.style.backgroundColor = "#FFFFEB";
    }, 200);
    elem.blur();
  }

  if (elem.className.indexOf("div-clear") != -1) {
    clearInput();
  }
};

function clearInput() {
  document.getElementById("inSearch").value = "";
  hashtagSeArch();
  document.getElementById("inSearch").focus();
}

//---------------------- OnMousup ---------------------------------

var TopFolderDel;

document.onmouseup = function () {
  var elem = window.event.srcElement;
  var X = window.event.srcElement.className;

  var elems = document.getElementsByTagName("IMG");
  for (var i = 0; i < elems.length; i++) {
    if (elems[i].className == "mBut") {
      elems[i].style.display = "none";
    }
    document.getElementById("MyMenu").style.display = "none";
  }

  if (X == "folderMenu" || X == "folderMenu folderClick") {
    TopFolderDel = elem.innerHTML;
    document.getElementById("aDel").style.display = "block";
    document.getElementById("MyMenu").style.display = "block";
    return false;
  }

  if (X == "SpanTopTextFile") {
    TopElemId = elem.parentNode.id;
    document.getElementById("EditText").style.display = "block";
    document.getElementById("DelText").style.display = "block";
    document.getElementById("MyMenu").style.display = "block";
    return false;
  }

  if (X == "box lft") {
    TopFolderDel = elem.innerHTML;
    document.getElementById("aText").style.display = "block";
    document.getElementById("MyMenu").style.display = "block";
    return false;
  }
  if (X == "box cntr") {
    TopFolderDel = elem.innerHTML;
    document.getElementById("aFolder").style.display = "block";
    document.getElementById("MyMenu").style.display = "block";
    return false;
  }
  if (X == "TextFile") {
    document.getElementById("aRun").style.display = "block";
    document.getElementById("MyMenu").style.display = "block";
    return false;
  }
};
