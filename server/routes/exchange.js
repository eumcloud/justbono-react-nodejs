const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/controllers');

router.get('/', ctrl.eApi.getTest);

module.exports = router;