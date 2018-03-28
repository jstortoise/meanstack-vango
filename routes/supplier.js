var express = require('express');
var router = express.Router();
var passport = require('passport');

var ISupplier = require('../controller/supplier/isupplier');
var ESupplier = require('../controller/supplier/esupplier');
/* GET home page. */
router.get('/', function(req, res){
  res.render('supplier/login');
})

//User LogIn
router.post('/login', passport.authenticate('user-login', {
  successRedirect : '/supplier/dashboard',
  failureRedirect : '/supplier',
  failureFlash: true
}));

router.get('/dashboard', function(req, res){
  if(req.user.role == 'isupplier')
    res.redirect('/supplier/isupplier/dashboard');
  else if(req.user.role == 'esupplier')
    res.redirect('/supplier/esupplier/dashboard');
});
//Internal Supplier
router.get('/isupplier/dashboard', isLoggedIn, isISupplier, ISupplier.dashboard);
router.get('/isupplier/profile', isLoggedIn, isISupplier, ISupplier.profile);
router.get('/isupplier/coverage', isLoggedIn, isISupplier, ISupplier.coverage);
router.get('/isupplier/location', isLoggedIn, isISupplier, ISupplier.location);
//External Supplier
router.get('/esupplier/dashboard', isLoggedIn, isESupplier, ESupplier.dashboard);
router.get('/esupplier/negotiation', isLoggedIn, isESupplier, ESupplier.negotiation);
router.get('/esupplier/supplier', isLoggedIn, isESupplier, ESupplier.supplier);
router.get('/esupplier/document', isLoggedIn, isESupplier, ESupplier.document);
router.get('/esupplier/location', isLoggedIn, isESupplier, ESupplier.location);
router.get('/esupplier/package_1/:id', isLoggedIn, isESupplier, ESupplier.package_1);
router.get('/esupplier/package_2/:id', isLoggedIn, isESupplier, ESupplier.package_2);
//User Log out
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
})
//Middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  else{
      res.redirect('/supplier');
  }
}
function isISupplier(req, res, next){
  if(req.user.role == 'isupplier'){
    return next();
  }else{
    res.redirect('/supplier');
  }
}
function isESupplier(req, res, next){
  if(req.user.role == 'esupplier'){
    return next();
  }else{
    res.redirect('/supplier');
  }
}
module.exports = router;