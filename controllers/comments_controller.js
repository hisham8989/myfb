const Comment = require('../models/comment')
const Post = require('../models/post')
const User = require('../models/user')
const commentsMailer = require('../mailers/comments_mailer')
const queue = require('../config/kue')
const commentEmailWorker = require('../workers/comment_email_worker')
const Like = require('../models/like')

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post)

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      })
      post.comments.unshift(comment)
      post.save()

      // comment.user = await User.findById(comment.user)

      comment = await comment.populate('user','name email')

      // commentsMailer.newComment(comment)

      // putting worker on job
      let job = queue.create('emails',comment).save(function (err) {

        if (err) {
          console.log('Error in sending to a queue');
          return
        }

        // console.log('Job Enqueued',job.id);
        
      })

      if (req.xhr) {
        return res.status('200').json({
          data: {
            comment: comment,
          },
          message: 'Comment Created',
        })
      }

      req.flash('info', 'comment added')
      return res.redirect('/')
    }
  } catch (err) {
    console.log('Error in creating the comments', err)
  }
}

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id)
    if (comment.user == req.user.id) {
      let postId = comment.post
      comment.remove()
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      })

      // delete likes associated with comments
      await Like.deleteMany({likeable:comment._id,onModel:'Comment'})

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: 'comment deleted',
        })
      }

      req.flash('error', 'comment deleted')
      return res.redirect('back')
    } else {
      req.flash('warning', 'Not authorized for deleting comment')
      return res.redirect('back')
    }
  } catch (err) {
    console.log('Error in destroying comments', err)
  }
}
