const {Schema, model} = require('mongoose');

const {ObjectId} = Schema.Types;

const returnSchema = new Schema({
    userEmail: String,
    customerID: {
        type: ObjectId,
        ref: 'Customer'
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

const Return = model('Return', returnSchema);

module.exports = Return;