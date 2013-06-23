require.config({
    "deps": ["main"],

    "paths": {
        "jquery": "../lib/jquery-1.9.1.min",
        "lodash": "../lib/lodash.min",
        "backbone": "../lib/backbone-min",
        "bootstrap": "../lib/bootstrap.min"
    },

    "shim": {
        "backbone": {
            "deps": [
                "jquery",
                "lodash"
            ],
            exports: "Backbone"
        },

        "bootstrap": {
            "deps": [
                "jquery"
            ]
        }
    }
});