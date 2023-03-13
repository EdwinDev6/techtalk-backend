"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePostById = exports.getPostById = exports.getPost = exports.deletePostById = exports.createPost = void 0;
var _post = _interopRequireDefault(require("../models/post"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var createPost = function createPost(req, res) {
  console.log(req.body);
  res.json("create post");
};
exports.createPost = createPost;
var getPost = function getPost(req, res) {
  res.json("get post");
};
exports.getPost = getPost;
var getPostById = function getPostById(req, res) {
  res.json("get post by is");
};
exports.getPostById = getPostById;
var updatePostById = function updatePostById(req, res) {
  res.json("update post by id");
};
exports.updatePostById = updatePostById;
var deletePostById = function deletePostById(req, res) {
  res.json("delete post by id");
};
exports.deletePostById = deletePostById;