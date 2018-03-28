// load the things we need
var mongoose = require('mongoose');


// define the schema for profile

var Internal_supplier = mongoose.Schema({
  profile: {
    firstname: String,
    lastname: String,
    companyname: String,
    email: String,
    phone1: String,
    phone2: String,
    address: String,
    profileimagename: String
  },
  price: [{
    name: String,
    value: String
  }],
  service: [{
    name: String,
    value: String
  }],
  note: String,
  join: Date,
  lastactivity: Date,
  rating: String,
  status: String
})

exports.Internal_supplier = mongoose.model('ISupplier', Internal_supplier);