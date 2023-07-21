require('dotenv').config()
const validator = require('validator')
const mongoose = require('mongoose')

async function DBConnection(){
    await mongoose.connect(process.env.DATABASE);
    console.log('connected');
}

module.exports = { DBConnection }