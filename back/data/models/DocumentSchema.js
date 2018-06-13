// Require Mongoose
import mongoose from 'mongoose';

// Define a schema
const { Schema } = mongoose;

const DocumentSchema = new Schema({
  name: String,
  templateId: Schema.Types.ObjectId,
  rects: [{
    id: String,
    value: String,
  }],
  uri: String,
});

module.exports = DocumentSchema;
