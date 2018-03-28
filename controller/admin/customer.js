exports.customer_dashboard = function(req, res){
  res.render('admin/customer/dashboard');
}
exports.customer_all = function(req, res){
  res.render('admin/customer/customer_all');
}
exports.customer_active = function(req, res){
  res.render('admin/customer/customer_active');
}
exports.customer_inactive = function(req, res){
  res.render('admin/customer/customer_inactive');
}
exports.customer_profile = function(req, res){
  res.render('admin/customer/customer_profile');
}