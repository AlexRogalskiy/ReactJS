/**
 * Module dependencies
 */
module.exports =
{
	filter: filter,
    format: format
};

function filter(obj, predicate) {
    var result = {}, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
            result[key] = obj[key];
        }
    }
    return result;
};

function filter2(obj, predicate) {
    return Object.keys(obj)
          .filter( key => predicate(obj[key]))
          .reduce( (res, key) => (res[key] = obj[key], res), {} );
};

function format() {
     var args = arguments;
     return this.replace(/{(\d+)}/g, function(match, number) { 
         return typeof args[number] != 'undefined'
            ? args[number]
            : match;
    });
};

function format2(format) {
     var args = Array.prototype.slice.call(arguments, 1);
     return format.replace(/{(\d+)}/g, function(match, number) { 
         return typeof args[number] != 'undefined'
            ? args[number] 
            : match;
     });
};

function humanize(size) {
    if(size < 0) return;
    var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    var ord = Math.floor(Math.log(size) / Math.log(1024));
    ord = Math.min( Math.max(0, ord), units.length - 1);
    var s = Math.round((size / Math.pow(1024, ord)) * 100) / 100;
    return s + ' ' + units[ord];
};

// $('a.fetchSize').each(function() {
//     $.ajax({
//         type: 'HEAD',
//         url: link.href,
//         complete: function(xhr) {
//             var size = humanize(xhr.getResponseHeader('Content-Length'));
//             $(link).append('(' + size + ')');
//         }
//     });
// });
