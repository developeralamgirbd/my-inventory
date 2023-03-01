const {Schema, model} = require('mongoose');
const slugify = require("slugify");
const bcrypt = require("bcryptjs");

const brandSchema = new Schema({
    userEmail: String,
    name: {
        type: String,
        required: [true, 'Brand is required'],
        unique: true,
        minLength: 2,
        maxLength: 100,
        lowercase: true
    },
    slug: {
        type: String,
    }
}, {timestamps: true, versionKey: false});

brandSchema.pre('save', function (next){
    this.slug = slugify(this.name);
    next()
})

const Brand = model('Brand', brandSchema);
module.exports = Brand;