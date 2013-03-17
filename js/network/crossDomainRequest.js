define([
    'jquery'
    ], function($){

    // Accepts a url and a callback function to run.
    var execCrossDomainRequest = function(site, callback) {
        // If no url was passed, exit.
        if (!site) {
            alert('No site was passed.');
            return false;
        }

        // Take the provided url, and add it to a YQL query. Make sure you encode it!

        var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + site + '"') + '&format=xml&callback=?';


        executeQuery(yql, site, callback);
    };

    var executeQuery = function(yql, site, callback) {
        // Request that YSQL string, and run a callback function.
        // Pass a defined function to prevent cache-busting.
        $.getJSON(yql, cbFunc);

        function cbFunc(data) {
            // If we have something to work with...
            if (data.results[0]) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            }
            // Else, Maybe we requested a site that doesn't exist, and nothing returned.
            else {
                executeQuery(yql, site, callback);
            }
        }
    };

    return {
        exec : execCrossDomainRequest
    };
});
