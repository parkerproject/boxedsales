var _ = require('underscore'),
    mongoskin = require('mongoskin'),
    config = require('../config/config.js'),
    n = 1,
    numProducts = 200,
    db = mongoskin.db(config.mongodb(), {
        safe: true
    });



var salesTpl = function(options) {

    var api = options.API,
        image, originalPrice, salesPrice, offerUrl, categoryId, stockStatus;
    // if (api === 'shopstyle') {
    //     image = options.image.sizes.Large.url;
    //     originalPrice = options.price;
    //     salesPrice = options.salesPrice;
    //     offerURL = options.clickUrl;
    //     categoryId = options.categories.id;
    //     retailer = options.retailer.name;
    //     stockStatus = options.inStock;
    // }

    if (api === 'ebay') {
        image = options.imageList.image[1].sourceURL;
        salesPrice = options.basePrice.value;
        originalPrice = options.originalPrice.value;
        offerURL = options.offerURL;
        categoryId = options.categoryId;
        retailer = options.store.name;

        if (options.stockStatus == "in-stock") {
            stockStatus = true;
        } else {
            stockStatus = false;
        }

    }

    var html = ['<div class="small-12 large-3 columns">',
        '<span class="high label percentoff">' + options.discountPercent + '% off</span>',
        '<h5 class="truncate">' + options.name + '</h5>',
        '<img src="' + image + '"/>',
        '<div class="caption">',
        '<div class="blur"></div>',
        '<div class="caption-text">',
        '<div class="prices"><span class="oldprice">$' + originalPrice + '</span>',
        '<span class="newprice">$' + salesPrice + '</span></div>',
        '<div class="buy-recommend"',
        'data-id="' + options.id + '" data-url="' + offerURL + '" data-categoryid="' + categoryId + '" data-store="' + retailer + '">',
        '<a href ="' + offerURL + '" class="button small radius alert"> Buy </a>',
        ' <a href="/facebook" class="button small radius success ">Recommend</a>',
        '</div></div></div><a href="' + offerURL + '" class="retailer">' + retailer + '</a></div>'
    ].join('');

    return html;
};



module.exports = function(app) {
    app.get('/', function(req, res, next) {

        var today = new Date(),
            year = today.getFullYear(),
            month = today.getMonth() + 1,
            day = today.getDate(),
            collection = 'offers_' + month + '_' + day + '_' + year;

        db.collection(collection).find({
            pageNumber: 1
        }).sort({
            id: 1
        }).limit(800).toArray(function(err, result) {
            if (err) throw err;

            //_.shuffle(result);

            var salesArray = [];

            for (var i = 0, len = result.length; i < len; i++) {
                var cachedItem = result[i];
                var item = salesTpl(cachedItem);
                salesArray.push(item);
            }

            res.render('index', {
                data: salesArray.join(''),
                title: 'BoxedSales',
                test: JSON.stringify(result)
                //server: serverConfig
            });

        });

    });
};