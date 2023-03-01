const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");

const {postPurchase, getPurchase, deletePurchase} = require("../controllers/purchase/purchaseController");

router.post('/purchases', AuthVerifyMiddleware, postPurchase);
router.delete('/purchases/:id', AuthVerifyMiddleware, deletePurchase);
router.get('/purchases/:keyword/:page/:perpage', AuthVerifyMiddleware, getPurchase);

module.exports = router;