var express = require('express');
var router = express.Router();
var customer = require('../controller/customer');

/* GET home page. */
router.get('/', function(req, res){
  res.redirect('/home');
})
router.get('/home', customer.home);
router.get('/faq', customer.faq);
router.get('/giveback', customer.giveback);
router.get('/claims', customer.claims);
router.get('/services', customer.services);

module.exports = router;
