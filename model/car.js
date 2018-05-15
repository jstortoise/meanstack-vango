// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var carSchema = mongoose.Schema({
    brand_id	: String,
    carmake     : String,
    model 	    : String,
    year        : Number,
    measure     : String,
    tires       : Number,
    sos         : String,
    basic       : String,
    platinum    : String,
    golden      : String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Car', carSchema);
