var ghdownload = require('github-download');

/**
 * download github src
 */
exports.download = function (url, dir, callback) {
	ghdownload(url, dir)
		.on('dir', function(e) {
		  console.log(e);
		})
		.on('file', function(e) {
		  console.log(e);
		})
		.on('zip', function(e) {
		  console.log(e);
		})
		.on('error', function(err) {
		  console.error(err);
		})
		.on('end', callback);
};