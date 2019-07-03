const router = require('express').Router();
const admin = require('./controller/admin.controller');
const BaseResponse = require('../utils/response');

router.use('/admin', admin);

router.get('/', (req, res) => res.json(BaseResponse.sendSuccess('Api is running..!')));

module.exports = router;
