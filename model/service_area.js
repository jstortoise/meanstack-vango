// load the things we need
var mongoose = require('mongoose');


// define the schema for profile

var ServiceAreaSchema = mongoose.Schema({
  state: String,
  city: String,
  status: String,
  service:[{
    name: String,
    id: String,
    supplier_type: String
  }]  
});

exports.ServiceArea = mongoose.model('service_area', ServiceAreaSchema);