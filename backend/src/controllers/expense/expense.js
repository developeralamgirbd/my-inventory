const ExpenseModel = require('../../models/expense/Expense');
const deleteService = require("../../services/common/deleteService");
const updateService = require("../../services/common/updateService");
const createService = require("../../services/common/createService");
const getOneJoinService = require("../../services/common/getOneJoinService");
const expenseReportByDateService = require("../../services/report/expenseReportByDateService");
const expenseSummaryService = require("../../services/summary/expenseSummaryService");

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
exports.getExpenseReport = async (req, res)=>{
    try {

        const userEmail = req.auth?.email;
        const fromDate = req.params?.fromdate;
        const toDate = req.params?.todate;

        const expenses = await expenseReportByDateService(fromDate, toDate, userEmail);
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

exports.getExpenseSummary = async (req, res)=>{
    try {

        const userEmail = req.auth?.email;

        const expensesSummary = await expenseSummaryService(userEmail);
        res.status(200).json({
            expensesSummary
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

exports.deleteExpense = async (req, res)=>{
    try {
        const result = await deleteService(req, ExpenseModel);
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
