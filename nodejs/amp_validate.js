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

// function amp_validate_parse_csv(csv_path) {
//     var fs = require('fs');
//     var input = fs.open(csv_path, function {
//         var parse = require('csv-parse/lib/sync');
//         return parse(input, {columns: true});
//     });
// };

// amp_validate_parse_csv('csv_sample.csv');


// SYNC APPROACH
// SAVE STD OUTPUT IN FILE
// PIPE APPROACH
// HANDLEBARS
// MONGOOSE
// EXPRESS
