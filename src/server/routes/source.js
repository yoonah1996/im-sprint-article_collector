const express = require('express');
const fileHelper = require('../helpers/file');

const router = express.Router();

// GET /source
router.get('/', async (req, res) => {
  // TODO: read the content from source.txt using fileHelper
});

// POST /source
router.post('/', async (req, res) => {
  // TODO: save the content to source.txt using fileHelper
});

module.exports = router;
