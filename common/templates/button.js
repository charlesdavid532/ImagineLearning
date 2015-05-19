this["Imagine"] = this["Imagine"] || {};
this["Imagine"]["Learning"] = this["Imagine"]["Learning"] || {};
this["Imagine"]["Learning"]["Common"] = this["Imagine"]["Learning"]["Common"] || {};
this["Imagine"]["Learning"]["Common"]["Templates"] = this["Imagine"]["Learning"]["Common"]["Templates"] || {};

this["Imagine"]["Learning"]["Common"]["Templates"]["button"] = function(obj) {
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