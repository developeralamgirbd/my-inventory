const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");

const {postExpense,
    patchExpense,
    getExpense,
    deleteExpense,
    getExpenseReport,
    getExpenseSummary
} = require("../controllers/expense/expense");

router.post('/expenses', AuthVerifyMiddleware, postExpense);
router.patch('/expenses/:id', AuthVerifyMiddleware, patchExpense);
router.delete('/expenses/:id', AuthVerifyMiddleware, deleteExpense);
router.get('/expenses/report/:fromdate/:todate', AuthVerifyMiddleware, getExpenseReport);
router.get('/expenses/:keyword/:page/:perpage', AuthVerifyMiddleware, getExpense);
router.get('/expenses/summary', AuthVerifyMiddleware, getExpenseSummary);

module.exports = router;