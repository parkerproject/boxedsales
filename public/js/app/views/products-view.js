define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/products-collection',
    'global',
    'succinct',
    'handlebars',
    'app/views/product-view'
], function($, _, Backbone, ProductCollection, Global, succinct, Handlebars, ProductView) {

    'use strict';

    var ProductsView = Backbone.View.extend({

        el: '.sales',


        listen: function() {
            var self = this;
            var triggerPoint = 40; //40px from the bottom
            if (!self.isLoading && $(window).scrollTop() + $(window).height() + triggerPoint > this.getDocHeight()) {
                self.collection.page += 1; //load next page
                self.loadResults();
            }
        },


        getDocHeight: function() {
            var D = document;
            return Math.max(
                Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
                Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
                Math.max(D.body.clientHeight, D.documentElement.clientHeight)
            );
        },


        initialize: function() {
            _.bindAll(this, 'listen');
            $(window).on('scroll', this.listen);
            this.isLoading = false;

            if (Global.salesData) {
                this.collection = new ProductCollection(Global.salesData);
            }

            this.collection.bind("add", this.addProducts, this);
            this.render();
        },

        loadResults: function() {
            var view = this;
            this.isLoading = true;
            this.collection.fetch({
                success: function(models) {
                    view.addProducts(models);

                    view.isLoading = false;
                }
            });
        },


        addProducts: function(newModels) {
            var self = this;
            //console.log(newModels.toJSON());
            _.each(newModels.toJSON(), function(model) {

                var product = new ProductView({
                    model: model
                });
                product.render().$el.appendTo(self.$el);
            });
            return this;
        },


        render: function() {
            var self = this;
            this.collection.each(function(model, index, list) {
                var product = new ProductView({
                    model: model
                });
                product.render().$el.appendTo(self.$el);
            });
            return this;
        }

    });

    return ProductsView;
});