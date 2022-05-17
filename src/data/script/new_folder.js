var fso = new ActiveXObject("Scripting.FileSystemObject");
function XFileDir() {
  return fso.GetAbsolutePathName("data\\..\\") + "\\";
}

document.onkeyup = function () {
  var elem = window.event.srcElement;
  if (elem.className == "folder-create") {
    folderSceck();
  }
};

function folderSceck() {
  var inValue = document.all.folder_b.value;
  var myPath = XFileDir() + "data\\Archiv\\" + inValue;
  if (fso.FolderExists(myPath)) {
    document.all.dok.disabled = true;
  } else {
    document.all.dok.disabled = false;
  }
}
//---------------------- Создать Папку ---------------------------

function FolderGo() {
  var cesta = XFileDir() + "data\\Archiv\\";
  var folder = document.all.folder_b.value;
  fso.CreateFolder(cesta + folder);
}
