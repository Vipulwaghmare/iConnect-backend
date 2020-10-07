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

exports.getCompanyById = (req, res, next , id) => {
    Company.findById(id)
        .exec((error, company)=>{
            if(error){
                return res.status(400).json({
                    error: "Company not found"
                })
            }
            req.company = company;
            next()
        })
}

exports.getACompany = (req, res)=> {
    return res.json(req.company)
}

exports.editCompany=(req, res)=> {

} 

exports.deleteCompany =(req, res) => {
    // Need to change below line
    Company.findByIdAndDelete(req.company._id)
        .exec((error, comp)=>{
            if(error){
                return res.json({
                    error: "Delete Company Failed"
                })
            }
            return res.json({
                message: "Deletion of company is successful",
                comp
            })
        })
}

exports.getAllCompanies =(req, res)=> {
    Company.find()
        .select("-logo")
        .exec((error, companies)=>{
            if(error){
                return res.status(400).json({
                    error: "No companies found in DB"
                })
            }
            res.json(companies)
        })
}