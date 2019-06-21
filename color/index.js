import {rgb2hsl, hsl2rgb, charCodeHex, num2per, isString, keywordColorValues} from "./utils.js"
export default class Color{
  constructor(str){
    this.A = 1;
    this.R = 0;
    this.G = 0;
    this.B = 0;
    this.H = 0;
    this.S = 0;
    this.L = 0;
    this.init(str);
  }
  init(str){
    const colorStr = String(str).toLowerCase();
    if (colorStr.slice(0,1) === "#" && colorStr.length === 9) return this.hex(colorStr,8);
    if (colorStr.slice(0,1) === "#" && colorStr.length === 7) return this.hex(colorStr,6);
    if (colorStr.slice(0,1) === "#" && colorStr.length === 5) return this.hex(colorStr,4);
    if (colorStr.slice(0,1) === "#" && colorStr.length === 4) return this.hex(colorStr,3);
    if (colorStr.slice(0,5) === "rgba(") return this.rgba(colorStr,true); 
    if (colorStr.slice(0,4) === "rgb(") return this.rgba(colorStr); 
    if (colorStr.slice(0,5) === "hsla(") return this.hsla(colorStr,true); 
    if (colorStr.slice(0,4) === "hsl(") return this.hsla(colorStr); 
    return this.hex(keywordColorValues(colorStr),6);
  }
  check({R,G,B,A,H,S,L}){
    if (R !== undefined)
      if (this.R < 0) this.R = 0;
      if (this.R > 255) this.R = 255;
    if (G !== undefined)
      if (this.G < 0) this.G = 0;
      if (this.G > 255) this.G = 255;
    if (B !== undefined)
      if (this.B < 0) this.B = 0;
      if (this.B > 255) this.B = 255;
    if (A !== undefined)
      if (this.A < 0) this.A = 0;
      if (this.A > 1) this.A = 1;
    if (H !== undefined)
      if (this.H < 0) this.H = 0;
      if (this.H > 360) this.H = 360;
    if (S !== undefined)
      if (this.S < 0) this.S = 0;
      if (this.S > 1) this.S = 1;
    if (L !== undefined)
      if (this.L < 0) this.L = 0;
      if (this.L > 1) this.L = 1;
  }
  hex(colorStr,size){
    const arr = [...colorStr];
    let r1,r2,g1,g2,b1,b2,a1,a2;
    if (size === 3){
      r1 = charCodeHex(arr[1]);
      r2 = charCodeHex(arr[1]);
      g1 = charCodeHex(arr[2]);
      g2 = charCodeHex(arr[2]);
      b1 = charCodeHex(arr[3]);
      b2 = charCodeHex(arr[3]);
      a1 = 0xf;
      a2 = 0xf;
    }
    if (size === 6){
      r1 = charCodeHex(arr[1]);
      r2 = charCodeHex(arr[2]);
      g1 = charCodeHex(arr[3]);
      g2 = charCodeHex(arr[4]);
      b1 = charCodeHex(arr[5]);
      b2 = charCodeHex(arr[6]);
      a1 = 0xf;
      a2 = 0xf;
    }
    if (size === 4){
      r1 = charCodeHex(arr[1]);
      r2 = charCodeHex(arr[1]);
      g1 = charCodeHex(arr[2]);
      g2 = charCodeHex(arr[2]);
      b1 = charCodeHex(arr[3]);
      b2 = charCodeHex(arr[3]);
      a1 = charCodeHex(arr[4]);
      a2 = charCodeHex(arr[4]);
    }
    if (size === 8){
      r1 = charCodeHex(arr[1]);
      r2 = charCodeHex(arr[2]);
      g1 = charCodeHex(arr[3]);
      g2 = charCodeHex(arr[4]);
      b1 = charCodeHex(arr[5]);
      b2 = charCodeHex(arr[6]);
      a1 = charCodeHex(arr[7]);
      a2 = charCodeHex(arr[8]);
    }
    this.R = r1 * 0x10 + r2;
    this.G = g1 * 0x10 + g2;
    this.B = b1 * 0x10 + b2;
    this.A = (a1 * 0x10 + a2) / 0xff;
    this.check({R:this.R,G:this.G,B:this.B,A:this.A});
    const {H,S,L} = rgb2hsl(this.R,this.G,this.B);
    this.H = H;
    this.S = S;
    this.L = L;
  }
  rgba(colorStr,hasAlpha){
    const [r,g,b,a] = checkArguments(colorStr,hasAlpha ? "rgba" : "rgb");
    const [Rb,R] = checkPer(r);
    const [Gb,G] = checkPer(g);
    const [Bb,B] = checkPer(b);
    const [Ab,A] = checkPer(a);
    this.R = Rb ? R * 0xff : Number(R);
    this.G = Gb ? G * 0xff : Number(G);
    this.B = Bb ? B * 0xff : Number(B);
    this.A = Ab ? A * 1 : Number(A);
    this.check({R:this.R,G:this.G,B:this.B,A:this.A});
    const {H,S,L} = rgb2hsl(this.R,this.G,this.B);
    this.H = H;
    this.S = S;
    this.L = L;
  }
  hsla(colorStr,hasAlpha){
    const [h,s,l,a] = checkArguments(colorStr,hasAlpha ? "hsla" : "hsl");
    const [Hb,H] = checkPer(h);
    const [Sb,S] = checkPer(s);
    const [Lb,L] = checkPer(l);
    const [Ab,A] = checkPer(a);
    this.H = Hb ? (H * 360) % 360 : Number(H) % 360;
    this.S = Sb ? S * 1 : Number(S);
    this.L = Lb ? L * 1 : Number(L);
    this.A = Ab ? A * 1 : Number(A);
    this.check({H:this.H,S:this.S,L:this.L,A:this.A});
    const {R,G,B} = hsl2rgb(this.H,this.S,this.L);
    this.R = R;
    this.G = G;
    this.B = B;
  }
  toRgb(){
    return this._toRgba(false);
  }
  toRgba(){
    return this._toRgba(true);
  }
  _toRgba(hasAlpha){
    return `rgb${hasAlpha ? "a" : ""}(${parseInt(this.R)},${parseInt(this.G)},${parseInt(this.B)}${hasAlpha ? "," + this.A.toFixed(2) : ""})`;
  }
  toHsl(fix = 0){
    return this._toHsla(false,fix);
  }
  toHsla(fix = 0){
    return this._toHsla(true,fix);
  }
  _toHsla(hasAlpha,fix = 0){
    return `hsl${hasAlpha ? "a" : ""}(${(this.H).toFixed(fix)},${num2per(this.S,fix)},${num2per(this.L,fix)}${hasAlpha ? "," + this.A.toFixed(2) : ""})`;
  }
  toHex(){
    return this._toHexa(false);
  }
  toHexa(){
    return this._toHexa(true);
  }
  _toHexa(hasAlpha){
    const r = parseInt(this.R).toString(16).toUpperCase();
    const g = parseInt(this.G).toString(16).toUpperCase();
    const b = parseInt(this.B).toString(16).toUpperCase();
    const a = parseInt(this.A * 0xff).toString(16).toUpperCase();
    return (`#${r.length === 1 ? "0" + r : r}${g.length === 1 ? "0" + g : g}${b.length === 1 ? "0" + b : b}${hasAlpha ? a.length === 1 ? "0" + a : a : ""}`);
  }
  changeHSL([H,S,L]){
    this.H = H;
    this.S = S;
    this.L = L;
    this.check({H,S,L});
    const {R,G,B} = hsl2rgb(this.H,this.S,this.L);
    this.R = R;
    this.G = G;
    this.B = B;
  }
  changeRGB([R,G,B]){
    this.R = R;
    this.G = G;
    this.B = B;
    this.check({R,G,B});
    const {H,S,L} = rgb2hsl(this.R,this.G,this.B);
    this.H = H;
    this.S = S;
    this.L = L;
  }
}

function checkArguments(str,type){
  const afterReplace = str.replace(`${type}(`,"").replace(")","");
  if (str.indexOf(",") !== -1){
    return afterReplace.replace(/\s/g,"").split(",");
  } else if (str.indexOf("/") !== -1) {
    const [afterSplit,alpha] = afterReplace.split("/");
    return [...afterSplit.trim().split(/\s+/),alpha];
  } else {
    return afterReplace.split(/\s+/);
  }
}

function checkPer(str){
  if (!isString(str)) return [null,1];
  if (str.slice(-1) !== "%") return [false,str];
  return  [true,str.slice(0,-1) / 100];
}