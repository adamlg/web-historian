var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var stat = require('./http-helpers.js')
// require more modules/folders here!

var routes = {
  'GET': {},
  'POST': {},
  'OPTIONS': {}
}

var Router = {
  'get': function(path, cb) {
    routes['GET'][path] = cb
  },
  'post': function(path, cb) {
    routes['POST'][path] = cb
  },
  'options': function(path, cb) {
    routes['OPTIONS'][path] = cb
  }
}

Router.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  var file = fs.createReadStream('web/public/index.html')
  file.pipe(res)
})



Router.post('/', function(req, res) {
  var file = fs.createWriteStream(archive.paths.list, {'flags': 'a'})
  var body = ''
  req.on('data', function(chunk) {
    body += chunk
  })
  req.on('end', function() {
    file.end(JSON.parse(body).url + '\n')
    // file.end()
    res.writeHead(302, stat.headers)
    res.end()
    
  })

})

exports.handleRequest = function (req, res) {
  if(routes[req.method]){
    if(routes[req.method][req.url]){
      routes[req.method][req.url](req, res)
    } else {
      stat.serveAssets(res, req.url)
    }
  } else {
    res.writeHead(400)
    res.end()
  }
  //res.end(archive.paths.list);
};
