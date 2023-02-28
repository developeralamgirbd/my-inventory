const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");

const {postSupplier,
    patchSupplier,
    getSupplierForDropdown,
    getSupplier} = require("../controllers/supplier/supplierController");

router.post('/suppliers', AuthVerifyMiddleware, postSupplier);
router.patch('/suppliers/:id', AuthVerifyMiddleware, patchSupplier);
// router.delete('/customers/:id', AuthVerifyMiddleware, deleteCustomer);
router.get('/suppliers/dropdown', AuthVerifyMiddleware, getSupplierForDropdown);
router.get('/suppliers/:keyword/:page/:perpage', AuthVerifyMiddleware, getSupplier);

module.exports = router;