(function (ImagineLearning) {
  "use strict";
  var Path = {},
  // Can be changed to absolute path based on the origin
      base = "",
      common = '../../'+ "common/",
      vendor = common + "vendor/",
      js = "js",
      dataPath = "data",
      commonJS = common + js + "/",
      css = "css",
      images = "images",
      data = "data",
      templates = "templates",
      models = "models",
      views = "views",
      collections = "collections",
      language = null,
      locPath = 'lang/',
      media = 'media',
      audio = 'audio',
      interactiveFolder = "",
      MAP = {
    "COMMON_JS" : common + js + "/",
    "COMMON_COLLECTIONS" : commonJS + collections + "/",
    "COMMON_MODELS" : commonJS + models + "/",
    "COMMON_VIEWS" : commonJS + views + "/",
    "COMMON_TEMPLATES" : common + templates + "/",
    "COMMON_CSS" : common + css + "/",
    "FONT_CSS" : common + css + "/",
    "COMMON_DATA" : common + data + "/",
    "COMMON_CONFIG" : common + data + "/common-config.json",
    "VENDOR_JS" : vendor + js + "/",
    "VENDOR_CSS" : vendor + css + "/",
    "DATA_PATH" : '/' + data + '/'

  },
  // Path resolver
      resolvePath = function(data) {
    var _basePath = base,
        url = data.url || "";

    switch (data.basePath) {
      // Direct mapings
      case "COMMON_CONFIG":
        _basePath = MAP.COMMON_CONFIG;
        break;
      case "COMMON_CSS":
        _basePath = MAP.COMMON_CSS;
        break;
      case "COMMON_JS":
        _basePath = MAP.COMMON_JS;
        break;
      case "COMMON_COLLECTIONS":
        _basePath = MAP.COMMON_COLLECTIONS;
        break;
      case "COMMON_MODELS":
        _basePath = MAP.COMMON_MODELS;
        break;
      case "COMMON_VIEWS":
        _basePath = MAP.COMMON_VIEWS;
        break;
      case "COMMON_TEMPLATES":
        _basePath = MAP.COMMON_TEMPLATES;
        break;
      case "VENDOR_JS":
        _basePath = MAP.VENDOR_JS;
        break;
      case "VENDOR_CSS":
        _basePath = MAP.VENDOR_JS;
        break;
      case "FONT_CSS":
        _basePath = MAP.FONT_CSS;
        break;
      // Inderect mappings
      case "INTERACTIVE_CSS":
          _basePath += interactiveFolder + "/" + css + "/";
        break;
      case "INTERACTIVE_IMAGES": // NOTE IS THIS USED??
        _basePath += css + "/" + images + "/";
        break;
      case "INTERACTIVE_COLLECTIONS":
          _basePath += interactiveFolder + "/" + js + "/" + collections + "/";
        break;
      case "INTERACTIVE_MODELS":
          _basePath += interactiveFolder + "/" + js + "/" + models + "/";
        break;
      case "INTERACTIVE_VIEWS":
          _basePath += interactiveFolder + "/" + js + "/" + views + "/";
        break;
      case "INTERACTIVE_JSON":
          _basePath += interactiveFolder + "/" + dataPath + "/";
        break;
      case "INTERACTIVE_TEMPLATES":
          _basePath += interactiveFolder + "/" + templates + "/";
          break;
        case "INTERACTIVE_AUDIO":
            _basePath += interactiveFolder + "/" + media + "/" + audio + "/";
            break;
      default:
        _basePath = "";
        break;
    }
    _basePath += url;
    return _basePath;
  };

  // The path object
  Path.getPath = function(data) {
    return resolvePath(data);
  };

  Path.setInteractiveFolder = function (interactive) {
      interactiveFolder = interactive;
  };

  Path.getInteractiveConfigPath = function() {
      return interactiveFolder + "/" + data + "/interactive-config.json";
  };

  Path.setLanguage = function(lang) {
    language = lang;
  };

  // Expose path map
  Path.MAP = MAP;
  ImagineLearning.Path = Path;
})(window.ImagineLearning);
