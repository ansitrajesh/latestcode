const router = require('express').Router();
const login = require('./controller/login');
const register = require('./controller/register');
const BaseResponse = require('../utils/response');

router.use('/login', login);
router.use('/register', register);

router.get('/', (req, res) => res.json(BaseResponse.sendSuccess('Api is running..!')));

module.exports = router;
