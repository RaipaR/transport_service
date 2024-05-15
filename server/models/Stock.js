// Stock.js
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    vin: { type: String, required: true },
    placementDate: { type: Date, required: true },
    shippingPermission: { type: Boolean, required: true },
    shippingDate: { type: Date },
    address: { type: String, required: true },
    damages: { type: String },
    photos: [String]
});

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;


