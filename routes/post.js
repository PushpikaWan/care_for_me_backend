const express = require('express');
const post = require('../services/post');

const router = new express.Router();


/**
 * 
 */
router.get('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await post.getAllPosts(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * 
 */
router.post('/', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    const result = await post.savePost(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
