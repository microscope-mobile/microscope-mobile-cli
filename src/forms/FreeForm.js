// Imports
var Form = require('microscope-console').Form;
var path = require('path');
var download = require('../services/downloader').download;

/**
 * FreeForm class
 */
var FreeForm = Form.extend({

    banner: 'FREE PROJECT',
    model: [{
            type: 'input',
            name: 'project',
            message: 'Ok ! What is your project name ?'
        },{
            type: 'input',
            name: 'url',
            message: 'Enter project template zip url !'
    }],

    response: function (answer) {
        console.log('\n');
        
        var projectPath = path.join(process.cwd(), answer.project);
        download(answer.url, projectPath, function () {
            console.log('download complete !!');
        });
    }
});

module.exports = FreeForm;