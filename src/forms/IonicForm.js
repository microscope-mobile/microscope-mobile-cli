// Imports
var path = require('path');
var Form = require('microscope-console').Form;
var fs = require('fs');
var ionicAppLib = require('ionic-app-lib');

var URLS = {
    blank: 'https://github.com/microscope-mobile/microscope-mobile-blank/archive/master.zip',
    sidemenu: 'https://github.com/microscope-mobile/microscope-mobile-sidemenu/archive/master.zip',
    tabs: 'https://github.com/microscope-mobile/microscope-mobile-tabs/archive/master.zip',
    maps : 'https://github.com/microscope-mobile/microscope-mobile-maps/archive/master.zip'
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
                { name: 'exit', value: 0 }
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
        var self = this;

        console.log('\n');
        var projectPath = path.join(process.cwd(), answer.solution);

        switch (answer.starter) {
            case 1:
                console.log('... downloading blank starter kit ...');
                ionicAppLib.utils.fetchArchive(projectPath, URLS.blank).then(function () {
                    fs.rename(projectPath + '/microscope-mobile-blank-master', projectPath + '/' + answer.project, function () {
                        console.log('download complete !!');
                    });
                });
                break;

            case 2:
                console.log('... downloading sidemenu starter kit ...');
                ionicAppLib.utils.fetchArchive(projectPath, URLS.sidemenu).then(function () {
                    fs.rename(projectPath + '/microscope-mobile-sidemenu-master', projectPath + '/' + answer.project, function () {
                        console.log('download complete !!');
                    });
                });
                break;

            case 3:
                console.log('... downloading tabs starter kit ...');
                ionicAppLib.utils.fetchArchive(projectPath, URLS.tabs).then(function () {
                    fs.rename(projectPath + '/microscope-mobile-tabs-master', projectPath + '/' + answer.project, function () {
                        console.log('download complete !!');
                    });
                });
                break;
                
            case 4:
                console.log('... downloading maps starter kit ...');
                ionicAppLib.utils.fetchArchive(projectPath, URLS.maps).then(function () {
                    fs.rename(projectPath + '/microscope-mobile-maps-master', projectPath + '/' + answer.project, function () {
                        console.log('download complete !!');
                    });
                });
                break;
        }

        console.log('\n');
    }
});

module.exports = IonicForm;