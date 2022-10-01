const express = require('express');
const metadata = require('../services/metadata');

const router = new express.Router();


/**
 * 
 */
router.get('/user/:userId/posts', async (req, res, next) => {
  const options = {
    userId: req.params['userId']
  };

  try {
    const result = await metadata.getUserPostMetaData(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
