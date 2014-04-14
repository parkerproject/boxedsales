// future url will be amazon associate; https://github.com/livelycode/aws-lib

var superagent = require('superagent'),
    _ = require('underscore'),
    mongoskin = require('mongoskin'),
    aws = require("aws-lib"),
    prodAdv = aws.createProdAdvClient('1WZZKSPE50F5V4WSPCG2', 'UbFPwKVpGuxkdsj43O0+UM3BonLOZqfipK8NR2n1', 'theopenshopco-20'),
    db = mongoskin.db('mongodb://admin:admin123@ds033599.mongolab.com:33599/boxedsales', {
        safe: true
    });



var discountCalc = function(options) {
    var discount = (options.salePrice - options.price) / options.price;
    var discountPercent = discount * (-100);
    return discountPercent.toFixed();
};

var productInsert = function(offer) {
    var today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth() + 1,
        day = today.getDate(),
        collection = 'shopstyle_' + month + '_' + day + '_' + year;
    db.collection(collection).insert(offer, function(err, result) {
        if (err) throw err;
        if (result) console.log('Added data!');
    });
};



// var products = function(offset) {

//     var url = 'http://api.shopstyle.com/api/v2/products?pid=' + key + '&fl=d0&offset=' + offset + '&limit=100';
//     superagent
//         .get(url)
//         .set('Accept', 'aplication/json')
//         .end(function(error, results) {
//             if (error) next(error);
//             var cleanData = JSON.parse(results.text);

//             //console.log(cleanData.metadata.total);

//             // var salesArray = [];
//             var data = cleanData.products;
//             var matchedItemCount = cleanData.metadata.total;
//             var pageNumber = cleanData.metadata.offset;

//             var serverConfig = {
//                 matchedItemCount: matchedItemCount,
//                 pageNumber: pageNumber
//             };

//             for (var i = 0, len = data.length; i < len; i++) {
//                 var cachedItem = data[i];
//                 cachedItem.discountPercent = discountCalc(cachedItem);
//                 cachedItem.API = 'shopstyle';
//                 cachedItem.serverConfig = serverConfig;
//                 productInsert(cachedItem);
//             }

//         });

// };


// for (var i = 0; i < 100; ++i) {
//     products(i);
// }
//
//
var options = {
    SearchIndex: "Apparel",
    Keywords: "women",
    ItemPage: 4
};

prodAdv.call("ItemSearch", options, function(err, result) {
    if (err) console.log(err);
    console.log(result.Items);
});

//products();