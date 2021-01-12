const express = require('express');
const router = express.Router();

//require the controllers
const api_controller = require('../controllers/apiController')

/*GET rates */
router.get('/rates', api_controller.get_rate)

module.exports = router
