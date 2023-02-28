const {Schema, model} = require('mongoose');
const validator = require("validator");

const supplierSchema = new Schema({
    userEmail: String,
    name: {
        type: String,
        required: [true, 'Supplier is required'],
        minLength: 2,
        maxLength: 100,
        lowercase: true
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true,
        validate: {
            validator: (value)=>
                validator.isMobilePhone(value, ['bn-BD']),
            message: 'Please provide a valid phone number'
        }
    },
    address: {
        type: String
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid Email"],
        trim: true,
        lowercase: true,
        required: [true, "Email address is required"],
    },

}, {timestamps: true, versionKey: false});

const Supplier = model('Supplier', supplierSchema);
module.exports = Supplier;