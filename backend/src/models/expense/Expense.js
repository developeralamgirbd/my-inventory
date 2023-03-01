const {Schema, model} = require('mongoose');

const expenseSchema = new Schema({
    userEmail: String,
    typeID: {
        type: Schema.Types.ObjectId,
        ref: 'ExpenseType'
    },
    amount: {
        type: Number
    },
    note: {
        type: String
    }
}, {timestamps: true, versionKey: false});


const Expense = model('Expense', expenseSchema);

module.exports = Expense;