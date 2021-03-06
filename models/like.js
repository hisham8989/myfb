const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
    },

    // this defines the object id of liked object
    likeable: {
      type: mongoose.Schema.ObjectId,
      required: true,
      refPath: 'onModel',
    },

    // this field is used for defining liked object since it is dynamic reference
    onModel: {
      type: String,
      required: true,
      enum: ['Post', 'Comment'],
    },
  },
  {
    timestamps: true,
  }
)

const Like = mongoose.model('Like', likeSchema)

module.exports = Like
