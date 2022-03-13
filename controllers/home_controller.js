const Post = require('../models/post')
const User = require('../models/user')

module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
      .sort('-createdAt')
      .populate({
        path: 'user',
        select: '-password',
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'likes',
        },
        populate:{
         path:'user',
         select: '-password',
        }
      }).populate('likes')


      // .populate({
      //   path: 'likes',
      //   select: '-password',
      // })

      // populate: {
      //   path: 'likes',
      //   select: '-password',
      // },
      // console.log(posts);

    /// having in pupulating likes
    /**
       * .populate('likes')
      populate: {
        path: 'likes',
      },
       */

    let users = await User.find({})

    // ToDo Check Ejs file
    return res.render('home', {
      title: 'Codiel | Home',
      posts,
      all_users: users,
    })
  } catch (error) {
    console.log('Error !', error)
  }
}
