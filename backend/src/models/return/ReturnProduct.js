const {Schema, model} = require('mongoose');

const {ObjectId} = Schema.Types;

const returnProductSchema = new Schema({
    userEmail: String,
    returnID: {
        type: ObjectId,
        ref: 'Return'
    },
    productID: {
        type: ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
    },
    unitCost: {
        type: Number,
    },
    total: {
        type: Number,
    }

}, {timestamps: true, versionKey: false});

const ReturnProduct = model('ReturnProduct', returnProductSchema);

module.exports = ReturnProduct;