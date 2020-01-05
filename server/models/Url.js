const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator')
const UrlSchema = new Schema({
  originalUrl: {
    type: String,
    required: [true, "Original Url is required!"],
    trim: true,
    unique: true,
    minlength:[3,"A url cannot be smaller than 3 characters!!"],
    validate:{
        validator:validator.isURL(url),
        message: 'Invalid URL'
    }
  },
    shortenedUrl: {
    type: String,
    required: [true, "Shortened Url is required!"],
    trim: true,
    unique: true,
    minlength:[3,"A url cannot be smaller than 3 characters!!"],
    validate:{
        validator:validator.isURL(url),
        message: 'Invalid URL'
    }
  },
  addedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});


const Url = mongoose.model("Url", UrlSchema,"urls");

module.exports = Url;
