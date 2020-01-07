const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validatorjs = require("validatorjs");
const UrlSchema = new Schema({
  originalUrl: {
    type: String,
    required: [true, "Original Url is required!"],
    trim: true,
    // unique: true,
    minlength: [3, "A url cannot be smaller than 3 characters!!"],
    validate: {
      validator: function(url) {
        let validation = new validatorjs(url, URL);

        return validation.passes();
      },
      message: "Invalid URL"
    }
  },
  shortenedUrl: {
    type: String,
    required: [true, "Shortened Url is required!"],
    trim: true,
    unique: true,
    minlength: [3, "A url cannot be smaller than 3 characters!!"],
    validate: {
      validator: function(url) {
        let validation = new validatorjs(url, URL);

        return validation.passes();
      },
      message: "Invalid URL"
    }
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  hits: {
    type: Number,
    default: 0
  }
});

const Url = mongoose.model("Url", UrlSchema, "urls");

module.exports = Url;
