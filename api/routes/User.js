const express = require("express");
const router = express.Router();
const Users = require("../modules/UserSchema");

const authorization = require('../middleware/checkAuth')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get('/users',authorization, (req, res) =>{
  try {
    Users.find().then((result) =>{
      res.status(200).json({
        message: 'users',
        user_list: result
      })
    })
  } catch (error) {
    res.status(400).json({
      error: `${error} get user not working`
    })
  }
})


router.post("/login", (req, res, next) => {
  var username = req.body.username;
  Users.find({ username: username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "Auth Failed.",
        });
      } else {
        bcrypt.compare(
          req.body.password,
          user[0].password,
          function (err, result) {
            if (err) {
              return res.status(404).json({
                message: "Auth Failed..",
              });
            } else if (result) {
              var token = jwt.sign(
                {
                  username: user[0].username,
                  userId: user[0]._id,
                },
                'MY_SECRET_KEY',
                {
                  expiresIn: "8h",
                }
              );
              res.status(200).json({
                message: "user found...",
                username: username,
                token: token,
              });
            } else {
              res.status(404).json({
                message: "Auth Failed....",
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: "user error",
      });
    });
});

router.post("/signup", (req, res, next) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;

  if (password !== confirmPassword) {
    res.json({
      message: "Password is not match!",
    });
  } else {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        return res.json({
          message: "Something wrong!",
        });
      } else {
        const userData = new Users({
          username: username,
          email: email,
          password: hash,
        });
        userData.save()
          .then((result) => {
            res.status(200).json({
              UserList: result,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: `${error} user faild.`,
            });
          });
      }
    });
  }
});

module.exports = router;
