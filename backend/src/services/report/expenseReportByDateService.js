const ExpenseModel = require('../../models/expense/Expense')

const expenseReportByDateService = async (fromDate, toDate)=>{

    const data = await ExpenseModel.aggregate([
        {$match: {
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
                    {$group: {_id: null, totalAmount: {$sum: '$amount'}}}
                ],
                rows: [
                    {$lookup: {from: 'expensetypes', localField: 'typeID', foreignField: '_id', as: 'type'}},
                ]
            }},


    ]);

    return {totalAmount: data[0]?.amount[0]?.totalAmount, rows: data[0]?.rows}
}

module.exports = expenseReportByDateService;