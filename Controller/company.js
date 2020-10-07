const Company = require("../Models/company")
const { validationResult } = require('express-validator');
const formidable = require('formidable')
const fs = require("fs");

exports.addCompany = (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
        const company = new Company(req.body.fields)
        company.save((error, company)=> {
            if(error){
                res.status(400).json({
                    error: "Failed to save company details"
                })
            }
            res.json(company)
        })  
}

exports.editCompany=(req, res)=> {

} 

exports.deleteCompany =(req, res) => {

}

exports.getAllCompanies =(req, res)=> {

}