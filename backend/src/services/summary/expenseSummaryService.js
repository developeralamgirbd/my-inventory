const ExpenseModel =  require('../../models/expense/Expense');

const expenseSummaryService = async (userEmail)=>{

    const data = await ExpenseModel.aggregate([
        {$match: {
            userEmail
            }},
        {
            $facet: {
                totalAmount: [
                    {$group: {_id: null, total: {$sum: '$amount'}}}
                ],
                last30days: [
                    {$group: {_id: {$dateToString: {format: '%Y-%m-%d', date: '$createdAt'}}, total: {$sum: '$amount'}}},
                    {$sort: {_id: -1}},
                    {$limit: 30}
                ]
            }
        }
    ]);

    return {totalAmount: data[0].totalAmount[0]['total'], last30days: data[0].last30days}
}

module.exports = expenseSummaryService;