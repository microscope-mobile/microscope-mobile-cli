#!/usr/bin/env node

var program = require('commander');
var HomeForm = require('./forms/HomeForm');

program
	.command('ionic <project> <name>')
	.description('microscope-mobile ionic templates')
	.action(function(project, name){
		console.log("\n microscope-mobile ionic not implemented yet");
	});
  
program
	.command('winjs <project> <name>')
	.description('WinJS templates')
	.action(function(project, name){
		console.log("\n WinJS not implemented yet");
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