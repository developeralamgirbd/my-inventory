const PurchaseProductModel = require('../../models/purchase/PurchaseProduct')

const purchaseReportByDateService = async (fromDate, toDate, userEmail)=>{

    const data = await PurchaseProductModel.aggregate([
        {$match: {
                userEmail,
                $expr: {
                    $and: [
                        {
                            $gte: [
                                {
                                    $dateToString: {
                                        format: "%Y-%m-%d",
                                        date: "$createdAt"
                                    }
                                },
                                fromDate
                            ],
                        },
                        {
                            $lte: [
                                {
                                    $dateToString: {
                                        format: "%Y-%m-%d",
                                        date: "$createdAt"
                                    }
                                },
                                toDate
                            ],
                        }
                    ]

                },

            }},
        {$facet: {
                amount: [
                    {$group: {_id: null, totalAmount: {$sum: '$total'}}}
                ],
                rows: [
                    {$lookup: {from: 'products', localField: 'productID', foreignField: '_id', as: 'product'}},
                    {$unwind: '$product'},
                    {$lookup: {from: 'brands', localField: 'product.brandID', foreignField: '_id', as: 'brand'}},
                    {$lookup: {from: 'categories', localField: 'product.categoryID', foreignField: '_id', as: 'category'}},
                ]
            }},


    ]);

    return {totalAmount: data[0]?.amount[0]?.totalAmount, rows: data[0]?.rows}
}

module.exports = purchaseReportByDateService;