var argv = require('yargs').argv;
var hoxy = require('hoxy');
var port = argv.port || 5005;
var proxy = hoxy.createServer().listen(port);
var config;

try {
  config = require(argv.config);
} catch (err) {
  console.error('Please, specify path to config.json!');
  throw err;
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
