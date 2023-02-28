const CategoryModel = require('../../models/category/Category');
const ProductModel = require('../../models/product/Product');
const mongoose = require('mongoose');

const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteService = require("../../services/common/deleteService");
const updateService = require("../../services/common/updateService");
const getService = require("../../services/common/getService");
const createService = require("../../services/common/createService");
const dropDownService = require("../../services/common/dropDownService");

exports.postCategory = async (req, res)=>{
    try {
        const category = await createService(req, CategoryModel);
        res.status(201).json({
            category
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getCategories = async (req, res)=>{
    try {

        const searchRgx = {$regex: req.params.keyword, $options: "i"};
        const searchArr = [{name: searchRgx}]

        const categories = await getService(req, CategoryModel, searchArr);
        res.status(200).json({
            categories,
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.patchCategory = async (req, res)=>{
    try {
        const result = await updateService(req, CategoryModel);
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

exports.deleteCategory = async (req, res)=>{
    try {
        const id = req.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        const query = {categoryID: ObjectId(id)};

        const isAssociate = await checkAssociateService(query, ProductModel);

        if (isAssociate){
            return res.status(200).json({
                error: "You can't delete. Data associate with product"
            })
        }

        const result = await deleteService(req, res);
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

exports.getCategoryForDropdown = async (req, res)=>{
    try {
        const brands = await dropDownService(req, CategoryModel, {_id:1, name: 1});
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
