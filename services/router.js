const express = require('express');
const router = new express.Router();
const room_type = require('../controllers/room_type.js');

router.route('/room_type/:id?')
  .get(room_type.get);

module.exports = router;