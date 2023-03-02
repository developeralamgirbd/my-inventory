const ExpenseTypeModel = require('../../models/expense/ExpenseType');
const ExpenseModel = require('../../models/expense/Expense');
const mongoose = require('mongoose');

const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteService = require("../../services/common/deleteService");
const updateService = require("../../services/common/updateService");
const getService = require("../../services/common/getService");
const createService = require("../../services/common/createService");
const dropDownService = require("../../services/common/dropDownService");
const getByIdService = require("../../services/common/getByIdService");

exports.postExpenseType = async (req, res)=>{
    try {

        const isMatch = await ExpenseTypeModel.findOne({name: req.body?.name});
        if (isMatch){
            return res.status(400).json({
                error: 'Expense Type already exits'
            })
        }

        const expenseType = await createService(req, ExpenseTypeModel);
        res.status(201).json({
            expenseType
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getExpenseType = async (req, res)=>{
    try {

        const searchRgx = {$regex: req.params.keyword, $options: "i"};
        const searchArr = [{name: searchRgx},{email: searchRgx}, {mobile: searchRgx}, {address: searchRgx}]

        const expenseTypes = await getService(req, ExpenseTypeModel, searchArr);
        res.status(200).json({
            expenseTypes
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getExpenseTypeById = async (req, res)=>{
    try {

        const expenseType = await getByIdService(req, ExpenseTypeModel);
        res.status(200).json({
            expenseType
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.patchExpenseType = async (req, res)=>{
    try {
        const id= req.params?.id;
        const ObjectId = mongoose.Types.ObjectId;
        const isMatch = await ExpenseTypeModel.findOne({_id: {$ne: ObjectId(id)}, mobile: req.body?.mobile});
        if (isMatch){
           return res.status(400).json({
                error: 'Mobile number already exits'
            })
        }

        const result = await updateService(req, ExpenseTypeModel);
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

exports.deleteExpenseType = async (req, res)=>{
    try {
        const id = req.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        const query = {typeID: ObjectId(id)};

        const isAssociate = await checkAssociateService(query, ExpenseModel);

        if (isAssociate){
            return res.status(400).json({
                error: "You can't delete. Data associate with expense"
            })
        }

        const result = await deleteService(req, ExpenseTypeModel);
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

exports.getExpenseTypeForDropdown = async (req, res)=>{
    try {
        const expenseTypes = await dropDownService(req, ExpenseTypeModel, {_id:1, name: 1});
        res.status(200).json({
            expenseTypes
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}
