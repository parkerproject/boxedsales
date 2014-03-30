define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/products-collection',
    'text!app/templates/product.html',
], function($, _, Backbone, ProductCollection, Template) {

    'use strict';

    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };

    var ProductsView = Backbone.View.extend({

        el: '#sales',



        events: {},

        initialize: function() {

            //this.listenTo(this.model, "change", this.render);
            this.render();
        },

        render: function() {
            var view = this;
            var salesArray = [];
            this.collection.each(function(model, index, list) {
                salesArray.push(
                    _.template(Template, model.toJSON().offer)
                );
            });
            this.$el.append(salesArray.join(''));
            return this;
        }

    });

    return ProductsView;
});