var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var login = require('../controller/admin/login');
var dashboard = require('../controller/admin/dashboard');
var employee = require('../controller/admin/employee');
var supplier = require('../controller/admin/supplier');
var location = require('../controller/admin/location');
var customer = require('../controller/admin/customer');

/* GET home page. */
router.get('/', login.login);

//User LogIn
router.post('/login', passport.authenticate('user-login', {
    successRedirect : '/admin/dashboard',
    failureRedirect : '/admin',
    failureFlash: true
}));

router.get('/dashboard', isLoggedIn, dashboard.dashboard);
router.get('/admin/all', isLoggedIn, employee.employee_all);
router.get('/admin/admin', isLoggedIn, employee.employee_admin);
router.get('/admin/sales_agent', isLoggedIn, employee.employee_sales_agent);
router.get('/admin/new', isLoggedIn, employee.employee_new);
router.get('/admin/profile', isLoggedIn, employee.employee_profile);

router.get('/customer/dashboard', isLoggedIn, customer.customer_dashboard);
router.get('/customer/all', isLoggedIn, customer.customer_all);
router.get('/customer/active', isLoggedIn, customer.customer_active);
router.get('/customer/inactive', isLoggedIn, customer.customer_inactive);
router.get('/customer/profile', isLoggedIn, customer.customer_profile);



router.get('/supplier/dashboard', isLoggedIn, supplier.supplier_dashboard);
//pane view of internal supplier
router.get('/supplier/internal_list', isLoggedIn, supplier.supplier_internal_list);
//list view of internal supplier
router.get('/supplier/internal_list_table', isLoggedIn, supplier.supplier_internal_list_table);

router.get('/supplier/external_list', isLoggedIn, supplier.supplier_external_list);
router.get('/supplier/external_list_table', isLoggedIn, supplier.supplier_external_list_table);

router.get('/supplier/new', isLoggedIn, supplier.supplier_new);
//new internal supplier insert
router.post('/supplier/new_internal_supplier', isLoggedIn, supplier.new_internal_supplier)
router.post('/supplier/new_external_supplier', isLoggedIn, supplier.new_external_supplier)

//Profile View
router.get('/supplier/internal/profile/:id/about', isLoggedIn, supplier.internal_profile_about);
router.get('/supplier/internal/profile/:id/coverage', isLoggedIn, supplier.internal_profile_coverage);
router.get('/supplier/internal/profile/:id/location', isLoggedIn, supplier.internal_profile_location);

router.get('/supplier/external/profile/:id/about', isLoggedIn, supplier.external_profile_about);
router.get('/supplier/external/profile/:id/document', isLoggedIn, supplier.external_profile_document);
router.get('/supplier/external/profile/:id/location', isLoggedIn, supplier.external_profile_location);

//Delete Supplier
router.get('/supplier/internal/delete/:id', isLoggedIn, supplier.internal_delete);
router.get('/supplier/external/delete/:id', isLoggedIn, supplier.external_delete);
//Package for external supplier
router.get('/supplier/external/:id/portal', isLoggedIn, supplier.external_portal);
router.get('/supplier/external/:id/new_package_1', isLoggedIn, supplier.external_new_package_1);
router.post('/supplier/external/add_new_package_1', isLoggedIn, supplier.external_add_new_package_1);
router.get('/supplier/external/:id/new_package_2', isLoggedIn, supplier.external_new_package_2);
router.post('/supplier/external/add_new_package_2', isLoggedIn, supplier.external_add_new_package_2);
router.get('/supplier/external/package_1/:package_id', isLoggedIn, supplier.external_package_1_show);
router.get('/supplier/external/package_2/:package_id', isLoggedIn, supplier.external_package_2_show);
router.post('/supplier/external/edit_package_1', isLoggedIn, supplier.external_edit_package_1);
router.post('/supplier/external/edit_package_2', isLoggedIn, supplier.external_edit_package_2);

//Location Menu
router.get('/location/management', isLoggedIn, location.management);
router.post('/location/add_state', isLoggedIn, location.add_state);
router.post('/location/add_city', isLoggedIn, location.add_city);
router.get('/location/service_area', isLoggedIn, location.service_area);
router.post('/location/get_cities', isLoggedIn, location.get_cities);
router.post('/location/new_service_area', isLoggedIn, location.new_service_area);
router.get('/location/:state/:city/compliance', isLoggedIn, location.compliance);
router.post('/location/:state/:city/add_supplier', isLoggedIn, location.add_supplier);
router.get('/location/:state/:city/delete', isLoggedIn, location.delete_city);
router.get('/location/:state/delete', isLoggedIn, location.delete_state);
router.get('/location/:state/:city/service_area_delete', isLoggedIn, location.delete_service_area);
//User Log out
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
})

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated() && req.user.role == 'superadmin'){
        return next();
    }
    else{
        res.redirect('/admin');
    }
}

module.exports = router;
