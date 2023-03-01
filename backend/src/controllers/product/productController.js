const ProductModel = require('../../models/product/Product');
const mongoose = require('mongoose');

const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteService = require("../../services/common/deleteService");
const updateService = require("../../services/common/updateService");
const createService = require("../../services/common/createService");
const slugify = require("slugify");
const getTwoJoinService = require("../../services/common/getTwoJoinService");

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

// exports.deleteProduct = async (req, res)=>{
//     try {
//         const id = req.params.id;
//         const ObjectId = mongoose.Types.ObjectId;
//         const query = {ProductID: ObjectId(id)};
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

