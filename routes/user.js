const express = require('express');
const user = require('../services/user');

const router = new express.Router();


/**
 * 
 */
router.post('/', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    const result = await user.saveUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * 
 */
router.put('/:userId', async (req, res, next) => {
  const options = {
    body: req.body,
    userId: req.params['userId']
  };

  try {
    const result = await user.editUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;