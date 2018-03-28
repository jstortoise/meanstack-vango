
var StateModel = require('../../model/location').State;
var CityModel = require('../../model/location').City;
var ServiceAreaModel = require('../../model/service_area').ServiceArea;
var Internal_supplier = require('../../model/internal_supplier').Internal_supplier;
var External_supplier = require('../../model/external_supplier').External_supplier;
var External_supplier_package_type_1 = require('../../model/external_supplier_package_type_1').Supplier_Package_Type_1;
var External_supplier_package_type_2 = require('../../model/external_supplier_package_type_2').Supplier_Package_Type_2;
var ServiceList = require('../../config/service_name');

exports.management = async function(req, res){
  var states = await StateModel.find().exec(function(err, data){
    if(err){
      return null;
    }else{
      return data;
    }
  });
  var cities = await CityModel.find().exec(function(err, data){
    if(err){
      return null;
    }else{
      return data;
    }
  })
  res.render('admin/location/management', {states: states, cities: cities});
}
exports.add_state = function(req, res){
  var state = req.body.state;
  var new_state = new StateModel;
  StateModel.find({name: state}).exec(function(err, data){
    if(err){
      res.json({ret: 'fail'});
    }else{
      if(data.length >= 1){
        res.json({ret: 'exist'});
      }else{
        new_state.name = state;
        new_state.save(function(err){
          if(err){
            res.json({ret: 'fail'});
          }else{
            res.json({ret: true});
          }
        });
      }
    }
  })
  //res.json({ret: true});
}
exports.add_city = function(req, res){
  var state = req.body.state;
  var city = req.body.city;
  var new_city = new CityModel;
  CityModel.find({state: state, city: city}).exec(function(err, data){
    if(err){
      res.json({ret: 'fail'});
    }else{
      if(data.length >= 1){
        res.json({ret: 'exist'});
      }else{
        new_city.state = state;
        new_city.city = city;
        new_city.save(function(err){
          if(err){
            res.json({ret: 'fail'});
          }else{
            res.json({ret: true});
          }
        })
      }
    }
  })
}
exports.service_area = async function(req, res){
  var states = await StateModel.find().exec(function(err, data){
    if(err){
      return null;
    }else{
      return data;
    }
  });
  var service_area = await ServiceAreaModel.find().exec(function(err, data){
    if(err){
      return null;
    }else{
      return data;
    }
  })
  var service_area_tmp = [];
  for(var i = 0; i < service_area.length; i++){
    var service = [];
    for(var j = 0; service_area[i].service != undefined && j < service_area[i].service.length; j++){
      if(!service.includes(service_area[i].service[j].name)){
        service.push(service_area[i].service[j].name);
      }
    }
    service_area_tmp.push({
      city: service_area[i].city,
      state: service_area[i].state,
      service: service,
      status: service_area[i].status
    });
  }
  res.render('admin/location/service_area', {states: states, service_area: service_area_tmp, all_services: ServiceList});
}
exports.get_cities = async function(req, res){
  var state = req.body.state;
  var cities = await CityModel.find({state: state}).exec(function(err, data){
    if(err)
      return null;
    else
      return data;
  });
  res.json({ret: cities});
}
exports.new_service_area = async function(req, res){
  var state = req.body.state;
  var city = req.body.city;
  ServiceAreaModel.find({state: state, city: city}).exec(function(err, data){
    if(err){
      res.json({ret: false});
    }else{
      if(data.length > 0){
        res.json({ret: false});
      }else{
        var new_service = new ServiceAreaModel;
        new_service.state = state;
        new_service.city = city;
        new_service.status = 'inactive';
        new_service.save(function(err){
          if(err)
            res.json({ret: false});
          else
            res.json({ret: true});
        });
      }
    }
  })
}

async function isSupplier(id, state, city){
  var service_area = await ServiceAreaModel.find({state: state, city: city}).exec(function(err, data){
    if(err)
      return null;
    else
      return data;
  })
  var i;
  for(i = 0; i < service_area[0].service.length; i++){
    if(service_area[0].service[i].id == id) break;
  }
  if(i == service_area[0].service.length)
    return false;
  else
    return true;
}
exports.compliance = async function(req, res){
  var state = req.params.state;
  var city = req.params.city;
  var data = await Internal_supplier.find().exec(function(err, data){
    if(err){
      return null;
    }else{
      return data;
    }        
  });
  var ret = [];
  for(var i = 0; i < data.length; i++){
    var profile = data[i].profile;    
    var service = data[i].service;
    var available_service = [];
    for(var j = 0; j < service.length; j++){
      if(service[j].value == 'on'){
        available_service.push(service[j].name);
        checked = true;
      }
    }
    var checked = await isSupplier(data[i]._id, state, city);
    ret.push({
      _id: data[i]._id,
      name: profile.firstname+' '+profile.lastname,
      email: profile.email,
      service: available_service,
      checked: checked
    })
  }

  var data = await External_supplier.find().exec(function(err, data){
    if(err)
      return null
    else
      return data;
  });
  var external = [];
  for(var i = 0; i < data.length; i++){
    var profile = data[i].profile;
    var service = [];

    var package_type1 = await External_supplier_package_type_1.find({supplier: data[i]._id}).exec(function(err, data){
      if(err){
        return null;
      }else{
        return data;      
      }
    });
    for(var j = 0; j < package_type1.length; j++){
      for(var k = 0; k < package_type1[j].service.length; k++){
        if(!service.includes(package_type1[j].service[k].name))
          service.push(package_type1[j].service[k].name);
      }
    }
    var package_type2 = await External_supplier_package_type_2.find({supplier: data[i]._id}).exec(function(err, data){
      if(err){
        return null;
      }else{
        return data;
      }
    });
    for(var j = 0; j < package_type2.length; j++){
      for(var k = 0; k < package_type2[j].service.length; k++){
        if(!service.includes(package_type2[j].service[k].name))
          service.push(package_type2[j].service[k].name);
      }
    }

    var checked = await isSupplier(data[i]._id, state, city);
    external.push({
      _id: data[i]._id,
      name: profile.firstname+' '+profile.lastname,
      email: profile.email,
      service: service,
      checked:checked
    })
  }
  console.log(external);
  res.render('admin/location/compliance', {internal: ret, external: external, state: state, city: city});
}
exports.add_supplier = async function(req, res){
  var state = req.params.state;
  var city = req.params.city;
  var external = req.body.external.split(',');
  var internal = req.body.internal.split(',');
  var service = [];
  for(var i = 0; i < internal.length; i++){
    var data = await Internal_supplier.find({'profile.email': internal[i]}).exec(function(err, data){
      if(err) return null;
      else return data;
    });
    for(var j = 0; data[0] != undefined && j < data[0].service.length; j++){
      if(data[0].service[j].value == 'on'){
        service.push({
          name: data[0].service[j].name,
          id: data[0]._id.toString(),
          supplier_type: 'internal'
        });
      }
    }
  }
  for(var i = 0; i < external.length; i++){
    if(external[i] == '') continue;
    var suppl = await External_supplier.find({'profile.email': external[i]}).exec(function(err, data){
      if(err) return null;
      else return data;
    });    
    var data = await External_supplier_package_type_1.find({supplier: suppl[0]._id}).exec(function(err, data){
      if(err) return null;
      else return data;
    });
    
    for(var j = 0; data[0] != undefined && j < data[0].service.length; j++){
      service.push({
        name: data[0].service[j].name,
        id: suppl[0]._id.toString(),
        supplier_type: 'external'
      });
    }
    var data = await External_supplier_package_type_2.find({supplier: suppl[0]._id}).exec(function(err, data){
      if(err) return null;
      else return data;
    });
    for(var j = 0; data[0] != undefined && j < data[0].service.length; j++){
      service.push({
        name: data[0].service[j].name,
        id: suppl[0]._id.toString(),
        supplier_type: 'external'
      });
    }
  }
  ServiceAreaModel.update({state: state, city: city}, {$set:{service: service}}).exec(function(err, data){
    if(err){
      res.json({ret: false});
    }else{
      res.json({ret: true});
    }
  })
}

exports.delete_city = async function(req, res){
  var state = req.params.state;
  var city = req.params.city;
  await CityModel.find({state: state, city: city}).remove().exec();
  await ServiceAreaModel.find({state: state, city: city}).remove().exec();
  res.redirect('/admin/location/management');
}
exports.delete_state = async function(req, res){
  var state = req.params.state;
  await StateModel.find({name: state}).remove().exec();
  await CityModel.find({state: state}).remove().exec();
  await ServiceAreaModel.find({state: state}).remove().exec();
  res.redirect('/admin/location/management');
}
exports.delete_service_area = async function(req, res){
  var state = req.params.state;
  var city = req.params.city;
  await ServiceAreaModel.find({state: state, city: city}).remove().exec();
  res.redirect('/admin/location/service_area');
}