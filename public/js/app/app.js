// Filename: app.js
define([
    'jquery',
    'underscore',
    'backbone',
    'foundation',
    'app/views/products-view'
    //'router', // Request router.js
], function($, _, Backbone, foundation, ProductsView) {
    'use strict';

    var initialize = function() {

        return new ProductsView();


        // var router = new Router(appView);
        Backbone.history.start();

        $(document).foundation({
            active_class: 'open'
        });

    }


    return {
        initialize: initialize
    };
});