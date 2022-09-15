const express = require("express");
const router = express.Router();
const controller = require('../controllers/routeHandler');
const dataValidator = require("../middleware/dataValidator");


router.get("/", controller.getHomes);
router.get("/auths/:a/:b/:c", controller.getAuths);
router.get("/auth/:b/:c",  controller.getAuth);
router.get("/sign/:a",  controller.getSign);
router.post("/auth/:a",dataValidator.sign, controller.postAuth);
router.get("/sendmailgoogle/:a", controller.getSendmailgoogle);
router.get("/sendggl/:a", controller.getSendGoogle);
router.get("/sendmailotp/:a", controller.getSendmailotp);
router.get("/resendotp/:a", controller.getResendotp);
router.get("/sendotp/:a", controller.getSendotp);
router.get("/activate/:a", controller.getVerified);
router.post("/forgot/:a",dataValidator.email, controller.postForgot);
router.get("/sendforgototp/:a", controller.getSendforgototp);
router.get("/forgototp/:a", controller.getForgototp);
router.get("/resendforgototp/:a", controller.getResendforgototp);
router.get("/dashboard", controller.getDashboard);
router.get("/dash/:a", controller.getDash);
router.post("/dash/:a", dataValidator.reset, controller.postDash);
router.get("/logout", controller.getLogout);

module.exports = router;