var Color = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function charCodeHex(str) {
    var charCode = str.toUpperCase().charCodeAt();
    var charCode_0 = "0".charCodeAt();
    var charCode_9 = "9".charCodeAt();
    var charCode_A = "A".charCodeAt();
    var charCode_F = "F".charCodeAt();
    if (charCode_0 <= charCode && charCode <= charCode_9) return charCode - charCode_0;
    if (charCode_A <= charCode && charCode <= charCode_F) return charCode - charCode_A + 10;
    return 0;
  } // https://en.wikipedia.org/wiki/HSL_and_HSV

  function rgb2hsl(R, G, B) {
    var r = R / 0xff;
    var g = G / 0xff;
    var b = B / 0xff;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var c = max - min;

    var _hue;

    if (c === 0) {
      _hue = null;
    } else if (max === r) {
      _hue = (g - b) / c % 6;
    } else if (max === g) {
      _hue = (b - r) / c + 2;
    } else {
      _hue = (r - g) / c + 4;
    }

    var hue = _hue === null ? 0 : _hue * 60 % 360;
    var lightness = (max + min) / 2;
    var saturation = lightness === 1 || lightness === 0 ? 0 : c / (1 - Math.abs(2 * lightness - 1));
    return {
      H: hue >= 0 ? hue : 360 + hue,
      S: saturation,
      L: lightness
    };
  } // https://en.wikipedia.org/wiki/HSL_and_HSV

  function hsl2rgb(H, S, L) {
    var saturation = S;
    var lightness = L;
    var c = (1 - Math(2 * lightness - 1)) * saturation;

    var _hue = H % 360 / 60;

    var x = c * (1 - Math.abs(_hue % 2 - 1));
    var r, g, b;

    if (_hue >= 0 && _hue < 1) {
      r = c;
      g = x;
      b = 0;
    } else if (_hue >= 1 && _hue <= 2) {
      r = x;
      g = c;
      b = 0;
    } else if (_hue >= 2 && _hue <= 3) {
      r = 0;
      g = c;
      b = x;
    } else if (_hue > 3 && _hue <= 4) {
      r = 0;
      g = x;
      b = c;
    } else if (_hue > 4 && _hue <= 5) {
      r = x;
      g = 0;
      b = c;
    } else if (_hue > 5 && _hue <= 6) {
      r = c;
      g = 0;
      b = x;
    }

    var m = lightness - c / 2;
    var R = r + m,
        G = g + m,
        B = b + m;
    return {
      R: R * 0xff,
      G: G * 0xff,
      B: B * 0xff
    };
  }
  function num2per(num) {
    var fix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    return (num * 100).toFixed(fix) + "%";
  }
  function per2num(per) {
    return per.replace("%", "") / 100;
  }

  var Color =
  /*#__PURE__*/
  function () {
    function Color(str) {
      _classCallCheck(this, Color);

      this.init(str);
    }

    _createClass(Color, [{
      key: "init",
      value: function init(str) {
        var colorStr = String(str);
        if (colorStr.slice(0, 1) === "#" && colorStr.length === 7) return this.hex6(colorStr);
        if (colorStr.slice(0, 1) === "#" && colorStr.length === 4) return this.hex3(colorStr);
        if (colorStr.slice(0, 5) === "rgba(") return this.rgba(colorStr);
        if (colorStr.slice(0, 4) === "rgb(") return this.rgb(colorStr);
        if (colorStr.slice(0, 5) === "hsla(") return this.hsla(colorStr);
        if (colorStr.slice(0, 4) === "hsl(") return this.hsl(colorStr);
        return this.rgba("rgba(0,0,0,1)");
      }
    }, {
      key: "check",
      value: function check(_ref) {
        var R = _ref.R,
            G = _ref.G,
            B = _ref.B,
            A = _ref.A,
            H = _ref.H,
            S = _ref.S,
            L = _ref.L;
        if (R !== undefined) if (this.R < 0) this.R = 0;
        if (this.R > 255) this.R = 255;
        if (G !== undefined) if (this.G < 0) this.G = 0;
        if (this.G > 255) this.G = 255;
        if (B !== undefined) if (this.B < 0) this.B = 0;
        if (this.B > 255) this.B = 255;
        if (A !== undefined) if (this.A < 0) this.A = 0;
        if (this.A > 1) this.A = 1;
        if (H !== undefined) if (this.H < 0) this.H = 0;
        if (this.H > 360) this.H = 360;
        if (S !== undefined) if (this.S < 0) this.S = 0;
        if (this.S > 1) this.S = 1;
        if (L !== undefined) if (this.L < 0) this.L = 0;
        if (this.L > 1) this.L = 1;
      }
    }, {
      key: "hex3",
      value: function hex3(colorStr) {
        var arr = _toConsumableArray(colorStr);

        var r1 = charCodeHex(arr[1]);
        var r2 = charCodeHex(arr[1]);
        var g1 = charCodeHex(arr[2]);
        var g2 = charCodeHex(arr[2]);
        var b1 = charCodeHex(arr[3]);
        var b2 = charCodeHex(arr[3]);
        this.R = r1 * 16 + r2;
        this.G = g1 * 16 + g2;
        this.B = b1 * 16 + b2;
        this.A = 1;
        this.check({
          R: this.R,
          G: this.G,
          B: this.B
        });

        var _rgb2hsl = rgb2hsl(this.R, this.G, this.B),
            H = _rgb2hsl.H,
            S = _rgb2hsl.S,
            L = _rgb2hsl.L;

        this.H = H;
        this.S = S;
        this.L = L;
      }
    }, {
      key: "hex6",
      value: function hex6(colorStr) {
        var arr = _toConsumableArray(colorStr);

        var r1 = charCodeHex(arr[1]);
        var r2 = charCodeHex(arr[2]);
        var g1 = charCodeHex(arr[3]);
        var g2 = charCodeHex(arr[4]);
        var b1 = charCodeHex(arr[5]);
        var b2 = charCodeHex(arr[6]);
        this.R = r1 * 16 + r2;
        this.G = g1 * 16 + g2;
        this.B = b1 * 16 + b2;
        this.A = 1;
        this.check({
          R: this.R,
          G: this.G,
          B: this.B
        });

        var _rgb2hsl2 = rgb2hsl(this.R, this.G, this.B),
            H = _rgb2hsl2.H,
            S = _rgb2hsl2.S,
            L = _rgb2hsl2.L;

        this.H = H;
        this.S = S;
        this.L = L;
      }
    }, {
      key: "rgba",
      value: function rgba(colorStr) {
        var arr = colorStr.replace("rgba(", "").replace(")", "").split(",");
        this.R = Number(arr[0]);
        this.G = Number(arr[1]);
        this.B = Number(arr[2]);
        this.A = Number(arr[3]);
        this.check({
          R: this.R,
          G: this.G,
          B: this.B,
          A: this.A
        });

        var _rgb2hsl3 = rgb2hsl(this.R, this.G, this.B),
            H = _rgb2hsl3.H,
            S = _rgb2hsl3.S,
            L = _rgb2hsl3.L;

        this.H = H;
        this.S = S;
        this.L = L;
      }
    }, {
      key: "rgb",
      value: function rgb(colorStr) {
        var arr = colorStr.replace("rgb(", "").replace(")", "").split(",");
        this.R = Number(arr[0]);
        this.G = Number(arr[1]);
        this.B = Number(arr[2]);
        this.A = 1;
        this.check({
          R: this.R,
          G: this.G,
          B: this.B
        });

        var _rgb2hsl4 = rgb2hsl(this.R, this.G, this.B),
            H = _rgb2hsl4.H,
            S = _rgb2hsl4.S,
            L = _rgb2hsl4.L;

        this.H = H;
        this.S = S;
        this.L = L;
      }
    }, {
      key: "hsla",
      value: function hsla(colorStr) {
        var arr = colorStr.replace("hsla(", "").replace(")", "").split(",");
        this.H = Number(arr[0]);
        this.S = per2num(arr[1]);
        this.L = per2num(arr[2]);
        this.A = Number(arr[3]);
        this.check({
          H: this.H,
          S: this.S,
          L: this.L,
          A: this.A
        });

        var _hsl2rgb = hsl2rgb(this.H, this.S, this.L),
            R = _hsl2rgb.R,
            G = _hsl2rgb.G,
            B = _hsl2rgb.B;

        this.R = R;
        this.G = G;
        this.B = B;
      }
    }, {
      key: "hsl",
      value: function hsl(colorStr) {
        var arr = colorStr.replace("hsl(", "").replace(")", "").split(",");
        this.H = Number(arr[0]);
        this.S = per2num(arr[1]);
        this.L = per2num(arr[2]);
        this.A = 1;
        this.check({
          H: this.H,
          S: this.S,
          L: this.L,
          A: this.A
        });

        var _hsl2rgb2 = hsl2rgb(this.H, this.S, this.L),
            R = _hsl2rgb2.R,
            G = _hsl2rgb2.G,
            B = _hsl2rgb2.B;

        this.R = R;
        this.G = G;
        this.B = B;
      }
    }, {
      key: "toRgb",
      value: function toRgb() {
        return "rgb(".concat(this.R, ",").concat(this.G, ",").concat(this.B, ")");
      }
    }, {
      key: "toRgba",
      value: function toRgba() {
        return "rgba(".concat(this.R, ",").concat(this.G, ",").concat(this.B, ",").concat(this.A, ")");
      }
    }, {
      key: "toHsl",
      value: function toHsl() {
        var fix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        return "hsl(".concat(this.H.toFixed(fix), ",").concat(num2per(this.S, fix), ",").concat(num2per(this.L, fix), ")");
      }
    }, {
      key: "toHsla",
      value: function toHsla() {
        var fix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        return "hsla(".concat(this.H.toFixed(fix), ",").concat(num2per(this.S, fix), ",").concat(num2per(this.L, fix), ",").concat(this.A, ")");
      }
    }, {
      key: "toHex",
      value: function toHex() {
        var r = this.R.toString(16);
        var g = this.G.toString(16);
        var b = this.B.toString(16);
        return "#".concat(r.length === 1 ? "0" + r : r).concat(g.length === 1 ? "0" + g : g).concat(b.length === 1 ? "0" + b : b).toUpperCase();
      }
    }]);

    return Color;
  }();

  return Color;

}());
