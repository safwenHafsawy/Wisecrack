const express = require('express');
const user_cntrl= require('../controllers/userCntrl');
const router = express.Router();

router.post('/login', user_cntrl.login);
router.post('/signup', user_cntrl.signup);

module.exports = router;