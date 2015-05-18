(function (ImagineLearning) {
    "use strict";
    var engine = null,
        interactiveFolder = null, // Give it some default
        startPreloading = function () {
            parseQueryString();
            ImagineLearning.Path.setInteractiveFolder(interactiveFolder);
            //var appWrapper = document.getElementById("app-wrapper");
            // Remove font preloader
            document.body.removeChild(document.getElementById("font-preloader"));

            //appWrapper.style.height = window.innerHeight + "px";
            // Preloader Instance
            engine.preloader = new ImagineLearning.Preloader();
            //appWrapper.appendChild(engine.preloader.getView());

            //engine.preloader.updateLoadingText("Loading... ").listenTo(ImagineLearning.Preloader.EVENTS.CONFIG_LOAD, commonConfigLoad);
            engine.preloader.listenTo(ImagineLearning.Preloader.EVENTS.CONFIG_LOADED, commonConfigLoad);

            // Load Common config
            engine.preloader.loadConfig({
                basePath: "COMMON_CONFIG"
            });
        },
        commonConfigLoad = function (event, preloader) {
            console.log('Load complete in engine');
            //commonResources = event.data.resourceData.resources;
            engine.preloader.stopListening().listenTo(ImagineLearning.Preloader.EVENTS.CONFIG_LOADED, interactiveConfigLoad);
            // Load Interactive config
            preloader.loadConfig({
                "url": ImagineLearning.Path.getInteractiveConfigPath()
            });
        },
        interactiveConfigLoad = function (event, preloader) {
            console.log('Interactive All files loaded');
            loadPlayer();
        },
      getQueryString = function () {
          var queryString = decodeURIComponent(location.search.substring(1, location.search.length));
          if (queryString.length === 0) {
              return null;
          }
          return queryString;
      },
      parseQueryString = function () {
          var queryString = getQueryString();
          if ((queryString !== null) && (queryString.indexOf('=') !== -1)) {
              var queryStringAttrs = queryString.split('&'),
                  queryStringAttrsLen = queryStringAttrs.length,
                  attrCounter = 0,
                  attribute;

              for (; attrCounter < queryStringAttrsLen; attrCounter++) {
                  if (queryStringAttrs[attrCounter].indexOf('=') !== -1) {
                      attribute = queryStringAttrs[attrCounter].split('=');
                      switch (attribute[0]) {
                          case 'filename':
                              interactiveFolder = attribute[1];
                              break;
                      }
                  }

              }

          }
      },
      loadPlayer = function () {
          var playerModel = new ImagineLearning.Common.Models.PlayerModel({
              audioData: engine.preloader.getAudioData(),
              interactiveModelName: engine.preloader.getInteractiveModelName(),
              interactiveViewName: engine.preloader.getInteractiveViewName(),
          });
          var playerView = new ImagineLearning.Common.Views.PlayerView({
              model: playerModel,el:'#player'
          });
      };

    // Create engine
    ImagineLearning.Engine = function () {
        if (engine) {
            return engine;
        }
        engine = this;
        return engine;
    };

    engine = new ImagineLearning.Engine();
    // Add font style
    window.document.addEventListener("DOMContentLoaded", startPreloading);

})(window.ImagineLearning);
