const ParentModel = require('../../models/sell/Sell');
const ChildModel = require('../../models/sell/SellProduct');
const mongoose = require('mongoose');

const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteService = require("../../services/common/deleteService");
const createParentChildService = require("../../services/common/createParentChildService");
const getOneJoinService = require("../../services/common/getOneJoinService");

exports.postSell = async (req, res)=>{
    try {
        const data = await createParentChildService(req, ParentModel, ChildModel);
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

