const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true,
  },
  content: {
    type: String,
    minLength: 80,
    required: true,
  },
  author: {
    type: String,
    minLength: 5,
    required: true,
  },
  url: String,
  likes: Number,
  created_at: Date,
  updated_at: Date,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
