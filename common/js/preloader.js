(function (ImagineLearning) {
    'use strict';
    var Preloader = function () {
        this._events = {};
        this._audioData = [];
        this._interactiveModelName = null;
        this._interactiveViewName = null;
        return this;
    },
    Event = function (params) {
        var event = this;
        event.type = params.type || null;
        event.data = params.data || null;
        return event;
    };

    Preloader.prototype.loadConfig = function (data) {
        var preloader = this,
            queue = new createjs.LoadQueue();

        queue.on("fileload", preloader.handleCommonConfigLoadComplete, preloader);
        queue.loadFile({ id: "json", src: ImagineLearning.Path.getPath(data) });

    };

    Preloader.prototype.handleCommonConfigLoadComplete = function (event) {
        var preloader = this,
            queue = new createjs.LoadQueue(false);

        //createjs.Sound.alternateExtensions = ["mp3"];
        //queue.installPlugin(createjs.Sound);

        console.log('Common config loading complete');
        var fileList = [],
            config = event.result.resources;
        $.each(config, function (key, value) {
            switch (key) {
                case "audio":
                    var data = {}, i = 0;
                    for (; i < value.length; i++) {
                        data.id = value[i].id;
                        data.src = ImagineLearning.Path.getPath(value[i]);
                        data.type = value[i].type;
                        /*
                        preloader._audioData.id = value[0].id;
                        preloader._audioData.src = ImagineLearning.Path.getPath(value[0]);
                        preloader._audioData.type = value[0].type;
                        */
                        preloader._audioData.push(data);
                    }
                    break;
                default:
                    if (value.length > 0) {
                        $.each(value, function (subKey, subValue) {
                            fileList.push({ "id": subValue.id, "src": ImagineLearning.Path.getPath(subValue) })
                        });
                    }
                    break;
            }
        });

        queue.loadManifest(fileList);
        queue.on("complete", preloader.allCommonFilesLoadComplete, preloader);

        // Parse Interactive config
        var interactiveConfig = event.result.config;
        if (interactiveConfig !== null && interactiveConfig !== undefined) {
            preloader._interactiveModelName = interactiveConfig.model.class;
            preloader._interactiveViewName = interactiveConfig.view.class;
        }
    };

    Preloader.prototype.allCommonFilesLoadComplete = function (event) {
        console.log('All Files of common config have been loaded');
        var preloader = this,
            preloaderEvent = preloader.createEvent({
                "type": Preloader.EVENTS.CONFIG_LOADED,
                "data": null
            });
        preloader.trigger(preloaderEvent);
    };


    // Creates event
    Preloader.prototype.createEvent = function (data) {
        return new Event(data);
    };
    // Triggers resgiestered event handlers
    Preloader.prototype.trigger = function (preloaderEvent) {
        var preloader = this,
            events = preloader._events[preloaderEvent.type] || [],
            index = null,
            length = events.length;
        for (index = 0; index < length; index += 1) {
            if (events[index]) {
                events[index](preloaderEvent, preloader);
            }
        }
        return preloader;
    };

    // Registers event handlers for the given event
    Preloader.prototype.listenTo = function listenTo(eventName, handler) {
        var preloader = this;
        if (!preloader._events[eventName]) {
            preloader._events[eventName] = [];
        }
        preloader._events[eventName].push(handler);
        return preloader;
    };

    // Unbinds handlers
    Preloader.prototype.stopListening = function (eventName, handler) {
        var preloader = this,
            events = preloader._events[eventName],
            handlerIndex = null;

        if (!eventName && !handler) {
            // Flush all events
            preloader._events = {};
        }

        if (events) {
            handlerIndex = events.indexOf(handler);
            if (handlerIndex > -1) {
                events.splice(handlerIndex, 1);
            } else {
                preloader._events[eventName] = [];
            }
        }
        return preloader;

    };

    Preloader.prototype.getAudioData = function () {
        return this._audioData;
    };

    Preloader.prototype.getInteractiveModelName = function () {
        return this._interactiveModelName;
    };

    Preloader.prototype.getInteractiveViewName = function () {
        return this._interactiveViewName;
    };
    // Events map
    Preloader.EVENTS = {
        "PRELOAD_COMPLETE": "preload-complete",
        "CONFIG_LOADED": "config-loaded"
    };
    // exposing the preloader
    ImagineLearning.Preloader = Preloader;
})(window.ImagineLearning);