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
router.get('/employees', customer.employees);
router.get('/national', customer.national);
router.get('/terminos', customer.terms);
router.get('/condiciones', customer.terms);
router.get('/politicadeprivacidadvango', customer.policy);

// service main page
router.get('/services', customer.services);

// service/legal page
router.get('/services/legal', function(req, res){
  res.render('customer/services/legal/index');
});
router.get('/services/legal/breakdown', function(req, res){
  res.render('customer/services/legal/breakdown');
});
router.get('/services/legal/legal', function(req, res){
  res.render('customer/services/legal/legal');
});
router.get('/services/legal/telephone', function(req, res){
  res.render('customer/services/legal/telephone');
});

// service/medical page
router.get('/services/medical', function(req, res){
  res.render('customer/services/medical/index');
});
router.get('/services/medical/ambulance', function(req, res){
  res.render('customer/services/medical/ambulance');
});
router.get('/services/medical/query', function(req, res){
  res.render('customer/services/medical/query');
});
router.get('/services/medical/consultancy', function(req, res){
  res.render('customer/services/medical/consultancy');
});
router.get('/services/medical/discount', function(req, res){
  res.render('customer/services/medical/discount');
});
router.get('/services/medical/reference', function(req, res){
  res.render('customer/services/medical/reference');
});

// service/roadside page
router.get('/services/roadside', function(req, res){
  res.render('customer/services/roadside/index');
});
router.get('/services/roadside/crane', function(req, res){
  res.render('customer/services/roadside/crane');
});
router.get('/services/roadside/driver', function(req, res){
  res.render('customer/services/roadside/driver');
});
router.get('/services/roadside/lock', function(req, res){
  res.render('customer/services/roadside/lock');
});
router.get('/services/roadside/pass', function(req, res){
  res.render('customer/services/roadside/pass');
});
router.get('/services/roadside/reference', function(req, res){
  res.render('customer/services/roadside/reference');
});
router.get('/services/roadside/supply', function(req, res){
  res.render('customer/services/roadside/supply');
});
router.get('/services/roadside/tire', function(req, res){
  res.render('customer/services/roadside/tire');
});
router.get('/services/roadside/warranty', function(req, res){
  res.render('customer/services/roadside/warranty');
});

// service/special page
router.get('/services/special', function(req, res){
  res.render('customer/services/special/index');
});
router.get('/services/special/admin', function(req, res){
  res.render('customer/services/special/admin');
});
router.get('/services/special/car', function(req, res){
  res.render('customer/services/special/car');
});
router.get('/services/special/message', function(req, res){
  res.render('customer/services/special/message');
});
router.get('/services/special/vehicle', function(req, res){
  res.render('customer/services/special/vehicle');
});

// service/travel page
router.get('/services/travel', function(req, res){
  res.render('customer/services/travel/index');
});
router.get('/services/travel/car', function(req, res){
  res.render('customer/services/travel/car');
});
router.get('/services/travel/hotel', function(req, res){
  res.render('customer/services/travel/hotel');
});
router.get('/services/travel/message', function(req, res){
  res.render('customer/services/travel/message');
});
router.get('/services/travel/personal', function(req, res){
  res.render('customer/services/travel/personal');
});
router.get('/services/travel/reference', function(req, res){
  res.render('customer/services/travel/reference');
});
router.get('/services/travel/transport', function(req, res){
  res.render('customer/services/travel/transport');
});

module.exports = router;
