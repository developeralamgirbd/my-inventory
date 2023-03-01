const {Schema, model} = require('mongoose');

const {ObjectId} = Schema.Types;

const purchaseProductSchema = new Schema({
    userEmail: String,
    purchaseID: {
        type: ObjectId,
        ref: 'Purchase'
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

const PurchaseProduct = model('PurchaseProduct', purchaseProductSchema);

module.exports = PurchaseProduct;