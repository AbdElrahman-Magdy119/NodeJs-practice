const mongoose =require('mongoose')
const postschema = new mongoose.Schema({
    title : String,
    body : String,
    auther: {type:mongoose.Schema.Types.ObjectId,ref:"user"},
})

const postmodel = mongoose.model('post',postschema)

module.exports = postmodel