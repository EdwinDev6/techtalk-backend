"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var postSchema = new _mongoose.Schema({
  title: String,
  content: String,
  author: String,
  imgURL: String
}, {
  timestamps: true,
  versionKey: false
});
var _default = (0, _mongoose.model)('Post', postSchema);
exports["default"] = _default;