var fso = new ActiveXObject("Scripting.FileSystemObject");
var loc = window.location.pathname;
var FileDir = loc.substring(0, loc.lastIndexOf("\\") + 1);
//---------------------- Выписать ключевые слова -----------------
//________________________________________________________________

function OpenFileSlovo() {
  var papka = FileDir + "data\\Archiv\\" + TopMenuFolder + "\\slovo";

  if (fso.FolderExists(papka)) {
    var e = new Enumerator(fso.GetFolder(papka).files),
      n = 0,
      kodBut = "";

    for (e.moveFirst(); !e.atEnd(); e.moveNext()) {
      var file = e.item();
      n++;
      var fileName = file.name.replace(".txt", "");
      kodBut += "<li>";
      kodBut +=
        '<a href="#" id="slovo' +
        n +
        '" class="slovoMenu">' +
        fileName +
        "</a>";
      kodBut += "</li>";
    }
    document.getElementById("left").innerHTML = kodBut;
    SlovoClick(); // Нажать на последнее нажатое слово
  }
}
//---------------------- Выписать Список папок -------------------
//________________________________________________________________

function OpFolder() {
  var f = fso.GetFolder(FileDir + "data\\Archiv\\"),
    fc = new Enumerator(f.SubFolders);
  (n = 0), (folder.innerHTML = ""), (kodBut = "");

  for (fc.moveFirst(); !fc.atEnd(); fc.moveNext()) {
    var file = fc.item();
    n++;
    kodBut += "<li>";
    kodBut +=
      '<a href="#" id="folder' +
      n +
      '" class="folderMenu">' +
      file.name +
      "</a>";
    kodBut += "</li>";
  }
  folder.innerHTML = kodBut;
  FolderClick(); //Нажать на последнюю нажатую папку
}

//------------------ Нажать на последнюю нажатую папку -----------
//________________________________________________________________

function FolderClick() {
  var elems = document.getElementsByTagName("A");
  for (i = 0; i < elems.length; i++) {
    if (elems[i].innerHTML == TopMenuFolder) {
      elems[i].click();
    }
  }
}

//---------------------- Выписать ключевые слова -----------------
//________________________________________________________________

function OpenFileAll() {
  var papka = FileDir + "data\\Archiv\\" + TopMenuFolder + "\\";
  var htmlCode = "";

  if (fso.FolderExists(papka)) {
    var e = new Enumerator(fso.GetFolder(papka).files);
    document.getElementById("right").innerHTML = "";

    for (e.moveFirst(); !e.atEnd(); e.moveNext()) {
      var file = e.item();
      OpenFile777(papka + file.name);
      htmlCode += Global_txt_1;
    }
    document.getElementById("right").innerHTML = htmlCode;
  }
}

//------------------ Нажать на последнее нажатое слово -----------
//________________________________________________________________

function SlovoClick() {
  var elems = document.getElementsByTagName("A");
  for (i = 0; i < elems.length; i++) {
    if (elems[i].innerHTML == LeftMenuSlovo) {
      elems[i].click();
    }
  }
}

//---------------------- Сохранить настройки data.js -------------
//________________________________________________________________

function SaveData() {
  var data = document.getElementsByTagName("input");

  var info_txt = "var TopMenuFolder = '" + TopMenuFolder + "';";
  info_txt += "\r\nvar LeftMenuSlovo = '" + LeftMenuSlovo + "';";

  var file = FileDir + "data\\script\\data.js";
  SaveFileUTF(info_txt, file);
}

//---------------------- Генератор Имени Файла -------------------
//________________________________________________________________

var GenFile = "";

function GenData() {
  var d = new Date();
  var year = d.getFullYear();
  var year = "" + year + "";
  var year = year.slice(2, 4);
  var data = year + ".";
  data += d.getMonth() + 1;
  data += "." + d.getDate();
  data += "." + d.getHours();
  data += "." + d.getMinutes();
  data += "." + d.getSeconds();
  GenFile = "f" + data;
}

//---------------------- Сохранить Файл --------------------------
//________________________________________________________________

var NewHashTag = "";
var FolderSlovo = "";

function SaveFileNew() {
  //------ Добавление записи ----
  if (GenFile == "") {
    GenData();
  }
  var file = "GenFile";
  var text =
    '<div class="TopTextFile" id="' +
    GenFile +
    '"><span class="SpanTopTextFile">' +
    TopTextFile.value +
    "</span><br />";
  text += '\n<span class="TextareaBox">';
  var data = document.getElementsByTagName("textarea");
  for (var i = 0; i < data.length; i++) {
    if (data[i].getAttribute("className") == "txtADD") {
      text +=
        '\n<textarea class="TextFile">' +
        data[i].innerText.replace(new RegExp("textarea", "g"), "textaroa") +
        "</textarea>";
    }
  }
  text += "\n</span>";
  text += '\n<span class="BottomTextFile">' + BottomTextFile.value + "</span>";
  text += "\n</div>";

  var file =
    FileDir + "data\\Archiv\\" + TopMenuFolder + "\\" + GenFile + ".txt";
  SaveFileUTF(text, file);

  //------ Добавление ключевого слова ----
  NewHashTag = BottomTextFile.value;
  FolderSlovo = FileDir + "data\\Archiv\\" + TopMenuFolder + "\\slovo\\";
  DelHashTag();
  var arr = NewHashTag.split(Rez);
  for (var i = 0; i < arr.length; i++) {
    if (fso.FolderExists(FolderSlovo)) {
    } else create(FolderSlovo);
    var file_a = FolderSlovo + arr[i] + ".txt";
    var text_a = Rez + GenFile + ".txt";
    if (fso.FileExists(file_a)) {
      // существует
      OpenFile777(file_a);
      var ExistTeg = Global_txt_1.indexOf(GenFile);
      if (ExistTeg == -1) {
        text_a += Global_txt_1;
        SaveFileUTF(text_a, file_a);
      }
    } else {
      // не существует
      SaveFileUTF(text_a, file_a);
    }
  }
  //------ Выписать ключевые слова ----
  OpenFileSlovo();
  //------ Скрыть форму ----
  OffForma();
  //------ Удалить имья файла ----
  GenFile = "";
  document.getElementById("OutFofm").innerHTML = "";
}

//------------------------- Скрыть форму -------------------------
//________________________________________________________________

function DelHashTag() {
  var arr = HashTagEdit.split(Rez);
  for (var i = 0; i < arr.length; i++) {
    var str = NewHashTag;
    if (~str.indexOf(arr[i])) {
      // существует
    } else {
      var file_a = FolderSlovo + arr[i] + ".txt";
      if (fso.FileExists(file_a)) {
        // существует
        OpenFile777(file_a);
        var xFile = Rez + GenFile + ".txt";
        if (~Global_txt_1.indexOf(xFile)) {
          // существует
          var text_a = Global_txt_1.replace(xFile, "");
          if (text_a == "") {
            DeleteFile(file_a);
          } else SaveFileUTF(text_a, file_a);
        }
      }
    }
  }
}

//------------------------- Скрыть форму -------------------------
//________________________________________________________________

function OffForma() {
  document.getElementById("FormTextFile").style.display =
    document.getElementById("FormTextFile").style.display == "none"
      ? "block"
      : "none";
  TopTextFile.value = "";
  GlobForm(0);
  BottomTextFile.value = "";
}

//---------------------- Запись Файла UTF-8 ----------------------
//________________________________________________________________

function SaveFileUTF(text, file) {
  var adSaveCreateOverWrite = 2;
  var stream;

  stream = new ActiveXObject("ADODB.Stream");
  stream.Open();
  stream.Type = "2";
  stream.Position = "0";
  stream.Charset = "utf-8";

  stream.WriteText(text);
  stream.SaveToFile(file, adSaveCreateOverWrite);
  stream.Close();
}

//---------------------- Чтение Файла UTF-8 ----------------------
//________________________________________________________________

var GlobalTxtUTF;

function OpenFileUTF(sFileName) {
  var stream;

  stream = new ActiveXObject("ADODB.Stream");
  stream.Open();
  stream.Type = "2";
  stream.Position = "0";
  stream.Charset = "utf-8";
  stream.LoadFromFile(sFileName);

  GlobalTxtUTF = stream.ReadText();
  stream.Close();
}
//---------------------- Чтение Файла ---------------------------
//________________________________________________________________

var Global_txt_1;

function OpenFile777(file) {
  if (fso.FileExists(file)) {
    // существует
    OpenFileUTF(file);
    Global_txt_1 = GlobalTxtUTF;
  } else {
    // не существует
    alert("Fiile [" + file + "] does not exist!");
  }
}

//---------------------- Окно - Создать Папку --------------------
//________________________________________________________________

function showDialog() {
  self.showModalDialog(
    "data/script/folder_new.htm",
    null,
    "status:no; center:yes; help:no; minimize:no; maximize:no;border:thin; dialogWidth:300px;dialogHeight:225px"
  );
  window.setTimeout("OpFolder();", 100);
}

//---------------------- Предпросмотр скрипта --------------------
//________________________________________________________________

var RunKod;

function showDialog2() {
  var file = FileDir + "data\\script\\preview.hta";
  OpenFileUTF(FileDir + "data\\script\\start.ini");
  var text = GlobalTxtUTF;
  text += scriptSearch();
  OpenFileUTF(FileDir + "data\\script\\stop.ini"); //GlobalTxtUTF;
  text += GlobalTxtUTF;

  SaveFileUTF(text, file);
  RunFile(file);
}

/* Поиск слова <script
в коде для предпросмотра кода */

function scriptSearch() {
  var flag = false;
  var text = RunKod;

  if (~text.indexOf("dget")) {
    alert("совпадение есть!");
  }

  var str = text.split(/\r|\r\n|\n/);
  for (var i = 0; i < str.length; i++) {
    if (~str[i].indexOf("<script")) {
      flag = true;
      break;
    }
  }
  if (flag === false) {
    text =
      '<div class="cntr"><textarea>' +
      RunKod +
      '</textarea><br><a href="#" onclick="window.location.reload();">Script Reload</a></div>' +
      "<script>\nfunction go(){" +
      RunKod +
      "\n}\nsetTimeout(function() {go();}, 100);\n</script>";
  }
  return text;
}

//---------------------- Создать Папку ---------------------------

function FolderGo() {
  var folder = document.all.folder_b.value;
  var cesta = FileDir + "data\\Archiv\\";
  alert(cesta);
  if (fso.FolderExists(cesta + folder))
    alert(
      "Folder with name [" + folder + "] already exists, please change name!"
    );
  else {
    create(cesta + folder);
  }
}

function create(folder) {
  var myObject, newfolder;
  myObject = new ActiveXObject("Scripting.FileSystemObject");
  newfolder = myObject.CreateFolder(folder);
}

//---------------------- Удалить Файл ---------------------------

function DeleteFile(file) {
  if (fso.FileExists(file)) {
    fso.DeleteFile(file);
  } else {
    alert("Named file [" + file + "] does not exist!");
  }
}
//---------------------- Удалить Папку ---------------------------

function FolderDel(folder) {
  var cesta = FileDir + "data\\Archiv\\";

  if (fso.FolderExists(cesta + folder)) {
    if (confirm("Do you want to delete a folder [" + folder + "] ?")) {
      fso.DeleteFolder(cesta + folder);
      window.setTimeout("OpFolder();", 100);
    }
    return false;
  } else {
    alert("Folder with name [" + folder + "] does not exist!");
  }
}

//---------------------- Удалить Текст ---------------------------

var Global_txt_3;

function TextDel() {
  var elem = document.getElementById(TopElemId);
  var blokName = elem.childNodes[0].innerHTML;
  var hashTag = elem.childNodes[3].innerHTML;

  if (confirm("Do you want to delete an note [" + blokName + "] ?")) {
    var arr = hashTag.split(Rez);
    for (var i = 0; i < arr.length; i++) {
      var file_a =
        FileDir +
        "data\\Archiv\\" +
        TopMenuFolder +
        "\\slovo\\" +
        arr[i] +
        ".txt";
      if (fso.FileExists(file_a)) {
        // существует
        OpenFile777(file_a);
        var ExistTeg = Global_txt_1.indexOf(TopElemId + ".txt");
        if (ExistTeg > -1) {
          var TxtTagTxt = Rez + TopElemId + ".txt"; // файл техта
          var DelFile =
            FileDir +
            "data\\Archiv\\" +
            TopMenuFolder +
            "\\" +
            TopElemId +
            ".txt"; // файл техта

          var TxtTag = Global_txt_1.replace(TxtTagTxt, ""); // удалить имя файла в хештеге
          if (TxtTag > "") {
            // если в хештеге есть файлы
            SaveFileUTF(TxtTag, file_a); // сохранить хештег
          } else DeleteFile(file_a); // удалить файл хештега
          if (fso.FileExists(DelFile)) {
            // существует
            DeleteFile(DelFile); // удалить техт
          }
        }
      } else {
        // не существует
        alert("File [" + file_a + "] does not exist!");
      }
    }
  }
  OpFolder();
}

//________________________________________________________________

function Help() {
  //document.getElementById('help').innerText = '';
  document.getElementById("help").innerText +=
    "\n" + "TopMenuFolder = " + TopMenuFolder;
  document.getElementById("help").innerText +=
    "\n" + "TopMenuId = " + TopMenuId;
  document.getElementById("help").innerText +=
    "\n" + "LeftMenuSlovo = " + LeftMenuSlovo;
  document.getElementById("help").innerText +=
    "\n" + "LeftMenuId = " + LeftMenuId;
  document.getElementById("help").innerText += "\n" + "IdKod = " + IdKod;
  document.getElementById("help").innerText += "\n" + "---------------";
}

//---------------- Запуск файла -----------------------

function RunFile(file) {
  var f = fso.GetFile(file),
    file_ok = f.ShortPath.toUpperCase(),
    ws;

  if (fso.FileExists(file_ok)) {
    ws = new ActiveXObject("WScript.Shell");
    ws.Run(file_ok);
  } else {
    alert("File " + file_ok + " no exist");
  }
}
