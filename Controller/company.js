const Company = require("../Models/company")

exports.addCompany = (req, res) => {

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