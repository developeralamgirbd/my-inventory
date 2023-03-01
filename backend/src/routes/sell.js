const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");

const {postSell, getSells} = require("../controllers/sell/sellController");

router.post('/sells', AuthVerifyMiddleware, postSell);
// router.delete('/customers/:id', AuthVerifyMiddleware, deleteCustomer);
router.get('/sells/:keyword/:page/:perpage', AuthVerifyMiddleware, getSells);

module.exports = router;