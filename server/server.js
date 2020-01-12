const mongoose = require("mongoose");
const dotenv = require("dotenv");
if (process.env.NODE_ENV === "development") {
  dotenv.config({
    path: "./dev-config.env"
  });
}

const app = require("./app");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log("MongoDB connection successful");
  });

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(process.env.APP_URL, process.env.NODE_ENV);
});
