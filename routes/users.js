var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {

  console.log('readdirSync start.');

  var data = fs.readdirSync('Y:/manwei.zeng/Accenture/Huang, Frimen Weiming - Photography/Photography/FY19_accenture_GZ_SZ_Annual_Party'); //./public/images'); 
  res.send(data);  

});

module.exports = router;
