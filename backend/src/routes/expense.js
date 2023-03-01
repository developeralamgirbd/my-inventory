const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");

const {postExpense,
    patchExpense,
    getExpense,
    deleteExpense
} = require("../controllers/expense/expense");

router.post('/expenses', AuthVerifyMiddleware, postExpense);
router.patch('/expenses/:id', AuthVerifyMiddleware, patchExpense);
router.delete('/expenses/:id', AuthVerifyMiddleware, deleteExpense);
router.get('/expenses/:keyword/:page/:perpage', AuthVerifyMiddleware, getExpense);

module.exports = router;