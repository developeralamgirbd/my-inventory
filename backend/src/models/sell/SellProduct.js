const {Schema, model} = require('mongoose');

const {ObjectId} = Schema.Types;

const sellProductSchema = new Schema({
    userEmail: String,
    sellID: {
        type: ObjectId,
        ref: 'Sell'
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

const SellProduct = model('SellProduct', sellProductSchema);

module.exports = SellProduct;