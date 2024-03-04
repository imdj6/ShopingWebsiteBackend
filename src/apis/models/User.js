const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
require("dotenv").config()

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    // role:{
    //     type:String,
    //     required:true
    // },
    createdAt: { type: Date, default: Date.now },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
   
  
});

userSchema.methods.generateToken=async function(){
    try {
        const tokenuser =jwt.sign({_id:this._id.toString()},process.env.KEY , { expiresIn: '2h' });
          this.tokens =this.tokens.concat({token:tokenuser})
          await this.save();
        return tokenuser
    } catch (error) {
      console.log(error)  
    }
}

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password =await bcrypt.hash(this.password,10);
    }
    next();
})


const User = mongoose.model('User', userSchema);

module.exports = User;
