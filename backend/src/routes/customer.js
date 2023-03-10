const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");
const {postCustomer,
    patchCustomer,
    getCustomerForDropdown,
    getCustomer,
    deleteCustomer, getCustomerById
} = require("../controllers/customer/customerController");

router.post('/customers', AuthVerifyMiddleware, postCustomer);
router.patch('/customers/:id', AuthVerifyMiddleware, patchCustomer);
router.delete('/customers/:id', AuthVerifyMiddleware, deleteCustomer);
router.get('/customers/dropdown', AuthVerifyMiddleware, getCustomerForDropdown);
router.get('/customers/:keyword/:page/:perpage', AuthVerifyMiddleware, getCustomer);
router.get('/customers/:id', AuthVerifyMiddleware, getCustomerById);


module.exports = router;