const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: Buffer,
        // required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Company", companySchema)