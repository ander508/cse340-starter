// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")
const invChecks  = require("../utilities/inventory-validation")


// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));


/* ****************************************
 * Route to build vehicle detail view
 **************************************** */
router.get("/detail/:id", 
    utilities.handleErrors(invController.buildDetail))


router.get(
    "/broken", 
    utilities.handleErrors(invController.throwError))


router.get(
  "/",
  //utilities.checkAccountType,
  utilities.handleErrors(invController.buildManagementView)
)

router.get(
  "/newClassification",
  //utilities.checkAccountType,
  utilities.handleErrors(invController.newClassificationView)
)



router.post(
  "/addClassification",
  //utilities.checkAccountType,
  invChecks.classificationRule(),
  invChecks.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)


router.get(
  "/newVehicle",
  //utilities.checkAccountType,
  utilities.handleErrors(invController.newInventoryView)
)

router.post(
  "/addInventory",
  //utilities.checkAccountType,
  invChecks.newInventoryRules(),
  invChecks.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)


router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))


//For Inventory Update
router.get(
  "/edit/:inv_id",
  utilities.handleErrors(invController.editInventory))

router.post(
  "/update/", 
  invChecks.newInventoryRules(),
  invChecks.checkUpdateData,
  utilities.handleErrors(invController.updateView))

router.get(
  "/delete/:inv_id",
  utilities.checkLogin,
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.deleteInventoryView))

router.post(
  "/delete",
  utilities.checkLogin,
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.deleteInventory))

module.exports = router;