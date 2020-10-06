const Company = require("../Models/company")
const { validationResult } = require('express-validator');

exports.addCompany = (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

    const company = new Company(req.body)

    company.save((error, company)=> {
        if(error){
            return res.status(400).json({
                error: "Failed to save company details"
            })
        }
        return res.json(company)
    })
}