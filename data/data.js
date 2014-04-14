// future url will be amazon associate; https://github.com/livelycode/aws-lib

var superagent = require('superagent'),
    redis = require("redis"),
    client = redis.createClient(null, null, {
        detect_buffers: true
    });

client.set("foo_rand000000000000", "OK");

// This will return a JavaScript String
client.get("foo_rand000000000000", function(err, reply) {
    console.log(reply); // Will print `OK`
});



function process(n) {
    var url = 'http://sandbox.api.ebaycommercenetwork.com/publisher/3.0/json/GeneralSearch?&apiKey=20fd8adb-a2ce-4f0a-bc32-b813d0a96eb5&trackingId=8080337&keyword=' + keyword + '&visitorUserAgent&visitorIPAddress&showOnSaleOnly=true&numItems=200&showOffersOnly=true&pageNumber=' + n;

    superagent
        .get(url)
        .set('Accept', 'aaplication/json')
        .end(function(error, results) {
            if (error) next(error);
            insertData(n, results.text);
            console.log(n);
        });
}

function insertData(pageNum, data) {
    db.collection('sales').insert({
        page: pageNum,
        items: data
    }, function(err, result) {
        if (err) throw err;
        if (result) console.log('Added!');
    });
}

// process(1);
// process(2);
// process(3);
// process(4);
// process(5);
// process(6);