require.config({

    baseUrl: 'js',

    paths: {
        'jquery': '../vendor/jquery',
        'underscore': '../vendor/underscore',
        'backbone': '../vendor/backbone',
        'foundation': '../vendor/foundation',
        'text': '../vendor/text',
        'succinct': '../vendor/jQuery.succinct'
    },
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'foundation': {
            deps: [
                'jquery'
            ]
        },
        'succinct': {
            deps: [
                'jquery'
            ]
        }
    }
});

require([
    'backbone',
    'app/app'
], function(Backbone, App) {
    'use strict';

    App.initialize();

});