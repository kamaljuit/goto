const Url = require("../models/Url");
const User = require("../models/User");
const validator = require("validator");
const sendResponse = require("../utils/sendResponse");
const AppError = require("../utils/appError");

//--------------Utility to Add Suggested URl ------------
const addSuggestedUrl = async (res, originalUrl, suggestedShortUrl, userId) => {
  try {
    const urlData = await Url.create({
      originalUrl: originalUrl,
      shortenedUrl: suggestedShortUrl,
      addedBy: userId
    });
    return urlData;
  } catch (error) {
    console.log(error);

    return sendResponse(res, 500, null, error.message);
  }
};

//------------Redirect Utility ------------------

exports.redirectUrl = async (req, res, next) => {
  const { shortUrl } = req.params;
  const completeShortUrl = process.env.APP_URL + "/s/" + shortUrl;

  console.log(completeShortUrl);
  const urlData = await Url.findOne({ shortenedUrl: completeShortUrl });
  if (urlData) {
    urlData.hits += 1;
    console.log(urlData);
    await urlData.save();
    return res.redirect(302, urlData.originalUrl);
  } else {
    return res.redirect(301, `${process.env.APP_URL}/home`);
  }
};

//--------------Get the list of Url-----------------
exports.getUrlList = async (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  const user = await User.findById(userId).populate({
    path: "urls"
  });

  if (user.urls.length > 0) {
    return sendResponse(res, 200, user.urls);
  } else {
    return sendResponse(res, 200, []);
  }
};

//------------------Add Short Url----------------------

exports.addUrl = async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!userId) return next(new Error("Not Authorized!"));
  var originalUrl = req.body.originalUrl;
  if (!originalUrl) return next(new AppError("Original Url Not Provided", 400));
  else {
    if (!validator.default.isURL(originalUrl)) {
      return next(new AppError("Original URL not valid!", 400));
    }
  }

  if (!(originalUrl.includes("http://") || originalUrl.includes("https://"))) {
    originalUrl = "http://" + originalUrl;
  }

  var { suggestedShortUrl } = req.body;

  //If the user provides a suggestion
  if (suggestedShortUrl && suggestedShortUrl.includes("http")) {
    return next(new AppError("Just provide the last piece!", 400));
  }
  if (suggestedShortUrl) {
    console.log("Here!");
    const completeShortUrl = process.env.APP_URL + "/s/" + suggestedShortUrl;

    var shortUrl = await Url.findOne({ shortenedUrl: completeShortUrl });
    if (shortUrl) {
      return next(new AppError("Suggested Url Exists! Try another!", 400));
    } else {
      const urlData = await addSuggestedUrl(
        res,
        originalUrl,
        completeShortUrl,
        userId
      );
      if (urlData) {
        user.urls.push(urlData._id);
        await user.save();
        return sendResponse(res, 201, urlData);
      }
    }
  }
  //If user do not provides a suggestion
  else {
    function randomStr(len, arr) {
      var ans = "";
      for (var i = len; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
      }
      return ans;
    }
    var num = 4;
    while (true) {
      var suggestedShortUrl = randomStr(num, "abcde12345abcde12345");
      var completeShortUrl = process.env.APP_URL + "/s/" + suggestedShortUrl;
      const urlData = await addSuggestedUrl(
        res,
        originalUrl,
        completeShortUrl,
        userId
      );
      if (urlData) {
        user.urls.push(urlData._id);
        await user.save({
          validateBeforeSave: false
        });
        return sendResponse(res, 201, urlData);
      }
      num += 1;
    }
  }
};

//TODO add error code for url exists error
