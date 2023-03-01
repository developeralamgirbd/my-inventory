const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");

const {getExpenseType,
    getExpenseTypeForDropdown,
    postExpenseType,
    patchExpenseType} = require("../controllers/expense/expenseTypeController");

router.post('/expense-types', AuthVerifyMiddleware, postExpenseType);
router.patch('/expense-types/:id', AuthVerifyMiddleware, patchExpenseType);
// router.delete('/customers/:id', AuthVerifyMiddleware, deleteCustomer);
router.get('/expense-types/dropdown', AuthVerifyMiddleware, getExpenseTypeForDropdown);
router.get('/expense-types/:keyword/:page/:perpage', AuthVerifyMiddleware, getExpenseType);

module.exports = router;