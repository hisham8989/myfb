const User = require('../../../models/user')
const jwt = require('jsonwebtoken')

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email })

    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        message: 'Invalid Email or Password',
      })
    }

    return res.status(200).json({
        message:"Sign In Successful , here is your token please keep it safe ! ! !",
        data:{
            token:jwt.sign(user.toJSON(),'codeial',{expiresIn:`${2*1000*60}`})
        }
    })

  } catch (err) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}
