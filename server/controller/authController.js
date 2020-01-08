const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const sendMail = require("../utils/sendMail");
const util = require("util");
const redis = require("../utils/redis");

//Promisiying redis

redis.get = util.promisify(redis.get);
redis.set = util.promisify(redis.set);

//Utility method to sign JWT token

const signToken = async (user, res) => {
  var token = await redis.get(`user:${user._id}:jwt`);

  console.log(token, "jwt token from redis", typeof token);

  if (!token) {
    const cookieExpiresIn = process.env.COOKIE_EXPIRES_IN * 1;

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
    // maxAge:100000,
    httpOnly: true
  });

  res.status(200).json({
    status: "success",
    // token,
    user
  });
};

function sendResponse(status, data, res) {
  let statusMessage = toString(status).startsWith("2")
    ? "sucess"
    : toString(status).startsWith("4")
    ? "failed"
    : "error";
  res.status(status).json({
    status: statusMessage,
    data
  });
}

exports.signUp = async (req, res, next) => {
  //bring the role in req.role property
  var user;
  try {
    const incomingUser = {
      name: req.body.name,
      email: req.body.email,
      img: req.body.img,
      password: req.body.password
    };

    user = await User.create(incomingUser);

    if (!user) next(new Error("Cannot create a new user!"));

    req.user = user;

    await signToken(user, res);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      if (error.message.includes("email"))
        next(
          new Error(
            "Provided Email exists! Login or use a different Email Address"
          )
        );
      else
        next(
          new Error(
            "Provided Username Exists!. Please use a different User name"
          )
        );
    } else {
      next(new Error(`${error.message}`));
    }
  }
  await sendMail(
    user.email,
    `Hi ${user.name}`,
    `Thanks for joining my website. Hope you will enjoy it.`
  );
};

exports.login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }, "+password");
  console.log(user);
  if (
    !user ||
    !(await user.comparePassword(req.body.password, user.password))
  ) {
    console.log(user, "Debug");
    return next(new Error("Email or Password incorrect!"));
  }
  req.user = user;
  await signToken(user, res);
};

exports.logout = async (req, res, next) => {
  const token = "";
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 1),
    httpOnly: true
  });
  res.status(204).json({
    status: "success"
  });
};

exports.protect = async (req, res, next) => {
  const tk = req.cookies.jwt;
  console.log("Token", tk);
  if (
    !req.cookies.jwt &&
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer"))
  ) {
    return next(new Error("You are not authenticated!"));
  }
  let token = "";
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    token = req.headers.authorization.split(" ")[1];
  }
  //we can also check whether a token is valid or not
  if (!token) {
    //
    return next(new Error("Invalid token!"));
  }

  var userId = await redis.get(`jwt:${token}`);
  console.log(userId, "userId from redis");
  if (!userId) {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    userId = payload._id;
  }

  //check whether the password was changed after the token was issued

  //   console.log(payload, Date.now() / 1000);

  const user = await User.findById(userId).select("-__v");

  req.user = user;
  next();
};

exports.details = async (req, res, next) => {
  user = req.user;
  res.status(200).json({
    status: "success",
    user
  });
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
