// imports
var program = require('commander');
var path = require('path');
var _ = require('lodash');
var HomeForm = require('./forms/HomeForm');
var download = require('./services/downloader').download;
var URLS = require('./project.json');

// ionic project command
program
	.command('ionic <project> <name>')
	.description('Ionic templates')
	.action(function (project, name) {
		var projectPath = path.join(process.cwd(), name);
		var url = _.get(URLS, 'ionic_'+project);
		
		if(!url) {
			console.log('no project template ' + project);
			return;
		}
		
		download(url, projectPath, function () {
			console.log('download completed');
		});
});

// winjs project command
program
	.command('winjs <project> <name>')
	.description('WinJS templates')
	.action(function (project, name) {
		var projectPath = path.join(process.cwd(), name);
		var url = _.get(URLS, 'winjs_'+project);
		
		if(!url) {
			console.log('no project template ' + project);
			return;
		}
		
		download(url, projectPath, function () {
			console.log('download completed');
		});
});

// free project command
program
	.command('free <url> <name>')
	.description('download github project from url')
	.action(function (url, name) {
		var projectPath = path.join(process.cwd(), name);
		download(url, projectPath, function () {
			console.log('download completed');
		});
});

// tool command
program
	.command('tool')
	.description('display template prompt')
	.action(renderForm);

if (!process.argv.slice(2).length) {
	renderForm();
}

program.parse(process.argv);

/**
 * render inquirer form
 */
function renderForm() {
	var logo = [
		'\n',
		'=================================\n',
		'        MICROSCOPE-MOBILE        \n',
		'                                 \n',
		'     mobile project generator    \n',
		'================================='
	].join('');
	console.log(logo);
	
	// run repository form
	new HomeForm();
}