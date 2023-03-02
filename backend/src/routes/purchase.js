const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");

const {postPurchase, getPurchase, deletePurchase, getPurchaseReport, getPurchaseSummary} = require("../controllers/purchase/purchaseController");

router.post('/purchases', AuthVerifyMiddleware, postPurchase);
router.delete('/purchases/:id', AuthVerifyMiddleware, deletePurchase);
router.get('/purchases/report/:fromdate/:todate', AuthVerifyMiddleware, getPurchaseReport);
router.get('/purchases/:keyword/:page/:perpage', AuthVerifyMiddleware, getPurchase);
router.get('/purchases/summary', AuthVerifyMiddleware, getPurchaseSummary);

module.exports = router;