//是否为空
exports.isNull = function(data) {
  return (data == "" || data == undefined || data == null) ? true : false;
};

//字符串转16进制
exports.strToHexCharCode = function(str) {
  if(str === "")
    return "";
  var hexCharCode = [];
  hexCharCode.push("0x");
  for(var i = 0; i < str.length; i++) {
    hexCharCode.push((str.charCodeAt(i)).toString(16));
  }
  return hexCharCode.join("");
};

//16进制转字符串
exports.hexCharCodeToStr = function(hexCharCodeStr) {
  var trimedStr = hexCharCodeStr.trim();
  var rawStr = trimedStr.substr(0,2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
  var len = rawStr.length;
  if(len % 2 !== 0) {
    alert("Illegal Format ASCII Code!");
    return "";
  }
  var curCharCode;
  var resultStr = [];
  for(var i = 0; i < len;i = i + 2) {
    curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
    resultStr.push(String.fromCharCode(curCharCode));
  }
  return resultStr.join("");
};

var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
  var len = len - (s + '').length;
  for(var i = 0; i < len; i++) {
    s = '0' + s;
  }
  return s;
};

//日期格式化
exports.formatDate = {
  format: function(date, pattern) {
    pattern = pattern || DEFAULT_PATTERN;
    return pattern.replace(SIGN_REGEXP, function ($0) {
      switch ($0.charAt(0)) {
        case 'y': return padding(date.getFullYear(), $0.length);
        case 'M': return padding(date.getMonth() + 1, $0.length);
        case 'd': return padding(date.getDate(), $0.length);
        case 'w': return date.getDay() + 1;
        case 'h': return padding(date.getHours(), $0.length);
        case 'm': return padding(date.getMinutes(), $0.length);
        case 's': return padding(date.getSeconds(), $0.length);
      }
    });
  },
  parse: function(dateString, pattern) {
    var matchs1 = pattern.match(SIGN_REGEXP);
    var matchs2 = dateString.match(/(\d)+/g);
    if(matchs1.length == matchs2.length) {
      var _date = new Date(1970, 0, 1);
      for(var i = 0; i < matchs1.length; i++) {
        var _int = parseInt(matchs2[i]);
        var sign = matchs1[i];
        switch (sign.charAt(0)) {
          case 'y': _date.setFullYear(_int); break;
          case 'M': _date.setMonth(_int - 1); break;
          case 'd': _date.setDate(_int); break;
          case 'h': _date.setHours(_int); break;
          case 'm': _date.setMinutes(_int); break;
          case 's': _date.setSeconds(_int); break;
        }
      }
      return _date;
    }
    return null;
  }
}
