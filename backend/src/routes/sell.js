const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");

const {postSell, getSells, deleteSell, getSellsReport, getSellsSummary} = require("../controllers/sell/sellController");

router.post('/sells', AuthVerifyMiddleware, postSell);
router.delete('/sells/:id', AuthVerifyMiddleware, deleteSell);
router.get('/sells/report/:fromdate/:todate', AuthVerifyMiddleware, getSellsReport);
router.get('/sells/:keyword/:page/:perpage', AuthVerifyMiddleware, getSells);
router.get('/sells/summary', AuthVerifyMiddleware, getSellsSummary);


module.exports = router;