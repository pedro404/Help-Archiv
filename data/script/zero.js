
var QQ;
QQ = {};
QQ.msTime = false;
QQ.html0 = '<div id="help404" style="position: fixed;left: 0; bottom: 0;line-height: 17px;padding: 5px;background: #F2F2F2;color: #545B56;width: 100%;font-size:14px;height: 100px;overflow-y: auto;"></div>';
QQ.html1 = '<span style="background: #ff8c00;color: white;padding: 0 2px;border-radius: 5px;">';
QQ.html2 = '</span> ';
QQ.tmpStr = '';
QQ.time = 1;


function help404(data) {

	if (QQ.msTime === false) {
		document.getElementsByTagName('body')[0].innerHTML += QQ.html0;
		QQ.msTime = true;
		help404(data);
	} else {
		if (QQ.tmpStr !== data) {
			document.getElementById('help404').innerHTML += '<div>' + data + '</div>';
			QQ.tmpStr = data;
			QQ.time = 1;
		} else {
			QQ.time++;
			document.getElementById('help404').lastElementChild.outerHTML = '<div>' + QQ.html1 + QQ.time + QQ.html2 + data + '</div>';
		}
	}
}

var console = {
	log: function(data) {
		help404(data);
	}
};