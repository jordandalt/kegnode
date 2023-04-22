"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _serialport = require("serialport");
var _parserReadline = require("@serialport/parser-readline");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var port = new _serialport.SerialPort({
  path: '/dev/ttyACM0',
  baudRate: 115200
});
var parser = port.pipe(new _parserReadline.ReadlineParser({
  delimiter: '\r\n'
}));
var kegboardLog = '';

// this is where my Node/arduino interface starts!
port.on("open", function () {
  console.log('serial port open');
});
parser.on('data', function (data) {
  kegboardLog += data + '<br/>';
});

/* GET flow monitors listing. */
router.get('/', function (req, res, next) {
  res.send(kegboardLog);
});
var _default = router;
exports["default"] = _default;