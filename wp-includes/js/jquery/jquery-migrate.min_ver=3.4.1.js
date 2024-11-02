/*! jQuery Migrate v3.4.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */
if (typeof jQuery.migrateMute === "undefined") {
    jQuery.migrateMute = true;
}

(function(factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define(["jquery"], function(jQuery) {
            return factory(jQuery, window);
        });
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("jquery"), window);
    } else {
        factory(jQuery, window);
    }
})(function(jQuery, window) {
    "use strict";

    function compareVersions(version, compareVersion) {
        var regex = /^(\d+)\.(\d+)\.(\d+)/,
            versionParts = regex.exec(version) || [],
            compareParts = regex.exec(compareVersion) || [];

        for (var i = 1; i <= 3; i++) {
            if (+compareParts[i] < +versionParts[i]) return 1;
            if (+versionParts[i] < +compareParts[i]) return -1;
        }
        return 0;
    }

    function warn(deprecatedName, warningMessage) {
        if (!jQuery.migrateIsPatchEnabled(deprecatedName) ||
            (jQuery.migrateDeduplicateWarnings && warningMessages[warningMessage])) {
            return;
        }

        warningMessages[warningMessage] = true;
        jQuery.migrateWarnings.push(warningMessage + " [" + deprecatedName + "]");
        
        if (console && !jQuery.migrateMute) {
            console.warn("JQMIGRATE: " + warningMessage);
            if (jQuery.migrateTrace && console.trace) console.trace();
        }
    }

    function defineDeprecatedProperty(obj, prop, getter, setter, warningName, warningMessage) {
        Object.defineProperty(obj, prop, {
            configurable: true,
            enumerable: true,
            get: function() {
                warn(warningName, warningMessage);
                return getter;
            },
            set: function(value) {
                warn(warningName, warningMessage);
                setter(value);
            }
        });
    }

    function patchMethod(obj, method, replacement, warningName, warningMessage) {
        var original = obj[method];
        obj[method] = function() {
            warn(warningName, warningMessage);
            return replacement.apply(this, arguments);
        };
    }

    jQuery.migrateVersion = "3.4.1";
    jQuery.migrateWarnings = [];
    jQuery.migrateDeduplicateWarnings = true;
    var warningMessages = {};

    jQuery.migrateIsPatchEnabled = function(patch) {
        return !patchesDisabled[patch];
    };

    jQuery.migrateDisablePatches = function() {
        for (var i = 0; i < arguments.length; i++) {
            patchesDisabled[arguments[i]] = true;
        }
    };

    jQuery.migrateEnablePatches = function() {
        for (var i = 0; i < arguments.length; i++) {
            delete patchesDisabled[arguments[i]];
        }
    };

    if (console && console.log) {
        if (jQuery && compareVersions(jQuery.fn.jquery, "3.0.0") &&
            !compareVersions(jQuery.fn.jquery, "5.0.0")) {
            console.log("JQMIGRATE: jQuery 3.x-4.x REQUIRED");
        }
        if (jQuery.migrateWarnings && console.log("JQMIGRATE: Migrate plugin loaded multiple times"));
        console.log("JQMIGRATE: Migrate is installed" +
            (jQuery.migrateMute ? "" : " with logging active") +
            ", version " + jQuery.migrateVersion);
    }

    // Additional deprecated function definitions and patches go here...

});
