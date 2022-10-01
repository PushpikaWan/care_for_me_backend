const express = require('express');
const posts = require('../services/posts');

const router = new express.Router();


/**
 *
 */
router.get('/:postId', async (req, res, next) => {
  const options = {
    postId: req.params['postId']
  };

  try {
    const result = await posts.getPost(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 *
 */
router.put('/:postId', async (req, res, next) => {
  const options = {
    body: req.body,
    postId: req.params['postId']
  };

  try {
    const result = await posts.updatePost(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 *
 */
router.delete('/:postId', async (req, res, next) => {
  const options = {
    postId: req.params['postId']
  };

  try {
    const result = await posts.deletePost(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 *
 */
router.post('/:postId/comment', async (req, res, next) => {
  const options = {
    body: req.body,
    postId: req.params['postId']
  };

  try {
    const result = await posts.addComment(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 *
 */
router.delete('/:postId/comment/:commentId', async (req, res, next) => {
  const options = {
    postId: req.params['postId'],
    commentId: req.params['commentId']
  };

  try {
    const result = await posts.deleteComment(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 *
 */
router.post('/:postId/report', async (req, res, next) => {
  const options = {
    body: req.body,
    postId: req.params['postId']
  };

  try {
    const result = await posts.reportPost(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 *
 */
router.post('/:postId/comment/:commentId/report', async (req, res, next) => {
  const options = {
    body: req.body,
    postId: req.params['postId'],
    commentId: req.params['commentId']
  };

  try {
    const result = await posts.reportComment(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 *
 */
router.get('/user/:userId', async (req, res, next) => {
  const options = {
    userId: req.params['userId']
  };

  try {
    const result = await posts.getPostsByUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
