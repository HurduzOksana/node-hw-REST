const app = require("./app");
const mongoose = require("mongoose");
const { URL, PORT = 3000 } = process.env;
mongoose.set("strictQuery", true);

mongoose
  .connect(URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
