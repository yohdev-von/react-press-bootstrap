var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/express', function(req, res, next) {
  res.render('index', { title: 'Cool, huh!', condition: true, anyArray: [1,2,3] });
});

router.get('/test/:id', function(req, res, next) {
  res.render('test', {output: req.params.id});
});


module.exports = router;