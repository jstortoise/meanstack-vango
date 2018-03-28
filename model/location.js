// load the things we need
var mongoose = require('mongoose');


// define the schema for profile

var StateSchema = mongoose.Schema({
  name: String
})

var CitySchema = mongoose.Schema({
  state: String,
  city: String
})

exports.State = mongoose.model('State', StateSchema);
exports.City = mongoose.model('City', CitySchema);