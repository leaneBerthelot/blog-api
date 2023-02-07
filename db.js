const mongoose = require("mongoose").default;

mongoose.set('strictQuery', false);

const connect = () => {
    mongoose
        .connect('mongodb://127.0.0.1:27017/blog', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Database connected');
        }).catch((err) => {
            console.log("Error connecting to MongoDB", err);
        });
};

module.exports = {
    connect
};
