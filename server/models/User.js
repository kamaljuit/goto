const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "A user must have a name!"],
    trim: true,
    unique: true,
    minlength:[3,"A name cannot be smaller than 3 characters!!"]
  },
  email: {
    type: String,
    required: [true, "A user must have an Email Address!"],
    trim: true,
    unique: true
  },
  img: String,
  urls: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room"
    }
  ],
  password: {
    type: String,
    minlength: [8, "A password must be more than 8 characters long!"],
    trim: true,
    required: [true, "A password is required!"],
    select: false
  },
  membership:{
      type:String,
      enum:["free","silver","gold","platinum"],
      required:[true,"User must have a subscription plan"],
      default:"free"
  }
});

UserSchema.pre("save", async function(next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
