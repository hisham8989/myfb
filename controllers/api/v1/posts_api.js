const Post = require('../../../models/post')
const Comment = require('../../../models/comment')

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .select('-password')
    .sort('-createdAt')
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    })

  return res.status(200).json({
    message: 'List of posts',
    posts: posts,
  })
}

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id)
    // .id means converting into String provided by mongoose

      if (post.user == req.user.id) {
    post.remove()

    await Comment.deleteMany({ post: req.params.id })

    return res.status(200).json({
      message: 'Posts & Associated Comments Deleted Succesfully',
    })
      } else {
        return res.status(401).json({
          message:"You are authorized to delete this post !"
        })
      }
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}
