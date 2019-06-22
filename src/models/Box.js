const mongoose = require('mongoose');

const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    user:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    files:[ {  type: mongoose.Schema.Types.ObjectId, ref: "File" }]
},{
    timestamps:true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

module.exports = mongoose.model('Box', Box);