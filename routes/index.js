var _ = require('underscore'),
    mongoskin = require('mongoskin'),
    db = mongoskin.db('mongodb://admin:admin123@ds033599.mongolab.com:33599/boxedsales', {
        safe: true
    });



var salesTpl = function(options) {
    var discount = (options.basePrice.value - options.originalPrice.value) / options.originalPrice.value;
    var discountPercent = discount * (-100);


    var html = ['<div class="small-12 large-3 columns">',
        '<span class="high label percentoff">' + discountPercent.toFixed() + '% off</span>',
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

module.exports = function(app) {
    app.get('/', function(req, res, next) {

        var url = 'http://sandbox.api.ebaycommercenetwork.com/publisher/3.0/json/GeneralSearch?&apiKey=20fd8adb-a2ce-4f0a-bc32-b813d0a96eb5&trackingId=8080337&keyword=' + keyword + '&visitorUserAgent&visitorIPAddress&showOnSaleOnly=true&numItems=120&showOffersOnly=true&pageNumber=' + n;

        superagent
            .get(url)
            .set('Accept', 'aaplication/json')
            .end(function(error, results) {
                if (error) next(error);
                var cleanData = JSON.parse(results.text);

                var salesArray = [];
                var data = cleanData.categories.category[0].items.item;

                for (var i = 0, len = data.length; i < len; i++) {
                    var cachedItem = data[i].offer;
                    var item = salesTpl(cachedItem);
                    salesArray.push(item);
                }

                var matchedItemCount = cleanData.categories.category[0].items.matchedItemCount;
                var returnedItemCount = cleanData.categories.category[0].items.returnedItemCount;
                var pageNumber = cleanData.categories.category[0].items.returnedItemCount.pageNumber;

                var serverConfig = {
                    matchedItemCount: matchedItemCount,
                    returnedItemCount: returnedItemCount,
                    pageNumber: pageNumber
                };


                res.render('index', {
                    data: salesArray.join(''),
                    title: 'BoxedSales',
                    server: serverConfig
                });
            });
    });
};