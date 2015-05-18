/* globals window */

(function() {
  "use strict";
  // The project namespace
  var ImagineLearning = window.ImagineLearning || {};

  // The base interface
  ImagineLearning.Engine = {};
  //Interactive to load
  ImagineLearning.InteractiveId = ImagineLearning.InteractiveId || null;
  // Preloader module
  ImagineLearning.Preloader = {};

  // Common utilities
  ImagineLearning.Common = {};
  ImagineLearning.Common.Models = {};
  ImagineLearning.Common.Collections = {};
  ImagineLearning.Common.Views = {};

  // Interactive namespace
  ImagineLearning.Interactives = {};
  ImagineLearning.Interactives.Models = {};
  ImagineLearning.Interactives.Views = {};
  ImagineLearning.Interactives.Templates = {};
  ImagineLearning.Interactives.Collections = {};

  // Attach the namespace to window
  window.ImagineLearning = ImagineLearning;
})();
