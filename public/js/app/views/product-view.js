define([
    'jquery',
    'underscore',
    'backbone',
    'app/models/product-model',
    'text!app/templates/product.html',
    'succinct',
    'handlebars'
], function($, _, Backbone, Model, Template, succinct, Handlebars) {

    'use strict';


    var ProductView = Backbone.View.extend({

        model: new Model,

        className: "item",

        template: Handlebars.compile(Template),

        events: {
            'click .js-buy': 'buyPage'
        },

        buyPage: function(e) {
            e.preventDefault();
            var href = e.target.href;
            var new_window = window.open(href, 'buyurl', 'scrollbars=no,width=' + screen.width + ',height=' + screen.height + ',left=0,top=0');
            new_window.addEventListener('load', function() {
                alert("loaded")
            }, false);
            // new_window.onload = function() {
            //     alert("load event detected!");
            //     var div = win.document.createElement('div');
            //     div.innerHTML = 'Welcome into the future!';
            //     div.style.fontSize = '30px';
            //     new_window.document.body.insertBefore(div, win.document.body.firstChild);
            // }
            // if (window.focus) {
            //     newwindow.focus()
            // }
            return false;
        },

        initialize: function() {

            //this.listenTo(this.model, "change", this.render);
            this.render();
        },

        render: function() {
            this.helper();
            console.log(this.model);
            var markup = this.template(this.model.toJSON());
            this.$el.html(markup);
            this.truncate();
            return this;
        },

        truncate: function() {
            $('.truncate').succinct({
                size: 48
            });
        },

        helper: function() {
            Handlebars.registerHelper('salespercent', function() {
                return new Handlebars.SafeString(
                    ((this.salePrice - this.price) / (this.price) * (100 * (-1))).toFixed()
                );
            });
        },

    });

    return ProductView;
});