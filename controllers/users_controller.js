const User = require('../models/user')

module.exports.profile = function (req, res) {
  return res.render('userProfile', {
    title: 'Codiel | User | Profile',
  })
}

// render sign up page
module.exports.signUp = function (req, res) {
  return res.render('user_sign_up', {
    title: 'Codiel | User | Sign Up',
  })
}

//render sign in page
module.exports.signIn = function (req, res) {
  return res.render('user_sign_in', {
    title: 'Codiel | User | Sign In',
  })
}

//get the sign Up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back')
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log('Error in finding user in signing up ', err)
      return
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log('Error in creating user while signing up ', err)
          return
        }

        return res.redirect('/users/sign-in')
      })
    } else {
      return res.redirect('back')
    }
  })
}

// sign in & create session
module.exports.createSession = function (req, res) {
  //TODO Later
}
