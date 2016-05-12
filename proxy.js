var path = require('path');
var argv = require('yargs')
  .string('config')
  .argv;
var hoxy = require('hoxy');
var port = argv.port || 5005;
var proxy = hoxy.createServer().listen(port);
var config = path.resolve(argv.config ? argv.config : '');

try {
  config = require(config);
} catch (err) {
  console.log('Please, specify valid path to config.json!');
  console.log(err);
  process.exit();
}

console.log('proxy started at ' + port.toString() + ' port');

if (Array.isArray(config)) {
  config.forEach(intercept);
} else {
  intercept(config);
}

function intercept(config) {
  return proxy.intercept({
    phase: config.phase,
    hostname: config.hostname,
    url: config.url
  }, function(req, resp, cycle) {
    console.log(req.fullUrl());
    return cycle.serve({
      strategy: config.strategy,
      docroot: config.docroot
    });
  });
}

module.exports = proxy;
