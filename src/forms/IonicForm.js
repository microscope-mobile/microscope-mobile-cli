// Imports
var path = require('path');
var Form = require('microscope-console').Form;
var fs = require('fs');
var ionicAppLib = require('ionic-app-lib');

var URLS = {
    blank: 'https://github.com/microscope-mobile/microscope-mobile-blank/archive/master.zip',
    sidemenu: 'https://github.com/microscope-mobile/microscope-mobile-sidemenu/archive/master.zip',
    tabs: 'https://github.com/microscope-mobile/microscope-mobile-tabs/archive/master.zip',
    maps: 'https://github.com/microscope-mobile/microscope-mobile-maps/archive/master.zip',
    firebase: 'https://github.com/microscope-mobile/microscope-mobile-firebase/archive/master.zip'
};

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
                { name: 'blank', value: 1 },
                { name: 'sidemenu', value: 2 },
                { name: 'tabs', value: 3 },
                { name: 'maps', value: 4 },
                { name: 'firebase', value: 5 }
            ]
        }, {
                type: 'input',
                name: 'solution',
                message: 'Ok ! What is your solution name ?'
            }, {
                type: 'input',
                name: 'project',
                message: 'Ok ! What is your project name ?'
            }];

        this.render();
    },

    response: function (answer) {
        console.log('\n');

        var projectPath = path.join(process.cwd(), answer.solution);
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

        this.download(name, answer.project, projectPath, url);

        console.log('\n');
    },
    
    /**
     * download zip
     */
    download: function (templateName, projectName, projectPath, url) {
        console.log('... downloading ' + templateName + ' starter kit ...');
        ionicAppLib.utils.fetchArchive(projectPath, url).then(function () {
            fs.rename(projectPath + '/microscope-mobile-' + templateName + '-master', projectPath + '/' + projectName, function () {
                console.log('download complete !!');
            });
        });
    }
});

module.exports = IonicForm;