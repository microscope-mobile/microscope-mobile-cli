// Imports
var Form = require('microscope-console').Form;
var downloader = require('../services/downloader');
var path = require('path');

/**
 * FreeForm class
 */
var FreeForm = Form.extend({

    banner: 'FREE PROJECT',

    initialize: function () {
        this.model = [{
            type: 'input',
            name: 'project',
            message: 'Ok ! What is your project name ?'
        }, {
                type: 'input',
                name: 'url',
                message: 'Enter project template zip url !'
            }];

        this.render();
    },

    response: function (answer) {
        console.log('\n');
        var projectPath = path.join(process.cwd(), answer.project);

        downloader.fetchArchive(projectPath, answer.url).then(function () {
            console.log('download complete !!');
        });

        console.log('\n');
    }
});

module.exports = FreeForm;