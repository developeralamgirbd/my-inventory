const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");
const {postReturn, getReturns, deleteReturn} = require("../controllers/return/returnController");

router.post('/returns', AuthVerifyMiddleware, postReturn);
router.delete('/returns/:id', AuthVerifyMiddleware, deleteReturn);
router.get('/returns/:keyword/:page/:perpage', AuthVerifyMiddleware, getReturns);

module.exports = router;