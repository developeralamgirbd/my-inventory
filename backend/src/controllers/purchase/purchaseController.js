const ParentModel = require('../../models/purchase/Purchase');
const ChildModel = require('../../models/purchase/PurchaseProduct');
const mongoose = require('mongoose');

const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteService = require("../../services/common/deleteService");
const createParentChildService = require("../../services/common/createParentChildService");
const getOneJoinService = require("../../services/common/getOneJoinService");
const deleteParentChildService = require("../../services/common/deleteParentChildService");

exports.postPurchase = async (req, res)=>{
    try {
        const data = await createParentChildService(req, ParentModel, ChildModel, 'purchaseID');
        res.status(201).json(data)
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getPurchase = async (req, res)=>{
    try {

        const searchRgx = {$regex: req.params.keyword, $options: "i"};
        const joinStage = {$lookup: {from: 'suppliers', localField: 'supplierID', foreignField: '_id', as: 'supplier'}};

        const searchArr = [
            {note: searchRgx},
            {'supplier.name': searchRgx},
            {'supplier.mobile': searchRgx},
            {'supplier.address': searchRgx},
            {'supplier.email': searchRgx},
            ];

        const purchases = await getOneJoinService(req, ParentModel, searchArr, joinStage);
        res.status(200).json({
            purchases
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}



exports.deletePurchase = async (req, res)=>{
    try {

        const result = await deleteParentChildService(req, ParentModel, ChildModel, 'purchaseID');
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

