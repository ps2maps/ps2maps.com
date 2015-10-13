var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var data = {
		title: 'This is a test of the Swig templating system!!!!'
	};
  res.render('index.html', data);
});

module.exports = router;
