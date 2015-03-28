var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {throw err}
    var urlsArray = data.toString().split('\n')
    cb(urlsArray)
  })



};

exports.isUrlInList = function(url, cb){

  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {throw err}
    var urlsArray = data.toString().split('\n')

    cb(urlsArray.indexOf(url) !== -1)
  })

};

exports.addUrlToList = function(string, cb){
  fs.writeFile(exports.paths.list, string + '\n', {flags: 'a'}, function(err){
    if(err) throw err
    cb()
    
  })
};

exports.isUrlArchived = function(){
};

exports.downloadUrls = function(){
};
