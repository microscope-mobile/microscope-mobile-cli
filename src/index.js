// imports
var program = require('commander');
var path = require('path');
var HomeForm = require('./forms/HomeForm');
var download = require('./services/downloader').download;

program
	.command('Ionic <project> <name>')
	.description('ionic templates')
	.action(function(project, name){
		console.log("\n ionic not implemented yet");
	});
  
program
	.command('WinJS <project> <name>')
	.description('WinJS templates')
	.action(function(project, name){
		console.log("\n WinJS not implemented yet");
	});

program
	.command('free <url> <name>')
	.description('download github project from url')
	.action(function (url, name) {
		var projectPath = path.join(process.cwd(), name);
		download(url, projectPath, function () {
			console.log('download completed');
		});
	});
	
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