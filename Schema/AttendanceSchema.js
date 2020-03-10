const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Attendacne = new Schema({
    _id: Object,
    Date: {
        type: Date,
        default: Date.now
    },
    Regno: {
        type: Number,
        required: true,
        trim: true,
        min: 100000000000,
        max: 999999999999
    },
    isPresent: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: true
    },
    Section:{
        type:String,
        required:true
    },
    Year: {
        type: String,
    }
});

module.exports = mongoose.model('attendance', Attendacne); 