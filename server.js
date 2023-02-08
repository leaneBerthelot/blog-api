const express = require('express');
const app = express();
const port = 4001;

const db = require('./db');
db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = [
    { path: "/account", router: require("./src/account/router") },
    { path: "/blog", router: require("./src/blog/router") },
    { path: "/profile", router: require("./src/profile/router") }
];


routes.forEach(route => {
    app.use(route.path, route.router);

    console.log(`Route ${route.path} loaded`);
});

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});