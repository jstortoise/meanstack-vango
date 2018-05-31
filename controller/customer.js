
exports.home = function(req, res){
    res.render('customer/home');
}
exports.faq = function(req, res){
    res.render('customer/faq');
}
exports.giveback = function(req, res){
    res.render('customer/giveback');
}
exports.claims = function(req, res){
    res.render('customer/claims');
}
exports.employees = function(req, res){
    res.render('customer/employees');
}
exports.national = function(req, res){
    res.render('customer/national');
}
exports.terms = function(req, res){
    res.render('customer/terms');
}
exports.conditions = function(req, res){
    res.render('customer/conditions');
}
exports.policy = function(req, res){
    res.render('customer/policy');
}

// service section
exports.services = function(req, res){
    res.render('customer/services/index');
}
