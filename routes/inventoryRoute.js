const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/add-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.checkJWTToken, invController.buildByClassificationId);

// Route to display single car view
router.get("/detail/:invId", utilities.checkJWTToken, invController.displayCarById);

// Route to add classification and vehicle
router.get("/", utilities.checkJWTToken, utilities.checkPrivilege, utilities.handleErrors(invController.displayAdd));

router.get("/getInventory/:classification_id", utilities.checkJWTToken, utilities.handleErrors(invController.getInventoryJSON))

// Modify the inventory
router.get("/edit/:inventoryId", utilities.checkJWTToken, utilities.checkPrivilege, utilities.handleErrors(invController.buildModification));
router.post("/update", 
    regValidate.updatingVehicleRules(),
    regValidate.checkUpdateData,
    utilities.handleErrors(invController.updateVehicle))
// delete the inventory item
router.get("/delete/:inventoryId", utilities.checkJWTToken, utilities.checkPrivilege, utilities.handleErrors(invController.buildDeletion));
router.post("/delete",
    utilities.handleErrors(invController.deleteVehicle))
// add new classification
router.get("/add-classification", utilities.checkJWTToken, utilities.checkPrivilege, utilities.handleErrors(invController.displayAddClassification));
router.post(
    "/add-classification",
    regValidate.classificationRules(),
    regValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
)

router.get("/add-vehicle", utilities.checkJWTToken, utilities.checkPrivilege, utilities.handleErrors(invController.displayAddVehicle));
router.post(
    "/add-vehicle",
    regValidate.vehicleRules(),
    regValidate.checkVehicleData,
    utilities.handleErrors(invController.addVehicle)
)


module.exports = router;