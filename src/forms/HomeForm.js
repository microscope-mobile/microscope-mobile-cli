// Imports
var Form = require('microscope-console').Form;
var IonicForm = require('./IonicForm');
var IonicLegacyForm = require('./IonicLegacyForm');
var FreeForm = require('./FreeForm');

/**
 * HomeForm class
 */
var HomeForm = Form.extend({

    banner: 'HOME',

    initialize: function () {
        this.model = [{
            type: 'list',
            name: 'kind',
            message: 'Choose your kind starter kit !',
            choices: [
                { name: 'NPM / Browserify ionic', value: 1 },
                { name: 'Official ionic starter-kit', value: 2 },
                { name: 'Free', value: 3 },
                { name: 'exit', value: 0 }
            ]
        }];

        this.render();
    },

    response: function (answer) {
        console.log('\n');

        switch (answer.kind) {
            case 1:
                new IonicForm()
                break;

            case 2:
                new IonicLegacyForm();
                break;
                
            case 3:
                new FreeForm();
                break;
        }

        console.log('\n');
    }
});

module.exports = HomeForm;