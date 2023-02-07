const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Get all Profile');
});


module.exports = router;