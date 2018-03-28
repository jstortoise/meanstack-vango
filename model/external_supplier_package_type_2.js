var mongoose = require('mongoose');

var Supplier_Package_Type_2 = mongoose.Schema({
  supplier: String,
  service: [
    {
      name: String,
      e_number: String,
      u_number: String
    }
  ],
  price: String,
  date: Date
})

exports.Supplier_Package_Type_2 = mongoose.model('SPackage2', Supplier_Package_Type_2);