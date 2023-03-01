const BrandModel = require('../../models/brand/Brand');
const mongoose = require('mongoose');
const ProductModel = require('../../models/product/Product');

const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteService = require("../../services/common/deleteService");
const updateService = require("../../services/common/updateService");
const getService = require("../../services/common/getService");
const createService = require("../../services/common/createService");
const dropDownService = require("../../services/common/dropDownService");
const slugify = require("slugify");

exports.postBrand = async (req, res)=>{
    try {

        const isMatch = await BrandModel.findOne({name: req.body?.name});
        if (isMatch){
            return res.status(400).json({
                error: 'Brand already exits'
            })
        }

        const brand = await createService(req, BrandModel);
        res.status(201).json({
            brand
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getBrand = async (req, res)=>{
    try {

        const searchRgx = {$regex: req.params.keyword, $options: "i"};
        const searchArr = [{name: searchRgx}]
        //
        // let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
        // let SearchArray=[{Name: SearchRgx}]

        const brands = await getService(req, BrandModel, searchArr);
        res.status(200).json({
            brands
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.patchBrand = async (req, res)=>{
    try {

        const id= req.params?.id;
        const ObjectId = mongoose.Types.ObjectId;
        const isMatch = await BrandModel.findOne({_id: {$ne: ObjectId(id)}, name: req.body?.name});
        if (isMatch){
            return res.status(400).json({
                error: 'Brand already exits'
            })
        }

        req.body.slug = slugify(req.body.name).toLowerCase();

        const result = await updateService(req, BrandModel);
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

exports.deleteBrand = async (req, res)=>{
    try {
        const id = req.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        const query = {brandID: ObjectId(id)};

        const isAssociate = await checkAssociateService(query, ProductModel);

        if (isAssociate){
            return res.status(400).json({
                error: "You can't delete. Data associate with product"
            })
        }

        const result = await deleteService(req, BrandModel);
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

exports.getBrandForDropdown = async (req, res)=>{
    try {
        const brands = await dropDownService(req, BrandModel, {_id:1, name: 1});
        res.status(200).json({
            brands
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}
