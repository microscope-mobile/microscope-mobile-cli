// Imports
var Form = require('microscope-console').Form;
var IonicForm = require('./IonicForm');
var FreeForm = require('./FreeForm');

/**
 * HomeForm class
 */
var HomeForm = Form.extend({

    banner: 'HOME',
    model: [{
        type: 'list',
        name: 'kind',
        message: 'Choose your kind starter kit !',
        choices: [
            { name: 'Ionic', value: 1 },
            { name: 'WinJS', value: 2 },
            { name: 'Free', value: 3 },
            { name: 'exit', value: 0 }
        ]
    }],

    response: function (answer) {
        switch (answer.kind) {
            case 1:
                new IonicForm();
                break;
            case 2:
                console.log('not implemented yet');
                break;
            case 3:
                new FreeForm();
                break;
        }
    }
});

module.exports = HomeForm;