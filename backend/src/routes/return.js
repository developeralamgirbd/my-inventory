const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");
const {postReturn, getReturns, deleteReturn, getReturnsReport, getReturnsSummary} = require("../controllers/return/returnController");

router.post('/returns', AuthVerifyMiddleware, postReturn);
router.delete('/returns/:id', AuthVerifyMiddleware, deleteReturn);
router.get('/returns/report/:fromdate/:todate', AuthVerifyMiddleware, getReturnsReport);
router.get('/returns/:keyword/:page/:perpage', AuthVerifyMiddleware, getReturns);
router.get('/returns/summary', AuthVerifyMiddleware, getReturnsSummary);


module.exports = router;