const express = require('express')
const router = express.Router()
const { addCompany, getCompanyById, getCompanyByName ,editCompany, deleteCompany, getAllCompanies, getAllAscCompanies, getAllDscCompanies, getLogo } = require('../Controller/company')

// Param
router.param("companyId", getCompanyById) 

// To create a new company
router.post('/addCompany', addCompany)

// For search
router.post("/getCompanyByName" , getCompanyByName)

// TO edit a company
router.put('/editCompany/:companyId',editCompany)

// Delete a company
router.delete('/deleteCompany/:companyId', deleteCompany)

// Get all companies in ascending and descending order as per need
router.get('/getAllCompanies', getAllCompanies) 
router.get('/getAllAscCompanies', getAllAscCompanies)
router.get('/getAllDscCompanies', getAllDscCompanies)

// middleware to get logo
router.get('/logo/:companyId', getLogo)

module.exports = router