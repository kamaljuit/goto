const Url = require("../models/Url");
const User = require("../models/User");

const sendResponse = (res, data, statusCode) => {
  res.status(statusCode).json({
    data
  });
};

const addSuggestedUrl = async (
  res,
  originalUrl,
  suggestedShortUrl,
  userId,
  random = true
) => {
  var shortUrl = await Url.findOne({ shortenedUrl: suggestedShortUrl });
  if (shortUrl) {
    if (random) {
      return false;
    }
    return sendResponse(
      res,
      {
        status: "fail",
        message: "Short Url Already exists"
      },
      400
    );
  } else {
    try {
      const urlData = await Url.create({
        originalUrl: originalUrl,
        shortenedUrl: suggestedShortUrl,
        addedBy: userId
      });
      return urlData;
    } catch (error) {
      console.log(error, error.stack);
      return sendResponse(
        res,
        {
          status: "error",
          message: "Cannot Create ShortUrl"
        },
        500
      );
    }
  }
};

exports.redirectUrl = async (req, res, next) => {
  const { shortUrl } = req.params;
  const completeShortUrl =
    req.protocol + "://" + req.get("host") + "/s/" + shortUrl;
  console.log(completeShortUrl);
  const urlData = await Url.findOne({ shortenedUrl: completeShortUrl });
  if (urlData) {
    urlData.hits += 1;
    console.log(urlData);
    await urlData.save();
    return res.redirect(302, urlData.originalUrl);
  } else {
    return res.redirect(301, `http://${req.get("host")}/home`);
  }
};

exports.getUrlList = async (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  const user = await User.findById(userId).populate({
    path: "urls"
  });

  if (user.urls.length > 0) {
    return sendResponse(res, user.urls, 200);
  } else {
    return sendResponse(res, [], 200);
  }
};

exports.addUrl = async (req, res, next) => {
  console.log(req.get("host"), "debug");
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (!userId) return next(new Error("Not Authorized!"));
  var originalUrl = req.body.originalUrl;
  if (!originalUrl)
    return res.status(400).json({
      status: "fail",
      message: "Original URL not provided!"
    });
  var { suggestedShortUrl } = req.body;

  //If the user provides a suggestion

  if (suggestedShortUrl) {
    const urlData = await addSuggestedUrl(
      res,
      originalUrl,
      suggestedShortUrl,
      userId,
      (random = false)
    );
    user.urls.push(urlData._id);
    await user.save();
    return sendResponse(res, urlData, 201);
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
      var completeShortUrl =
        req.protocol + "://" + req.get("host") + "/s/" + suggestedShortUrl;
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
        return sendResponse(res, urlData, 201);
      }
      num += 1;
    }
  }
};

//TODO add error code for url exists error
