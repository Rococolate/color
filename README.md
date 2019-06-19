# color
一个color结构类，可以在hex、hexa、rgb、rgba、hsl、hsla之间转化

## 使用
```javascript
const rebeccapurple = new Color("#663399"); // #RGB #RGBA #RRGGBB #RRGGBBAA rgb(r,g,b) rgba(r,g,b,a) hsl(h,s,l) hsla(h,s,l,a) Keyword Color
rebeccapurple.toHex(); // #663399
rebeccapurple.toHexa(); // #663399FF
rebeccapurple.toRgb(); // rgb(102,51,153)
rebeccapurple.toRgba(); // rgba(102,51,153,1.00)
rebeccapurple.toHsl(); // hsl(270,50%,40%)
rebeccapurple.toHsla(); // hsla(270,50%,40%,1.00)
const {R,G,B,A,H,S,L} = rebeccapurple; // {R:102,G:51,B:153,A:1,H:270,S:0.5,L:0.4}
```
