const ParentModel = require('../../models/return/Return');
const ChildModel = require('../../models/return/ReturnProduct');

const createParentChildService = require("../../services/common/createParentChildService");
const getOneJoinService = require("../../services/common/getOneJoinService");
const deleteParentChildService = require("../../services/common/deleteParentChildService");
const returnsReportByDateService = require("../../services/report/returnsReportByDateService");
const sellsSummaryService = require("../../services/summary/sellsSummaryService");
const returnsSummaryService = require("../../services/summary/returnsSummaryService");

exports.postReturn = async (req, res)=>{
    try {
        const data = await createParentChildService(req, ParentModel, ChildModel, 'returnID');
        res.status(201).json(data)
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getReturns = async (req, res)=>{
    try {

        const searchRgx = {$regex: req.params.keyword, $options: "i"};
        const joinStage = {$lookup: {from: 'customers', localField: 'customerID', foreignField: '_id', as: 'customer'}};

        const searchArr = [
                {note: searchRgx},
                {'customer.name': searchRgx},
                {'customer.mobile': searchRgx},
                {'customer.address': searchRgx},
                {'customer.email': searchRgx},
            ];

        const returns = await getOneJoinService(req, ParentModel, searchArr, joinStage);
        res.status(200).json({
            returns
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getReturnsReport = async (req, res)=>{
    try {

        const userEmail = req.auth?.email;
        const fromDate = req.params?.fromdate;
        const toDate = req.params?.todate;

        const returnsReport = await returnsReportByDateService(fromDate, toDate, userEmail);
        res.status(200).json({
            returnsReport
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getReturnsSummary = async (req, res)=>{
    try {

        const userEmail = req.auth?.email;

        const returnsSummary = await returnsSummaryService(userEmail);
        res.status(200).json({
            returnsSummary
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.deleteReturn = async (req, res)=>{
    try {

        const result = await deleteParentChildService(req, ParentModel, ChildModel, 'returnID');
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


