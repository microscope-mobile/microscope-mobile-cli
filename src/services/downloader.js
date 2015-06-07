var os = require('os');
var fs = require('fs');
var path = require('path');
var unzip = require('unzip');
var Q = require('q');
var Multibar = require('./multibar');

/**
 * fetchArchive
 * @param  {string} targetPath
 * @param  {string} archiveUrl
 * @return {promise}
 */
exports.fetchArchive = function (targetPath, archiveUrl) {

  var q = Q.defer();

  // The folder name the project will be downloaded and extracted to
  var message = ['Downloading:'.bold, archiveUrl].join(' ');
  events.emit('log', message);

  var tmpFolder = os.tmpdir();
  var tempZipFilePath = path.join(tmpFolder, 'ionic-starter-' + new Date().getTime() + '.zip');


  var unzipRepo = function unzipRepo(fileName) {
    var readStream = fs.createReadStream(fileName);
    readStream.on('error', function (err) {
      events.emit('verbose',('unzipRepo readStream: ' + err).error);
      q.reject(err);
    });

    var writeStream = unzip.Extract({ path: targetPath });
    writeStream.on('close', function () {
      q.resolve();
    });
    writeStream.on('error', function (err) {
      events.emit('verbose',('unzipRepo writeStream: ' + err).error);
      q.reject(err);
    });
    readStream.pipe(writeStream);
  };

  var proxy = process.env.PROXY || process.env.http_proxy || null;
  var request = require('request');
  request({ url: archiveUrl, rejectUnauthorized: false, encoding: null, proxy: proxy }, function (err, res, body) {
    if (err) {
      // console.error('Error fetching:'.error.bold, archiveUrl, err);
      q.reject(err);
      return;
    }
    if (!res) {
      console.error('Invalid response:'.error.bold, archiveUrl);
      q.reject('Unable to fetch response: ' + archiveUrl);
      return;
    }
    if (res.statusCode !== 200) {
      if (res.statusCode === 404 || res.statusCode === 406) {
        console.error('Not found:', archiveUrl, '(' + res.statusCode + ')');
        console.error('Please verify the url and try again.');
      } else {
        console.error('Invalid response status:', archiveUrl, '(' + res.statusCode + ')');
      }
      q.reject(res);
      return;
    }
    try {
      fs.writeFileSync(tempZipFilePath, body);
      unzipRepo(tempZipFilePath);
    } catch (e) {
      events.emit('verbose', 'fetchArchive request write: ' + e);
      q.reject(e);
    }
  }).on('response', function (res) {
    // var ProgressBar = require('progress');
    var bar = Multibar.newBar('[:bar]  :percent  :etas', {
      complete: '=',
      incomplete: ' ',
      width: 30,
      total: parseInt(res.headers['content-length'], 10)
    });

    res.on('data', function (chunk) {
      try {
        bar.tick(chunk.length);
      } catch (e) { }
    });
  });

  return q.promise;
}