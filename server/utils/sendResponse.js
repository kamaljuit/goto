//Utility method to send consistent response via the API
// Following jsend JSON format for the API responses

function sendResponse(res, statusCode, data, message = undefined) {
  let statusMessage = toString(statusCode).startsWith("2")
    ? "sucess"
    : toString(statusCode).startsWith("4")
    ? "failed"
    : "error";

  if (statusCode === 500) data = undefined;
  res.status(statusCode).json({
    status: statusMessage,
    message,
    data
  });
}
module.exports = sendResponse;
