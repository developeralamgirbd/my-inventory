const ParentModel = require('../../models/return/Return');
const ChildModel = require('../../models/return/ReturnProduct');
const mongoose = require('mongoose');

const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteService = require("../../services/common/deleteService");
const createParentChildService = require("../../services/common/createParentChildService");
const getOneJoinService = require("../../services/common/getOneJoinService");
const deleteParentChildService = require("../../services/common/deleteParentChildService");

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


