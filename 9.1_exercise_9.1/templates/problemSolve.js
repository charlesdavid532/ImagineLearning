this["Concord"] = this["Concord"] || {};
this["Concord"]["Interactives"] = this["Concord"]["Interactives"] || {};
this["Concord"]["Interactives"]["Templates"] = this["Concord"]["Interactives"]["Templates"] || {};

this["Concord"]["Interactives"]["Templates"]["problemSolve"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="screen-area" class="screen-area">\r\n  <div id="question-text-container" class="question-text-container">\r\n    <div id="question-number" class="question-number"></div>\r\n    <div id="question-text" class="question-text"></div>\r\n  </div>\r\n  <div id="stereogenic-btn-container" class="stereogenic-btn-container"></div>\r\n  <div id="not-stereogenic-btn-container" class="not-stereogenic-btn-container"></div>\r\n  <div id="correction-text" class="correction-text"></div>\r\n  <div id="question-area" class="question-area"></div>\r\n  <div id="explanation-text" class="explanation-text">\r\n  </div>  \r\n<div id="footer-container" class="footer-container">\r\n  ';
for(var i=0;i<total; ++i){;
__p += '\r\n    <div id="footer-button-container-' +
((__t = (i+1)) == null ? '' : __t) +
'" class="footer-button-container-' +
((__t = (i+1)) == null ? '' : __t) +
' footer-button-container">\r\n    <div id="footer-button-' +
((__t = (i+1)) == null ? '' : __t) +
'" class="footer-button-' +
((__t = (i+1)) == null ? '' : __t) +
' footer-button" buttonNumber="' +
((__t = (i+1)) == null ? '' : __t) +
'">    \r\n    </div>\r\n    </div>\r\n  ';
};
__p += '\r\n</div>\r\n<div id="result-button" class="result-button"></div>\r\n</div>\r\n';

}
return __p
};