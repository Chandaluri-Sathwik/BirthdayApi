const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const bdaySchema=new Schema({
    name:{
        type:String,
        required:true
    },
    bdayDate:{
        type:Number,
        required:true
    },
    bdayMonth:{
        type:Number,
        required:true
    },
    bdayYear:{
        type:Number,
        required:true
    },
    diff:{
        type:Number,
        required:true
    }
},{timestamps:true});

const Bday=mongoose.model('Bday',bdaySchema);
module.exports=Bday;

