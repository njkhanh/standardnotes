!function(){"use strict";function t(t,e,r){for(var n in e||(e={}),t)!t.hasOwnProperty(n)||!1===r&&e.hasOwnProperty(n)||(e[n]=t[n]);return e}function e(t,e,r,n,i){null==e&&-1==(e=t.search(/[^\s\u00a0]/))&&(e=t.length);for(var o=n||0,s=i||0;;){var a=t.indexOf("\t",o);if(a<0||a>=e)return s+(e-o);s+=a-o,s+=r-s%r,o=a+1}}function r(){}var n=function(t,e,r){this.pos=this.start=0,this.string=t,this.tabSize=e||8,this.lastColumnPos=this.lastColumnValue=0,this.lineStart=0,this.lineOracle=r};n.prototype.eol=function(){return this.pos>=this.string.length},n.prototype.sol=function(){return this.pos==this.lineStart},n.prototype.peek=function(){return this.string.charAt(this.pos)||void 0},n.prototype.next=function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},n.prototype.eat=function(t){var e=this.string.charAt(this.pos);if("string"==typeof t?e==t:e&&(t.test?t.test(e):t(e)))return++this.pos,e},n.prototype.eatWhile=function(t){for(var e=this.pos;this.eat(t););return this.pos>e},n.prototype.eatSpace=function(){for(var t=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>t},n.prototype.skipToEnd=function(){this.pos=this.string.length},n.prototype.skipTo=function(t){var e=this.string.indexOf(t,this.pos);if(e>-1)return this.pos=e,!0},n.prototype.backUp=function(t){this.pos-=t},n.prototype.column=function(){return this.lastColumnPos<this.start&&(this.lastColumnValue=e(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue-(this.lineStart?e(this.string,this.lineStart,this.tabSize):0)},n.prototype.indentation=function(){return e(this.string,null,this.tabSize)-(this.lineStart?e(this.string,this.lineStart,this.tabSize):0)},n.prototype.match=function(t,e,r){if("string"!=typeof t){var n=this.string.slice(this.pos).match(t);return n&&n.index>0?null:(n&&!1!==e&&(this.pos+=n[0].length),n)}var i=function(t){return r?t.toLowerCase():t};if(i(this.string.substr(this.pos,t.length))==i(t))return!1!==e&&(this.pos+=t.length),!0},n.prototype.current=function(){return this.string.slice(this.start,this.pos)},n.prototype.hideFirstChars=function(t,e){this.lineStart+=t;try{return e()}finally{this.lineStart-=t}},n.prototype.lookAhead=function(t){var e=this.lineOracle;return e&&e.lookAhead(t)},n.prototype.baseToken=function(){var t=this.lineOracle;return t&&t.baseToken(this.pos)};var i={},o={};function s(e){if("string"==typeof e&&o.hasOwnProperty(e))e=o[e];else if(e&&"string"==typeof e.name&&o.hasOwnProperty(e.name)){var n=o[e.name];"string"==typeof n&&(n={name:n}),i=n,a=e,Object.create?p=Object.create(i):(r.prototype=i,p=new r),a&&t(a,p),(e=p).name=n.name}else{if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+xml$/.test(e))return s("application/xml");if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+json$/.test(e))return s("application/json")}var i,a,p;return"string"==typeof e?{name:e}:e||{name:"null"}}var a,p={},l={__proto__:null,modes:i,mimeModes:o,defineMode:function(t,e){arguments.length>2&&(e.dependencies=Array.prototype.slice.call(arguments,2)),i[t]=e},defineMIME:function(t,e){o[t]=e},resolveMode:s,getMode:function t(e,r){r=s(r);var n=i[r.name];if(!n)return t(e,"text/plain");var o=n(e,r);if(p.hasOwnProperty(r.name)){var a=p[r.name];for(var l in a)a.hasOwnProperty(l)&&(o.hasOwnProperty(l)&&(o["_"+l]=o[l]),o[l]=a[l])}if(o.name=r.name,r.helperType&&(o.helperType=r.helperType),r.modeProps)for(var u in r.modeProps)o[u]=r.modeProps[u];return o},modeExtensions:p,extendMode:function(e,r){t(r,p.hasOwnProperty(e)?p[e]:p[e]={})},copyState:function(t,e){if(!0===e)return e;if(t.copyState)return t.copyState(e);var r={};for(var n in e){var i=e[n];i instanceof Array&&(i=i.concat([])),r[n]=i}return r},innerMode:function(t,e){for(var r;t.innerMode&&(r=t.innerMode(e))&&r.mode!=t;)e=r.state,t=r.mode;return r||{mode:t,state:e}},startState:function(t,e,r){return!t.startState||t.startState(e,r)}},u="undefined"!=typeof globalThis?globalThis:window;for(var h in u.CodeMirror={},CodeMirror.StringStream=n,l)CodeMirror[h]=l[h];CodeMirror.defineMode("null",(function(){return{token:function(t){return t.skipToEnd()}}})),CodeMirror.defineMIME("text/plain","null"),CodeMirror.registerHelper=CodeMirror.registerGlobalHelper=Math.min,CodeMirror.splitLines=function(t){return t.split(/\r?\n|\r/)},CodeMirror.defaults={indentUnit:2},a=function(t){t.runMode=function(e,r,n,i){var o=t.getMode(t.defaults,r),s=i&&i.tabSize||t.defaults.tabSize;if(n.appendChild){var a=/MSIE \d/.test(navigator.userAgent)&&(null==document.documentMode||document.documentMode<9),p=n,l=0;p.innerHTML="",n=function(t,e){if("\n"==t)return p.appendChild(document.createTextNode(a?"\r":t)),void(l=0);for(var r="",n=0;;){var i=t.indexOf("\t",n);if(-1==i){r+=t.slice(n),l+=t.length-n;break}l+=i-n,r+=t.slice(n,i);var o=s-l%s;l+=o;for(var u=0;u<o;++u)r+=" ";n=i+1}if(e){var h=p.appendChild(document.createElement("span"));h.className="cm-"+e.replace(/ +/g," cm-"),h.appendChild(document.createTextNode(r))}else p.appendChild(document.createTextNode(r))}}for(var u=t.splitLines(e),h=i&&i.state||t.startState(o),f=0,c=u.length;f<c;++f){f&&n("\n");var d=new t.StringStream(u[f],null,{lookAhead:function(t){return u[f+t]},baseToken:function(){}});for(!d.string&&o.blankLine&&o.blankLine(h);!d.eol();){var m=o.token(d,h);n(d.current(),m,f,d.start,h),d.start=d.pos}}}},"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)}();