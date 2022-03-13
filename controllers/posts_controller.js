const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')
const Like = require('../models/like')

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    })

    post.user = await User.findById(post.user).select("-password")
    // password should be removed
    if (req.xhr) {
      return res.status('200').json({
        data: {
          post: post,
        },
        message: 'Post Created',
      })
    }
    req.flash('success', 'New Post Added')
    return res.redirect('back')
  } catch (err) {
    console.log('Error in creating post ', err)
  }
}

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id)
    // .id means converting into String provided by mongoose

    if (post.user == req.user.id) {

      // delete likes for posts & comments for that post
      await Like.deleteMany({likeable:post,onModel:'Post'})
      await Like.deleteMany({_id:{$in:post.comments}})


      post.remove()

      await Comment.deleteMany({ post: req.params.id })

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: 'post deleted',
        })
      }
      req.flash('warning', 'You have removed the post')
      return res.redirect('back')
    } else {
      req.flash('info', 'Post Cannot Be Deleted By Other User')
      return res.redirect('back')
    }
  } catch (err) {
    console.log('Error in destroying Post', err)
  }
}
