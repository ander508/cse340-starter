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


// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
  )

  router.get(
    "/",
    utilities.checkLogin,  
    utilities.handleErrors(accountController.SignedIn))


    /* ****************************************
5-6
 **************************************** */
router.get(
  "/logout",
  utilities.handleErrors(accountController.accountLogout)
)

/* ****************************************
 *5 /5
 **************************************** */
router.get(
  "/update/:id",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildUpdate)
)


/* ****************************************
 *5 -5
 **************************************** */
router.post(
  "/update",
  utilities.checkLogin,
  regValidate.updateRules(),
  regValidate.checkEditData,
  utilities.handleErrors(accountController.processUpdate)
)

router.post(
  "/password",
  utilities.checkLogin,
  regValidate.passwordRule(),
  regValidate.checkPassword,
  utilities.handleErrors(accountController.processPassword)
)

module.exports = router;