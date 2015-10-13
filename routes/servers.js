var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('all servers');
});

router.get('/:servername', function(req, res, next) {
	res.send('server ' + req.params.servername);
})

module.exports = router;
