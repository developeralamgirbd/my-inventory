const ReturnModel =  require('../../models/return/Return');

const returnsSummaryService = async (userEmail)=>{

    const data = await ReturnModel.aggregate([
        {$match: {
            userEmail
            }},
        {
            $facet: {
                totalAmount: [
                    {$group: {_id: null, total: {$sum: '$grandTotal'}}}
                ],
                last30days: [
                    {$group: {_id: {$dateToString: {format: '%Y-%m-%d', date: '$createdAt'}}, total: {$sum: '$grandTotal'}}},
                    {$sort: {_id: -1}},
                    {$limit: 30}
                ]
            }
        }
    ]);

    return {totalAmount: data[0].totalAmount[0]['total'], last30days: data[0].last30days}
}

module.exports = returnsSummaryService;