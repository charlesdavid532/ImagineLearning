this["Concord"] = this["Concord"] || {};
this["Concord"]["Interactives"] = this["Concord"]["Interactives"] || {};
this["Concord"]["Interactives"]["Templates"] = this["Concord"]["Interactives"]["Templates"] || {};

this["Concord"]["Interactives"]["Templates"]["question"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 for(var i = 1; i < total; ++i){;
__p += ' \r\n<div id="question-' +
((__t = (i)) == null ? '' : __t) +
'-area" class="question-' +
((__t = (i)) == null ? '' : __t) +
'-area common-question-activity-area">\r\n\t<div id="display-question-' +
((__t = (i)) == null ? '' : __t) +
'-image" class="display-question-' +
((__t = (i)) == null ? '' : __t) +
'-image display-image">\r\n\t\t<img class="display-image-' +
((__t = (i)) == null ? '' : __t) +
'" alt=""></img>\r\n\t</div>\r\n\t<div id="result-image-question-' +
((__t = (i)) == null ? '' : __t) +
'" class="result-image-question-' +
((__t = (i)) == null ? '' : __t) +
' result-image">\r\n\t\t<img class="result-image-' +
((__t = (i)) == null ? '' : __t) +
'" alt=""></img>\t\r\n\t</div>\r\n\t<div id="indentical-text-question-' +
((__t = (i)) == null ? '' : __t) +
'" class="indentical-text-question-' +
((__t = (i)) == null ? '' : __t) +
' identical-text"></div>\r\n</div>\r\n';
};


}
return __p
};