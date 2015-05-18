this["Concord"] = this["Concord"] || {};
this["Concord"]["Common"] = this["Concord"]["Common"] || {};
this["Concord"]["Common"]["Templates"] = this["Concord"]["Common"]["Templates"] || {};

this["Concord"]["Common"]["Templates"]["button"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="' +
((__t = (buttonId)) == null ? '' : __t) +
'" class="' +
((__t = (baseClass)) == null ? '' : __t) +
'">' +
((__t = (text)) == null ? '' : __t) +
'</div>';

}
return __p
};