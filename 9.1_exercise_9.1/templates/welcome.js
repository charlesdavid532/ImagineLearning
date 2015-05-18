this["Concord"] = this["Concord"] || {};
this["Concord"]["Interactives"] = this["Concord"]["Interactives"] || {};
this["Concord"]["Interactives"]["Templates"] = this["Concord"]["Interactives"]["Templates"] || {};

this["Concord"]["Interactives"]["Templates"]["welcome"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="welcome-text" class="welcome-text"></div>\r\n<div id="start-button" class="start-button"></div>';

}
return __p
};