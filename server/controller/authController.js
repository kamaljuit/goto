/**
 * Authentication Controller to authenticate the users, create new User, Route protection
 *
 * JWT Caching using Redis for faster authentication
 *
 * FUTURE TODO ==> Complete Google's OAuth Integration, Password Reset Feature, Password Confirmation
 *
 */

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const sendMail = require("../utils/sendMail");
const util = require("util");
const redis = require("../utils/redis");
const sendResponse = require("../utils/sendResponse");
const AppError = require("../utils/appError");
//Promisiying redis

redis.get = util.promisify(redis.get);
redis.set = util.promisify(redis.set);

//Utility method to sign JWT token
const signToken = async (user, res) => {
  var token = await redis.get(`user:${user._id}:jwt`);

  const cookieExpiresIn = process.env.COOKIE_EXPIRES_IN * 1;

  //If jwt token is not found in Redis we sign the token
  if (!token) {
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
    token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: jwtExpiresIn
    });
    //Set the jwt
    // redis.hset(`user:${user._id}`, "jwt",`${jwt}`);
    /*
  Not using hset as we cannot set expire on hset
  */

    await redis.set(
      `user:${user._id.toString()}:jwt`,
      `${token}`,
      "EX",
      cookieExpiresIn * 24 * 60 * 60
    );

    await redis.set(
      `jwt:${token}`,
      `${user._id}`,
      "EX",
      cookieExpiresIn * 24 * 60 * 60
    );
  }

  res.cookie("jwt", token, {
    maxAge: cookieExpiresIn * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true
  });
  user.password = undefined;
  sendResponse(res, 200, user);
};

//------------Create A New User---------------------

exports.signUp = async (req, res, next) => {
  var user;
  try {
    const incomingUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    console.log(incomingUser);
    //Data Validation before data is tried to be save to the database
    if (
      !(
        typeof incomingUser.name === "string" &&
        incomingUser.name.trim().length > 0 &&
        typeof incomingUser.email === "string" &&
        incomingUser.email.trim().length > 0 &&
        typeof incomingUser.password === "string" &&
        incomingUser.password.trim().length > 0
      )
    ) {
      next(new AppError("Invalid Input Data!", 400));
    }

    user = await User.create(incomingUser);
    req.user = user;
    await signToken(user, res);
    await sendMail(
      user.email,
      `Hi ${user.name}`,
      `Thanks for joining my website. Hope you will enjoy it.`
    );
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      if (error.message.includes("email"))
        next(
          new AppError(
            "Provided Email exists! Login or use a different Email Address",
            400
          )
        );
      else
        next(
          new AppError(
            "Provided Username Exists!. Please use a different User name",
            400
          )
        );
    } else {
      next(new AppError(`${error.message}`, 500));
    }
  }
};

//-------------------Authenticate the User -------------------

exports.login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }, "+password");
  console.log(user);
  if (
    !user ||
    !(await user.comparePassword(req.body.password, user.password))
  ) {
    return next(new AppError("Email or Password incorrect!", 401));
  }
  req.user = user;
  await signToken(user, res);
};

//-------------- Logout the User -----------------------------

exports.logout = async (req, res, next) => {
  //Note that I am not removing jwt token from redis
  const token = "";
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 1),
    httpOnly: true
  });

  sendResponse(res, 204, null);
};

//----------------Route Protection ------------------------------

exports.protect = async (req, res, next) => {
  if (
    !req.cookies.jwt &&
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer"))
  ) {
    return next(new AppError("You are not authenticated!", 401));
  }
  let token = "";
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    token = req.headers.authorization.split(" ")[1];
  }
  //we can also check whether a token is valid or not
  if (!token) {
    return next(new AppError("Invalid token!", 401));
  }

  var userId = await redis.get(`jwt:${token}`);
  console.log(userId, "userId from redis");
  if (!userId) {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    userId = payload._id;
  }

  //check whether the password was changed after the token was issued

  const user = await User.findById(userId).select("-__v -password");

  req.user = user;
  next();
};

exports.providerAuth = (req, res, next) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  console.log("Inside providerAuth");
  // console.log(req.params.provider,req.params,req);
  if (req.params.provider === "google") {
    const token = req.headers["authorization"];
    console.log(token);
    client
      .verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID })
      .then(response => {
        console.log("Response from the server", response);
        const { email_verified, name, email } = response.payload;
        const user = {
          email,
          name,
          _id: 1234
        };

        res.status(200).send({
          status: "success",
          user
        });
      });
  }
};
