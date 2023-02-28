const CustomerModel = require('../../models/customer/Customer');
const ProductModel = require('../../models/product/Product');
const mongoose = require('mongoose');

const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteService = require("../../services/common/deleteService");
const updateService = require("../../services/common/updateService");
const getService = require("../../services/common/getService");
const createService = require("../../services/common/createService");
const dropDownService = require("../../services/common/dropDownService");

exports.postCustomer = async (req, res)=>{
    try {
        const customer = await createService(req, CustomerModel);
        res.status(201).json({
            customer
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getCustomer = async (req, res)=>{
    try {

        const searchRgx = {$regex: req.params.keyword, $options: "i"};
        const searchArr = [{name: searchRgx},{email: searchRgx}, {mobile: searchRgx}, {address: searchRgx}]

        const customers = await getService(req, CustomerModel, searchArr);
        res.status(200).json({
            customers
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.patchCustomer = async (req, res)=>{
    try {
        const id= req.params?.id;
        const ObjectId = mongoose.Types.ObjectId;
        const isMatch = await CustomerModel.findOne({_id: {$ne: ObjectId(id)}, mobile: req.body?.mobile});
        if (isMatch){
           return res.status(400).json({
                error: 'Mobile number already exits'
            })
        }

        const result = await updateService(req, CustomerModel);
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

// exports.deleteCustomer = async (req, res)=>{
//     try {
//         const id = req.params.id;
//         const ObjectId = mongoose.Types.ObjectId;
//         const query = {CustomerID: ObjectId(id)};
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

exports.getCustomerForDropdown = async (req, res)=>{
    try {
        const customers = await dropDownService(req, CustomerModel, {_id:1, name: 1});
        res.status(200).json({
            customers
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}
