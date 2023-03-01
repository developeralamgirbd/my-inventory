const {Schema, model} = require('mongoose');

const {ObjectId} = Schema.Types;

const purchaseSchema = new Schema({
    userEmail: String,
    supplierID: {
        type: ObjectId,
        ref: 'Supplier'
    },
    vatTax: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    otherCost: {
        type: Number,
    },
    shippingCost: {
        type: Number,
    },
    grandTotal: {
        type: Number,
    },
    note: {
      type: String
    },

}, {timestamps: true, versionKey: false});

const Purchase = model('Purchase', purchaseSchema);

module.exports = Purchase;