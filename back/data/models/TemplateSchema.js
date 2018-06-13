//Require Mongoose

import mongoose from 'mongoose'

//Define a schema
let Schema = mongoose.Schema;

const TemlateSchema = new Schema({
    id: String,
    name: String,
    width: String,
    height: String,
    pages: [{
        url: String,
    }],
    uri:String,
    data:[{
        id: String,
        label: String,
        val: String,
    }],
    rects:[{
        id: String,
        page: Number,
        style: String,
    }],
    
});

module.exports = TemlateSchema;