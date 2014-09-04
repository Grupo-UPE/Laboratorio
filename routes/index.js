var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    console.log("ACA TA")
    var file=__dirname + "/web/home.html";
    console.log(file);
  res.sendfile(file);
});

module.exports = router;
