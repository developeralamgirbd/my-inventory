const SupplierModel = require('../../models/supplier/Supplier');
const PurchaseModel = require('../../models/purchase/Purchase');
const mongoose = require('mongoose');

const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteService = require("../../services/common/deleteService");
const updateService = require("../../services/common/updateService");
const getService = require("../../services/common/getService");
const createService = require("../../services/common/createService");
const dropDownService = require("../../services/common/dropDownService");
const getByIdService = require("../../services/common/getByIdService");
const ProductModel = require("../../models/product/Product");

exports.postSupplier = async (req, res)=>{
    try {

        const isMatch = await SupplierModel.findOne({mobile: req.body?.mobile});
        if (isMatch){
            return res.status(400).json({
                error: 'Mobile number already exits'
            })
        }

        const supplier = await createService(req, SupplierModel);
        res.status(201).json({
            supplier
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getSupplier = async (req, res)=>{
    try {

        const searchRgx = {$regex: req.params.keyword, $options: "i"};
        const searchArr = [{name: searchRgx},{email: searchRgx}, {mobile: searchRgx}, {address: searchRgx}]

        const suppliers = await getService(req, SupplierModel, searchArr);
        res.status(200).json({
            suppliers
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getSupplierById = async (req, res)=>{
    try {
        const supplier = await getByIdService(req, SupplierModel);
        res.status(200).json({
            supplier
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}


exports.patchSupplier = async (req, res)=>{
    try {
        const id= req.params?.id;
        const ObjectId = mongoose.Types.ObjectId;
        const isMatch = await SupplierModel.findOne({_id: {$ne: ObjectId(id)}, mobile: req.body?.mobile});
        if (isMatch){
           return res.status(400).json({
                error: 'Mobile number already exits'
            })
        }

        const result = await updateService(req, SupplierModel);
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

exports.deleteSupplier = async (req, res)=>{
    try {
        const id = req.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        const query = {supplierID: ObjectId(id)};

        const isAssociate = await checkAssociateService(query, PurchaseModel);

        if (isAssociate){
            return res.status(200).json({
                error: "You can't delete. Data associate with purchase"
            })
        }

        const result = await deleteService(req, SupplierModel);
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

exports.getSupplierForDropdown = async (req, res)=>{
    try {
        const suppliers = await dropDownService(req, SupplierModel, {_id:1, name: 1});
        res.status(200).json({
            suppliers
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}
