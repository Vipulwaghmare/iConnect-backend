const express = require('express')
const router = express.Router()
const { addCompany, getCompanyById, getCompanyByName ,editCompany, deleteCompany, getAllCompanies, getAllAscCompanies, getAllDscCompanies, getLogo } = require('../Controller/company')

router.param("companyId", getCompanyById)

router.post('/addCompany', addCompany)

router.post("/getCompanyByName" , getCompanyByName)

router.put('/editCompany/:companyId',editCompany)

router.delete('/deleteCompany/:companyId', deleteCompany)

router.get('/getAllCompanies', getAllCompanies)
router.get('/getAllAscCompanies', getAllAscCompanies)
router.get('/getAllDscCompanies', getAllDscCompanies)
router.get('/logo/:companyId', getLogo)

module.exports = router