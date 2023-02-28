const {Schema, model} = require('mongoose');
const slugify = require("slugify");

const {ObjectId} = Schema.Types;

const productSchema = new Schema({
    userEmail: String,
    categoryID: {
        type: ObjectId,
        ref: 'Category'
    },
    brandID: {
        type: ObjectId,
        ref: 'Brand'
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxLength: 2,
        minLength: 500,
        lowercase: true
    },
    slug: {
      type: String
    },
    unit: {
        type: String,
    },
    details: String

}, {timestamps: true, versionKey: false});

productSchema.pre('save', function (next){
    this.slug = slugify(this.title);
    next()
})

const Product = model('Product', productSchema);

module.exports = Product;