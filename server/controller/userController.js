const Url = require("../models/Url");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const sendResponse = (res, data, statusCode) => {
  res.status(statusCode).json({
    data
  });
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  sendResponse(res, users, 200);
};

// exports.addUser = async (req, res, next) => {
//   const user = req.body;
//   try {
//     const newUser = await User.create(user).catch(errror => {
//       console.log(errror);
//     });
//     sendResponse(res, newUser, 201);
//   } catch (errror) {
//     console.log(errror);
//     next(new AppError("Error occurred while adding the user", 400));
//   }
// };

exports.updateUserSubscription = async (req, res, next) => {
  //ID will only be available if the user is authenticated
  const userID = req.user._id;
  const { membership } = req.body;
  if (!membership)
    return next(
      new Error(
        "No member ship provided with the Patch request to update membership!"
      )
    );
  try {
    const user = await User.findById(userID);
    user.membership = membership;
    await user.save();
    sendResponse(res, user, 201);
  } catch (error) {
    next(error);
  }
};


