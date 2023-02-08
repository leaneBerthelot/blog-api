const mongoose = require("mongoose").default;

mongoose.set("strictQuery", false);

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
    });
};

module.exports = {
  connect,
};
