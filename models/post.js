var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: String,
  body: String,
  date: { type: Date, default: Date.now }
});

var Post = mongoose.model('post', postSchema);

module.exports = Post;
