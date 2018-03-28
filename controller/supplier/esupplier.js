var External_supplier = require('../../model/external_supplier').External_supplier;
var External_supplier_package_type_1 = require('../../model/external_supplier_package_type_1').Supplier_Package_Type_1;
var External_supplier_package_type_2 = require('../../model/external_supplier_package_type_2').Supplier_Package_Type_2;
var ServiceAreaModel = require('../../model/service_area').ServiceArea;

exports.dashboard = function(req, res){
  res.render('supplier/esupplier/dashboard');
}
exports.negotiation = async function(req, res){
  var email = req.user.local.email;
  var supplier = await External_supplier.find({'profile.email': email}).exec();
  var package_type1 = await External_supplier_package_type_1.find({supplier: supplier[0]._id}).exec();
  var package_type2 = await External_supplier_package_type_2.find({supplier: supplier[0]._id}).exec();
  res.render('supplier/esupplier/negotiation', {_id: supplier._id, package_type1: package_type1, package_type2: package_type2});
}
exports.supplier = function(req, res){
  var email = req.user.local.email;
  External_supplier.find({'profile.email': email}).exec(function(err, data){
    var profile = data[0].profile;    
    res.render('supplier/esupplier/profile', {profile: profile});
  })
}
exports.document = function(req, res){
  var email = req.user.local.email;
  External_supplier.find({'profile.email': email}).exec(function(err, data){
    var profile = data[0].profile;
    profile.note = data[0].note;

    var document = data[0].document;
    var tool_image = data[0].tool_image;
    res.render('supplier/esupplier/document', {profile: profile,document: document, tool_image: tool_image});
  })
}
exports.location = async function(req, res){
  var email = req.user.local.email;
  External_supplier.find({'profile.email': email}).exec(async function(err, data){
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
    res.render('supplier/esupplier/location', {profile: profile, service_area: tmp});
  })
}

exports.package_1 = async function(req, res){
  var package_id = req.params.id;
  var package_info = await External_supplier_package_type_1.find({_id: package_id}).exec();
  
  res.render('supplier/esupplier/package_1_show', {_id: package_id, package: package_info[0]});
}
exports.package_2 = async function(req, res){
  var package_id = req.params.id;
  var package_info = await External_supplier_package_type_2.find({_id: package_id}).exec();
  
  res.render('supplier/esupplier/package_2_show', {_id: package_id, package: package_info[0]});
}