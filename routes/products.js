var _ = require('underscore'),
    superagent = require('superagent'),
    config = require('../config/config.js'),
    querystring = require('querystring'),
    url = 'http://api.shopstyle.com/api/v2/products?';


module.exports = function(app) {
    app.get('/products/:offset', function(req, res, next) {

        var buildQuery = querystring.stringify({
            pid: config.shopstyleKey(),
            //fts: req.query.fts || '',
            offset: req.params.offset,
            limit: 100,
            fl: 'd0'
        });

        buildQuery = url + buildQuery;
        superagent
            .get(buildQuery)
            .set('Accept', 'aplication/json')
            .end(function(error, results) {
                if (error) next(error);

                var cleanData = JSON.parse(results.text);
                res.send(cleanData.products);

            });

    });

};