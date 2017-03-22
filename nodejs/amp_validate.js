
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
            if (error.specUrl !== null) {
                msg += ' (see ' + error.specUrl + ')';
            }
            ((error.severity === 'ERROR') ? console.error : console.warn)(msg);
        }
    }
}

request("https://ampbyexample.com/", function (error, response, body) {
    if (!error) {
        amphtmlValidator.getInstance().then(amp_validate_body(body));
    } else {
        console.log(error);
    }
    return
});
