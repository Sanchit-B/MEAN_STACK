const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: 'Invalid Authentication Credentials!'
          });
        });
    })
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth Failed'
        })
      }

      fetchedUser = user;

      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth Failed'
        })
      }

      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.SECRET_TOKEN_KEY,
        { expiresIn: '1h'}
      );

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Invalid Authentication Credentials!'
      })
    })
})

router.get('/refreshToken', (req, res, next) => {
  User
  .findOne({ email: req.query.email })
  .then(user => {
    if (user) {
      console.log("============== req.query =========== ");
      console.log(req.query)
      console.log("============== user =========== ");
      console.log(user)
      const token = jwt.sign(
        {email: user.email, userId: user._id},
        process.env.SECRET_TOKEN_KEY,
        {expiresIn: '1h'}
      )
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: user._id
      })
    } else {
      console.log("============== no user =========== ");
      console.log(user)
      return res.status(401).json({
        message: 'Auth Failed'
      })
    }
  }).catch(err => {
    console.log("============================");
    console.log({ email: req.params.email });
    return res.status(401).json({
      message: 'Invalid Authentication Credentials!'
    })
  })
})

module.exports = router;
