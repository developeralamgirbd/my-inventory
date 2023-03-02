const ProductModel = require('../../models/product/Product');
const SellProductModel = require('../../models/sell/SellProduct');
const ReturnProductModel = require('../../models/return/ReturnProduct');
const PurchaseProductModel = require('../../models/purchase/PurchaseProduct');

const mongoose = require('mongoose');

const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteService = require("../../services/common/deleteService");
const updateService = require("../../services/common/updateService");
const createService = require("../../services/common/createService");
const slugify = require("slugify");
const getTwoJoinService = require("../../services/common/getTwoJoinService");
const getByIdService = require("../../services/common/getByIdService");
const ExpenseTypeModel = require("../../models/expense/ExpenseType");

exports.postProduct = async (req, res)=>{
    try {
        const product = await createService(req, ProductModel);
        res.status(201).json({
            product
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getProduct = async (req, res)=>{
    try {

        const searchRgx = {$regex: req.params.keyword, $options: "i"};
        const joinStage1 = {$lookup: {from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand'}};
        const joinStage2 = {$lookup: {from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category'}};

        const searchArr = [
            {title: searchRgx},
            {details: searchRgx},
            {unit: searchRgx},
            {'category.name': searchRgx},
            {'brand.name': searchRgx}];

        const products = await getTwoJoinService(req, ProductModel, searchArr, joinStage1, joinStage2);
        res.status(200).json({
            products
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getProductById = async (req, res)=>{
    try {

        const product = await getByIdService(req, ProductModel);
        res.status(200).json({
            product
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.patchProduct = async (req, res)=>{
    try {
        req.body.slug = slugify(req.body.title).toLowerCase();
        const result = await updateService(req, ProductModel);
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

exports.deleteProduct = async (req, res)=>{
    try {
        const id = req.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        const query = {productID: ObjectId(id)};

        const isAssociateSell = await checkAssociateService(query, SellProductModel);
        const isAssociateReturn = await checkAssociateService(query, ReturnProductModel);
        const isAssociatePurchase = await checkAssociateService(query, PurchaseProductModel);

        if (isAssociateSell){
            return res.status(400).json({
                error: "You can't delete. Data associate with sell"
            })
        }
        if (isAssociateReturn){
            return res.status(400).json({
                error: "You can't delete. Data associate with return"
            })
        }
        if (isAssociatePurchase){
            return res.status(400).json({
                error: "You can't delete. Data associate with purchase"
            })
        }

        const result = await deleteService(req, ProductModel);
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

