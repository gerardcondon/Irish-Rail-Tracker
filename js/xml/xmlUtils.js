define([
    'jquery'
    ], function($){

    var getNodeText = function(xmlNode, keys) {
        var text;
        var keysLength = keys.length;
        for (var i=0; i<keysLength; ++i) {
            text = $(xmlNode).find(keys[i]).text();
            if (text && text !== '') {
                return text;
            }
        }
        return undefined;
    };

    return {
        getNodeText : getNodeText
    };
});
