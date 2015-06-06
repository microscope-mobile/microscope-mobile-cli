// Imports
var path       = require('path');
var Form       = require('microscope-console').Form;
var ionicAppLib = require('ionic-app-lib');
var start = ionicAppLib.start;

/**
 * IonicForm class
 */
var IonicLegacyForm = Form.extend({

    banner: 'OFFICIAL IONIC PROJECT TEMPLATES',

    initialize: function () {
        this.model = [{
            type: 'list',
            name: 'starter',
            message: 'Choose your mobile starter kit !',
            choices: [ 'blank', 'tabs', 'sidemenu', 'maps', 'salesforce', 'tests', 'complex-list']
        },{
            type: 'input',
            name: 'package',
            message: 'Ok ! What is your package name ? (com.contoso.mobile)'
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

        var options = { 
          appDirectory: 'IonicApp',
          appName: answer.project,
          packageName: answer.package,
          isCordovaProject: true,
          template: answer.starter,
          targetPath: projectPath
        };

        start.startApp(options);

        console.log('\n');
    }
});

module.exports = IonicLegacyForm;