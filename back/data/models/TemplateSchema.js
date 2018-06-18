// Require Mongoose

import mongoose from 'mongoose';

// Define a schema
const { Schema } = mongoose;

const TemlateSchema = new Schema({
  id: String,
  name: String,
  width: String,
  height: String,
  pages: [{
    url: String,
  }],
  uri: String,
  data: [{
    id: Number,
    label: String,
    val: String,
  }],
  rects: [{
    id: Number,
    page: Number,
    style: String,
  }],

});

module.exports = TemlateSchema;
