define([
    'backbone',
    'app/models/product-model'
], function(Backbone, Model) {
    'use strict';
    var Products = Backbone.Collection.extend({
        model: Model,

        url: function() {
            return '/products/' + this.page
        },

        page: 1
    });

    return Products;
});