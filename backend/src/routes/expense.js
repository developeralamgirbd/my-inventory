const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");

const {postExpense,
    patchExpense,
    getExpenseForDropdown,
    getExpense} = require("../controllers/expense/expense");

router.post('/expenses', AuthVerifyMiddleware, postExpense);
router.patch('/expenses/:id', AuthVerifyMiddleware, patchExpense);
// router.delete('/customers/:id', AuthVerifyMiddleware, deleteCustomer);
router.get('/expenses/dropdown', AuthVerifyMiddleware, getExpenseForDropdown);
router.get('/expenses/:keyword/:page/:perpage', AuthVerifyMiddleware, getExpense);

module.exports = router;