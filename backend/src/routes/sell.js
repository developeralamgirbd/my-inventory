const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");

const {postSell, getSells, deleteSell} = require("../controllers/sell/sellController");

router.post('/sells', AuthVerifyMiddleware, postSell);
router.delete('/sells/:id', AuthVerifyMiddleware, deleteSell);
router.get('/sells/:keyword/:page/:perpage', AuthVerifyMiddleware, getSells);

module.exports = router;