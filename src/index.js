#!/usr/bin/env node

var HomeForm = require('./forms/HomeForm');

var logo = [
	'\n',
	'=================================\n',
	'        MICROSCOPE-MOBILE        \n',
	'                                 \n',
	'    awesome mobile generator     \n',
	'================================='
].join('');
console.log(logo);

// run repository form
new HomeForm();