const express = require('express')
const router = express.Router()
const { check } = require('express-validator');
const Company = require('../Models/company')

const { addCompany } = require('../Controller/company')

router.post('/addCompany',[
    check('name')
        .custom(value=>{
            return Company.findOne({name: value}).then(co => {
                if(co){
                    return Promise.reject('Name already in use')
                }
            })
        }),
    check('email')
        .isEmail()
        .withMessage("Should be a valid Email")
        .custom(value=>{
            return Company.findOne({email: value}).then(co => {
                if(co){
                    return Promise.reject('E-mail already in use')
                }
            })
        })
],addCompany)

module.exports = router