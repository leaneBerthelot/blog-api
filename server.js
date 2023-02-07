const express = require('express');
const app = express();
const port = 4001;

const db = require('./db');
db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/account', require('./src/account/router'));
app.use('/blog', require('./src/blog/router'));
app.use('/profile', require('./src/profile/router'));

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});