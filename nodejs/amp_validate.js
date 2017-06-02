'use strict';
var amphtmlValidator = require('amphtml-validator');
var request = require("request");

function amp_validate_body(body) {
    return function (validator) {
        var result = validator.validateString(body);
        ((result.status === 'PASS') ? console.log : console.error)(result.status);
        for (var ii = 0; ii < result.errors.length; ii++) {
            var error = result.errors[ii];
            var msg = 'line ' + error.line + ', col ' + error.col + ': ' + error.message;
            if (error.specUrl) {
                msg += ' (see ' + error.specUrl + ')';
            }
            ((error.severity === 'ERROR') ? console.error : console.warn)(msg);
        }
    }
};

function amp_validate_url(url) {
    request(url, function (error, response, body) {
        if (!error) {
            amphtmlValidator.getInstance().then(amp_validate_body(body));
        } else {
            console.log(error);
        }
        return
    });
};

function amp_validate_parse_csvfile(csv_path, base_url) {
    var fs = require('fs');
    var parse = require('csv-parse');
    var parser = parse({delimiter: ','}, function(err, data) {
        data.forEach(function(element, index) {
            if (index > 0) {
                var url;
                if (base_url) {
                    var url = base_url + '/' + element[0].split('/').slice(3).join('/');
                }
                else {
                    url = element[0];
                }
                amp_validate_url(url);
            }
        }, this);
    });

    fs.createReadStream(csv_path).pipe(parser);
}


if (process.argv.length > 2 ) {
    var csv_path = process.argv[2];
    if (process.argv[3]) {
        var base_url = process.argv[3];
        amp_validate_parse_csvfile(csv_path, base_url);
    }
    else {
        amp_validate_parse_csvfile(csv_path);
    }
}
else {
    console.log('Invalid parameters.');
}
