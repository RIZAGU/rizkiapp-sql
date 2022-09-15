const {body} = require("express-validator");

const sign = [
  body("email", "email invalid").exists().isEmail().bail(),
  body("password","password at least 8 characters").exists().isLength({min: 8, max: 26}).trim(),
  body("password").matches("[0-9]").trim().escape().withMessage('Password Must Contain a Number'),
  body("password").matches("[A-Z]").trim().escape().withMessage('Password Must Contain an Uppercase Letter'),
  body("password").matches("[a-z]").trim().escape().withMessage('Password Must Contain an Lowercase Letter'),
  body("password").matches("[!@#$%^&*]").trim().escape().withMessage('Password Must Contain an Special Character'),

];

const reset = [
  body("email", "email invalid").exists().isEmail().bail(),
  body("oldpassword","password at least 8 characters").exists().isLength({min: 8, max: 26}).trim(),
  body("oldpassword").matches("[0-9]").trim().escape().withMessage('Password Must Contain a Number'),
  body("oldpassword").matches("[A-Z]").trim().escape().withMessage('Password Must Contain an Uppercase Letter'),
  body("oldpassword").matches("[a-z]").trim().escape().withMessage('Password Must Contain an Lowercase Letter'),
  body("oldpassword").matches("[!@#$%^&*]").trim().escape().withMessage('Password Must Contain an Special Character'),
  body("newpassword").exists().isLength({min: 8, max: 26}).trim(),
  body("newpassword").matches("[0-9]").trim().escape().withMessage('Password Must Contain a Number'),
  body("newpassword").matches("[A-Z]").trim().escape().withMessage('Password Must Contain an Uppercase Letter'),
  body("newpassword").matches("[a-z]").trim().escape().withMessage('Password Must Contain an Lowercase Letter'),
  body("newpassword").matches("[!@#$%^&*]").trim().escape().withMessage('Password Must Contain an Special Character'),
  body("confirmpassword").exists().isLength({min: 8, max: 26}).trim(),
  body("confirmpassword").matches("[0-9]").trim().escape().withMessage('Password Must Contain a Number'),
  body("confirmpassword").matches("[A-Z]").trim().escape().withMessage('Password Must Contain an Uppercase Letter'),
  body("confirmpassword").matches("[a-z]").trim().escape().withMessage('Password Must Contain an Lowercase Letter'),
  body("confirmpassword").matches("[!@#$%^&*]").trim().escape().withMessage('Password Must Contain an Special Character'),

];

const email = [
  body("email", "email invalid").exists().isEmail().bail(),
];

const pass = [
  body("password","password at least 8 characters").exists().isLength({min: 8, max: 26}).trim(),
  body("password").matches("[0-9]").trim().escape().withMessage('Password Must Contain a Number'),
  body("password").matches("[A-Z]").trim().escape().withMessage('Password Must Contain an Uppercase Letter'),
  body("password").matches("[a-z]").trim().escape().withMessage('Password Must Contain an Lowercase Letter'),
  body("password").matches("[!@#$%^&*]").trim().escape().withMessage('Password Must Contain an Special Character'),
];

const confirmpass = [
  body("confirmpassword","password at least 8 characters").exists().isLength({min: 8, max: 26}).trim(),
  body("confirmpassword").matches("[0-9]").trim().escape().withMessage('Password Must Contain a Number'),
  body("confirmpassword").matches("[A-Z]").trim().escape().withMessage('Password Must Contain an Uppercase Letter'),
  body("confirmpassword").matches("[a-z]").trim().escape().withMessage('Password Must Contain an Lowercase Letter'),
  body("confirmpassword").matches("[!@#$%^&*]").trim().escape().withMessage('Password Must Contain an Special Character'),
];

const oldpass = [
  body("oldpassword","password at least 8 characters").exists().isLength({min: 8, max: 26}).trim(),
  body("oldpassword").matches("[0-9]").trim().escape().withMessage('Password Must Contain a Number'),
  body("oldpassword").matches("[A-Z]").trim().escape().withMessage('Password Must Contain an Uppercase Letter'),
  body("oldpassword").matches("[a-z]").trim().escape().withMessage('Password Must Contain an Lowercase Letter'),
  body("oldpassword").matches("[!@#$%^&*]").trim().escape().withMessage('Password Must Contain an Special Character'),
];



module.exports = {
  sign,
  email,
  pass,
  confirmpass,
  oldpass,
  reset,
};

