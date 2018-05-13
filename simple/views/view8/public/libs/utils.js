/**
 * Module dependencies
 */
module.exports =
{
	filter: filter,
    format: format,
	colorize: colorize
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

function colorize(color, params = {r: 0.299, g: 0.587, b: 0.114}) {
	color = (color.startsWith('#') ? color.substring(1) : color);
	let c = parseInt(color, 16);
    let r = (c & 0xFF0000) >> 16;
    let g = (c & 0x00FF00) >> 8;
    let b = (c & 0x0000FF);
    return (params.r * r + params.g * g + params.b * b);
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

// var fileInput = $('input[type=file]');
// var button = $('#upload');
// button.on('click', function() {
//     var files = fileInput.prop('files');
//     if(files.length == 0) {
//         alert('Please choose a file to upload!');
//         return false;
//     }
//     var fd = new FormData();
//     fd.append('file', files[0]);
//     $.ajax({
//         url: './assets/php/upload.php',
//         data: fd,
//         contentType:false,
//         processData:false,
//         type:'POST',
//         success: function(m){ console.log(m); }
//     });
// });

// var preloader = $('<div>',{ 'class':'preloader' }).appendTo('body');
// var doc = $(document);
// doc.ajaxStart(function(){ preloader.fadeIn(); });
// doc.ajaxComplete(function(){
//     preloader.delay(800).fadeOut();
// });

// function JSON_Reader(name) {
//     var d = new $.Deferred();
//     $.ajax({
//         url: '' + name + '.json',
//         dataType: 'json',
//         success: function(data){ d.resolve(data); },
//         error: function(){ d.reject(); }
//     });
//     return d.promise();
// }
// var one = new JSON_Reader('1');
// one.done(function(d){ console.log('Data received:', d); });
// one.fail(function(){ console.log('The file does not exist!'); });
