require('dotenv').config();
const express = require('express');
var crypto = require('crypto');
const bodyParser = require('body-parser');
var ip = require("ip");
const allDAO = require('./dao/all');
const db = require('./db/postgres');
const app = express();
const port = 3000;
var cookieParser = require('cookie-parser');
var path = require('path');
const { body } = require('express-validator');
const { sendMail2Requestor } = require('./controllers/email');
const { check, validationResult } = require('express-validator');
const dataValidator = require('./middleware/dataValidator');
const { detect } = require('detect-browser');
const browser = detect();
var cookieSession = require('cookie-session');
const session = require('./middleware/session');
const routes = require('./router/routes');

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(cookieParser('my secret here'));
app.use(express.urlencoded({ extended: false }));
app.use(session);
app.use(routes);

app.listen(port, async() => {
   // await allDAO.createAllTable()
  //console.log(`Success app listening on port ${port}`)
  try {
    await allDAO.createAllTable()
    console.log(`LISTEN PORT ${port}`)
} catch (error) {
    console.error(error)
}
})