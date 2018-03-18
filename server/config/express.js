var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cors = require('cors');
var validator = require('express-validator');

global.rootRequire = function(name) {
  return require(__dirname + '/../' + name);//depends current directory
}

module.exports = function() {
    var app = express();

    app.use(cors());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(validator());

    load('routes', {cwd: 'app'})
      .then('infra')
      .into(app);

    return app;
}
