// Require Mongoose
import mongoose from 'mongoose';

// Define a schema
const { Schema } = mongoose;
const DocumentSchema = new Schema({
  id: String,
  name: String,
  // templateId: Schema.Types.ObjectId,
  templateId: String,
  rects: [{
    id: String,
    value: String,
  }],
  uri: String,
});

module.exports = DocumentSchema;
