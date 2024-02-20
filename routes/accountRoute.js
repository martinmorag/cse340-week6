const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')

router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

router.get("/login", utilities.checkJWTToken, utilities.handleErrors(accountController.buildLogin));

router.get("/logout", (req, res) => {
    // Clear authentication tokens or session data (e.g., clear JWT cookie)
    res.clearCookie("jwt");
    // Redirect the client to the homepage or any other appropriate page
    res.redirect("/");
});
    
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLogData,
    utilities.handleErrors(accountController.accountLogin)
)

router.get("/register", utilities.checkJWTToken, utilities.handleErrors(accountController.buildRegister));
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

module.exports = router;