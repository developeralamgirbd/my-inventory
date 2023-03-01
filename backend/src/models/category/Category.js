const {Schema, model} = require('mongoose');
const slugify = require("slugify");

const categorySchema = new Schema({
    userEmail: String,
    name: {
        type: String,
        required: [true, 'Category is required'],
        unique: true,
        minLength: 2,
        maxLength: 100,
        lowercase: true
    },
    slug: {
        type: String,
    }
}, {timestamps: true, versionKey: false});

categorySchema.pre('save', function (next){
    this.slug = slugify(this.name);
    next()
})

const Category = model('Category', categorySchema);

module.exports = Category;