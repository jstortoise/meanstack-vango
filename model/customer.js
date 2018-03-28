// load the things we need
var mongoose = require('mongoose');

// define the schema for our customer model
var insuranceSchema = {
  personal_info: {
    mariteral:  String,
    coverage:   String, // Me & Spouse
    carModel:   String,
    miles:      String,
    education:  String,
    birthday: {
      mm:       String,
      dd:       String,
      yyyy:     String
    },
    incident:   String,
    spouse: {
      name:     String,
      education:  String,
      birthday: {
        mm:       String,
        dd:       String,
        yyyy:     String,
      },
      incident:   String,
    },
    zip:        String
  },
  coverage: {
    
  },
  join:         String,
  status:       String,  
  membership:   String,
  fee:          String,
  rating:       String,
  join_date:    Date,
  start_date:   Date,
  expiration_date: Date
}
var customerSchema = mongoose.Schema({
    profile: {
      firstname:  String,
      lastname:   String,
      phone:      String,
      email:      String,
      photo:      String,
      address:    String
    },
    insurances: [
      insuranceSchema
    ]    
});

// create the model for users and expose it to our app
exports.Insurance = mongoose.model('insurance', insuranceSchema);
exports.Customer = mongoose.model('customer', customerSchema);
