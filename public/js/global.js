define([
    'config',
    'underscore'
], function(config, _) {

    var globals = {};
    _.extend(globals, config);
    return globals;

});