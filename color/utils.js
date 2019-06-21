export function charCodeHex(str){
  const charCode = str.toUpperCase().charCodeAt();
  const charCode_0 = "0".charCodeAt();
  const charCode_9 = "9".charCodeAt();
  const charCode_A = "A".charCodeAt();
  const charCode_F = "F".charCodeAt();
  if ( charCode_0  <= charCode &&  charCode <= charCode_9 ) return charCode - charCode_0;
  if ( charCode_A  <= charCode &&  charCode <= charCode_F ) return charCode - charCode_A + 10;
  return 0;
}

// https://en.wikipedia.org/wiki/HSL_and_HSV
export function rgb2hsl(R,G,B){
  const r = R / 0xff;
  const g = G / 0xff;
  const b = B / 0xff;
  const max = Math.max(r,g,b);
  const min = Math.min(r,g,b);
  const c = max - min;
  let _hue;
  if (c === 0){
    _hue = null;
  } else if (max === r) {
    _hue = ((g - b) / c) % 6;
  } else if (max === g) {
    _hue = (b - r) / c + 2;
  } else {
    _hue = (r - g) / c + 4;
  }
  const hue = _hue === null ? 0 : (_hue * 60) % 360;
  const lightness = (max + min) / 2;
  const saturation = (lightness === 1 || lightness === 0) ? 0 : c / (1 - Math.abs(2 * lightness - 1));
  return {
    H:(hue >= 0 ? hue : 360 + hue) ,S:saturation,L:lightness
  }
}

// https://en.wikipedia.org/wiki/HSL_and_HSV
export function hsl2rgb(H,S,L){
  const saturation = S;
  const lightness = L;
  const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const _hue = (H % 360) / 60;
  const x = c * (1 - Math.abs(_hue % 2 - 1));
  let r,g,b;
  if (_hue >= 0 && _hue < 1) {
    [r,g,b] = [c,x,0];
  } else if (_hue >= 1 && _hue <= 2) {
    [r,g,b] = [x,c,0];
  } else if (_hue >= 2 && _hue <= 3) {
    [r,g,b] = [0,c,x];
  } else if (_hue > 3 && _hue <= 4) {
    [r,g,b] = [0,x,c];
  } else if (_hue > 4 && _hue <= 5) {
    [r,g,b] = [x,0,c];
  } else if (_hue > 5 && _hue <= 6) {
    [r,g,b] = [c,0,x];
  }
  const m = lightness - c / 2;
  const [R,G,B] = [Math.abs(r + m),Math.abs(g + m),Math.abs(b + m)];
  return {
    R:R * 0xff,G:G * 0xff,B:B * 0xff
  }
}

export function num2per(num,fix = 2){
  return (num * 100).toFixed(fix) + "%";
}

export function isString(a){
  return Object.prototype.toString.call(a).slice(8,-1) === "String";
}

export function keywordColorValues(str){
  const color = KeywordColorValue[str];
  return color ? color : "#000000";
}

export const KeywordColorValue = {
  black: "#000000", 
  silver: "#c0c0c0", 
  gray: "#808080", 
  white: "#ffffff", 
  maroon: "#800000", 
  red: "#ff0000", 
  purple: "#800080", 
  fuchsia: "#ff00ff", 
  green: "#008000", 
  lime: "#00ff00", 
  olive: "#808000", 
  yellow: "#ffff00", 
  navy: "#000080", 
  blue: "#0000ff", 
  teal: "#008080", 
  aqua: "#00ffff", 
  orange: "#ffa500", 
  aliceblue: "#f0f8ff", 
  antiquewhite: "#faebd7", 
  aquamarine: "#7fffd4", 
  azure: "#f0ffff", 
  beige: "#f5f5dc", 
  bisque: "#ffe4c4", 
  blanchedalmond: "#ffebcd", 
  blueviolet: "#8a2be2", 
  brown: "#a52a2a", 
  burlywood: "#deb887", 
  cadetblue: "#5f9ea0", 
  chartreuse: "#7fff00", 
  chocolate: "#d2691e", 
  coral: "#ff7f50", 
  cornflowerblue: "#6495ed", 
  cornsilk: "#fff8dc", 
  crimson: "#dc143c", 
  cyan: "#00ffff", 
  darkblue: "#00008b", 
  darkcyan: "#008b8b", 
  darkgoldenrod: "#b8860b", 
  darkgray: "#a9a9a9", 
  darkgreen: "#006400", 
  darkgrey: "#a9a9a9", 
  darkkhaki: "#bdb76b", 
  darkmagenta: "#8b008b", 
  darkolivegreen: "#556b2f", 
  darkorange: "#ff8c00", 
  darkorchid: "#9932cc", 
  darkred: "#8b0000", 
  darksalmon: "#e9967a", 
  darkseagreen: "#8fbc8f", 
  darkslateblue: "#483d8b", 
  darkslategray: "#2f4f4f", 
  darkslategrey: "#2f4f4f", 
  darkturquoise: "#00ced1", 
  darkviolet: "#9400d3", 
  deeppink: "#ff1493", 
  deepskyblue: "#00bfff", 
  dimgray: "#696969", 
  dimgrey: "#696969", 
  dodgerblue: "#1e90ff", 
  firebrick: "#b22222", 
  floralwhite: "#fffaf0", 
  forestgreen: "#228b22", 
  gainsboro: "#dcdcdc", 
  ghostwhite: "#f8f8ff", 
  gold: "#ffd700", 
  goldenrod: "#daa520", 
  greenyellow: "#adff2f", 
  grey: "#808080", 
  honeydew: "#f0fff0", 
  hotpink: "#ff69b4", 
  indianred: "#cd5c5c", 
  indigo: "#4b0082", 
  ivory: "#fffff0", 
  khaki: "#f0e68c", 
  lavender: "#e6e6fa", 
  lavenderblush: "#fff0f5", 
  lawngreen: "#7cfc00", 
  lemonchiffon: "#fffacd", 
  lightblue: "#add8e6", 
  lightcoral: "#f08080", 
  lightcyan: "#e0ffff", 
  lightgoldenrodyellow: "#fafad2", 
  lightgray: "#d3d3d3", 
  lightgreen: "#90ee90", 
  lightgrey: "#d3d3d3", 
  lightpink: "#ffb6c1", 
  lightsalmon: "#ffa07a", 
  lightseagreen: "#20b2aa", 
  lightskyblue: "#87cefa", 
  lightslategray: "#778899", 
  lightslategrey: "#778899", 
  lightsteelblue: "#b0c4de", 
  lightyellow: "#ffffe0", 
  limegreen: "#32cd32", 
  linen: "#faf0e6", 
  magenta: "#ff00ff", 
  mediumaquamarine: "#66cdaa", 
  mediumblue: "#0000cd", 
  mediumorchid: "#ba55d3", 
  mediumpurple: "#9370db", 
  mediumseagreen: "#3cb371", 
  mediumslateblue: "#7b68ee", 
  mediumspringgreen: "#00fa9a", 
  mediumturquoise: "#48d1cc", 
  mediumvioletred: "#c71585", 
  midnightblue: "#191970", 
  mintcream: "#f5fffa", 
  mistyrose: "#ffe4e1", 
  moccasin: "#ffe4b5", 
  navajowhite: "#ffdead", 
  oldlace: "#fdf5e6", 
  olivedrab: "#6b8e23", 
  orangered: "#ff4500", 
  orchid: "#da70d6", 
  palegoldenrod: "#eee8aa", 
  palegreen: "#98fb98", 
  paleturquoise: "#afeeee", 
  palevioletred: "#db7093", 
  papayawhip: "#ffefd5", 
  peachpuff: "#ffdab9", 
  peru: "#cd853f", 
  pink: "#ffc0cb", 
  plum: "#dda0dd", 
  powderblue: "#b0e0e6", 
  rosybrown: "#bc8f8f", 
  royalblue: "#4169e1", 
  saddlebrown: "#8b4513", 
  salmon: "#fa8072", 
  sandybrown: "#f4a460", 
  seagreen: "#2e8b57", 
  seashell: "#fff5ee", 
  sienna: "#a0522d", 
  skyblue: "#87ceeb", 
  slateblue: "#6a5acd", 
  slategray: "#708090", 
  slategrey: "#708090", 
  snow: "#fffafa", 
  springgreen: "#00ff7f", 
  steelblue: "#4682b4", 
  tan: "#d2b48c", 
  thistle: "#d8bfd8", 
  tomato: "#ff6347", 
  turquoise: "#40e0d0", 
  violet: "#ee82ee", 
  wheat: "#f5deb3", 
  whitesmoke: "#f5f5f5", 
  yellowgreen: "#9acd32", 
  rebeccapurple: "#663399",
}