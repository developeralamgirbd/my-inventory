const ParentModel = require('../../models/purchase/Purchase');
const ChildModel = require('../../models/purchase/PurchaseProduct');
const mongoose = require('mongoose');

const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteService = require("../../services/common/deleteService");
const createParentChildService = require("../../services/common/createParentChildService");
const getOneJoinService = require("../../services/common/getOneJoinService");

exports.postPurchase = async (req, res)=>{
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

