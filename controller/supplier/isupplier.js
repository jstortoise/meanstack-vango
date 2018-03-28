var Internal_supplier = require('../../model/internal_supplier').Internal_supplier;
var ServiceAreaModel = require('../../model/service_area').ServiceArea;

exports.dashboard = function(req, res){
  res.render('supplier/isupplier/dashboard');
}
exports.profile = function(req, res){
  var email = req.user.local.email;
  Internal_supplier.find({'profile.email': email}).exec(function(err, data){
    var profile = data[0].profile;
    res.render('supplier/isupplier/profile', {profile: profile});
  })
}
exports.coverage = function(req, res){
  var email = req.user.local.email;
  Internal_supplier.find({'profile.email': email}).exec(function(err, data){
    var profile = data[0].profile;
    profile.note = data[0].note;

    var total = 0, price = data[0].price;
    for(var j = 0; j < price.length; j++){
      if(price[j].name == 'total')
        total = price[j].value;
    }

    var service = [];
    var serviceArray = data[0].service;
    for(var j = 0; j < serviceArray.length; j++){
      service[serviceArray[j].name] = serviceArray[j].value;
    }
    res.render('supplier/isupplier/coverage', {profile: profile, price: data[0].price, total: total, service: service});
  })
}
exports.location = async function(req, res){
  var email = req.user.local.email;
  Internal_supplier.find({'profile.email': email}).exec(async function(err, data){
    var profile = data[0].profile;    
    var id = data[0]._id;
    var service_areas = await ServiceAreaModel.find().exec(function(err, data){});
    var tmp = [];
    for(var j = 0; j < service_areas.length; j++){
      var i;
      for(i = 0; i < service_areas[j].service.length; i++){
        if(service_areas[j].service[i].id == id) break;
      }
      if(i != service_areas[j].service.length){
        tmp.push({state: service_areas[j].state, city: service_areas[j].city});  
      }
    }
    res.render('supplier/isupplier/location', {profile: profile, service_area: tmp});
  })
}