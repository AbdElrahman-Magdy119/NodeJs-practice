const mongoose =require('mongoose')
const userschema = new mongoose.Schema({
    firstname:{type:String,minlength:4,require:true},
    lastname : String,
    email:{type:String,unique:true,match:/.+@.+\..+/},
    password :{ type: String },
    token:{ type: String }
})

 userschema.methods.getname = function (){
    return this.firstname +" "+this.lastname
 }
  
 userschema.statics.findbyname = function (fullname,cb) {
    const [firstname,lastname] = fullname.split(" ")
    this.find({firstname:firstname,lastname:lastname},cb)
 }

 userschema.statics.findbyidd = function (id,cb) {
    //const [firstname,lastname] = fullname.split(" ")
    this.find({_id:id},cb)
 }

const usermodel = mongoose.model('user',userschema)

module.exports = usermodel