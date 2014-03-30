var _ = require('underscore'),
    mongoskin = require('mongoskin'),
    config = require('../config/config.js'),
    n = 1,
    numProducts = 200,
    db = mongoskin.db(config.mongodb(), {
        safe: true
    });



var salesTpl = function(options) {

    var api = options.API;

    var html = ['<div class="small-12 large-3 columns">',
        '<span class="high label percentoff">' + discountPercent + '% off</span>',
        '<h5 class="truncate">' + options.name + '</h5>',
        '<img src="' + options.imageList.image[1].sourceURL + '" width="200" height="200" />',
        '<div class="caption">',
        '<div class="blur"></div>',
        '<div class="caption-text">',
        '<div class="prices"><span class="oldprice">$' + options.originalPrice.value + '</span>',
        '<span class="newprice">$' + options.basePrice.value + '</span></div>',
        '<div class="buy-recommend"',
        'data-id="' + options.id + '" data-url="' + options.offerURL + '" data-sku="' + options.sku + '" data-categoryid="' + options.categoryId + '" data-store="' + options.store.name + '" data-storeid="' + options.store.id + '"',
        'data-rating="' + options.store.ratingInfo.rating + '" data-reviewcount="' + options.store.ratingInfo.reviewCount + '">',
        '<a href ="' + options.offerURL + '" class="button small radius alert"> Buy </a>',
        ' <a href="/facebook" class="button small radius success ">Recommend</a>',
        '</div></div></div><a href="' + options.offerURL + '" class="retailer">' + options.store.name + '</a></div>'
    ].join('');

    return html;
};


var getData = function(res) {
    db.collection('offers_3_24_2014').find().sort({
        id: 1
    }).limit(500).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);

        var salesArray = [];

        for (var i = 0, len = result.length; i < len; i++) {
            var cachedItem = result[i];
            var item = salesTpl(cachedItem);
            salesArray.push(item);
        }


        // res.render('index', {
        //     data: salesArray.join(''),
        //     title: 'BoxedSales',
        //     server: serverConfig
        // });
    });
};



module.exports = function(app) {
    app.get('/', function(req, res, next) {
        getData(res);
    });
};
