const express = require('express')
const router = express.Router()
const { check } = require('express-validator');

const { addCompany } = require('../Controller/company')

router.post('/addCompany',[
    
],addCompany)

module.exports = router