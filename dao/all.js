const db = require('../db/postgres')


const createAllTable = async () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS public.users
    (
        user_id serial NOT NULL,
        email character varying(1000),
        password character varying,
        CONSTRAINT pk_user PRIMARY KEY (user_id)
    );

    CREATE TABLE IF NOT EXISTS public.user_activity
    (
        activity_id serial NOT NULL,
        user_id integer,
        status_login character varying(1000),
        date_login date DEFAULT CURRENT_DATE,
        date_logout date,
        CONSTRAINT pk_activity PRIMARY KEY (activity_id)
    );

    CREATE TABLE IF NOT EXISTS public.user_profile
    (
        profile_id serial NOT NULL,
        user_id integer,
        email character varying(1000),
        fullname character varying(1000),
        verified_account character varying(1000),
        verified_otp character varying(10),
        status character varying(100),
        join_date date,
        CONSTRAINT pk_profile PRIMARY KEY (profile_id)
    );

    ALTER TABLE IF EXISTS public.user_activity
        ADD CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID;


    ALTER TABLE IF EXISTS public.user_profile
        ADD CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID;
    `
    try{
        await db.query(sql)
        console.log("User All Table Created")
        return Promise.resolve()
    } catch(error){
        return Promise.resolve()
    }

}

const findUser = async(email) => {
    const text = `SELECT * FROM users WHERE email = $1`
    const values = [email]
    try {
        const find = (await db.query(text, values)).rows[0]
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const getDataLoginEmail = async(email) => {
    const text = `SELECT * FROM user_login WHERE email = $1`
    const values = [email]
    try {
        const find = (await db.query(text, values)).rows
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const getListUser = async() => {
    const text = `SELECT * FROM users`
    try {
        const find = (await db.query(text)).rows
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const getCountUser = async() => {
    const text = `SELECT count(email) FROM users`
    try {
        const find = (await db.query(text)).rows
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const getCountLogin = async() => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    if (date < 10)
    {
        date = "0"+date
    }
    let month = date_ob.getMonth()+1;
    if (month < 10)
    {
        month = "0"+month
    }
    let year = date_ob.getFullYear();
    date_now_ = year + "-" + month + "-" + date
    console.log(date_now_)
    console.log(date_ob)
    //console.log(dat_)

    const text = `SELECT count(email) FROM user_login where date_logins = $1`
    const values = [date_now_]
    try {
        const find = (await db.query(text,values)).rows
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const getCountAvgLogin = async() => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date_ = date_ob.getDate();
    let weekdate_ = date_ + 7
    if (date_ < 10)
    {
        date = "0"+date_
    } else {
        date = date_
    }

    if (weekdate_ < 10)
    {
        weekdate = "0"+weekdate_
    } else {
        weekdate = weekdate_
    }
    let month = date_ob.getMonth()+1;
    if(weekdate > 30)
    {
        months_ = date_ob.getMonth()+2;
    } else {
        months_ = date_ob.getMonth()+1;
    }

    if(months_ < 10)
    {
        months = "0" + months_
    } else {
        months = months_
    }
    if (month < 10)
    {
        month = "0"+month
    }
    let year = date_ob.getFullYear();
    date_now_ = year + "-" + month + "-" + date
    date_week_ = year + "-" + months + "-" + weekdate
    console.log(date_now_)
    console.log(date_week_)

    console.log(weekdate)

    const text = `SELECT count(email) FROM user_login where extract(hour from date_login) > extract(hour from now()) and extract(hour from date_login) < '168'`
    try {
        const find = (await db.query(text)).rows
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const getListLogin = async() => {
    const text = `SELECT * FROM user_login where status = 'login'`
    try {
        const find = (await db.query(text)).rows
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const getListLogout = async() => {
    const text = `SELECT * FROM user_login where status = 'logout'`
    try {
        const find = (await db.query(text)).rows
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const findEmailSession = async(sid) => {
    console.log(sid)
    const text = `SELECT email FROM user_login WHERE sessionid = $1`
    const values = [sid]
    try {
        const find = (await db.query(text, values)).rows[0]
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const findFullnameProfile = async(email) => {
    console.log(email)
    const text = `SELECT fullname FROM user_profile WHERE email = $1`
    const values = [email]
    try {
        const find = (await db.query(text, values)).rows[0]
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const findVerifiedProfile = async(email) => {
    console.log(email)
    const text = `SELECT verified_account FROM user_profile WHERE email = $1`
    const values = [email]
    try {
        const find = (await db.query(text, values)).rows[0]
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}


const findBirthplaceProfile = async(email) => {
    console.log(email)
    const text = `SELECT birthplace FROM user_profile WHERE email = $1`
    const values = [email]
    try {
        const find = (await db.query(text, values)).rows[0]
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}


const findPhoneProfile = async(email) => {
    console.log(email)
    const text = `SELECT phone FROM user_profile WHERE email = $1`
    const values = [email]
    try {
        const find = (await db.query(text, values)).rows[0]
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const findTypeProfile = async(email) => {
    console.log(email)
    const text = `SELECT user_type FROM user_profile WHERE email = $1`
    const values = [email]
    try {
        const find = (await db.query(text, values)).rows[0]
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}



const findAddrProfile = async(email) => {
    console.log(email)
    const text = `SELECT address FROM user_profile WHERE email = $1`
    const values = [email]
    try {
        const find = (await db.query(text, values)).rows[0]
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}


const findCityProfile = async(email) => {
    console.log(email)
    const text = `SELECT city FROM user_profile WHERE email = $1`
    const values = [email]
    try {
        const find = (await db.query(text, values)).rows[0]
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}



const findCountryProfile = async(email) => {
    console.log(email)
    const text = `SELECT country FROM user_profile WHERE email = $1`
    const values = [email]
    try {
        const find = (await db.query(text, values)).rows[0]
        console.log(find)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const findOtp = async(email) => {
    const text = `SELECT verified_otp FROM user_profile WHERE email = $1`
    const values = [email]
    try {
        const find = (await db.query(text, values)).rows[0]
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const checkHash = async(hashRoute, hashCode) => {
    const text = `SELECT variable_string FROM hash_rumus WHERE definisi_route = $1 and variable_hash = $2`
    const values = [hashRoute,hashCode]
    try {
        const find_ = (await db.query(text, values)).rows[0]
        const find = JSON.stringify(find_).substring(20).slice(0,-2)
        return find
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const insertHash = async(hashRoute, hashValue, hashCode) => {
    const quer = `
    INSERT INTO hash_rumus (definisi_route,variable_string,variable_hash)
    VALUES ($1,$2,$3)
    RETURNING *
    `
    const para = [hashRoute,hashValue,hashCode]
    try {
        const hash = await db.query(quer, para)
        return hash
    } catch (error)
    {
        return Promise.reject(error)
    }

}

const insertOtp = async(email, otp) => {
    verified_account = "not_verified"
    const quer = `
    UPDATE user_profile SET verified_otp = $1, 
                            verified_account = $2
    WHERE email = $3
    RETURNING *
    `
    const para = [otp,verified_account,email]
    try {
        const hash = await db.query(quer, para)
        return hash
    } catch (error)
    {
        return Promise.reject(error)
    }

}

const insertForgotOtp = async(email, otp) => {
    verified_account = "not_verified"
    valid_ = "not_verified"
    const quer = `
    UPDATE user_forgot SET forgot_token = $1,
    forgot_status = $2,
    forgot_valid = $3
    where forgot_id in (select max(forgot_id) 
    from user_forgot where email = $4)
    
    RETURNING *
    `
    const para = [otp,verified_account,valid_,email]
    try {
        const hash = await db.query(quer, para)
        return hash
    } catch (error)
    {
        return Promise.reject(error)
    }

}

const updateForgotVerified = async(email,status) => {
    
    valid_ = "verified"
    const quer = `
    UPDATE user_forgot SET 
    forgot_status = $1,
    forgot_valid = $2
    where forgot_id in (select max(forgot_id) 
    from user_forgot where email = $3)
    
    RETURNING *
    `
    const para = [status_,valid_,email]
    try {
        const hash = await db.query(quer, para)
        return hash
    } catch (error)
    {
        return Promise.reject(error)
    }

}

const updateVerified = async(email) => {
    verified_account = "verified"
    status_ = "active"
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth();
    let year = date_ob.getFullYear();
    date_now_ = year + "-" + month + "-" + date
    const quer = `
    UPDATE user_profile SET verified_account = $1,
    status = $2, join_date = $3
    WHERE email = $4
    RETURNING *
    `
    const para = [verified_account,status_,date_now_,email]
    try {
        const hash = await db.query(quer, para)
        return hash
    } catch (error)
    {
        return Promise.reject(error)
    }

}

const upgradePro = async(email) => {
    console.log('upgrade')
    status_ = "Pro"
    const quer = `
    UPDATE user_profile SET user_type = $1
    WHERE email = $2
    RETURNING *
    `
    const para = [status_,email]
    try {
        const hash = await db.query(quer, para)
        return hash
    } catch (error)
    {
        return Promise.reject(error)
    }

}

const insertOneProfileCheck = async(email,fullname) => {
    console.log("profile check")
    const text = `SELECT user_id FROM users WHERE email = $1`
      
    const values = [email]
    try {
        const checks = (await db.query(text, values)).rows[0]
        const check =  parseInt(JSON.stringify(checks).substring(11).slice(0,-1))//parseInt(JSON.stringify(checks).substring(11).substring(0,3))
        const profile = await insertOneProfile(check,fullname)
        return profile
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const insertOneProfile = async(user_id,fullname) => {
    const getemail = `
            SELECT email FROM users WHERE user_id = $1
            `
    const param = [user_id]
    const emails = (await db.query(getemail, param)).rows[0]
    const emai = JSON.stringify(emails).substring(10).slice(0,-2)
    const email = emai
    utype_ = "Newbie"
    const quer = `
    INSERT INTO user_profile (user_id,email,fullname,user_type)
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `
    const para = [user_id,email,fullname,utype_]
    try {
        const profile = await db.query(quer, para)
        const users = `
            SELECT * FROM users WHERE user_id = $1
            `
        const user = (await db.query(users, param)).rows[0]
        return user
    } catch (error)
    {
        return Promise.reject(error)
    }
}

const insertOneUser = async (email,password,fullname) => {
    console.log('insert user')
    console.log(email)
    const text = `
    INSERT INTO users (email,password,date_signup,time_signup)
    VALUES ($1,$2,current_date,CURRENT_TIMESTAMP)
    RETURNING *
    `
    const values = [email,password]

    try {
        const users = (await db.query(text, values)).rows[0]
        const user = await insertOneProfileCheck(email,fullname)
        return user
    } catch(error) {
        console.log(error)
        return Promise.reject(error)
    }
}

const insertActUser = async (email,sid,ip,browser,version,os) => {
    console.log('insert activity')
    console.log(email)
    
        console.log('log-1')
        status_ = "login"
        console.log(status_)
        const quer = `
        INSERT INTO user_login (email,sessionid,ip,date_login,browser,version,os,status,date_logins,time_login)
        VALUES ($1,$2,$3,now(),$4,$5,$6,$7,current_date,CURRENT_TIMESTAMP)
        RETURNING *
        `
        const values = [email,sid,ip,browser,version,os,status_]
    

    try {
        const users = (await db.query(quer, values)).rows[0]
        //const user = await insertOneProfileCheck(email,fullname)
        return users
    } catch(error) {
        console.log(error)
        return Promise.reject(error)
    }
}

const updateActUser = async (email,sid,ip,browser,version,os) => {
    console.log('insert activity')
    console.log(email)
    
        console.log('log-2')
        
        const quer = `
        UPDATE user_login SET date_logout = now(), time_logout = CURRENT_TIMESTAMP, date_logouts = current_date
        WHERE email = $1 and sid = $2 and ip = $3 and browser = $4 and version = $5 and os = $6
        RETURNING *
        `
        const values = [email,sid,ip,browser,version,os]
  

    try {
        const users = (await db.query(quer, values)).rows[0]
        //const user = await insertOneProfileCheck(email,fullname)
        return users
    } catch(error) {
        console.log(error)
        return Promise.reject(error)
    }
}

const updatePassUser = async (email,password) => {
    console.log('insert user')
    console.log(email)
    const text = `
    UPDATE users SET password = $1
    WHERE email = $2
    RETURNING *
    `
    const values = [password,email]

    try {
        const user = (await db.query(text, values)).rows[0]
        return user
    } catch(error) {
        console.log(error)
        return Promise.reject(error)
    }
}

const updateSessUser = async (email,ip,browser,version,os) => {
    console.log('update sess')
    console.log(email)
    status_ = "logout"
    const text = `
    UPDATE user_login SET 
    date_logout = now(),
    date_logouts = current_date,
    time_logout = CURRENT_TIMESTAMP,
    status = $1
    WHERE email = $2
    and ip = $3
    and browser = $4
    and version = $5
    and os = $6
    RETURNING *
    `
    const values = [status_,email,ip,browser,version,os]

    try {
        const user = (await db.query(text, values)).rows[0]
        return user
    } catch(error) {
        console.log(error)
        return Promise.reject(error)
    }
}

const updateProfile = async (email,fullname,birthplace,phone,addr,city,country) => {
    console.log('update profile')
    console.log(email)
    console.log(fullname)
    console.log(birthplace)
    console.log(phone)
    console.log(addr)
    console.log(city)
    console.log(country)
    const text = `
    UPDATE user_profile SET 
    fullname = $1,
    birthplace = $2,
    phone = $3,
    address = $4,
    city = $5,
    country = $6
    WHERE email = $7
    RETURNING *
    `
    const values = [fullname,birthplace,phone,addr,city,country,email]
    console.log(values)
    try {
        const user = (await db.query(text, values)).rows[0]
        console.log(user)
        return user
    } catch(error) {
        console.log(error)
        return Promise.reject(error)
    }
}



const insertForgotUser = async (email) => {
    console.log('insert forgot user')
    console.log(email)
    const text = `
    INSERT INTO user_forgot (email)
    VALUES ($1)
    RETURNING *
    `
    const values = [email]

    try {
        const user = (await db.query(text, values)).rows[0]
        return user
    } catch(error) {
        console.log(error)
        return Promise.reject(error)
    }
}

const findUserByEmail = async (email) => {
    const text = `SELECT * FROM users WHERE email = $1`
    const values = [email]

    try {
        const user = (await db.query(text, values)).rows[0]
        return user
    } catch (error) {
        return Promise.reject('error')
    }
}



module.exports = {
    createAllTable,
    insertOneUser,
    updatePassUser,
    findUserByEmail,
    findUser,
    findOtp,
    insertOneProfileCheck,
    insertOneProfile,
    insertHash,
    checkHash,
    insertOtp,
    updateVerified,
    insertForgotUser,
    insertForgotOtp,
    updateForgotVerified,
    insertActUser,
    updateActUser,
    findEmailSession,
    findBirthplaceProfile,
    findPhoneProfile,
    findAddrProfile,
    findCityProfile,
    findCountryProfile,
    findFullnameProfile,
    findVerifiedProfile,
    findTypeProfile,
    updateProfile,
    updateSessUser,
    getDataLoginEmail,
    upgradePro,
    getListUser,
    getListLogin,
    getListLogout,
    getCountUser,
    getCountLogin,
    getCountAvgLogin
}