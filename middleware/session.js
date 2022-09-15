require('dotenv').config()

const express = require('express')
const session = require('express-session')
const { MemoryStore } = require('express-session')
const sessionStorage = new MemoryStore()

module.exports = session ({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    store: sessionStorage,
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60
    }
})