"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
var _post = _interopRequireDefault(require("./routes/post.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.set("pkg", _package["default"]);
app.use(_express["default"].json());
app.use((0, _morgan["default"])('dev'));
app.get('/', function (req, res) {
  res.json({
    author: app.get('pkg').author,
    description: "",
    version: app.get('pkg').version
  });
});
app.use('/posts', _post["default"]);
var _default = app;
exports["default"] = _default;