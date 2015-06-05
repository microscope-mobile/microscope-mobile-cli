// Imports
var path       = require('path');
var Form       = require('microscope-console').Form;

/**
 * IonicForm class
 */
var IonicForm = Form.extend({

    banner: 'IONIC NPM workflow',

    initialize: function () {
        this.model = [{
            type: 'list',
            name: 'starter',
            message: 'Choose your mobile starter kit !',
            choices: [ 
                {name: 'blank', value: 1 },
                {name: 'sidemenu', value: 2 },
                {name: 'exit', value: 0 }
            ]
        },{
            type: 'input',
            name: 'project',
            message: 'Ok ! What is your project name ?'
        }];

        this.render();
    },

    response: function (answer) {
        console.log('\n');
        var projectPath = path.join(process.cwd(), answer.project);

        switch(answer.starter){
            case 1:
                console.log('... downloading Angular starter kit ...');
            break;

            case 2:
                console.log('... downloading Backbone-React starter kit ...');
            break;
        }

        console.log('\n');
    }
});

module.exports = IonicForm;