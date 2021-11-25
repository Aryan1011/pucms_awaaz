const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    roll : {
        type: String,
        unique: true,
        required : true
    },
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    department : {
        type : String
    },
    gender : String,
    status : String,
    post : {
        type : String
    },
    subject : {
        type : String,
    },
    detail : {
        type : String,
    }
})

const Complaintdb = mongoose.model('complaintdb', schema);

module.exports = Complaintdb;