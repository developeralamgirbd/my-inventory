const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");

const {postSupplier,
    patchSupplier,
    getSupplierForDropdown,
    getSupplier} = require("../controllers/supplier/supplierController");
const {getProduct,  patchProduct, postProduct} = require("../controllers/product/productController");

router.post('/products', AuthVerifyMiddleware, postProduct);
router.patch('/products/:id', AuthVerifyMiddleware, patchProduct);
// router.delete('/customers/:id', AuthVerifyMiddleware, deleteCustomer);
router.get('/products/:keyword/:page/:perpage', AuthVerifyMiddleware, getProduct);

module.exports = router;