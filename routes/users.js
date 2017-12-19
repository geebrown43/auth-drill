var express = require('express')
var router = express.Router()
var db = require('../db/api')
var bcrypt = require('bcrypt')
let isMatch = false

router.post('/signin', function (req, res, next) {
  let body = req.body
  db.signIn(body)
    .then(function (agent) {
      bcrypt.compare(req.body.password, agent[0].password, function (err, res) {
       isMatch = res   
        console.log(isMatch)
      })
      if (isMatch) {
        res.render('index', {
          title: 'gClassified',
          message: 'Sign In Successful'
        })
      } else {
        res.render('index', {
          title: 'gClassified',
          message: 'Incorrect login. Contents will self destruct'
        })
      }
    });
})

router.post('/signup', function (req, res, next) {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    let body = req.body
    db.signUp(body, hash)
      .then(function (agent) {
        if (agent === null) {
          res.redirect('/')
        }
        if (agent[0].password === req.body.password) {
          res.render('index', {
            title: 'gClassified',
            message: 'Password Must Be Hashed. Government Secrets are at Stake!'
          })
        } else {
          res.render('index', {
            title: 'gClassified',
            message: 'Sign Up Successful'
          })
        }
      })
  })
});
  

module.exports = router
