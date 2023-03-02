const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");
const {postReturn, getReturns, deleteReturn, getReturnsReport} = require("../controllers/return/returnController");
const {getSellsReport} = require("../controllers/sell/sellController");

router.post('/returns', AuthVerifyMiddleware, postReturn);
router.delete('/returns/:id', AuthVerifyMiddleware, deleteReturn);
router.get('/returns/report/:fromdate/:todate', AuthVerifyMiddleware, getReturnsReport);
router.get('/returns/:keyword/:page/:perpage', AuthVerifyMiddleware, getReturns);

module.exports = router;