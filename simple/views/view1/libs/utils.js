/**
 * Module dependencies
 */
module.exports =
{
	filter: filter
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
    Object.keys(obj)
          .filter( key => predicate(obj[key]))
          .reduce( (res, key) => (res[key] = obj[key], res), {} );
};