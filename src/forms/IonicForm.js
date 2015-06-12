// Imports
var path = require('path');
var Form = require('microscope-console').Form;
var URLS = require('../project.json');
var download = require('../services/downloader').download;
var jeditor = require("gulp-json-editor");

/**
 * IonicForm class
 */
var IonicForm = Form.extend({

    banner: 'Ionic framework',
    model: [{
        type: 'list',
        name: 'starter',
        message: 'Choose your mobile starter kit !',
        choices: [
            { name: 'blank', value: 1 },
            { name: 'sidemenu', value: 2 },
            { name: 'tabs', value: 3 },
            { name: 'maps', value: 4 },
            { name: 'firebase', value: 5 }
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
                name = 'blank';
                url = URLS.blank;
                break;

            case 2:
                name = 'sidemenu';
                url = URLS.sidemenu;
                break;

            case 3:
                name = 'tabs';
                url = URLS.tabs;
                break;

            case 4:
                name = 'maps';
                url = URLS.maps;
                break;
                
            case 5:
                name = 'firebase';
                url = URLS.firebase;
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

module.exports = IonicForm;