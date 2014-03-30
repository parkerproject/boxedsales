define([
    'backbone',
    'app/models/product-model'
], function(Backbone, Model) {
    'use strict';
    var Products = Backbone.Collection.extend({
        model: Model,

        parse: function(response) {
            return response.salesData.categories.category[0].items.item;
        }
    });

    return Products;
});