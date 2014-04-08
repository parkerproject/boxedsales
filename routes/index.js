var _ = require('underscore'),
    superagent = require('superagent'),
    config = require('../config/config.js'),
    querystring = require('querystring'),
    url = 'http://sandbox.api.ebaycommercenetwork.com/publisher/3.0/json/GeneralSearch?';

var buildQuery = querystring.stringify({
    apiKey: config.key(),
    trackingId: 8080337,
    keyword: config.keywords(),
    numItems: 30,
    pageNumber: 1
});


buildQuery = url + buildQuery + '&visitorUserAgent&visitorIPAddress&showOnSaleOnly=true&showOffersOnly=true';


module.exports = function(app) {
    app.get('/', function(req, res, next) {
        superagent
            .get(buildQuery)
            .set('Accept', 'aplication/json')
            .end(function(error, results) {
                if (error) next(error);
                var cleanData = JSON.parse(results.text);

                res.render('index', {
                    title: 'BoxedSales',
                    data: JSON.stringify(cleanData)
                    //server: serverConfig
                });

            });
    });

};