var mongoose = require('mongoose');

var Supplier_Package_Type_1 = mongoose.Schema({
  supplier: String,
  service: [
    {
      name: String,
      SOS: String,
      BASIC: String,
      GOLDEN: String,
      PLATINUM: String
    }
  ],
  date: Date
})

exports.Supplier_Package_Type_1 = mongoose.model('SPackage1', Supplier_Package_Type_1);