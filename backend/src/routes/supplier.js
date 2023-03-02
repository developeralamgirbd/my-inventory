const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");

const {postSupplier,
    patchSupplier,
    getSupplierForDropdown,
    getSupplier,
    deleteSupplier, getSupplierById
} = require("../controllers/supplier/supplierController");

router.post('/suppliers', AuthVerifyMiddleware, postSupplier);
router.patch('/suppliers/:id', AuthVerifyMiddleware, patchSupplier);
router.delete('/suppliers/:id', AuthVerifyMiddleware, deleteSupplier);
router.get('/suppliers/dropdown', AuthVerifyMiddleware, getSupplierForDropdown);
router.get('/suppliers/:keyword/:page/:perpage', AuthVerifyMiddleware, getSupplier);
router.get('/suppliers/:id', AuthVerifyMiddleware, getSupplierById);


module.exports = router;