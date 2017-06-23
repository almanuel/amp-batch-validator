'use strict';
var amphtmlValidator = require('amphtml-validator');
var request = require("request");

function validateBody(url, body) {
    return function (validator) {
        console.log('\n' + url);
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

function validateUrl(url) {
    request(url, function (error, response, body) {
        if (!error) {
            var ampValidation = amphtmlValidator.getInstance().then(validateBody(url, body));
        } else {
            console.log(error);
        }
        return
    });
};

function validateCsv(csvPath, baseUrl) {
    var fs = require('fs');
    var parse = require('csv-parse');
    var parser = parse({delimiter: ','}, function(err, data) {
        data.forEach(function(element, index) {
            if (index > 0) {
                var url;
                if (baseUrl) {
                    var url = baseUrl + '/' + element[0].split('/').slice(3).join('/');
                }
                else {
                    url = element[0];
                }
                validateUrl(url);
            }
        }, this);
    });

    fs.createReadStream(csvPath).pipe(parser);
}


if (process.argv.length > 2 ) {
    var csvPath = process.argv[2];
    if (process.argv[3]) {
        var baseUrl = process.argv[3];
        validateCsv(csvPath, baseUrl);
    }
    else {
        validateCsv(csvPath);
    }
}
else {
    console.log('Invalid parameters.');
}
