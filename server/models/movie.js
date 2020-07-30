const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    review:{
        type:String,
        default:'n/a'
    },
    length:{
        type:String,
        default:'n/a'
    },
    rating:{
        type:Number,
        require:true,
        min:1,
        max:5
    },
    price:{
        type:String,
        default:'n/a'
    },
    ownerId:{
        type:String,
        required:true
    }
},{timestamps:true})


const Movie = mongoose.model('Movie',movieSchema)

module.exports = {Movie}