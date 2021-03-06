const User = require('../models/user')
const fs = require('fs')
const path = require('path')

module.exports.profile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id)
    return res.render('user_profile', {
      title: 'Codiel | User | Profile',
      profile_user: user,
    })
  } catch (error) {
    console.log('Error In Fetching Profile of User ', error)
  }
}

module.exports.update = async function (req, res) {
  //   if (req.user.id == req.params.id) {
  //     await User.findByIdAndUpdate(req.params.id, req.body)

  //     req.flash('info','User Profile Updated')
  //     return res.redirect('back')
  //   } else {
  //     return res.status(401).send('Unauthorized')
  //   }

  if (req.user.id == req.params.id) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id)
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log('****** Multer Error ***\n', err)
          return
        }

        user.name = req.body.name
        user.email = req.body.email

        if (req.file) {
          let filePath = User.avatarPath + '/' + req.file.filename

          if (user.avatar) {
            if (fs.existsSync(path.join(__dirname, '..', user.avatar))) {
              fs.unlinkSync(path.join(__dirname, '..', user.avatar))
            }
          }

          //saving file path in database avatar field
          user.avatar = filePath
        }
        user.save()
        req.flash('info', 'User Profile Updated')
      return res.redirect('back')
      })
      
    } catch (err) {
      req.flash('error', err)
      return res.redirect('back')
    }
  } else {
    req.flash('error', 'Unauthorized')
    return res.status(401).send('Unauthorized')
  }
}

// render sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile')
  }

  return res.render('user_sign_up', {
    title: 'Codiel | User | Sign Up',
  })
}

//render sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile')
  }

  return res.render('user_sign_in', {
    title: 'Codiel | User | Sign In',
  })
}

//get the sign Up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    req.flash('error', "Confirm Password didn't match")
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

        req.flash('success', 'account created successfully')
        return res.redirect('/users/sign-in')
      })
    } else {
      return res.redirect('back')
    }
  })
}

// sign in & create session
module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged In Successfully')
  return res.redirect('/')
}

// sign Out & destroy session
module.exports.destroySession = function (req, res) {
  req.logout()
  req.flash('success', 'You have logged out!')
  return res.redirect('/')
}


module.exports.createFriendship = function (req,res) {
  return res.redirect('back')
}