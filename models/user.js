const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

// Declaring Collection
//** const FileName = mongoose.model('CollectionName',SchemaMethod) */

const User = mongoose.model('User',userSchema)

module.exports = User;