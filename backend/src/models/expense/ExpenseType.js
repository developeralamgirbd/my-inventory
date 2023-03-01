const {Schema, model} = require('mongoose');

const expenseTypeSchema = new Schema({
    userEmail: String,
    name: {
        type: String,
        required: [true, 'Expense Type is required'],
        unique: true,
        minLength: 2,
        maxLength: 100,
        lowercase: true
    },
}, {timestamps: true, versionKey: false});


const ExpenseType = model('ExpenseType', expenseTypeSchema);

module.exports = ExpenseType;