const ParentModel = require('../../models/sell/Sell');
const ChildModel = require('../../models/sell/SellProduct');
const mongoose = require('mongoose');

const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteService = require("../../services/common/deleteService");
const createParentChildService = require("../../services/common/createParentChildService");
const getOneJoinService = require("../../services/common/getOneJoinService");
const deleteParentChildService = require("../../services/common/deleteParentChildService");
const purchaseReportByDateService = require("../../services/report/purchaseReportByDateService");
const sellReportByDateService = require("../../services/report/sellReportByDateService");
const purchasesSummaryService = require("../../services/summary/purchasesSummaryService");
const sellsSummaryService = require("../../services/summary/sellsSummaryService");

exports.postSell = async (req, res)=>{
    try {
        const data = await createParentChildService(req, ParentModel, ChildModel, 'sellID');
        res.status(201).json(data)
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getSells = async (req, res)=>{
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

        const sells = await getOneJoinService(req, ParentModel, searchArr, joinStage);
        res.status(200).json({
            sells
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getSellsReport = async (req, res)=>{
    try {

        const userEmail = req.auth?.email;
        const fromDate = req.params?.fromdate;
        const toDate = req.params?.todate;

        const sellsReport = await sellReportByDateService(fromDate, toDate, userEmail);
        res.status(200).json({
            sellsReport
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getSellsSummary = async (req, res)=>{
    try {

        const userEmail = req.auth?.email;

        const sellsSummary = await sellsSummaryService(userEmail);
        res.status(200).json({
            sellsSummary
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}


exports.deleteSell = async (req, res)=>{
    try {

        const result = await deleteParentChildService(req, ParentModel, ChildModel, 'sellID');
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

