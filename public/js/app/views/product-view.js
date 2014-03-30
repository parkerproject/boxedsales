define([
    'jquery',
    'underscore',
    'backbone',
    'app/models/product-model',
    'text!app/templates/product.html'
], function($, _, Backbone, Model, HTML) {

    'use strict';

    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };

    var ProductView = Backbone.View.extend({

        model: Model,

        initialize: function() {

            //this.listenTo(this.model, "change", this.render);
            this.render();
        }

        render: function() {
            console.log('model just changed testing');
        }

    });

    return ProductView;
});