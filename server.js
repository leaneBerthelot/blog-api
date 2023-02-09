const express = require("express");
const authenticate = require("./middlewares/authenticate");
require("dotenv").config();
require("./db").connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = [
    {
        path: "/account",
        router: require("./src/account/router"),
        secure: false,
    },
    { path: "/blog", router: require("./src/blog/router"), secure: true },
    { path: "/profile", router: require("./src/profile/router"), secure: true },
];

routes.forEach((route) => {
    if (route.secure) {
        return app.use(route.path, authenticate, route.router);
    }

    app.use(route.path, route.router);
});

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});
