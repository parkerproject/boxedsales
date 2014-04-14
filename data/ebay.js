// future url will be amazon associate; https://github.com/livelycode/aws-lib

var superagent = require('superagent'),
    _ = require('underscore'),
    mongoskin = require('mongoskin'),
    config = require('../config/config.js'),
    db = mongoskin.db(config.mongodb(), {
        safe: true
    });

var numProducts = 200,
    key = config.key();

var handbags_wallets = 96668;
var shoes = 96602;
var clothing = 31515;


var discountCalc = function(options) {
    var discount = (options.basePrice.value - options.originalPrice.value) / options.originalPrice.value;
    var discountPercent = discount * (-100);
    return discountPercent.toFixed();
};

var productInsert = function(offer) {
    var today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth() + 1,
        day = today.getDate(),
        collection = 'offers_' + month + '_' + day + '_' + year;
    db.collection(collection).insert(offer, function(err, result) {
        if (err) throw err;
        // if (result) console.log('Added data!');
    });
};



var products = function(n, cat) {

    var url = 'http://sandbox.api.ebaycommercenetwork.com/publisher/3.0/json/GeneralSearch?&apiKey=' + key + '&trackingId=8080337&categoryId=' + cat + '&visitorUserAgent&visitorIPAddress&showOnSaleOnly=true&numItems=' + numProducts + '&showOffersOnly=true&pageNumber=' + n;

    console.log(cat + ' page ' + n + ' started');
    superagent
        .get(url)
        .set('Accept', 'aplication/json')
        .end(function(error, results) {
            if (error) next(error);
            var cleanData = JSON.parse(results.text);

            var data = cleanData.categories.category[0].items.item;
            var matchedItemCount = cleanData.categories.category[0].items.matchedItemCount;
            var pageNumber = cleanData.categories.category[0].items.pageNumber;


            for (var i = 0, len = data.length; i < len; i++) {
                var cachedItem = data[i].offer;
                cachedItem.discountPercent = discountCalc(cachedItem);
                cachedItem.API = 'ebay';
                cachedItem.matchedItemCount = matchedItemCount;
                cachedItem.pageNumber = pageNumber;
                productInsert(cachedItem);
            }

            console.log(cat + ' page ' + n + ' ended');

        });

};


var pages = function(category) {
    var url = 'http://sandbox.api.ebaycommercenetwork.com/publisher/3.0/json/GeneralSearch?&apiKey=' + key + '&trackingId=8080337&categoryId=' + category + '&visitorUserAgent&visitorIPAddress&showOnSaleOnly=true&numItems=' + numProducts + '&showOffersOnly=true&pageNumber=1';

    superagent
        .get(url)
        .set('Accept', 'aplication/json')
        .end(function(error, results) {
            if (error) next(error);
            var cleanData = JSON.parse(results.text);

            var matchedItemCount = cleanData.categories.category[0].items.matchedItemCount;
            var d = matchedItemCount / 200;
            var numberpages = Math.floor(d);

            for (var i = 1; i < numberpages; ++i) {
                products(i, category);

            }

        });

};

pages(clothing);
pages(shoes);
pages(handbags_wallets);