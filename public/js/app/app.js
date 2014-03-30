// Filename: app.js
define([
    'jquery',
    'underscore',
    'backbone',
    'foundation',
    //'app/views/products-view',
    //'app/collections/products-collection',
    //'global',
    'succinct'
    //'router', // Request router.js
], function($, _, Backbone, foundation, succinct) {
    'use strict';

    var initialize = function() {

        // Pass in our Router module and call it's initialize function
        // var products = new ProductsCollection;

        // var cleanse = products.parse(global);

        // products.add(cleanse);

        // var productviews = new ProductsView({
        //     collection: products
        // });
        //console.log(products.toJSON()[0].offer);
        //$('body').append(productviews.render().el);

        // // var router = new Router(appView);
        // Backbone.history.start();

        $(document).foundation({
            active_class: 'open'
        });

        $('.truncate').succinct({
            size: 48
        });

        console.log('testing');


    }

    return {
        initialize: initialize
    };
});