const Company = require("../Models/company")
const formidable = require('formidable')
const fs = require("fs");
const _ = require("lodash");

exports.addCompany = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;
    form.parse(req, (err, fields, file)=> {
        if(err){
            return res.status(400).json({
                error: "Issue with the image"
            })
        }

        const { name, description, contact, email, state, city } = fields;
        if(!name || !description || !contact || !email || !state || !city){
            return res.status(400).json({
                error: "Please include all fields"
            })
        }

        
        Company.findOne({ name: fields.name }, (err, comp) => {
            if (comp) {
                console.log("D")
              return res.status(400).json({
                error: "Name already in use"
              })
            } else{
                Company.findOne({ email: fields.email }, (err, comp) => {
                    if (comp) {
                      return res.status(400).json({
                        error: "Email already in use"
                      })
                    } else {
                        let company = new Company(fields)
        
                if(file.logo){
                    if(file.logo.size > 1048576){
                        return res.status(400).json({
                            error: "File size should be less than 1 Mb"
                        })
                    } 
                        company.logo.data = fs.readFileSync(file.logo.path)
                        company.logo.contentType = file.logo.type
                }  
                company.save((error, company)=>{
                    if(error){
                        res.status(400).json({
                            error: "Failed to save company details"
                        })
                    }
                    return res.json(company)
                })
                    }
                })
            }
        })
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

exports.getAllAscCompanies =(req, res)=> {
    Company.find()
        .select("-logo")
        .sort({name: "asc"})
        .exec((error, companies)=>{
            if(error){
                return res.status(400).json({
                    error: "No companies found in DB"
                })
            }
            res.json(companies)
        })
}

exports.getAllDscCompanies =(req, res)=> {
    Company.find()
        .select("-logo")
        .sort({name: "desc"})
        .exec((error, companies)=>{
            if(error){
                return res.status(400).json({
                    error: "No companies found in DB"
                })
            }
            res.json(companies)
        })
}

exports.getLogo = (req,res,next) => {
    if(req.company.logo.data){
        res.set("Content-Type",req.company.logo.contentType)
        return res.send(req.company.logo.data)
    }
    next()
}