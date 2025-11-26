const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/index.js")
const accountController = require("../controllers/accountController.js")
const regValidate = require("../utilities/account-validation.js")
router.get("/login", utilities.handleErrors(accountController.buildLogin))
router.get("/register", utilities.handleErrors(accountController.buildRegister))
// Process the registration data
router.post("/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount))


module.exports = router;