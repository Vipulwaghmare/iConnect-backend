const express = require('express')
const router = express.Router()
const { check, body } = require('express-validator');
const formidable = require('formidable')
const Company = require('../Models/company')

const { addCompany, getCompanyById, getCompanyByName ,editCompany, deleteCompany, getAllCompanies, getAllAscCompanies, getAllDscCompanies } = require('../Controller/company')

router.param("companyId", getCompanyById)

router.post('/addCompany',(req, res, next)=> {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;

    form.parse(req, (err, fields, file)=> {
        if(err){
            return res.status(400).json({
                error: "Issue with the image"
            })
        }
        if(file.logo){
            req.body.logo = file.logo
            if(file.logo.size > 1048576){
                return res.status(400).json({
                    error: "File size should be less than 1 Mb"
                })
            }
            req.logo.data = fs.readFileSync(file.logo.path)
            req.logo.contentType = file.logo.type
        }
        req.body.name = fields.name
        req.body.email = fields.email
        req.body.fields = fields
    })
    next()
},[
    body('name')
        .custom(value=>{
            return Company.findOne({name: value}).then(co => {
                if(co){
                    throw new Error('Name already in use')
                }
            })
        }),
    check('email')
        .custom(value=>{
            return Company.findOne({email: value}).then(co => {
                if(co){
                    console.log("her")
                    throw new Error('E-mail already in use')
                }
            })
        })
],addCompany)

router.post("/getCompanyByName" , getCompanyByName)

router.put('/editCompany/:companyId',editCompany)

router.delete('/deleteCompany/:companyId', deleteCompany)

router.get('/getAllCompanies', getAllCompanies)
router.get('/getAllAscCompanies', getAllAscCompanies)
router.get('/getAllDscCompanies', getAllDscCompanies)

module.exports = router