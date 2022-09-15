const metadata = require('gcp-metadata');
const {OAuth2Client} = require('google-auth-library');
const oAuth2Client = new OAuth2Client();
var passport = require('passport');
var userProfile;
const facebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '138254478652-2c6ng098mk0nsjeems3lkrfk4rhbem88.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const express = require("express");
var ip = require("ip");
const { detect } = require("detect-browser");
const browser = detect();
var moment = require("moment");
var crypto = require("crypto");
const app = express();
var path = require("path");
const { check, validationResult } = require("express-validator")
var cookieParser = require('cookie-parser');
const session = require("../middleware/session");
var moment = require("moment");
var crypto = require("crypto");
const { MemoryStore } = require('express-session')
const sessionStorage = new MemoryStore()
const allDAO = require('../dao/all');
const db = require('../db/postgres');
const ipadd_ = ip.address();
const browser_ = browser.name;
const bversion_ = browser.version;
const os_ = browser.os;
const dateNow_ = moment().format("L");
const dateWeek_ = moment().subtract(7, "days").format("L");
const timeNow_ = moment().format("LT");
const base_url_ = "/app/";
//const base_url_ = "/rizkiapp-1bd29/us-central1/app/";
//const base_url_ = "/"
const base_urls_ = "https://us-central1-rizkiapp-1bd29.cloudfunctions.net/app";
//const base_urls_ = "http://localhost:5000/rizkiapp-1bd29/us-central1/app";


const getHomes = async(req, res)=>{
  _a = ipadd_
  _b = browser_
  _c = bversion_
  _d = os_
  const getemail = `
    SELECT sessionid FROM user_login WHERE status = 'login' and login_id in (select max(login_id) from user_login where ip = $1 and browser = $2 and version = $3 and os = $4) 
    `
  const param = [_a,_b,_c,_d]
  const em = await (await db.query(getemail, param)).rows

  if (Object.keys(em).length > 0)
  {
    sid_ = JSON.stringify(em);
    sid_ = sid_.substring(15).slice(0,-3);
    console.log(sid_);
    if (req.session.views) {
      req.session.views++;
      req.session.cookie.maxAge * 100000000;
    } else {
      req.session.views = 1;
    }
    req.session.id = sid_;
    req.session.sid = sid_;
    minute_ = 600000000000;
    nid_ = 1
  } else {
    nid_ = 0
  }
  res.render('home',{
    nid : nid_})
};

const getAuths = async(req,res)=>{

};

const getAuth =  async(req, res) => {
  b = req.params.b;
  c = req.params.c;

  const getemail = `
    SELECT sessionid FROM user_login WHERE status = 'login' and login_id in (select max(login_id) from user_login where ip = $1 and browser = $2 and version = $3 and os = $4) 
    `;
  const param = [ipadd_,browser_,bversion_,os_];
  const em = await (await db.query(getemail, param)).rows;

  if (Object.keys(em).length > 0)
  {
    sid_ = JSON.stringify(em);
    sid_ = sid_.substring(15).slice(0,-3);
    console.log(sid_);
    if (req.session.views) {
      req.session.views++;
      req.session.cookie.maxAge * 100000000;
    } else {
      req.session.views = 1;
    }
    req.session.id = sid_;
    req.session.sid = sid_;
    minute_ = 600000000000;
    res.redirect('/');
  } else 
  {
    if (b == "signup") {
      divsign_ = "signup";
      if (c == "pass") {
        a_ = "pass";
        route_ = "sign";
        _a = crypto.createHash('md5').update(a_).digest('hex');
        await allDAO.insertHash(route_,a_,_a);
        res.redirect('/sign/'+_a);
      } else if(c == "otp")
      {
        a_ = "signup_otp";
        route_ = "sign";
        _a = crypto.createHash('md5').update(a_).digest('hex');
        await allDAO.insertHash(route_,a_,_a);
        res.redirect('/sign/'+_a);
      } else if(c == null || c == undefined || c === null || c === undefined || c == "email") {
        a_ = "signup_email";
        route_ = "sign";
        _a = crypto.createHash('md5').update(a_).digest('hex');
        await allDAO.insertHash(route_,a_,_a);
        res.redirect('/sign/'+_a);
      }
    } else if(b == "signin") {
      divsign_ = "signin";
      if (c == "email")
      {
        a_ = "signin_email";
        route_ = "sign";
        _a = crypto.createHash('md5').update(a_).digest('hex');
        await allDAO.insertHash(route_,a_,_a);
        res.redirect('/sign/'+_a);
      } else if(c == "pass")
      {
        a_ = "signin_pass";
        route_ = "sign";
        _a = crypto.createHash('md5').update(a_).digest('hex');
        await allDAO.insertHash(route_,a_,_a);
        res.redirect('/sign/'+_a);
      } else {
        res.redirect('/');
      }
    } else if(b == "forgot")
    {
      divsign_ = "forgot";
      if(c == "email")
      {
        a_ = "forgot_email";
        route_ = "sign";
        _a = crypto.createHash('md5').update(a_).digest('hex');
        await allDAO.insertHash(route_,a_,_a);
        res.redirect('/sign/'+_a);
      } else if(c == "otp")
      {
        a_ = "forgot_otp";
        route_ = "sign";
        _a = crypto.createHash('md5').update(a_).digest('hex');
        await allDAO.insertHash(route_,a_,_a);
        res.redirect('/sign/'+_a);
      } else if(c == "pass")
      {
        a_ = "forgot_pass";
        route_ = "sign";
        _a = crypto.createHash('md5').update(a_).digest('hex');
        await allDAO.insertHash(route_,a_,_a);
        res.redirect('/sign/'+_a);
      };
    };
  };
};
  
const getSign =  async(req, res) => {
  const getemail = `
    SELECT sessionid FROM user_login WHERE status = 'login' and login_id in (select max(login_id) from user_login where ip = $1 and browser = $2 and version = $3 and os = $4) 
    `;
  const param = [ipadd_,browser_,bversion_,os_];
  const em = await (await db.query(getemail, param)).rows;
  
  if (Object.keys(em).length > 0)
  {
    sid_ = JSON.stringify(em);
    sid_ = sid_.substring(15).slice(0,-3);
    console.log(sid_);
    if (req.session.views) {
      req.session.views++;
      req.session.cookie.maxAge * 100000000;
    } else {
      req.session.views = 1;
    }
    req.session.id = sid_;
    req.session.sid = sid_;
    minute_ = 600000000000;
    res.cookie('sid', sid_, { maxAge: minute_ });
    res.redirect('/');
  } else 
  {
    _a = req.params.a;
    route_ = "sign";
    const a_ = await allDAO.checkHash(route_,_a);
    e_ = null;
    if ((Object.keys(a_).length === 0)||(Object.keys(_a).length === 0))
    {
      res.redirect("/");
    } else if (a_ == "signup_email")
    {
      divsign_ = "signup";
      b_ = "email";
      d_ = "/auth/signup/email";
      fl_ = "/sign/"+_a;
      er_ = 0;
    } else if(a_ == "signup_otp")
    {
      divsign_ = "signup";
      b_ = "otp";
      d_ = "/auth/signup/otp";
      fl_ = "/sign/"+_a;
      er_ = 0;
    } else if(a_ == "signup_pass")
    {
      divsign_ = "signup";
      b_ = "pass";
      d_ = "/auth/signup/pass";
      fl_ = "/sign/"+_a;
      er_ = 0;
    } else if(a_ == "signin_email")
    {
      divsign_ = "signin";
      b_ = "email";
      d_ = "/auth/signin/email";
      fl_ = "/sign/"+_a;
      er_ = 0;
    } else if(a_ == "signin_pass")
    {
      divsign_ = "signin";
      b_ = "pass";
      d_ = "/auth/signin/pass";
      fl_ = "/sign/"+_a;
      er_ = 0;   
    } else if(a_ == "forgot_email")
    {
      divsign_ = "forgot";
      b_ = "email";
      d_ = "/auth/forgot/email";
      fl_ = "/sign/"+_a;
      er_ = 0;
    } else if(a_ == "forgot_otp")
    {
      divsign_ = "forgot";
      b_ = "otp";
      d_ = "/auth/forgot/otp";
      fl_ = "/sign/"+_a;
      er_ = 0;
    } else if(a_ == "forgot_pass")  
    {
      divsign_ = "forgot";
      b_ = "pass";
      d_ = "/auth/forgot/pass";
      fl_ = "/sign/"+_a;
      er_ = 0;
    } else if(a_ != "signup_email" || a_ != "signup_otp" || a_ != "signup_pass" || a_ != "signin_email" || a_ != "signin_pass" || a_ != "forgot_email" || a_ != "forgot_otp" || a_ != "forgot_pass")
    {
      if(a_.substring(0,10) == "signup_ots")
      {
        e_ = a_.substring(10);
        divsign_ = "signup";
        b_ = "otp";
        d_ = "/auth/signup/otp";
        fl_ = "/sign/"+_a;
        er_ = "Wrong Token OTP, Please check your email!";
      } else if(a_.substring(0,10) == "signup_scs")
      {
        e_ = a_.substring(10);
        divsign_ = "signup";
        b_ = "success";
        d_ = "/auth/signup/otp";
        fl_ = "/sign/"+_a;
        er_ = "Wrong Token OTP, Please check your email!";
      } else if(a_.substring(0,10) == "signup_otp")
      {
        e_ = a_.substring(10);
        divsign_ = "signup";
        b_ = "otp";
        d_ = "/auth/signup/otp";
        fl_ = crypto.createHash('md5').update(e_).digest('hex');
        await allDAO.insertHash(route_,e_,fl_);
        er_ = 0;
      } else if(a_.substring(0,12) == "signup_email")
      {
        e_ = a_.substring(13);
        divsign_ = "signup";
        b_ = "email";
        d_ = "/auth/signup/email";
        fl_ = "/sign/"+_a;
        er_ = 0;
      }  else if(a_.substring(0,10) == "signup_ecs")
      {
        e_ = a_.substring(13);
        divsign_ = "signup";
        b_ = "email";
        d_ = "/auth/signup/email";
        fl_ = "/sign/"+_a;
        er_ = "Email has been registered!";
      } else if(a_.substring(0,10) == "signup_ees")
      {
        e_ = a_.substring(13);
        divsign_ = "signup";
        b_ = "email";
        d_ = "/auth/signup/email";
        fl_ = "/sign/"+_a;
        er_ = "Please check the email format and make sure the password contains 8 or more characters with a mix of letters, numbers & symbols!";
      } else if(a_.substring(0,10) == "signup_efs")
      {
        e_ = a_.substring(13);
        divsign_ = "signup";
        b_ = "email";
        d_ = "/auth/signup/email";
        fl_ = "/sign/"+_a;
        er_ = "Firstname must be value!";
      } else if(a_.substring(0,10) == "signup_els")
      {
        e_ = a_.substring(13);
        divsign_ = "signup";
        b_ = "email";
        d_ = "/auth/signup/email";
        fl_ = "/sign/"+_a;
        er_ = "Lastname must be value!";
      } else if(a_.substring(0,11) == "signup_epcs")
      {
        e_ = a_.substring(12);
        divsign_ = "signup";
        b_ = "email";
        d_ = "/auth/signup/email";
        fl_ = "/sign/"+_a;
        er_ = "The password does not match! ";
      } else if(a_.substring(0,11) == "signup_mail")
      {
        e_ = a_.substring(18);
        divsign_ = "signup";
        b_ = "sendmail";
        d_ = "/auth/signup/mail";
        fl_ = crypto.createHash('md5').update(e_).digest('hex');
        await allDAO.insertHash(route_,e_,fl_);
        er_ = a_.substring(11,17);
      } else if(a_.substring(0,10) == "signin_ees")
      {
        e_ = a_.substring(13);
        divsign_ = "signin";
        b_ = "email";
        d_ = "/auth/signin/email";
        fl_ = "/sign/"+_a;
        er_ = "Please check the email format and make sure the password contains 8 or more characters with a mix of letters, numbers & symbols!";
      } else if(a_.substring(0,10) == "signin_eus")
      {
        e_ = a_.substring(13);
        divsign_ = "signin";
        b_ = "email";
        d_ = "/auth/signin/email";
        fl_ = "/sign/"+_a;
        er_ = "Email not registered!";
      } else if(a_.substring(0,10) == "signin_eps")
      {
        e_ = a_.substring(13);
        divsign_ = "signin";
        b_ = "email";
        d_ = "/auth/signin/email";
        fl_ = "/sign/"+_a;
        er_ = "Incorrect email or password!";
      } else if(a_.substring(0,10) == "forgot_ees")
      {
        e_ = a_.substring(13);
        divsign_ = "forgot";
        b_ = "email";
        d_ = "/auth/forgot/email";
        fl_ = "/sign/"+_a;
        er_ = "Incorrect email format!";
      } else if(a_.substring(0,10) == "forgot_ecs")
      {
        e_ = a_.substring(13);
        divsign_ = "forgot";
        b_ = "email";
        d_ = "/auth/forgot/email";
        fl_ = "/sign/"+_a;
        er_ = "Email not registered!";
      } else if(a_.substring(0,10) == "forgot_otp")
      {
        e_ = a_.substring(10);
        divsign_ = "forgot";
        b_ = "otp";
        d_ = "/auth/forgot/otp";
        fl_ = crypto.createHash('md5').update(e_).digest('hex');
        await allDAO.insertHash(route_,e_,fl_);
        er_ = 0;
      } else if(a_.substring(0,10) == "forgot_pcs")
      {
        e_ = a_.substring(10);
        divsign_ = "forgot";
        b_ = "pass";
        d_ = "/auth/forgot/pass";
        fl_ = crypto.createHash('md5').update(e_).digest('hex');
        await allDAO.insertHash(route_,e_,fl_);
        er_ = 0;
      } else if(a_.substring(0,10) == "forgot_ots")
      {
        e_ = a_.substring(10);
        divsign_ = "forgot";
        b_ = "otp";
        d_ = "/auth/forgot/otp";
        fl_ = crypto.createHash('md5').update(e_).digest('hex');
        await allDAO.insertHash(route_,e_,fl_);
        er_ = "Wrong Token OTP, Please check your email!";
      } else if(a_.substring(0,10) == "forgot_tcs")
      {
        e_ = a_.substring(10);
        divsign_ = "forgot";
        b_ = "pass";
        d_ = "/auth/forgot/otp";
        fl_ = "/sign/"+_a;
        er_ = "Incorrect password format and make sure the password contains 8 or more characters with a mix of letters, numbers & symbols!";
      } else if(a_.substring(0,10) == "forgot_sss")
      {
        e_ = a_.substring(10);
        divsign_ = "forgot";
        b_ = "success";
        d_ = "/auth/forgot/sucess";
        fl_ = "/sign/"+_a;
        er_ = 0;
      }   
    }

    res.render('auth',{
      divsign : divsign_,
      a : b_,
      c : _a,
      d : d_, 
      fl : fl_, 
      e : e_,
      er : er_,
    });
  };  
};

const postAuth = async(req, res) => {
  _a = req.params.a;
  const getemail = `
    SELECT sessionid FROM user_login WHERE status = 'login' and login_id in (select max(login_id) from user_login where ip = $1 and browser = $2 and version = $3 and os = $4) 
    `;
  const param = [ipadd_,browser_,bversion_,os_];
  const em = await (await db.query(getemail, param)).rows;

  if (Object.keys(em).length > 0)
  {
    sid_ = JSON.stringify(em);
    sid_ = sid_.substring(15).slice(0,-3);
    console.log(sid_);
    if (req.session.views) {
      req.session.views++;
      req.session.cookie.maxAge * 100000000;
    } else {
      req.session.views = 1;
    }
    req.session.id = sid_;
    req.session.sid = sid_;
    minute_ = 600000000000;
    res.redirect('/');
  } else 
  {
    if(_a == "signup_email")
    {
      try 
      {
        const error = validationResult(req);
        if(!error.isEmpty()){
          throw error;
        };
                
        const {email,password,confirmpassword,firstname, lastname} = req.body;
        email_ = email;
        pass_ = password;
        pass_ = crypto.createHash('md5').update(pass_).digest('hex');
        confirm_ = crypto.createHash('md5').update(confirm_).digest('hex');
        fullname_ = firstname+" "+lastname;
        first_ = firstname;
        last_ = lastname;
        const getemail = `
          SELECT email FROM users WHERE email = $1
          `;
        const param = [email];
        const em = await (await db.query(getemail, param)).rows;
        if (Object.keys(em).length > 0)
        {
          a_ = "signup_ecs";
          route_ = "sign";
          _a = crypto.createHash('md5').update(a_).digest('hex');
          await allDAO.insertHash(route_,a_,_a);
          res.redirect('/sign/'+_a);
        } else {
          if (Object.keys(first_).length == 0)
          {
            a_ = "signup_efs";
            route_ = "sign";
            _a = crypto.createHash('md5').update(a_).digest('hex');
            await allDAO.insertHash(route_,a_,_a);
            res.redirect('/sign/'+_a);
          } else if (Object.keys(last_).length == 0)
          {
            a_ = "signup_els";
            route_ = "sign";
            _a = crypto.createHash('md5').update(a_).digest('hex');
            await allDAO.insertHash(route_,a_,_a);
            res.redirect('/sign/'+_a);
          } else if(pass_ != confirm_) {
            a_ = "signup_epcs";
            route_ = "sign";
            _a = crypto.createHash('md5').update(a_).digest('hex');
            await allDAO.insertHash(route_,a_,_a);
            res.redirect('/sign/'+_a);
          } else {
            divsign_ = "signup";
            b_ = "otp";
            await allDAO.insertOneUser(email_,pass_,fullname_);
            let text1 = Math.floor(Math.random() * 9);
            let int1 = text1.toString();
            let text2 = Math.floor(Math.random() * 9);
            let int2 = text2.toString();
            let text3 = Math.floor(Math.random() * 9);
            let int3 = text3.toString();
            let text4 = Math.floor(Math.random() * 9);
            let int4 = text4.toString();
            let text5 = Math.floor(Math.random() * 9);
            let int5 = text5.toString();
            let text6 = Math.floor(Math.random() * 9);
            let int6 = text6.toString();
            let _otp = int1 + int2 + int3 + int4 + int5 + int6;
            otp_ = JSON.stringify(_otp).substring(1).slice(0,-1);
            await allDAO.insertOtp(email_,otp_);
            ab_ = "signup_mail"+otp_+"."+email_;
            route_ = "sign";
            _ab = crypto.createHash('md5').update(ab_).digest('hex');
            await allDAO.insertHash(route_,ab_,_ab);
            _otp = crypto.createHash('md5').update(otp_).digest('hex');
            await allDAO.insertHash(route_,otp_,_otp);
            _email = crypto.createHash('md5').update(email_).digest('hex');
            await allDAO.insertHash(route_,email_,_email);
            res.redirect('/sendmailotp/'+_email);
          };
        };
      } catch (error) {
        if(_a == "signup_email")
        {
          a_ = "signup_ees";
          route_ = "sign";
          _a = crypto.createHash('md5').update(a_).digest('hex');
          await allDAO.insertHash(route_,a_,_a);
          res.redirect('/sign/'+_a);
        };
      };
    } else if (_a == "signup_otp")
    {
      const {email,tokenotp} = req.body;
      email_ = email;
      tokenotp_ = tokenotp;

      const getemail = `
        SELECT verified_otp FROM user_profile WHERE email = $1 and verified_otp = $2
        `;
      const param = [email,tokenotp];
      const em = await (await db.query(getemail, param)).rows;
      if (Object.keys(em).length > 0)
      {
        divsign_ = "signup";
        b_ = "otp";
        ab_ = "signup_scs"+email_;
        route_ = "sign";
        _ab = crypto.createHash('md5').update(ab_).digest('hex');
        await allDAO.insertHash(route_,ab_,_ab);
        await allDAO.updateVerified(email_);
        res.redirect('/sign/'+_ab);
      } else {
        divsign_ = "signup";
        b_ = "otp";
        ab_ = "signup_ots"+email_;
        route_ = "sign";
        _ab = crypto.createHash('md5').update(ab_).digest('hex');
        await allDAO.insertHash(route_,ab_,_ab);
        res.redirect('/sign/'+_ab);
      };
    } else if(_a == "signin_email")
    {
      try {
        const error = validationResult(req);
        if(!error.isEmpty()){
          throw error;
        };

        const {email,password} = req.body;
        email_ = email;
        pass_ = password;
        pass_ = crypto.createHash('md5').update(pass_).digest('hex');

        const getemail = `
          SELECT email FROM users WHERE email = $1
          `;
        const param = [email];
        const em = await (await db.query(getemail, param)).rows;
        if (Object.keys(em).length == 0)
        {
          a_ = "signin_eus";
          route_ = "sign";
          _a = crypto.createHash('md5').update(a_).digest('hex');
          await allDAO.insertHash(route_,a_,_a);
          res.redirect('/sign/'+_a);
        } else 
        {
          const getemails = `
            SELECT email FROM users WHERE email = $1 and password = $2
            `;
          const params = [email_,pass_];
          const ems = await (await db.query(getemails, params)).rows;
          if (Object.keys(ems).length == 0)
          {
            a_ = "signin_eps";
            route_ = "sign";
            _a = crypto.createHash('md5').update(a_).digest('hex');
            await allDAO.insertHash(route_,a_,_a);
            res.redirect('/sign/'+_a);
          } else {
            let text1 = Math.floor(Math.random() * 9);
            let int1 = text1.toString();
            let text2 = Math.floor(Math.random() * 9);
            let int2 = text2.toString();
            let text3 = Math.floor(Math.random() * 9);
            let int3 = text3.toString();
            let text4 = Math.floor(Math.random() * 9);
            let int4 = text4.toString();
            let text5 = Math.floor(Math.random() * 9);
            let int5 = text5.toString();
            let text6 = Math.floor(Math.random() * 9);
            let int6 = text6.toString();
            let _otp = int1 + int2 + int3 + int4 + int5 + int6;
            _sid = JSON.stringify(_otp).substring(1).slice(0,-1);
            route_ = "sid";
            sid_ = crypto.createHash('md5').update(_sid).digest('hex');
            func_ = "login";
            await allDAO.insertHash(route_,_sid,sid_);
            await allDAO.insertActUser(email_,sid_,ipadd_,browser_,bversion_,os_);
            req.session.sid = sid_;
            res.redirect('/');
          };
        };
      } catch(error) 
      {
        if(_a == "signin_email")
        {
          a_ = "signin_ees";
          route_ = "sign";
          _a = crypto.createHash('md5').update(a_).digest('hex');
          await allDAO.insertHash(route_,a_,_a);
          res.redirect('/sign/'+_a);
        }
      }
    } else if (_a == "forgot_otp")
    {
      const {email,tokenotp} = req.body;
      email_ = email;
      tokenotp_ = tokenotp;
      const getemail = `
        SELECT forgot_token FROM user_forgot where forgot_token = $1 and forgot_id in (select max(forgot_id) 
        from user_forgot where email = $2)
        `;
      const param = [tokenotp,email];
      const em = await (await db.query(getemail, param)).rows;

      if (Object.keys(em).length > 0)
      {
        status_ = "verified";
        divsign_ = "forgot";
        b_ = "pass";
        ab_ = "forgot_pcs"+email_;
        route_ = "sign";
        _ab = crypto.createHash('md5').update(ab_).digest('hex');
        await allDAO.insertHash(route_,ab_,_ab);
        await allDAO.updateForgotVerified(email_,status_);
        res.redirect('/sign/'+_ab);
      } else {
        divsign_ = "forgot";
        b_ = "otp";
        ab_ = "forgot_ots"+email_;
        route_ = "sign";
        _ab = crypto.createHash('md5').update(ab_).digest('hex');
        await allDAO.insertHash(route_,ab_,_ab);
        res.redirect('/sign/'+_ab);
      };
    } else if (_a == "forgot_pass")
    {
      try {
        const error = validationResult(req);
        if(!error.isEmpty()){
          throw error;
        };

        const {email,password} = req.body;
        email_ = email;
        password_ = password;

        pass_ = crypto.createHash('md5').update(password_).digest('hex');
        await allDAO.updatePassUser(pass_,email_);

        divsign_ = "forgot";
        b_ = "success";
        ab_ = "forgot_sss"+email_;
        route_ = "sign";
        _ab = crypto.createHash('md5').update(ab_).digest('hex');
        await allDAO.insertHash(route_,ab_,_ab);
        res.redirect('/sign/'+_ab);
      } catch (error) {
        const {email,password} = req.body;
        email_ = email;
        divsign_ = "forgot";
        b_ = "pass";
        ab_ = "forgot_tcs"+email_;
        route_ = "sign";
        _ab = crypto.createHash('md5').update(ab_).digest('hex');
        await allDAO.insertHash(route_,ab_,_ab);
        res.redirect('/sign/'+_ab);
      };
    };
  };
};

const getSendmailgoogle = async(req,res)=>{
  
};

const getSendGoogle = async(req, res) => {
  
};

const getSendmailotp = async(req,res) => {
  a_ = req.params.a;
  const getemail = `
    SELECT sessionid FROM user_login WHERE status = 'login' and login_id in (select max(login_id) from user_login where ip = $1 and browser = $2 and version = $3 and os = $4) 
    `;
  const param = [ipadd_,browser_,bversion_,os_];
  const em = await (await db.query(getemail, param)).rows;

  if (Object.keys(em).length > 0)
  {
    sid_ = JSON.stringify(em);
    sid_ = sid_.substring(15).slice(0,-3);
    console.log(sid_);
    if (req.session.views) {
      req.session.views++;
      req.session.cookie.maxAge * 100000000;
    } else {
      req.session.views = 1;
    }
    req.session.id = sid_;
    req.session.sid = sid_;
    minute_ = 600000000000;
    res.cookie('sid', sid_, { maxAge: minute_ });
    res.redirect('/');
  } else 
  {
    c_ = "sign";
    const _a = await allDAO.checkHash(c_,a_);
    const getemail = `
      SELECT verified_otp FROM user_profile WHERE email = $1
      `;
    const param = [_a];
    const em = await (await db.query(getemail, param)).rows;

    if (Object.keys(em).length > 0)
    {
      token_ = JSON.stringify(em).substring(18).slice(0,-3);
      res.redirect('https://aidiacreative.com/api?x=sendmail&a='+_a+'&b='+base_url_+'/sendotp/'+_a+'&token='+token_+'&tokens=7892108421847');
    } else {
      res.redirect('/');
    };
  };  
};

const getResendotp = async(req, res) => {
  a = req.params.a;
  const getemail = `
    SELECT sessionid FROM user_login WHERE status = 'login' and login_id in (select max(login_id) from user_login where ip = $1 and browser = $2 and version = $3 and os = $4) 
    `;
  const param = [ipadd_,browser_,bversion_,os_];
  const em = await (await db.query(getemail, param)).rows;
  
  if (Object.keys(em).length > 0)
  {
    if (req.session.views) {
      req.session.views++;
      req.session.cookie.maxAge * 100000000;
    } else {
      req.session.views = 1;
    };
    req.session.id = sid_;
    req.session.sid = sid_;
    minute_ = 600000000000;
    res.cookie('sid', sid_, { maxAge: minute_ });
    res.redirect('/');
  } else 
  {
    a_ = "signup_otp"+a;
    route_ = "sign";
    _a = crypto.createHash('md5').update(a_).digest('hex');
    await allDAO.insertHash(route_,a_,_a);
    res.redirect('/sign/'+_a);
  };  
};

const getSendotp = async(req, res) => {
  a = req.params.a;
  const getemail = `
    SELECT sessionid FROM user_login WHERE status = 'login' and login_id in (select max(login_id) from user_login where ip = $1 and browser = $2 and version = $3 and os = $4) 
    `;
  const param = [ipadd_,browser_,bversion_,os_];
  const em = await (await db.query(getemail, param)).rows;

  if (Object.keys(em).length > 0)
  {
    if (req.session.views) {
      req.session.views++;
      req.session.cookie.maxAge * 100000000;
    } else {
      req.session.views = 1;
    };
    req.session.id = sid_;
    req.session.sid = sid_;
    minute_ = 600000000000;
    res.cookie('sid', sid_, { maxAge: minute_ });
    res.redirect('/');
  } else 
  {
    a_ = "signup_otp"+a;
    route_ = "sign";
    _a = crypto.createHash('md5').update(a_).digest('hex');
    await allDAO.insertHash(route_,a_,_a);
    res.redirect('/sign/'+_a);
  };  
};

const postForgot = async(req, res) => {
  _a = req.params.a;
  const getemail = `
    SELECT sessionid FROM user_login WHERE status = 'login' and login_id in (select max(login_id) from user_login where ip = $1 and browser = $2 and version = $3 and os = $4) 
    `;
  const param = [ipadd_,browser_,bversion_,os_];
  const em = await (await db.query(getemail, param)).rows;

  if (Object.keys(em).length > 0)
  {
    if (req.session.views) {
      req.session.views++;
      req.session.cookie.maxAge * 100000000;
    } else {
      req.session.views = 1;
    };
    req.session.id = sid_;
    req.session.sid = sid_;
    minute_ = 600000000000;
    res.cookie('sid', sid_, { maxAge: minute_ });
    res.redirect('/');
  } else 
  {
    if(_a == "forgot_email")
    {
      try 
      {
        const error = validationResult(req);
        if(!error.isEmpty()){
          throw error
        }
        const {email} = req.body;
        email_ = email;
        const getemail = `
          SELECT email FROM users WHERE email = $1
          `;
        const param = [email];
        const em = await (await db.query(getemail, param)).rows;
        if (Object.keys(em).length > 0)
        {
          await allDAO.insertForgotUser(email_);
          let text1 = Math.floor(Math.random() * 9);
          let int1 = text1.toString();
          let text2 = Math.floor(Math.random() * 9);
          let int2 = text2.toString();
          let text3 = Math.floor(Math.random() * 9);
          let int3 = text3.toString();
          let text4 = Math.floor(Math.random() * 9);
          let int4 = text4.toString();
          let text5 = Math.floor(Math.random() * 9);
          let int5 = text5.toString();
          let text6 = Math.floor(Math.random() * 9);
          let int6 = text6.toString();
          let _otp = int1 + int2 + int3 + int4 + int5 + int6;
          otp_ = JSON.stringify(_otp).substring(1).slice(0,-1);
          await allDAO.insertForgotOtp(email_,otp_);
          route_ = "sign";
          _email = crypto.createHash('md5').update(email_).digest('hex');
          await allDAO.insertHash(route_,email_,_email);
          res.redirect('/sendforgototp/'+_email);
        } else {
          a_ = "forgot_ecs";
          route_ = "sign";
          _a = crypto.createHash('md5').update(a_).digest('hex');
          await allDAO.insertHash(route_,a_,_a);
          res.redirect('/sign/'+_a);
        };
      } catch (error) 
      {
        if(_a == "forgot_email")
        {
          a_ = "forgot_ees";
          route_ = "sign";
          _a = crypto.createHash('md5').update(a_).digest('hex');
          await allDAO.insertHash(route_,a_,_a);
          res.redirect('/sign/'+_a);
        };
      };
    };
  };
};

const getSendforgototp = async(req,res) => {
  a_ = req.params.a;
  const getemail = `
    SELECT sessionid FROM user_login WHERE status = 'login' and login_id in (select max(login_id) from user_login where ip = $1 and browser = $2 and version = $3 and os = $4) 
    `;
  const param = [ipadd_,browser_,bversion_,os_];
  const em = await (await db.query(getemail, param)).rows;

  if (Object.keys(em).length > 0)
  {
    if (req.session.views) {
      req.session.views++;
      req.session.cookie.maxAge * 100000000;
    } else {
      req.session.views = 1;
    };
    req.session.id = sid_;
    req.session.sid = sid_;
    minute_ = 600000000000;
    res.cookie('sid', sid_, { maxAge: minute_ });
    res.redirect('/');
  } else 
  {
    c_ = "sign";
    const _a = await allDAO.checkHash(c_,a_);
    const getemail = `
      SELECT forgot_token FROM user_forgot 
      where forgot_id in (select max(forgot_id) 
      from user_forgot where email = $1)
      `;
    const param = [_a];
    const em = await (await db.query(getemail, param)).rows;
    if (Object.keys(em).length > 0)
    {
      token_ = JSON.stringify(em).substring(18).slice(0,-3);
      res.redirect('https://aidiacreative.com/api?x=sendforgotmail&a='+_a+'&b='+base_url_+'/forgototp/'+_a+'&token='+token_+'&tokens=7892108421847');
    } else {
      res.redirect('/');
    }
  }  
};

const getForgototp = async(req, res) => {
  a = req.params.a;
  const getemail = `
    SELECT sessionid FROM user_login WHERE status = 'login' and login_id in (select max(login_id) from user_login where ip = $1 and browser = $2 and version = $3 and os = $4) 
    `;
  const param = [ipadd_,browser_,bversion_,os_];
  const em = await (await db.query(getemail, param)).rows;
  if (Object.keys(em).length > 0)
  {
    if (req.session.views) {
      req.session.views++;
      req.session.cookie.maxAge * 100000000;
    } else {
      req.session.views = 1;
    };
    req.session.id = sid_;
    req.session.sid = sid_;
    minute_ = 600000000000;
    res.cookie('sid', sid_, { maxAge: minute_ });
    res.redirect('/');
  } else 
  {
    a_ = "forgot_otp"+a;
    route_ = "sign";
    _a = crypto.createHash('md5').update(a_).digest('hex');
    await allDAO.insertHash(route_,a_,_a);
    res.redirect('/sign/'+_a);
  }
};

const getResendforgototp = async(req,res) => {
  a_ = req.params.a;
  const getemail = `
    SELECT sessionid FROM user_login WHERE status = 'login' and login_id in (select max(login_id) from user_login where ip = $1 and browser = $2 and version = $3 and os = $4) 
    `;
  const param = [ipadd_,browser_,bversion_,os_];
  const em = await (await db.query(getemail, param)).rows;
  if (Object.keys(em).length > 0)
  {
    if (req.session.views) {
      req.session.views++;
      req.session.cookie.maxAge * 100000000;
    } else {
      req.session.views = 1;
    }
    req.session.id = sid_;
    req.session.sid = sid_;
    minute_ = 600000000000;
    res.cookie('sid', sid_, { maxAge: minute_ });
    res.redirect('/');
  } else 
  {
    c_ = "sign";
    const _a = await allDAO.checkHash(c_,a_);
    const getemail = `
      SELECT forgot_token FROM user_forgot 
      where forgot_id in (select max(forgot_id) 
      from user_forgot where email = $1)
      `;
    const param = [_a];
    const em = await (await db.query(getemail, param)).rows;
    if (Object.keys(em).length > 0)
    {
      token_ = JSON.stringify(em).substring(18).slice(0,-3);
      res.redirect('https://aidiacreative.com/api?x=sendforgotmail&a='+_a+'&b='+base_url_+'/forgototp/'+_a+'&token='+token_+'&tokens=7892108421847');
    } else {
      res.redirect('/');
    }
  }
};

const getDashboard = async (req,res) => {
  res.redirect(base_url_+"dash/dashboard");
};

const getDash = async(req,res) => {
  a_ = req.params.a;
  _a = ipadd_;
  _b = browser_;
  _c = bversion_;
  _d = os_;

  const getemail = `
    SELECT sessionid FROM user_login WHERE status = 'login' and login_id in (select max(login_id) from user_login where ip = $1 and browser = $2 and version = $3 and os = $4) 
    `;
  const param = [_a,_b,_c,_d];
  const em = await (await db.query(getemail, param)).rows;

  
  if (Object.keys(em).length > 0)
  {
    sid_ = JSON.stringify(em);
    sid_ = sid_.substring(15).slice(0,-3);
    if (req.session.views) {
      req.session.views++;
      req.session.cookie.maxAge * 100000000;
    } else {
      req.session.views = 1;
    }
    req.session.id = sid_;
    req.session.sid = sid_;
    minute_ = 600000000000;
    res.cookie('sid', sid_, { maxAge: minute_ });
    const _email = await allDAO.findEmailSession(sid_);
    email_ = JSON.stringify(_email);
    email_ = email_.substring(10).slice(0,-2);
    const _fullname = await allDAO.findFullnameProfile(email_);
    fullname_ = JSON.stringify(_fullname);
    fullname_ = fullname_.substring(13).slice(0,-2);
    if(fullname_ == 'ul')
    {
      fullname_ = "-";
    }
    const _utype = await allDAO.findTypeProfile(email_);
    utype_ = JSON.stringify(_utype);
    utype_ = utype_.substring(14).slice(0,-2);
    if(utype_ == 'ul')
    {
      utype_ = "-";
    }
    const _verified = await allDAO.findVerifiedProfile(email_);
    verified_ = JSON.stringify(_verified);
    verified_ = verified_.substring(21).slice(0,-2);
    if(verified_ == 'ul')
    {
      verified_ = "-";
    }
    if(a_ == "profile" || a_ == "editprofile")
    {
      const _birthplace = await allDAO.findBirthplaceProfile(email_);
      birthplace_ = JSON.stringify(_birthplace);
      birthplace_ = birthplace_.substring(15).slice(0,-2);
      if(birthplace_ == 'ul')
      {
        birthplace_ = "-";
      }
      const _phone = await allDAO.findPhoneProfile(email_);
      phone_ = JSON.stringify(_phone);
      phone_ = phone_.substring(10).slice(0,-2);
      if(phone_ == 'ul')
      {
        phone_ = "-";
      }
      const _addr = await allDAO.findAddrProfile(email_);
      addr_ = JSON.stringify(_addr);
      addr_ = addr_.substring(12).slice(0,-2);
      if(addr_ == 'ul')
      {
        addr_ = "-";
      }
      const _city = await allDAO.findCityProfile(email_);
      city_ = JSON.stringify(_city);
      city_ = city_.substring(9).slice(0,-2);
      if(city_ == 'ul')
      {
        city_ = "-";
      }
      const _country = await allDAO.findCountryProfile(email_);
      country_ = JSON.stringify(_country);
      country_ = country_.substring(12).slice(0,-2);
      if(country_ == 'ul')
      {
        country_ = "-";
      }
      divsign_ = "profile";
      b_ = a_;
      er_ = 0;
      scs_ = 0;
      res.render('dashboard',{
        sid : sid_,
        divsign : divsign_,
        email : email_,
        birthplace : birthplace_,
        phone : phone_,
        addr : addr_,
        city : city_,
        country : country_,
        fullname : fullname_,
        verified : verified_,
        er : er_,
        scs : scs_,
        bc : b_,
        utype : utype_ 
      });
    } else if(a_ == "resetpassword")
    {
      divsign_ = "resetpassword";
      er_ = 0;
      scs_ = 0;
      b_ = a_;
      res.render("dashboard",{
        sid : sid_,
        divsign : divsign_,
        email : email_,
        fullname : fullname_,
        verified : verified_,
        er : er_,
        scs : scs_,
        bc : b_,
        utype : utype_,
      });
    } else if(a_ == "dashboard")
    {
      divsign_ = "dashboard";
      b_ = a_;
      const _ylog = await allDAO.getDataLoginEmail(email_);
      const _login = await allDAO.getListLogin();
      const _logout = await allDAO.getListLogout();
      const _user = await allDAO.getListUser();
      const _clogin = await allDAO.getCountLogin();
      clogin_ = JSON.stringify(_clogin).substring(11).slice(0,-3);
      const _cwlogin = await allDAO.getCountAvgLogin();
      cavg_ = JSON.stringify(_cwlogin).substring(11).slice(0,-3);
      const _cuser = await allDAO.getCountUser();
      cuser_ = JSON.stringify(_cuser).substring(11).slice(0,-3);
      er_ = 0;
      scs_ = 0;
      res.render('dashboard',{
        sid : sid_,
        divsign : divsign_,
        email : email_,
        fullname : fullname_,
        verified : verified_,
        er : er_,
        scs : scs_,
        bc : b_,
        utype : utype_,
        ylog : _ylog ,
        auser : _user,
        alogin : _login,
        alogout : _logout,
        cuser : cuser_,
        clogin : clogin_,
        cavg : cavg_
      });
    } else if(a_ == "upgradepro") 
    {
      await allDAO.upgradePro(email_);
      res.redirect('/dashboard/');
    } else if(a_ == "logout")
    {
      await allDAO.updateSessUser(email_,ipadd_,browser_,bversion_,os_);
      req.session = null;
      res.redirect('/');
    } else {
      divsign_ = "error";
      b_ = "error";
      er_ = 0;
      scs_ = 0;
      res.render('dashboard',{
        sid : sid_,
        divsign : divsign_,
        email : email_,
        fullname : fullname_,
        verified : verified_,
        er : er_,
        scs : scs_,
        bc : b_,
        utype : utype_,
      });
    };
  } else {
    res.redirect('/');
  }  
};

const postDash = async(req, res) => {
  a_ = req.params.a;
  _a = ipadd_;
  _b = browser_;
  _c = bversion_;
  _d = os_;

  const getemail = `
    SELECT sessionid FROM user_login WHERE status = 'login' and login_id in (select max(login_id) from user_login where ip = $1 and browser = $2 and version = $3 and os = $4) 
    `;
  const param = [_a,_b,_c,_d];
  const em = await (await db.query(getemail, param)).rows;

  if (Object.keys(em).length > 0)
  {

    sid_ = JSON.stringify(em);
    sid_ = sid_.substring(15).slice(0,-3);
    console.log(sid_);
    if (req.session.views) {
      req.session.views++;
      req.session.cookie.maxAge * 100000000;
    } else {
      req.session.views = 1;
    }
    req.session.id = sid_;
    req.session.sid = sid_;
    minute_ = 600000000000;
    res.cookie('sid', sid_, { maxAge: minute_ });
    const _email = await allDAO.findEmailSession(sid_);
    email_ = JSON.stringify(_email);
    email_ = email_.substring(10).slice(0,-2);
    const _fullname = await allDAO.findFullnameProfile(email_);
    fullname_ = JSON.stringify(_fullname);
    fullname_ = fullname_.substring(13).slice(0,-2);
    if(fullname_ == 'ul')
    {
      fullname_ = "-";
    };
    const _verified = await allDAO.findVerifiedProfile(email_);
    verified_ = JSON.stringify(_verified);
    verified_ = verified_.substring(21).slice(0,-2);
    if(verified_ == 'ul')
    {
      verified_ = "-";
    }
    const _utype = await allDAO.findTypeProfile(email_);
    utype_ = JSON.stringify(_utype);
    utype_ = utype_.substring(14).slice(0,-2);
    if(utype_ == 'ul')
    {
      utype_ = "-";
    }
    if(a_ == "resetpass")
    {
      try 
      {
        const {email,oldpassword,newpassword,confirmpassword} = req.body;
        email_ = email;
        oldpass_ = oldpassword;
        newpass_ = newpassword;
        conpass_ = confirmpassword;
        oldpass_ = crypto.createHash("md5").update(oldpass_).digest("hex");
        newpass_ = crypto.createHash("md5").update(newpass_).digest("hex");
        conpass_ = crypto.createHash("md5").update(conpass_).digest("hex");
        
        const error = validationResult(req);
        if(!error.isEmpty()){
          throw error;
        }

        const getemails = `
          SELECT email FROM users WHERE email = $1 and password = $2
          `;
        const params = [email_,oldpass_];
        const ems = await (await db.query(getemails, params)).rows;
        if (Object.keys(ems).length == 0)
        {
          er_ = "Your old password is wrong!";
          scs_ = 0;
        } else {
          if(newpass_ != conpass_) 
          {
            er_ = "Your new password & confirm password not match!";
            scs_ = 0;
          } else 
          {
            await allDAO.updatePassUser(newpass_,email_);
            er_ = 0;
            scs_ = "Your new password has changed!";
          };
        }; 
              
        divsign_ = "resetpassword";
        b_ = a_;
        res.render("dashboard",{
          sid : sid_,
          divsign : divsign_,
          email : email_,
          fullname : fullname_,
          verified : verified_,
          er : er_,
          scs : scs_,
          bc : b_,
          utype : utype_
        });
      } catch (error)
      {
        er_ = "Your format password is wrong, please make sure the password contains 8 or more characters with a mix of letters, numbers & symbols! ";
        divsign_ = "resetpassword";
        scs_ = 0;
        b_ = a_;
        res.render("dashboard",{
          sid : sid_,
          divsign : divsign_,
          email : email_,
          fullname : fullname_,
          verified : verified_,
          er : er_,
          scs : scs_,
          bc : b_,
          utype : utype_,
        });
      }; 
    } else if(a_ == "editprofile")
    {
      const {fullname,birthplace,phone,country,city,addr} = req.body;
      fullname_ = fullname;
      birthplace_ = birthplace;
      phone_ = phone;
      country_ = country;
      city_ = city;
      addr_ = addr;

      if(birthplace_ == "")
      {
        birthplace_ = "-";
      };

      if(phone_ == "")
      {
        phone_ = "-";
      };

      if(city_ == "")
      {
        city_ = "-";
      };

      if(addr_ == "")
      {
        addr_ = "-";
      };

      if(country_ == "-" || fullname_ == "-" || fullname_ == " -" || fullname_ == "- " || fullname_ == " - "  || fullname_ == "")
      {
        divsign_ = "profile";
            
        b_ = a_;
        if(fullname_ == "-" || fullname_ == " -" || fullname_ == "- " || fullname_ == " - "  || fullname_ == "" )
        {
          er_ = "Full name must have value!";
        } else if(country_ == "-")
        {
          er_ = "Country must have value!";
        }; 
        scs_ = 0;

        res.render('dashboard',{
          sid : sid_,
          divsign : divsign_,
          email : email_,
          birthplace : birthplace_,
          phone : phone_,
          addr : addr_,
          city : city_,
          country : country_,
          fullname : fullname_,
          verified : verified_,
          er : er_,
          scs : scs_,
          bc : b_,
          utype : utype_,  
        });
      } else 
      {
        await allDAO.updateProfile(email_,fullname_,birthplace_,phone_,addr_,city_,country_);
        res.redirect('/dash/profile/');
      }
    } else 
    {
      res.redirect('/dash/'+a_);
    }
  } else {
    res.redirect('/');
  };
};
  
const getLogout = async (req, res) => {
  res.redirect('/dash/logout/')
};

module.exports = {
    getHomes,
    getAuths,
    getAuth,
    getSign,
    postAuth,
    getSendmailgoogle,
    getSendGoogle,
    getSendmailotp,
    getResendotp,
    getSendotp,
    postForgot,
    getSendforgototp,
    getForgototp,
    getResendforgototp,
    getDashboard,
    getDash,
    postDash,
    getLogout
};