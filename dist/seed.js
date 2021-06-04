"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("reflect-metadata");

var _typeorm = require("typeorm");

var _User = require("./entity/User");

var _Post = require("./entity/Post");

var _Review = require("./entity/Review");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var manager, u1, p1, r1;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            manager = connection.manager;
            u1 = new _User.User();
            u1.username = "vino";
            u1.password = "123456";
            _context.next = 6;
            return manager.save(u1);

          case 6:
            p1 = new _Post.Post();
            p1.author = u1;
            p1.title = "湖人总冠军";
            p1.content = "嘻嘻嘻，湖人总冠军";
            _context.next = 12;
            return manager.save(p1);

          case 12:
            r1 = new _Review.Review();
            r1.content = "太阳队加油，布克牛逼";
            r1.post = p1;
            r1.user = u1;
            _context.next = 18;
            return manager.save(r1);

          case 18:
            console.log("ok");
            _context.next = 21;
            return connection.close();

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}())["catch"](function (error) {
  return console.log(error);
});