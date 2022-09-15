const nodemailer = require('nodemailer')

async function sendMail2Requestor(email_,otp_) {
    let transporter = nodemailer.createTransport({
        host: "mail.aidiacreative.com",
        sendmail: true,
        port: 465,
        secure: true, // use TLS
        logger: true,
        debug: true,
        auth: {
          user: "aic@aidiacreative.com",
          pass: "AICJakarta202!",
        }
      });

      from_email = "aic@aidiacreative.com"
    
      const options = {
        from : from_email,
        to : email_,
        subject : "Account Verification",
        text : "Welcome to rizki sites, thank you for you interesting to join with our sites. Please don't share your token with everyone including rizki sites. Your account is not active, please verify account with OTP and your OTP is " + otp_
    }

    

    return await transporter.sendMail(options).then(success => 'Successful!').catch(err => 'Uncessfull!')

}

module.exports = { sendMail2Requestor }