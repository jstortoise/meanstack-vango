var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var uniqid = require('uniqid');

var UserModel = require('../../model/user');
var Internal_supplier = require('../../model/internal_supplier').Internal_supplier;
var External_supplier = require('../../model/external_supplier').External_supplier;
var External_supplier_package_type_1 = require('../../model/external_supplier_package_type_1').Supplier_Package_Type_1;
var External_supplier_package_type_2 = require('../../model/external_supplier_package_type_2').Supplier_Package_Type_2;
var ServiceAreaModel = require('../../model/service_area').ServiceArea;

exports.supplier_dashboard = function(req, res){
  res.render('admin/supplier/dashboard');
}
// controller for internal list side menu
exports.supplier_internal_list = function(req, res){
  Internal_supplier.find().exec(function(err, data){
    var ret = [];
    for(var i = 0; i < data.length; i++){
      var profile = data[i].profile;
      var price = data[i].price;
      var total = 0;
      for(var j = 0; j < price.length; j++){
        if(price[j].name == 'total')
          total = price[j].value;
      }
      ret.push({
        _id: data[i]._id,
        name: profile.firstname+' '+profile.lastname,
        email: profile.email,
        profileimagename: profile.profileimagename == undefined? 'empty.jpg':profile.profileimagename,
        total: total,
        rating: data[i].rating
      })
    }
    res.render('admin/supplier/supplier_internal_list', {profile: ret});
  })
}
// controller for internal list side menu
exports.supplier_internal_list_table = function(req, res){
  Internal_supplier.find().exec(function(err, data){
    var ret = [];
    for(var i = 0; i < data.length; i++){
      var profile = data[i].profile;
      var price = data[i].price;
      var total = 0;
      for(var j = 0; j < price.length; j++){
        if(price[j].name == 'total')
          total = price[j].value;
      }
      var service = data[i].service;
      var available_service = [];
      for(var j = 0; j < service.length; j++){
        if(service[j].value == 'on'){
          available_service.push(service[j].name);
        }
      }
      ret.push({
        _id: data[i]._id,
        name: profile.firstname+' '+profile.lastname,
        email: profile.email,
        rating: data[i].rating,
        status: data[i].status,
        service: available_service
      })
    }
    res.render('admin/supplier/supplier_internal_list_table', {profile: ret});
  })
}
// controller for external list side menu
exports.supplier_external_list_table = function(req, res){
  External_supplier.find().exec(function(err, data){
    var ret = [];
    for(var i = 0; i < data.length; i++){
      var profile = data[i].profile;
      ret.push({
        _id: data[i]._id,
        name: profile.firstname+' '+profile.lastname,
        email: profile.email,
        rating: data[i].rating,
        status: data[i].status,
        document: data[i].document
      })
    }
    res.render('admin/supplier/supplier_external_list_table', {profile: ret});
  })
}
// controller for external list side menu
exports.supplier_external_list = function(req, res){
  External_supplier.find().exec(function(err, data){
    var ret = [];
    for(var i = 0; i < data.length; i++){
      var profile = data[i].profile;
      ret.push({
        _id: data[i]._id,
        name: profile.firstname+' '+profile.lastname,
        email: profile.email,
        profileimagename: profile.profileimagename == undefined? 'empty.jpg':profile.profileimagename,
      })
    }
    res.render('admin/supplier/supplier_external_list', {profile: ret});
  })
}
exports.supplier_new = function(req, res){
  res.render('admin/supplier/supplier_new');
}
exports.new_internal_supplier = function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {    
    var firstname = fields.firstname;
    var lastname = fields.lastname;
    var companyname = fields.companyname;
    var email = fields.email;
    var phone1 = fields.phone1;
    var phone2 = fields.phone2;
    var address = fields.address;
    var profileimagename = uniqid();
    var price_values = JSON.parse(fields.price);
    var service_values = JSON.parse(fields.service);
    var note = fields.note;

    var internal_supplier = new Internal_supplier;
    
    Object.keys(price_values).forEach(function(k){
      var price = {};
      price.value = price_values[k]
      price.name = k;
      internal_supplier['price'].push(price)
    })

    Object.keys(service_values).forEach(function(k){
      var service = {};
      service.name = k;
      service.value = service_values[k];
      internal_supplier['service'].push(service);
    })
    internal_supplier.profile.firstname = firstname;
    internal_supplier.profile.lastname = lastname;
    internal_supplier.profile.companyname = companyname;
    internal_supplier.profile.email = email;
    internal_supplier.profile.phone1 = phone1;
    internal_supplier.profile.phone2 = phone2;
    internal_supplier.profile.address = address;
    if(files.profileimage != undefined){
      var file_ext = files.profileimage.name.split('.').pop();
      internal_supplier.profile.profileimagename = profileimagename+'.'+file_ext;
    }    
    internal_supplier.note = note;
    internal_supplier.join = Date.now();
    internal_supplier.lastactivity = Date.now();
    internal_supplier.rating = '0';
    internal_supplier.status = 'available';

    Internal_supplier.find({'profile.email':email}).exec(function(err, data){      
      if(err){
        res.json({ret: 'fail'});
      }else{
        if(data.length >= 1){
          res.json({ret: 'exist'});
        }else{
          internal_supplier.save(function(err){
            if(err){
              res.json({ret: 'fail'});
            }else{
              var usr = new UserModel();
              usr.role = 'isupplier';
              usr.status = 'active';
              usr.local.password = usr.generateHash("12345");
              usr.local.email = email;
              usr.date = Date.now();
              usr.theme = '3';
              usr.save(function(err){
                if(err) process.exit(1);
                res.json({ret: 'success'});
              })              
            }          
          });
        }
      }
    })
    
    // `profileimage` is the name of the <input> field of type `file`    
    if(files.profileimage != undefined){
      var old_path = files.profileimage.path;
      var file_size = files.profileimage.size;
      var file_ext = files.profileimage.name.split('.').pop();    
      var new_path = path.join(appRoot, '/public/uploads/supplier/profile/', profileimagename + '.' + file_ext);
      fs.readFile(old_path, function(err, data) {
        fs.writeFile(new_path, data, function(err) {
          fs.unlink(old_path, function(err) {
            if (err) {
              console.log('uploading failure!');
            } else {
              console.log('uploading success!');
            }
          });
        });
      });
    }
    
  });
}
exports.new_external_supplier = function(req, res){
  var form = new formidable.IncomingForm();  
  form.parse(req, function(err, fields, files) {
    var firstname = fields.firstname;
    var lastname = fields.lastname;
    var companyname = fields.companyname;
    var email = fields.email;
    var phone1 = fields.phone1;
    var phone2 = fields.phone2;
    var address = fields.address;
    var profileimagename = uniqid();
    var documentname = uniqid();
    var note = fields.note;
    if(files.profileimage != undefined){
      var old_path = files.profileimage.path;
      var file_size = files.profileimage.size;
      var file_ext = files.profileimage.name.split('.').pop();    
      var new_path = path.join(appRoot, '/public/uploads/supplier/profile/', profileimagename + '.' + file_ext);
      fs.readFile(old_path, function(err, data) {
        fs.writeFile(new_path, data, function(err) {
          fs.unlink(old_path, function(err) {
            if (err) {
              console.log('uploading failure!');
            } else {
              console.log('uploading success!');
            }
          });
        });
      });
    }
    if(files.document != undefined){
      var document_old_path = files.document.path;
      var document_file_size = files.document.size;
      var document_file_ext = files.document.name.split('.').pop();    
      var document_new_path = path.join(appRoot, '/public/uploads/supplier/document/', documentname + '.' + document_file_ext);
      fs.readFile(document_old_path, function(err, data) {
        fs.writeFile(document_new_path, data, function(err) {
          fs.unlink(document_old_path, function(err) {
            if (err) {
              console.log('document uploading failure!');
            } else {
              console.log('document uploading success!');
            }
          });
        });
      });
    }

    var length = Number(fields.toolimagelength);
    var old_path_array = [];
    var file_ext_array = [];
    var new_path_array = [];
    var image_name_array = [];
    for(var i = 0; i < length; i++){
      if(files.hasOwnProperty('image'+i.toString())){
        old_path_array.push(files['image'+i.toString()].path);
        file_ext_array.push(files['image'+i.toString()].name.split('.').pop());
        image_name_array.push(uniqid());
        new_path_array.push(path.join(appRoot, '/public/uploads/supplier/tool_image/', image_name_array[i] + '.' + files['image'+i.toString()].name.split('.').pop()));        
      }      
    }
    for(var i = 0; i < length; i++){
      writeFile(files, i, old_path_array, file_ext_array, new_path_array, image_name_array);      
    }

    var external_supplier = new External_supplier;
    external_supplier.profile.firstname = firstname;
    external_supplier.profile.lastname = lastname;
    external_supplier.profile.companyname = companyname;
    external_supplier.profile.email = email;
    external_supplier.profile.phone1 = phone1;
    external_supplier.profile.phone2 = phone2;
    external_supplier.profile.address = address;
    if(files.profileimage != undefined){
      var file_ext = files.profileimage.name.split('.').pop();
      external_supplier.profile.profileimagename = profileimagename+'.'+file_ext;
    }
    if(files.document != undefined){
      var file_ext = files.document.name.split('.').pop();
      external_supplier.document = documentname+'.'+file_ext;
    }
    for(var i = 0; i < length; i++){
      external_supplier.tool_image.push({name: image_name_array[i]+'.'+file_ext_array[i]});
    }
    external_supplier.note = note;
    external_supplier.join = Date.now();
    external_supplier.lastactivity = Date.now();
    external_supplier.rating = '0';
    external_supplier.status = 'available';

    External_supplier.find({'profile.email':email}).exec(function(err, data){      
      if(err){
        res.json({ret: 'fail'});
      }else{
        if(data.length >= 1){
          res.json({ret: 'exist'});
        }else{
          external_supplier.save(function(err, data1){
            if(err){
              res.json({ret: 'fail'});
            }else{
              var usr = new UserModel();
              usr.role = 'esupplier';
              usr.status = 'active';
              usr.local.password = usr.generateHash("12345");
              usr.local.email = email;
              usr.date = Date.now();
              usr.theme = '3';
              usr.save(function(err){
                if(err) res.json({ret: 'fail'});
                else res.json({ret: 'success', id: data1._id});
              })
            }          
          });
        }
      }
    })
  });
}

function writeFile(files, i, old_path_array, file_ext_array, new_path_array, image_name_array){
  if(files.hasOwnProperty('image'+i.toString())){
    fs.readFile(old_path_array[i], function(err, data) {
      fs.writeFile(new_path_array[i], data, function(err) {
        fs.unlink(old_path_array[i], function(err) {
          if (err) {
            console.log('image uploading failure!');
          } else {
            console.log('image uploading success!');
          }
        });
      });
    });
  }
}

//Internal Supplier Profile View
exports.internal_profile_about = function(req, res){
  var id = req.params.id;
  Internal_supplier.find({_id: id}).exec(function(err, data){
    var profile = data[0].profile;
    profile.note = data[0].note;
    res.render('admin/supplier/supplier_internal_profile_about', {profile: profile, _id:id});
  })  
}
exports.internal_profile_coverage = function(req, res){
  var id = req.params.id;
  Internal_supplier.find({_id: id}).exec(function(err, data){
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
    res.render('admin/supplier/supplier_internal_profile_coverage', {profile: profile, _id:id, price: data[0].price, total: total, service: service});
  })  
}
exports.internal_profile_location = async function(req, res){
  var id = req.params.id;
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
  Internal_supplier.find({_id: id}).exec(function(err, data){
    var profile = data[0].profile;
    profile.note = data[0].note;    
    res.render('admin/supplier/supplier_internal_profile_location', {profile: profile, _id:id, service_area: tmp});
  })
}
//External Supplier Profile View
//Internal Supplier Profile View
exports.external_profile_about = function(req, res){
  var id = req.params.id;
  External_supplier.find({_id: id}).exec(function(err, data){
    var profile = data[0].profile;
    profile.note = data[0].note;
    res.render('admin/supplier/supplier_external_profile_about', {profile: profile, _id:id});
  })  
}
exports.external_profile_document = function(req, res){
  var id = req.params.id;
  External_supplier.find({_id: id}).exec(function(err, data){
    var profile = data[0].profile;
    profile.note = data[0].note;

    var document = data[0].document;
    var tool_image = data[0].tool_image;    
    res.render('admin/supplier/supplier_external_profile_tool_image', {profile: profile, _id:id, document: document, tool_image: tool_image});
  })  
}
exports.external_profile_location = async function(req, res){
  var id = req.params.id;
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
  External_supplier.find({_id: id}).exec(function(err, data){
    var profile = data[0].profile;
    profile.note = data[0].note;
    res.render('admin/supplier/supplier_external_profile_location', {profile: profile, _id:id, service_area: tmp});
  })  
}
exports.external_portal = async function(req, res){
  var id = req.params.id;
  var package_type1 = await External_supplier_package_type_1.find({supplier: id}).exec(function(err, data){
    if(err){
      return null;
    }else{
      return data;      
    }
  });
  var package_type2 = await External_supplier_package_type_2.find({supplier: id}).exec(function(err, data){
    if(err){
      return null;
    }else{
      return data;
    }
  });
  res.render('admin/supplier/supplier_external_portal', {_id: id, package_type1: package_type1, package_type2: package_type2});
}
exports.external_new_package_1 = function(req, res){
  var id = req.params.id;
  External_supplier.find({_id: id}).exec(function(err, data){
    var profile = data[0].profile;    
    res.render('admin/supplier/supplier_external_new_package_1', {profile: profile, _id:id});
  })
}
exports.external_add_new_package_1 = function(req, res){
  var data = JSON.parse(req.body.data);
  var id = req.body.id;
  var external_supplier_package_type_1 = new External_supplier_package_type_1;
  external_supplier_package_type_1.supplier = id;
  for(var i = 0; i < data.length; i++){
    external_supplier_package_type_1.service.push({
      name: data[i].name,
      SOS: data[i].sos,
      BASIC: data[i].basic,
      GOLDEN: data[i].golden,
      PLATINUM: data[i].platinum
    })
  }
  external_supplier_package_type_1.date = Date.now();
  external_supplier_package_type_1.save(function(err){
    if(err){
      res.json({ret: false});
    }else{
      res.json({ret: true});
    }
  })  
}

exports.external_new_package_2 = function(req, res){
  var id = req.params.id;
  External_supplier.find({_id: id}).exec(function(err, data){
    var profile = data[0].profile;    
    res.render('admin/supplier/supplier_external_new_package_2', {profile: profile, _id:id});
  })
}
exports.external_add_new_package_2 = function(req, res){
  var data = JSON.parse(req.body.data);
  var id = req.body.id;
  var total = req.body.total;
  var external_supplier_package_type_2 = new External_supplier_package_type_2;
  external_supplier_package_type_2.supplier = id;
  for(var i = 0; i < data.length; i++){
    external_supplier_package_type_2.service.push({
      name: data[i].name,
      e_number: data[i].e_number,
      u_number: '0'
    })
  }
  external_supplier_package_type_2.price = total;
  external_supplier_package_type_2.date = Date.now();
  external_supplier_package_type_2.save(function(err){
    if(err){
      res.json({ret: false});
    }else{
      res.json({ret: true});
    }
  })  
}
//Package show on type 1
exports.external_package_1_show = async function(req, res){
  var package_id = req.params.package_id;
  var package_info = await External_supplier_package_type_1.find({_id: package_id}).exec(function(err, data){
    if(err){
      return null;
    }else{
      return data;
    }
  })
  var supplier;
  if(package_info[0].supplier != undefined){
    supplier = await External_supplier.find({_id: package_info[0].supplier}).exec(function(err, data){
      if(err){
        return null;
      }else{
        return data;
      }
    })
  }
  res.render('admin/supplier/supplier_external_package_1_show', {_id: package_id, profile: supplier[0].profile, package: package_info[0], supplier_id: supplier[0]._id});
}

exports.external_package_2_show = async function(req, res){
  var package_id = req.params.package_id;
  var package_info = await External_supplier_package_type_2.find({_id: package_id}).exec(function(err, data){
    if(err){
      return null;
    }else{
      return data;
    }
  })
  var supplier;
  if(package_info[0].supplier != undefined){
    supplier = await External_supplier.find({_id: package_info[0].supplier}).exec(function(err, data){
      if(err){
        return null;
      }else{
        return data;
      }
    })
  }
  res.render('admin/supplier/supplier_external_package_2_show', {_id: package_id, profile: supplier[0].profile, package: package_info[0], supplier_id: supplier[0]._id});
}

exports.external_edit_package_1 = function(req, res){
  var id = req.body.id;
  var data = JSON.parse(req.body.data);
  var service = [];
  for(var i = 0; i < data.length; i++){
    service.push({
      name: data[i].name,
      SOS: data[i].sos,
      BASIC: data[i].basic,
      GOLDEN: data[i].golden,
      PLATINUM: data[i].platinum
    })
  }
  External_supplier_package_type_1.update({_id: id}, {$set:{service: service}}).exec(function(err, data){
    if(err){
      res.json({ret: false});
    }else{
      res.json({ret: true});
    }
  })
}

exports.external_edit_package_2 = function(req, res){ 
  var data = JSON.parse(req.body.data);
  var id = req.body.id;
  var total = req.body.total;
  var service = [];
  for(var i = 0; i < data.length; i++){
    service.push({
      name: data[i].name,
      e_number: data[i].e_number,
      u_number: '0'
    })
  }
  External_supplier_package_type_2.update({_id: id}, {$set:{service: service, price: total}}).exec(function(err, data){
    if(err){
      res.json({ret: false});
    }else{
      res.json({ret: true, id: data._id});
    }
  })
}

exports.internal_delete  = async function(req, res){
  var id = req.params.id;
  var supplier = await Internal_supplier.find({_id: id}).exec();
  UserModel.find({'local.email': supplier[0].profile.email, role: 'isupplier'}).remove().exec();
  Internal_supplier.find({_id: id}).remove().exec(function(err, data){
    if(err){
      res.json({ret: false});
    }else{
      res.redirect('/admin/supplier/internal_list');
    }
  })
}

exports.external_delete  = async function(req, res){
  var id = req.params.id;
  var supplier = await External_supplier.find({_id: id}).exec();
  UserModel.find({'local.email': supplier[0].profile.email, role: 'esupplier'}).remove().exec();
  External_supplier.find({_id: id}).remove().exec(function(err, data){
    if(err){
      res.json({ret: false});
    }else{
      res.redirect('/admin/supplier/external_list');
    }
  })
}