const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");

const {getExpenseType,
    getExpenseTypeForDropdown,
    postExpenseType,
    patchExpenseType,
    deleteExpenseType, getExpenseTypeById
} = require("../controllers/expense/expenseTypeController");

router.post('/expense-types', AuthVerifyMiddleware, postExpenseType);
router.patch('/expense-types/:id', AuthVerifyMiddleware, patchExpenseType);
router.delete('/expense-types/:id', AuthVerifyMiddleware, deleteExpenseType);
router.get('/expense-types/dropdown', AuthVerifyMiddleware, getExpenseTypeForDropdown);
router.get('/expense-types/:keyword/:page/:perpage', AuthVerifyMiddleware, getExpenseType);
router.get('/expense-types/:id', AuthVerifyMiddleware, getExpenseTypeById);


module.exports = router;