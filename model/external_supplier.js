var mongoose = require('mongoose');

var External_supplier = mongoose.Schema({
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
  tool_image: [{
    name: String
  }],
  document: String,
  note: String,
  join: Date,
  lastactivity: Date,
  rating: String,
  status: String
})

exports.External_supplier = mongoose.model('ESupplier', External_supplier);