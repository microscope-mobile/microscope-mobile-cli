// Imports
var path = require('path');
var Form = require('microscope-console').Form;
var URLS = require('../project.json');
var download = require('../services/downloader').download;
var jeditor = require("gulp-json-editor");

/**
 * WinjsForm class
 */
var WinjsForm = Form.extend({

    banner: 'WinJS framework',
    model: [{
        type: 'list',
        name: 'starter',
        message: 'Choose your mobile starter kit !',
        choices: [
            { name: 'navbar', value: 1 }
        ]},{
            type: 'input',
            name: 'project',
            message: 'Ok ! What is your project name ?'
    }],

    response: function (answer) {
        var name = '';
        var url = '';

        switch (answer.starter) {
            case 1:
                name = 'navbar';
                url = URLS.winjs_navbar;
                break;
        }
        
        var self = this;
        var projectPath = path.join(process.cwd(), answer.project);
        download(url, projectPath, function () {
            self.src('./'+answer.project+'/package.json')
              .pipe(jeditor({
                'name': answer.project
              }))
              .pipe(self.dest("./"+ answer.project));
            console.log('download completed');
        });
    }
});

module.exports = WinjsForm;