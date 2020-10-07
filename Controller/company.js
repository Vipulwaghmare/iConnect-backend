const Company = require("../Models/company")
const { validationResult } = require('express-validator');
const formidable = require('formidable')
const fs = require("fs");
const _ = require("lodash");

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

exports.getCompanyByName = (req, res)=> {
    Company.find({name: req.body.name}).exec((error, company)=> {
        if(error || company.length === 0){
            return res.status(400).json({
                error: "No company found by given name"
            })
        }
        return res.json(company)
    })
}

exports.editCompany=(req, res)=> {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;

    form.parse(req, (err, fields, file)=> {
        if(err){
            return res.status(400).json({
                error: "Issue with the image"
            })
        }
        
        let company = new Company(req.company)
        company = _.extend(company, fields)
        if(file.logo){
            req.body.logo = file.logo
            if(file.logo.size > 1048576){
                return res.status(400).json({
                    error: "File size should be less than 1 Mb"
                })
            }
            company.logo.data = fs.readFileSync(file.logo.path)
            company.logo.contentType = file.logo.type
        }
        company.save((error, company)=> {
            if(error){
                res.status(400).json({
                    error: "Failed to update company details"
                })
            }
            res.json(company)
        })  
    }) 
        
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