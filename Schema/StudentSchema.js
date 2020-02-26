const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const Students = new Schema({
    Name: {
        type: String,
        required: true,
        trim : true
    },
    Regno : {
        type: Number,
        required: true,
        trim: true,
        min : 100000000000,
        max : 999999999999
    },
    Department : {
        type: String,
        required: true,
        trim: true
    },
    DOB : {
        type: Date,
        default: Date.now,
        required:true
    },
    DOJ :{
        type: Date,
        default: Date.now,
        required:true
    },
   
    Gender : {
        type: String,
        required: true,
        trim: true
    },
    Section : {
        type: String,
        required: true,
        trim : true
    },
   Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('students', Students); 