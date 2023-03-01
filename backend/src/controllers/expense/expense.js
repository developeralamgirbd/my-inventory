const ExpenseModel = require('../../models/expense/Expense');
const ProductModel = require('../../models/product/Product');
const mongoose = require('mongoose');

const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteService = require("../../services/common/deleteService");
const updateService = require("../../services/common/updateService");
const createService = require("../../services/common/createService");
const dropDownService = require("../../services/common/dropDownService");
const getOneJoinService = require("../../services/common/getOneJoinService");

exports.postExpense = async (req, res)=>{
    try {
        const expense = await createService(req, ExpenseModel);
        res.status(201).json({
            expense
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getExpense = async (req, res)=>{
    try {

        const searchRgx = {$regex: req.params?.keyword, $options: "i"};
        const searchArr = [{note: searchRgx},{amount: Number(req.params?.keyword)}, {'type.name': searchRgx}]
        const joinStage = {$lookup: {from: 'expensetypes', localField: 'typeID', foreignField: '_id', as: 'type'}}
        const expenses = await getOneJoinService(req, ExpenseModel, searchArr, joinStage);
        res.status(200).json({
            expenses
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.patchExpense = async (req, res)=>{
    try {
        const result = await updateService(req, ExpenseModel);
        res.status(200).json({
            result
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

// exports.deleteExpense = async (req, res)=>{
//     try {
//         const id = req.params.id;
//         const ObjectId = mongoose.s.ObjectId;
//         const query = {ExpenseID: ObjectId(id)};
//
//         const isAssociate = await checkAssociateService(query, ProductModel);
//
//         if (isAssociate){
//             return res.status(200).json({
//                 error: "You can't delete. Data associate with product"
//             })
//         }
//
//         const result = await deleteService(req, res);
//         res.status(200).json({
//             result
//         })
//     }catch (e) {
//         console.log(e)
//         res.status(500).json({
//             error: 'Server error occurred'
//         })
//     }
// }

exports.getExpenseForDropdown = async (req, res)=>{
    try {
        const expenses = await dropDownService(req, ExpenseModel, {_id:1, name: 1});
        res.status(200).json({
            expenses
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}