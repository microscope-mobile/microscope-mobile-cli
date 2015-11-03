// Imports
var path = require('path');
var Form = require('microscope-console').Form;
var URLS = require('../project.json');
var download = require('../services/downloader').download;
var jeditor = require("gulp-json-editor");
var xeditor = require("gulp-xml-editor");

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
                url = URLS.ionic_blank;
                break;

            case 2:
                name = 'sidemenu';
                url = URLS.ionic_sidemenu;
                break;

            case 3:
                name = 'tabs';
                url = URLS.ionic_tabs;
                break;

            case 4:
                name = 'maps';
                url = URLS.ionic_maps;
                break;
                
            case 5:
                name = 'firebase';
                url = URLS.ionic_firebase;
                break;
        }
        
        var self = this;
        var projectPath = path.join(process.cwd(), answer.project);
        download(url, projectPath, function () {
            //set name in package.json
            self.src('./'+answer.project+'/package.json')
              .pipe(jeditor({
                'name': answer.project
              }))
              .pipe(self.dest("./"+ answer.project));
            //set name in ionic.project
            self.src('./'+answer.project+'/ionic.project')
              .pipe(jeditor({
                'name': answer.project
              }))
              .pipe(self.dest("./"+ answer.project));        
             //set name in config.xml (cordova)
             self.src('./'+answer.project+'/config.xml')
             .pipe(xeditor([
                {path: '//xmlns:name', text: answer.project},
                {path: '//xmlns:widget', attr: {'id': 'com.'+answer.project}}
            ], 'http://www.w3.org/ns/widgets'))
                .pipe(self.dest("./"+ answer.project));
 
            console.log('download completed');
        });
    }
});

module.exports = IonicForm;