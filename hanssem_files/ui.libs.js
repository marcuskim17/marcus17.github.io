/**
 * ui.libs.js
 * 스크립트 library
 **/

/*********
 * 외부 라이브러리
 * 1. jQuery v2.2.4(삭제)
 * 2. Underscore.js v1.8.3
 * 3. lazysizes v2.0.0 삭제(js/ui/lazyload.js로 PC/MO 통합= 2021.12.28)
 * 4. jQuery Easing v1.3
 * 5. nouislider - 9.2.0
 * 6. jQuery UI - v1.11.4 (삭제)
 * 7. RichText
 */

/*
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
*/
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
_.templateSettings = {
    interpolate: /\<\@\=(.+?)\@\>/gim,
    evaluate: /\<\@(.+?)\@\>/gim,
    escape: /\<\@\-(.+?)\@\>/gim
};

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright ?짤 2001 Robert Penner
 * All rights reserved.
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright ?짤 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});

/*! nouislider - 9.2.0 - 2017-01-11 10:35:35 https://refreshless.com/nouislider/ */
!function(a){"function"==typeof define&&define.amd?define([],a):"object"==typeof exports?module.exports=a():window.noUiSlider=a()}(function(){"use strict";function a(a,b){var c=document.createElement("div");return j(c,b),a.appendChild(c),c}function b(a){return a.filter(function(a){return!this[a]&&(this[a]=!0)},{})}function c(a,b){return Math.round(a/b)*b}function d(a,b){var c=a.getBoundingClientRect(),d=a.ownerDocument,e=d.documentElement,f=m();return/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(f.x=0),b?c.top+f.y-e.clientTop:c.left+f.x-e.clientLeft}function e(a){return"number"==typeof a&&!isNaN(a)&&isFinite(a)}function f(a,b,c){c>0&&(j(a,b),setTimeout(function(){k(a,b)},c))}function g(a){return Math.max(Math.min(a,100),0)}function h(a){return Array.isArray(a)?a:[a]}function i(a){a=String(a);var b=a.split(".");return b.length>1?b[1].length:0}function j(a,b){a.classList?a.classList.add(b):a.className+=" "+b}function k(a,b){a.classList?a.classList.remove(b):a.className=a.className.replace(new RegExp("(^|\\b)"+b.split(" ").join("|")+"(\\b|$)","gi")," ")}function l(a,b){return a.classList?a.classList.contains(b):new RegExp("\\b"+b+"\\b").test(a.className)}function m(){var a=void 0!==window.pageXOffset,b="CSS1Compat"===(document.compatMode||""),c=a?window.pageXOffset:b?document.documentElement.scrollLeft:document.body.scrollLeft,d=a?window.pageYOffset:b?document.documentElement.scrollTop:document.body.scrollTop;return{x:c,y:d}}function n(){return window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"}}function o(a,b){return 100/(b-a)}function p(a,b){return 100*b/(a[1]-a[0])}function q(a,b){return p(a,a[0]<0?b+Math.abs(a[0]):b-a[0])}function r(a,b){return b*(a[1]-a[0])/100+a[0]}function s(a,b){for(var c=1;a>=b[c];)c+=1;return c}function t(a,b,c){if(c>=a.slice(-1)[0])return 100;var d,e,f,g,h=s(c,a);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],f+q([d,e],c)/o(f,g)}function u(a,b,c){if(c>=100)return a.slice(-1)[0];var d,e,f,g,h=s(c,b);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],r([d,e],(c-f)*o(f,g))}function v(a,b,d,e){if(100===e)return e;var f,g,h=s(e,a);return d?(f=a[h-1],g=a[h],e-f>(g-f)/2?g:f):b[h-1]?a[h-1]+c(e-a[h-1],b[h-1]):e}function w(a,b,c){var d;if("number"==typeof b&&(b=[b]),"[object Array]"!==Object.prototype.toString.call(b))throw new Error("noUiSlider ("+U+"): 'range' contains invalid value.");if(d="min"===a?0:"max"===a?100:parseFloat(a),!e(d)||!e(b[0]))throw new Error("noUiSlider ("+U+"): 'range' value isn't numeric.");c.xPct.push(d),c.xVal.push(b[0]),d?c.xSteps.push(!isNaN(b[1])&&b[1]):isNaN(b[1])||(c.xSteps[0]=b[1]),c.xHighestCompleteStep.push(0)}function x(a,b,c){if(!b)return!0;c.xSteps[a]=p([c.xVal[a],c.xVal[a+1]],b)/o(c.xPct[a],c.xPct[a+1]);var d=(c.xVal[a+1]-c.xVal[a])/c.xNumSteps[a],e=Math.ceil(Number(d.toFixed(3))-1),f=c.xVal[a]+c.xNumSteps[a]*e;c.xHighestCompleteStep[a]=f}function y(a,b,c,d){this.xPct=[],this.xVal=[],this.xSteps=[d||!1],this.xNumSteps=[!1],this.xHighestCompleteStep=[],this.snap=b,this.direction=c;var e,f=[];for(e in a)a.hasOwnProperty(e)&&f.push([a[e],e]);for(f.length&&"object"==typeof f[0][0]?f.sort(function(a,b){return a[0][0]-b[0][0]}):f.sort(function(a,b){return a[0]-b[0]}),e=0;e<f.length;e++)w(f[e][1],f[e][0],this);for(this.xNumSteps=this.xSteps.slice(0),e=0;e<this.xNumSteps.length;e++)x(e,this.xNumSteps[e],this)}function z(a,b){if(!e(b))throw new Error("noUiSlider ("+U+"): 'step' is not numeric.");a.singleStep=b}function A(a,b){if("object"!=typeof b||Array.isArray(b))throw new Error("noUiSlider ("+U+"): 'range' is not an object.");if(void 0===b.min||void 0===b.max)throw new Error("noUiSlider ("+U+"): Missing 'min' or 'max' in 'range'.");/*if(b.min===b.max)throw new Error("noUiSlider ("+U+"): 'range' 'min' and 'max' cannot be equal.");*/a.spectrum=new y(b,a.snap,a.dir,a.singleStep)}function B(a,b){if(b=h(b),!Array.isArray(b)||!b.length)throw new Error("noUiSlider ("+U+"): 'start' option is incorrect.");a.handles=b.length,a.start=b}function C(a,b){if(a.snap=b,"boolean"!=typeof b)throw new Error("noUiSlider ("+U+"): 'snap' option must be a boolean.")}function D(a,b){if(a.animate=b,"boolean"!=typeof b)throw new Error("noUiSlider ("+U+"): 'animate' option must be a boolean.")}function E(a,b){if(a.animationDuration=b,"number"!=typeof b)throw new Error("noUiSlider ("+U+"): 'animationDuration' option must be a number.")}function F(a,b){var c,d=[!1];if("lower"===b?b=[!0,!1]:"upper"===b&&(b=[!1,!0]),b===!0||b===!1){for(c=1;c<a.handles;c++)d.push(b);d.push(!1)}else{if(!Array.isArray(b)||!b.length||b.length!==a.handles+1)throw new Error("noUiSlider ("+U+"): 'connect' option doesn't match handle count.");d=b}a.connect=d}function G(a,b){switch(b){case"horizontal":a.ort=0;break;case"vertical":a.ort=1;break;default:throw new Error("noUiSlider ("+U+"): 'orientation' option is invalid.")}}function H(a,b){if(!e(b))throw new Error("noUiSlider ("+U+"): 'margin' option must be numeric.");if(0!==b&&(a.margin=a.spectrum.getMargin(b),!a.margin))throw new Error("noUiSlider ("+U+"): 'margin' option is only supported on linear sliders.")}function I(a,b){if(!e(b))throw new Error("noUiSlider ("+U+"): 'limit' option must be numeric.");if(a.limit=a.spectrum.getMargin(b),!a.limit||a.handles<2)throw new Error("noUiSlider ("+U+"): 'limit' option is only supported on linear sliders with 2 or more handles.")}function J(a,b){if(!e(b))throw new Error("noUiSlider ("+U+"): 'padding' option must be numeric.");if(0!==b){if(a.padding=a.spectrum.getMargin(b),!a.padding)throw new Error("noUiSlider ("+U+"): 'padding' option is only supported on linear sliders.");if(a.padding<0)throw new Error("noUiSlider ("+U+"): 'padding' option must be a positive number.");if(a.padding>=50)throw new Error("noUiSlider ("+U+"): 'padding' option must be less than half the range.")}}function K(a,b){switch(b){case"ltr":a.dir=0;break;case"rtl":a.dir=1;break;default:throw new Error("noUiSlider ("+U+"): 'direction' option was not recognized.")}}function L(a,b){if("string"!=typeof b)throw new Error("noUiSlider ("+U+"): 'behaviour' must be a string containing options.");var c=b.indexOf("tap")>=0,d=b.indexOf("drag")>=0,e=b.indexOf("fixed")>=0,f=b.indexOf("snap")>=0,g=b.indexOf("hover")>=0;if(e){if(2!==a.handles)throw new Error("noUiSlider ("+U+"): 'fixed' behaviour must be used with 2 handles");H(a,a.start[1]-a.start[0])}a.events={tap:c||f,drag:d,fixed:e,snap:f,hover:g}}function M(a,b){if(b!==!1)if(b===!0){a.tooltips=[];for(var c=0;c<a.handles;c++)a.tooltips.push(!0)}else{if(a.tooltips=h(b),a.tooltips.length!==a.handles)throw new Error("noUiSlider ("+U+"): must pass a formatter for all handles.");a.tooltips.forEach(function(a){if("boolean"!=typeof a&&("object"!=typeof a||"function"!=typeof a.to))throw new Error("noUiSlider ("+U+"): 'tooltips' must be passed a formatter or 'false'.")})}}function N(a,b){if(a.format=b,"function"==typeof b.to&&"function"==typeof b.from)return!0;throw new Error("noUiSlider ("+U+"): 'format' requires 'to' and 'from' methods.")}function O(a,b){if(void 0!==b&&"string"!=typeof b&&b!==!1)throw new Error("noUiSlider ("+U+"): 'cssPrefix' must be a string or `false`.");a.cssPrefix=b}function P(a,b){if(void 0!==b&&"object"!=typeof b)throw new Error("noUiSlider ("+U+"): 'cssClasses' must be an object.");if("string"==typeof a.cssPrefix){a.cssClasses={};for(var c in b)b.hasOwnProperty(c)&&(a.cssClasses[c]=a.cssPrefix+b[c])}else a.cssClasses=b}function Q(a,b){if(b!==!0&&b!==!1)throw new Error("noUiSlider ("+U+"): 'useRequestAnimationFrame' option should be true (default) or false.");a.useRequestAnimationFrame=b}function R(a){var b={margin:0,limit:0,padding:0,animate:!0,animationDuration:300,format:V},c={step:{r:!1,t:z},start:{r:!0,t:B},connect:{r:!0,t:F},direction:{r:!0,t:K},snap:{r:!1,t:C},animate:{r:!1,t:D},animationDuration:{r:!1,t:E},range:{r:!0,t:A},orientation:{r:!1,t:G},margin:{r:!1,t:H},limit:{r:!1,t:I},padding:{r:!1,t:J},behaviour:{r:!0,t:L},format:{r:!1,t:N},tooltips:{r:!1,t:M},cssPrefix:{r:!1,t:O},cssClasses:{r:!1,t:P},useRequestAnimationFrame:{r:!1,t:Q}},d={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal",cssPrefix:"noUi-",cssClasses:{target:"target",base:"base",origin:"origin",handle:"handle",handleLower:"handle-lower",handleUpper:"handle-upper",horizontal:"horizontal",vertical:"vertical",background:"background",connect:"connect",ltr:"ltr",rtl:"rtl",draggable:"draggable",drag:"state-drag",tap:"state-tap",active:"active",tooltip:"tooltip",pips:"pips",pipsHorizontal:"pips-horizontal",pipsVertical:"pips-vertical",marker:"marker",markerHorizontal:"marker-horizontal",markerVertical:"marker-vertical",markerNormal:"marker-normal",markerLarge:"marker-large",markerSub:"marker-sub",value:"value",valueHorizontal:"value-horizontal",valueVertical:"value-vertical",valueNormal:"value-normal",valueLarge:"value-large",valueSub:"value-sub"},useRequestAnimationFrame:!0};Object.keys(c).forEach(function(e){if(void 0===a[e]&&void 0===d[e]){if(c[e].r)throw new Error("noUiSlider ("+U+"): '"+e+"' is required.");return!0}c[e].t(b,void 0===a[e]?d[e]:a[e])}),b.pips=a.pips;var e=[["left","top"],["right","bottom"]];return b.style=e[b.dir][b.ort],b.styleOposite=e[b.dir?0:1][b.ort],b}function S(c,e,i){function o(b,c){var d=a(b,e.cssClasses.origin),f=a(d,e.cssClasses.handle);return f.setAttribute("data-handle",c),0===c?j(f,e.cssClasses.handleLower):c===e.handles-1&&j(f,e.cssClasses.handleUpper),d}function p(b,c){return!!c&&a(b,e.cssClasses.connect)}function q(a,b){ca=[],da=[],da.push(p(b,a[0]));for(var c=0;c<e.handles;c++)ca.push(o(b,c)),ia[c]=c,da.push(p(b,a[c+1]))}function r(b){j(b,e.cssClasses.target),0===e.dir?j(b,e.cssClasses.ltr):j(b,e.cssClasses.rtl),0===e.ort?j(b,e.cssClasses.horizontal):j(b,e.cssClasses.vertical),ba=a(b,e.cssClasses.base)}function s(b,c){return!!e.tooltips[c]&&a(b.firstChild,e.cssClasses.tooltip)}function t(){var a=ca.map(s);$("update",function(b,c,d){if(a[c]){var f=b[c];e.tooltips[c]!==!0&&(f=e.tooltips[c].to(d[c])),a[c].innerHTML=f}})}function u(a,b,c){if("range"===a||"steps"===a)return ka.xVal;if("count"===a){if(!b)throw new Error("noUiSlider ("+U+"): 'values' required for mode 'count'.");var d,e=100/(b-1),f=0;for(b=[];(d=f++*e)<=100;)b.push(d);a="positions"}return"positions"===a?b.map(function(a){return ka.fromStepping(c?ka.getStep(a):a)}):"values"===a?c?b.map(function(a){return ka.fromStepping(ka.getStep(ka.toStepping(a)))}):b:void 0}function v(a,c,d){function e(a,b){return(a+b).toFixed(7)/1}var f={},g=ka.xVal[0],h=ka.xVal[ka.xVal.length-1],i=!1,j=!1,k=0;return d=b(d.slice().sort(function(a,b){return a-b})),d[0]!==g&&(d.unshift(g),i=!0),d[d.length-1]!==h&&(d.push(h),j=!0),d.forEach(function(b,g){var h,l,m,n,o,p,q,r,s,t,u=b,v=d[g+1];if("steps"===c&&(h=ka.xNumSteps[g]),h||(h=v-u),u!==!1&&void 0!==v)for(h=Math.max(h,1e-7),l=u;l<=v;l=e(l,h)){for(n=ka.toStepping(l),o=n-k,r=o/a,s=Math.round(r),t=o/s,m=1;m<=s;m+=1)p=k+m*t,f[p.toFixed(5)]=["x",0];q=d.indexOf(l)>-1?1:"steps"===c?2:0,!g&&i&&(q=0),l===v&&j||(f[n.toFixed(5)]=[l,q]),k=n}}),f}function w(a,b,c){function d(a,b){var c=b===e.cssClasses.value,d=c?m:n,f=c?k:l;return b+" "+d[e.ort]+" "+f[a]}function f(a,b,c){return'class="'+d(c[1],b)+'" style="'+e.style+": "+a+'%"'}function g(a,d){d[1]=d[1]&&b?b(d[0],d[1]):d[1],i+="<div "+f(a,e.cssClasses.marker,d)+"></div>",d[1]&&(i+="<div "+f(a,e.cssClasses.value,d)+">"+c.to(d[0])+"</div>")}var h=document.createElement("div"),i="",k=[e.cssClasses.valueNormal,e.cssClasses.valueLarge,e.cssClasses.valueSub],l=[e.cssClasses.markerNormal,e.cssClasses.markerLarge,e.cssClasses.markerSub],m=[e.cssClasses.valueHorizontal,e.cssClasses.valueVertical],n=[e.cssClasses.markerHorizontal,e.cssClasses.markerVertical];return j(h,e.cssClasses.pips),j(h,0===e.ort?e.cssClasses.pipsHorizontal:e.cssClasses.pipsVertical),Object.keys(a).forEach(function(b){g(b,a[b])}),h.innerHTML=i,h}function x(a){var b=a.mode,c=a.density||1,d=a.filter||!1,e=a.values||!1,f=a.stepped||!1,g=u(b,e,f),h=v(c,b,g),i=a.format||{to:Math.round};return ga.appendChild(w(h,d,i))}function y(){var a=ba.getBoundingClientRect(),b="offset"+["Width","Height"][e.ort];return 0===e.ort?a.width||ba[b]:a.height||ba[b]}function z(a,b,c,d){var f=function(b){return!ga.hasAttribute("disabled")&&(!l(ga,e.cssClasses.tap)&&(!!(b=A(b,d.pageOffset))&&(!(a===fa.start&&void 0!==b.buttons&&b.buttons>1)&&((!d.hover||!b.buttons)&&(b.calcPoint=b.points[e.ort],void c(b,d))))))},g=[];return a.split(" ").forEach(function(a){b.addEventListener(a,f,!1),g.push([a,f])}),g}function A(a,b){a.preventDefault();var c,d,e=0===a.type.indexOf("touch"),f=0===a.type.indexOf("mouse"),g=0===a.type.indexOf("pointer");if(0===a.type.indexOf("MSPointer")&&(g=!0),e){if(a.touches.length>1)return!1;c=a.changedTouches[0].pageX,d=a.changedTouches[0].pageY}return b=b||m(),(f||g)&&(c=a.clientX+b.x,d=a.clientY+b.y),a.pageOffset=b,a.points=[c,d],a.cursor=f||g,a}function B(a){var b=a-d(ba,e.ort),c=100*b/y();return e.dir?100-c:c}function C(a){var b=100,c=!1;return ca.forEach(function(d,e){if(!d.hasAttribute("disabled")){var f=Math.abs(ha[e]-a);f<b&&(c=e,b=f)}}),c}function D(a,b,c,d){var e=c.slice(),f=[!a,a],g=[a,!a];d=d.slice(),a&&d.reverse(),d.length>1?d.forEach(function(a,c){var d=M(e,a,e[a]+b,f[c],g[c]);d===!1?b=0:(b=d-e[a],e[a]=d)}):f=g=[!0];var h=!1;d.forEach(function(a,d){h=Q(a,c[a]+b,f[d],g[d])||h}),h&&d.forEach(function(a){E("update",a),E("slide",a)})}function E(a,b,c){Object.keys(ma).forEach(function(d){var f=d.split(".")[0];a===f&&ma[d].forEach(function(a){a.call(ea,la.map(e.format.to),b,la.slice(),c||!1,ha.slice())})})}function F(a,b){"mouseout"===a.type&&"HTML"===a.target.nodeName&&null===a.relatedTarget&&H(a,b)}function G(a,b){if(navigator.appVersion.indexOf("MSIE 9")===-1&&0===a.buttons&&0!==b.buttonsProperty)return H(a,b);var c=(e.dir?-1:1)*(a.calcPoint-b.startCalcPoint),d=100*c/b.baseSize;D(c>0,d,b.locations,b.handleNumbers)}function H(a,b){ja&&(k(ja,e.cssClasses.active),ja=!1),a.cursor&&(document.body.style.cursor="",document.body.removeEventListener("selectstart",document.body.noUiListener)),document.documentElement.noUiListeners.forEach(function(a){document.documentElement.removeEventListener(a[0],a[1])}),k(ga,e.cssClasses.drag),P(),b.handleNumbers.forEach(function(a){E("set",a),E("change",a),E("end",a)})}function I(a,b){if(1===b.handleNumbers.length){var c=ca[b.handleNumbers[0]];if(c.hasAttribute("disabled"))return!1;ja=c.children[0],j(ja,e.cssClasses.active)}a.preventDefault(),a.stopPropagation();var d=z(fa.move,document.documentElement,G,{startCalcPoint:a.calcPoint,baseSize:y(),pageOffset:a.pageOffset,handleNumbers:b.handleNumbers,buttonsProperty:a.buttons,locations:ha.slice()}),f=z(fa.end,document.documentElement,H,{handleNumbers:b.handleNumbers}),g=z("mouseout",document.documentElement,F,{handleNumbers:b.handleNumbers});if(document.documentElement.noUiListeners=d.concat(f,g),a.cursor){document.body.style.cursor=getComputedStyle(a.target).cursor,ca.length>1&&j(ga,e.cssClasses.drag);var h=function(){return!1};document.body.noUiListener=h,document.body.addEventListener("selectstart",h,!1)}b.handleNumbers.forEach(function(a){E("start",a)})}function J(a){a.stopPropagation();var b=B(a.calcPoint),c=C(b);return c!==!1&&(e.events.snap||f(ga,e.cssClasses.tap,e.animationDuration),Q(c,b,!0,!0),P(),E("slide",c,!0),E("set",c,!0),E("change",c,!0),E("update",c,!0),void(e.events.snap&&I(a,{handleNumbers:[c]})))}function K(a){var b=B(a.calcPoint),c=ka.getStep(b),d=ka.fromStepping(c);Object.keys(ma).forEach(function(a){"hover"===a.split(".")[0]&&ma[a].forEach(function(a){a.call(ea,d)})})}function L(a){a.fixed||ca.forEach(function(a,b){z(fa.start,a.children[0],I,{handleNumbers:[b]})}),a.tap&&z(fa.start,ba,J,{}),a.hover&&z(fa.move,ba,K,{hover:!0}),a.drag&&da.forEach(function(b,c){if(b!==!1&&0!==c&&c!==da.length-1){var d=ca[c-1],f=ca[c],g=[b];j(b,e.cssClasses.draggable),a.fixed&&(g.push(d.children[0]),g.push(f.children[0])),g.forEach(function(a){z(fa.start,a,I,{handles:[d,f],handleNumbers:[c-1,c]})})}})}function M(a,b,c,d,f){return ca.length>1&&(d&&b>0&&(c=Math.max(c,a[b-1]+e.margin)),f&&b<ca.length-1&&(c=Math.min(c,a[b+1]-e.margin))),ca.length>1&&e.limit&&(d&&b>0&&(c=Math.min(c,a[b-1]+e.limit)),f&&b<ca.length-1&&(c=Math.max(c,a[b+1]-e.limit))),e.padding&&(0===b&&(c=Math.max(c,e.padding)),b===ca.length-1&&(c=Math.min(c,100-e.padding))),c=ka.getStep(c),c=g(c),c!==a[b]&&c}function N(a){return a+"%"}function O(a,b){ha[a]=b,la[a]=ka.fromStepping(b);var c=function(){ca[a].style[e.style]=N(b),S(a),S(a+1)};window.requestAnimationFrame&&e.useRequestAnimationFrame?window.requestAnimationFrame(c):c()}function P(){ia.forEach(function(a){var b=ha[a]>50?-1:1,c=3+(ca.length+b*a);ca[a].childNodes[0].style.zIndex=c})}function Q(a,b,c,d){return b=M(ha,a,b,c,d),b!==!1&&(O(a,b),!0)}function S(a){if(da[a]){var b=0,c=100;0!==a&&(b=ha[a-1]),a!==da.length-1&&(c=ha[a]),da[a].style[e.style]=N(b),da[a].style[e.styleOposite]=N(100-c)}}function T(a,b){null!==a&&a!==!1&&("number"==typeof a&&(a=String(a)),a=e.format.from(a),a===!1||isNaN(a)||Q(b,ka.toStepping(a),!1,!1))}function V(a,b){var c=h(a),d=void 0===ha[0];b=void 0===b||!!b,c.forEach(T),e.animate&&!d&&f(ga,e.cssClasses.tap,e.animationDuration),ia.forEach(function(a){Q(a,ha[a],!0,!1)}),P(),ia.forEach(function(a){E("update",a),null!==c[a]&&b&&E("set",a)})}function W(a){V(e.start,a)}function X(){var a=la.map(e.format.to);return 1===a.length?a[0]:a}function Y(){for(var a in e.cssClasses)e.cssClasses.hasOwnProperty(a)&&k(ga,e.cssClasses[a]);for(;ga.firstChild;)ga.removeChild(ga.firstChild);delete ga.noUiSlider}function Z(){return ha.map(function(a,b){var c=ka.getNearbySteps(a),d=la[b],e=c.thisStep.step,f=null;e!==!1&&d+e>c.stepAfter.startValue&&(e=c.stepAfter.startValue-d),f=d>c.thisStep.startValue?c.thisStep.step:c.stepBefore.step!==!1&&d-c.stepBefore.highestStep,100===a?e=null:0===a&&(f=null);var g=ka.countStepDecimals();return null!==e&&e!==!1&&(e=Number(e.toFixed(g))),null!==f&&f!==!1&&(f=Number(f.toFixed(g))),[f,e]})}function $(a,b){ma[a]=ma[a]||[],ma[a].push(b),"update"===a.split(".")[0]&&ca.forEach(function(a,b){E("update",b)})}function _(a){var b=a&&a.split(".")[0],c=b&&a.substring(b.length);Object.keys(ma).forEach(function(a){var d=a.split(".")[0],e=a.substring(d.length);b&&b!==d||c&&c!==e||delete ma[a]})}function aa(a,b){var c=X(),d=["margin","limit","padding","range","animate","snap","step","format"];d.forEach(function(b){void 0!==a[b]&&(i[b]=a[b])});var f=R(i);d.forEach(function(b){void 0!==a[b]&&(e[b]=f[b])}),f.spectrum.direction=ka.direction,ka=f.spectrum,e.margin=f.margin,e.limit=f.limit,e.padding=f.padding,ha=[],V(a.start||c,b)}var ba,ca,da,ea,fa=n(),ga=c,ha=[],ia=[],ja=!1,ka=e.spectrum,la=[],ma={};if(ga.noUiSlider)throw new Error("noUiSlider ("+U+"): Slider was already initialized.");return r(ga),q(e.connect,ba),ea={destroy:Y,steps:Z,on:$,off:_,get:X,set:V,reset:W,__moveHandles:function(a,b,c){D(a,b,ha,c)},options:i,updateOptions:aa,target:ga,pips:x},L(e.events),V(e.start),e.pips&&x(e.pips),e.tooltips&&t(),ea}function T(a,b){if(!a.nodeName)throw new Error("noUiSlider ("+U+"): create requires a single element.");var c=R(b,a),d=S(a,c,b);return a.noUiSlider=d,d}var U="9.2.0";y.prototype.getMargin=function(a){var b=this.xNumSteps[0];if(b&&a/b%1!==0)throw new Error("noUiSlider ("+U+"): 'limit', 'margin' and 'padding' must be divisible by step.");return 2===this.xPct.length&&p(this.xVal,a)},y.prototype.toStepping=function(a){return a=t(this.xVal,this.xPct,a)},y.prototype.fromStepping=function(a){return u(this.xVal,this.xPct,a)},y.prototype.getStep=function(a){return a=v(this.xPct,this.xSteps,this.snap,a)},y.prototype.getNearbySteps=function(a){var b=s(a,this.xPct);return{stepBefore:{startValue:this.xVal[b-2],step:this.xNumSteps[b-2],highestStep:this.xHighestCompleteStep[b-2]},thisStep:{startValue:this.xVal[b-1],step:this.xNumSteps[b-1],highestStep:this.xHighestCompleteStep[b-1]},stepAfter:{startValue:this.xVal[b-0],step:this.xNumSteps[b-0],highestStep:this.xHighestCompleteStep[b-0]}}},y.prototype.countStepDecimals=function(){var a=this.xNumSteps.map(i);return Math.max.apply(null,a)},y.prototype.convert=function(a){return this.getStep(this.toStepping(a))};var V={to:function(a){return void 0!==a&&a.toFixed(2)},from:Number};return{version:U,create:T}});


// DOM.event.move
//
// 2.0.0
!function(e){"function"==typeof define&&define.amd?define([],e):"undefined"!=typeof module&&null!==module&&module.exports?module.exports=e:e()}(function(){var e=Object.assign||window.jQuery&&jQuery.extend,t=8,n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e,t){return window.setTimeout(function(){e()},25)};!function(){if("function"==typeof window.CustomEvent)return!1;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e}();var o={textarea:!0,input:!0,select:!0,button:!0},i={move:"mousemove",cancel:"mouseup dragstart",end:"mouseup"},a={move:"touchmove",cancel:"touchend",end:"touchend"},u=/\s+/,c={bubbles:!0,cancelable:!0},r="function"==typeof Symbol?Symbol("events"):{};function d(e){return e[r]||(e[r]={})}function m(e,t,n,o,i){t=t.split(u);var a,c=d(e),r=t.length;function m(e){n(e,o)}for(;r--;)(c[a=t[r]]||(c[a]=[])).push([n,m]),e.addEventListener(a,m)}function f(e,t,n,o){t=t.split(u);var i,a,c,r=d(e),m=t.length;if(r)for(;m--;)if(a=r[i=t[m]])for(c=a.length;c--;)a[c][0]===n&&(e.removeEventListener(i,a[c][1]),a.splice(c,1))}function v(t,n,o){var i=function(e){return new CustomEvent(e,c)}(n);o&&e(i,o),t.dispatchEvent(i)}function s(e){var t=e,o=!1,i=!1;function a(e){o?(t(),n(a),i=!0,o=!1):i=!1}this.kick=function(e){o=!0,i||a()},this.end=function(e){var n=t;e&&(i?(t=o?function(){n(),e()}:e,o=!0):e())}}function l(){}function p(e){e.preventDefault()}function g(e,t){var n,o;if(e.identifiedTouch)return e.identifiedTouch(t);for(n=-1,o=e.length;++n<o;)if(e[n].identifier===t)return e[n]}function h(e,t){var n=g(e.changedTouches,t.identifier);if(n&&(n.pageX!==t.pageX||n.pageY!==t.pageY))return n}function X(e,t){b(e,t,e,y)}function Y(e,t){y()}function y(){f(document,i.move,X),f(document,i.cancel,Y)}function w(e){f(document,a.move,e.touchmove),f(document,a.cancel,e.touchend)}function b(e,n,o,i){var a=o.pageX-n.pageX,u=o.pageY-n.pageY;a*a+u*u<t*t||function(e,t,n,o,i,a){var u=e.targetTouches,c=e.timeStamp-t.timeStamp,r={altKey:e.altKey,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,startX:t.pageX,startY:t.pageY,distX:o,distY:i,deltaX:o,deltaY:i,pageX:n.pageX,pageY:n.pageY,velocityX:o/c,velocityY:i/c,identifier:t.identifier,targetTouches:u,finger:u?u.length:1,enableMove:function(){this.moveEnabled=!0,this.enableMove=l,e.preventDefault()}};v(t.target,"movestart",r),a(t)}(e,n,o,a,u,i)}function T(e,t){var n=t.timer;t.touch=e,t.timeStamp=e.timeStamp,n.kick()}function E(e,t){var n=t.target,o=t.event,a=t.timer;f(document,i.move,T),f(document,i.end,E),k(n,o,a,function(){setTimeout(function(){f(n,"click",p)},0)})}function S(e,t){var n=t.target,o=t.event,i=t.timer;g(e.changedTouches,o.identifier)&&(!function(e){f(document,a.move,e.activeTouchmove),f(document,a.end,e.activeTouchend)}(t),k(n,o,i))}function k(e,t,n,o){n.end(function(){return v(e,"moveend",t),o&&o()})}if(m(document,"mousedown",function(e){(function(e){return 1===e.which&&!e.ctrlKey&&!e.altKey})(e)&&(function(e){return!!o[e.target.tagName.toLowerCase()]}(e)||(m(document,i.move,X,e),m(document,i.cancel,Y,e)))}),m(document,"touchstart",function(e){if(!o[e.target.tagName.toLowerCase()]){var t=e.changedTouches[0],n={target:t.target,pageX:t.pageX,pageY:t.pageY,identifier:t.identifier,touchmove:function(e,t){!function(e,t){var n=h(e,t);n&&b(e,t,n,w)}(e,t)},touchend:function(e,t){!function(e,t){g(e.changedTouches,t.identifier)&&w(t)}(e,t)}};m(document,a.move,n.touchmove,n),m(document,a.cancel,n.touchend,n)}}),m(document,"movestart",function(e){if(!e.defaultPrevented&&e.moveEnabled){var t={startX:e.startX,startY:e.startY,pageX:e.pageX,pageY:e.pageY,distX:e.distX,distY:e.distY,deltaX:e.deltaX,deltaY:e.deltaY,velocityX:e.velocityX,velocityY:e.velocityY,identifier:e.identifier,targetTouches:e.targetTouches,finger:e.finger},n={target:e.target,event:t,timer:new s(function(e){(function(e,t,n){var o=n-e.timeStamp;e.distX=t.pageX-e.startX,e.distY=t.pageY-e.startY,e.deltaX=t.pageX-e.pageX,e.deltaY=t.pageY-e.pageY,e.velocityX=.3*e.velocityX+.7*e.deltaX/o,e.velocityY=.3*e.velocityY+.7*e.deltaY/o,e.pageX=t.pageX,e.pageY=t.pageY})(t,n.touch,n.timeStamp),v(n.target,"move",t)}),touch:void 0,timeStamp:e.timeStamp};void 0===e.identifier?(m(e.target,"click",p),m(document,i.move,T,n),m(document,i.end,E,n)):(n.activeTouchmove=function(e,t){!function(e,t){var n=t.event,o=t.timer,i=h(e,n);i&&(e.preventDefault(),n.targetTouches=e.targetTouches,t.touch=i,t.timeStamp=e.timeStamp,o.kick())}(e,t)},n.activeTouchend=function(e,t){S(e,t)},m(document,a.move,n.activeTouchmove,n),m(document,a.end,n.activeTouchend,n))}}),window.jQuery){var K="startX startY pageX pageY distX distY deltaX deltaY velocityX velocityY".split(" ");jQuery.event.special.movestart={setup:function(){return m(this,"movestart",j),!1},teardown:function(){return f(this,"movestart",j),!1},add:q},jQuery.event.special.move={setup:function(){return m(this,"movestart",C),!1},teardown:function(){return f(this,"movestart",C),!1},add:q},jQuery.event.special.moveend={setup:function(){return m(this,"movestart",Q),!1},teardown:function(){return f(this,"movestart",Q),!1},add:q}}function j(e){e.enableMove()}function C(e){e.enableMove()}function Q(e){e.enableMove()}function q(e){var t=e.handler;e.handler=function(e){for(var n,o=K.length;o--;)e[n=K[o]]=e.originalEvent[n];t.apply(this,arguments)}}});


// [before & after] twentytwenty
(function($){

  $.fn.twentytwenty = function(options) {
    var options = $.extend({
      default_offset_pct: 0.5,
      orientation: 'horizontal',
      before_label: 'Before',
      after_label: 'After',
      no_overlay: false,
      move_slider_on_hover: false,
      move_with_handle_only: true,
      click_to_move: false
    }, options);

    return this.each(function() {

      var sliderPct = options.default_offset_pct;
      var container = $(this);
      var sliderOrientation = options.orientation;
      var beforeDirection = (sliderOrientation === 'vertical') ? 'down' : 'left';
      var afterDirection = (sliderOrientation === 'vertical') ? 'up' : 'right';


      container.wrap("<div class='twentytwenty-wrapper twentytwenty-" + sliderOrientation + "'></div>");
      if(!options.no_overlay) {
        container.append("<div class='twentytwenty-overlay'></div>");
        var overlay = container.find(".twentytwenty-overlay");
        overlay.append("<div class='twentytwenty-before-label' data-content='"+options.before_label+"'></div>");
        overlay.append("<div class='twentytwenty-after-label' data-content='"+options.after_label+"'></div>");
      }
      var beforeImg = container.find("img:first");
      var afterImg = container.find("img:last");
      container.append("<div class='twentytwenty-handle'></div>");
      var slider = container.find(".twentytwenty-handle");
      slider.append("<span class='twentytwenty-" + beforeDirection + "-arrow'></span>");
      slider.append("<span class='twentytwenty-" + afterDirection + "-arrow'></span>");
      container.addClass("twentytwenty-container");
      beforeImg.addClass("twentytwenty-before");
      afterImg.addClass("twentytwenty-after");
      
      var calcOffset = function(dimensionPct) {
        var w = beforeImg.width();
        var h = container.height();
        return {
          w: w+"px",
          h: h+"px",
          cw: (dimensionPct*w)+"px",
          ch: (dimensionPct*h)+"px",
          _cw: (dimensionPct*w)
        };
      };

      var adjustContainer = function(offset) {
        if (offset._cw < beforeImg.width() / 2) {
            overlay.css("background", "rgba(0,0,0,0.3)")
        } else {
            overlay.css("background", "none")
        }
        if (sliderOrientation === 'vertical') {
          beforeImg.css("clip", "rect(0,"+offset.w+","+offset.ch+",0)");
          afterImg.css("clip", "rect("+offset.ch+","+offset.w+","+offset.h+",0)");
        }
        else {
          beforeImg.css("clip", "rect(0,"+offset.cw+","+offset.h+",0)");
          afterImg.css("clip", "rect(0,"+offset.w+","+offset.h+","+offset.cw+")");
        }
        container.css("height", offset.h);
      };

      var adjustSlider = function(pct) {
        var offset = calcOffset(pct);
        slider.css((sliderOrientation==="vertical") ? "top" : "left", (sliderOrientation==="vertical") ? offset.ch : offset.cw);
        adjustContainer(offset);
      };

      // Return the number specified or the min/max number if it outside the range given.
      var minMaxNumber = function(num, min, max) {
        return Math.max(min, Math.min(max, num));
      };

      // Calculate the slider percentage based on the position.
      var getSliderPercentage = function(positionX, positionY) {
        var sliderPercentage = (sliderOrientation === 'vertical') ?
          (positionY-offsetY)/imgHeight :
          (positionX-offsetX)/imgWidth;

        return minMaxNumber(sliderPercentage, 0, 1);
      };


      $(window).on("resize.twentytwenty", function(e) {
        adjustSlider(sliderPct);
      });

      var offsetX = 0;
      var offsetY = 0;
      var imgWidth = 0;
      var imgHeight = 0;
      var onMoveStart = function(e) {
        if (((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) && sliderOrientation !== 'vertical') {
          e.preventDefault();
        }
        else if (((e.distX < e.distY && e.distX < -e.distY) || (e.distX > e.distY && e.distX > -e.distY)) && sliderOrientation === 'vertical') {
          e.preventDefault();
        }
        container.addClass("active");
        offsetX = container.offset().left;
        offsetY = container.offset().top;
        imgWidth = beforeImg.width(); 
        imgHeight = container.height();          
      };
      var onMove = function(e) {
        if (container.hasClass("active")) {
          sliderPct = getSliderPercentage(e.pageX, e.pageY);
          adjustSlider(sliderPct);
        }
      };
      var onMoveEnd = function() {
          container.removeClass("active");
      };

      var moveTarget = options.move_with_handle_only ? slider : container;
      moveTarget.on("movestart",onMoveStart);
      moveTarget.on("move",onMove);
      moveTarget.on("moveend",onMoveEnd);

      if (options.move_slider_on_hover) {
        container.on("mouseenter", onMoveStart);
        container.on("mousemove", onMove);
        container.on("mouseleave", onMoveEnd);
      }

      slider.on("touchmove", function(e) {
        e.preventDefault();
      });

      container.find("img").on("mousedown", function(event) {
        event.preventDefault();
      });

      if (options.click_to_move) {
        container.on('click', function(e) {
          offsetX = container.offset().left;
          offsetY = container.offset().top;
          imgWidth = beforeImg.width();
          imgHeight = container.height();

          sliderPct = getSliderPercentage(e.pageX, e.pageY);
          adjustSlider(sliderPct);
        });
      }

      $(window).trigger("resize.twentytwenty");
    });
  };

})(jQuery);



 /*
 RichText: WYSIWYG editor developed as jQuery plugin

 @name RichText
 @author https://github.com/webfashionist - Bob Schockweiler - richtext@webfashion.eu
 @license GNU AFFERO GENERAL PUBLIC LICENSE Version 3

*/
(function($) {
    $.fn.richText = function(options) {
        var settings = $.extend({
            title: true,
            bold: true,
            italic: true,
            underline: true,
            leftAlign: false,
            centerAlign: false,
            rightAlign: false,
            justify: false,
            ol: false,
            ul: false,
            heading: false,
            fonts: false,
            fontList: ["Arial", "Arial Black", "Comic Sans MS", "Courier New", "Geneva", "Georgia", "Helvetica", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"],
            fontColor: false,
            fontSize: false,
            imageUpload: false,
            fileUpload: false,
            videoEmbed: false,
            urls: false,
            table: false,
            removeStyles: false,
            code: false,
            colors: [],
            fileHTML: "",
            imageHTML: "",
            translations: {
                title: "Title",
                white: "White",
                black: "Black",
                brown: "Brown",
                beige: "Beige",
                darkBlue: "Dark Blue",
                blue: "Blue",
                lightBlue: "Light Blue",
                darkRed: "Dark Red",
                red: "Red",
                darkGreen: "Dark Green",
                green: "Green",
                purple: "Purple",
                darkTurquois: "Dark Turquois",
                turquois: "Turquois",
                darkOrange: "Dark Orange",
                orange: "Orange",
                yellow: "Yellow",
                imageURL: "Image URL",
                fileURL: "File URL",
                linkText: "Link text",
                url: "URL",
                size: "Size",
                responsive: "Responsive",
                text: "Text",
                openIn: "Open in",
                sameTab: "Same tab",
                newTab: "New tab",
                align: "Align",
                left: "Left",
                justify: "Justify",
                center: "Center",
                right: "Right",
                rows: "Rows",
                columns: "Columns",
                add: "Add",
                pleaseEnterURL: "Please enter an URL",
                videoURLnotSupported: "Video URL not supported",
                pleaseSelectImage: "Please select an image",
                pleaseSelectFile: "Please select a file",
                bold: "Bold",
                italic: "Italic",
                underline: "Underline",
                alignLeft: "Align left",
                alignCenter: "Align centered",
                alignRight: "Align right",
                addOrderedList: "Add ordered list",
                addUnorderedList: "Add unordered list",
                addHeading: "Add Heading/title",
                addFont: "Add font",
                addFontColor: "Add font color",
                addFontSize: "Add font size",
                addImage: "Add image",
                addVideo: "Add video",
                addFile: "Add file",
                addURL: "Add URL",
                addTable: "Add table",
                removeStyles: "Remove styles",
                code: "Show HTML code",
                undo: "Undo",
                redo: "Redo",
                close: "Close"
            },
            youtubeCookies: false,
            useSingleQuotes: false,
            height: 0,
            heightPercentage: 0,
            id: "",
            class: "",
            useParagraph: false,
            maxlength: 0,
            callback: undefined,
            useTabForNext: false
        }, options);
        var $inputElement = $(this);
        $inputElement.addClass("richText-initial");
        var $editor, $toolbarList = $("<ul />"),
            $toolbarElement = $("<li />"),
            $btnBold = $("<a />", {
                class: "richText-btn",
                "data-command": "bold",
                title: settings.translations.bold,
                html: '<span class="bold">B</span>'
            }),
            $btnItalic = $("<a />", {
                class: "richText-btn",
                "data-command": "italic",
                title: settings.translations.italic,
                html: '<span class="italic">I</span>'
            }),
            $btnUnderline = $("<a />", {
                class: "richText-btn",
                "data-command": "underline",
                title: settings.translations.underline,
                html: '<span class="underline">U</span>'
            }),
            $btnTitle = $("<a />", {
                class: "richText-btn tit",
                "data-command": "title",
                title: settings.translations.bold,
                html: '<span>타이틀</span>'
            }),
            $btnJustify = $("<a />", {
                class: "richText-btn",
                "data-command": "justifyFull",
                title: settings.translations.justify,
                html: '<span class="fa fa-align-justify"></span>'
            }),
            $btnLeftAlign = $("<a />", {
                class: "richText-btn",
                "data-command": "justifyLeft",
                title: settings.translations.alignLeft,
                html: '<span class="fa fa-align-left"></span>'
            }),
            $btnCenterAlign = $("<a />", {
                class: "richText-btn",
                "data-command": "justifyCenter",
                title: settings.translations.alignCenter,
                html: '<span class="fa fa-align-center"></span>'
            }),
            $btnRightAlign = $("<a />", {
                class: "richText-btn",
                "data-command": "justifyRight",
                title: settings.translations.alignRight,
                html: '<span class="fa fa-align-right"></span>'
            }),
            $btnOL = $("<a />", {
                class: "richText-btn",
                "data-command": "insertOrderedList",
                title: settings.translations.addOrderedList,
                html: '<span class="fa fa-list-ol"></span>'
            }),
            $btnUL = $("<a />", {
                class: "richText-btn",
                "data-command": "insertUnorderedList",
                title: settings.translations.addUnorderedList,
                html: '<span class="fa fa-list"></span>'
            }),
            $btnHeading = $("<a />", {
                class: "richText-btn",
                title: settings.translations.addHeading,
                html: '<span class="fa fa-header fa-heading"></span>'
            }),
            $btnFont = $("<a />", {
                class: "richText-btn",
                title: settings.translations.addFont,
                html: '<span class="fa fa-font"></span>'
            }),
            $btnFontColor = $("<a />", {
                class: "richText-btn",
                title: settings.translations.addFontColor,
                html: '<span class="fa fa-paint-brush"></span>'
            }),
            $btnFontSize = $("<a />", {
                class: "richText-btn",
                title: settings.translations.addFontSize,
                html: '<span class="fa fa-text-height"></span>'
            }),
            $btnImageUpload = $("<a />", {
                class: "richText-btn",
                title: settings.translations.addImage,
                html: '<span class="fa fa-image"></span>'
            }),
            $btnVideoEmbed = $("<a />", {
                class: "richText-btn",
                title: settings.translations.addVideo,
                html: '<span class="fa fa-video-camera fa-video"></span>'
            }),
            $btnFileUpload = $("<a />", {
                class: "richText-btn",
                title: settings.translations.addFile,
                html: '<span class="fa fa-file-text-o far fa-file-alt"></span>'
            }),
            $btnURLs = $("<a />", {
                class: "richText-btn",
                title: settings.translations.addURL,
                html: '<span class="fa fa-link"></span>'
            }),
            $btnTable = $("<a />", {
                class: "richText-btn",
                title: settings.translations.addTable,
                html: '<span class="fa fa-table"></span>'
            }),
            $btnRemoveStyles = $("<a />", {
                class: "richText-btn",
                "data-command": "removeFormat",
                title: settings.translations.removeStyles,
                html: '<span class="fa fa-recycle"></span>'
            }),
            $btnCode = $("<a />", {
                class: "richText-btn",
                "data-command": "toggleCode",
                title: settings.translations.code,
                html: '<span class="fa fa-code"></span>'
            });
        var $dropdownOuter = $("<div />", {
            class: "richText-dropdown-outer"
        });
        var $dropdownClose = $("<span />", {
            class: "richText-dropdown-close",
            html: '<span title="' + settings.translations.close + '"><span class="fa fa-times"></span></span>'
        });
        var $dropdownList = $("<ul />", {
                class: "richText-dropdown"
            }),
            $dropdownBox = $("<div />", {
                class: "richText-dropdown"
            }),
            $form = $("<div />", {
                class: "richText-form"
            }),
            $formItem = $("<div />", {
                class: "richText-form-item"
            }),
            $formLabel = $("<label />"),
            $formInput = $("<input />", {
                type: "text"
            }),
            $formInputFile = $("<input />", {
                type: "file"
            }),
            $formInputSelect = $("<select />"),
            $formButton = $("<button />", {
                text: settings.translations.add,
                class: "btn"
            });
        var savedSelection;
        var editorID = "richText-" + Math.random().toString(36).substring(7);
        var ignoreSave = false,
            $resizeImage = null;
        var history = [];
        history[editorID] = [];
        var historyPosition = [];
        historyPosition[editorID] = 0;
        var $titles = $dropdownList.clone();
        $titles.append($("<li />", {
            html: '<a data-command="formatBlock" data-option="h1">' + settings.translations.title + " #1</a>"
        }));
        $titles.append($("<li />", {
            html: '<a data-command="formatBlock" data-option="h2">' + settings.translations.title + " #2</a>"
        }));
        $titles.append($("<li />", {
            html: '<a data-command="formatBlock" data-option="h3">' + settings.translations.title + " #3</a>"
        }));
        $titles.append($("<li />", {
            html: '<a data-command="formatBlock" data-option="h4">' + settings.translations.title + " #4</a>"
        }));
        $btnHeading.append($dropdownOuter.clone().append($titles.prepend($dropdownClose.clone())));
        var fonts = settings.fontList;
        var $fonts = $dropdownList.clone();
        for (var i = 0; i < fonts.length; i++) {
            $fonts.append($("<li />", {
                html: '<a style="font-family:' + fonts[i] + ';" data-command="fontName" data-option="' + fonts[i] + '">' + fonts[i] + "</a>"
            }))
        }
        $btnFont.append($dropdownOuter.clone().append($fonts.prepend($dropdownClose.clone())));
        var fontSizes = [24, 18, 16, 14, 12];
        var $fontSizes = $dropdownList.clone();
        for (var i = 0; i < fontSizes.length; i++) {
            $fontSizes.append($("<li />", {
                html: '<a style="font-size:' + fontSizes[i] + 'px;" data-command="fontSize" data-option="' + fontSizes[i] + '">' + settings.translations.text + " " + fontSizes[i] + "px</a>"
            }))
        }
        $btnFontSize.append($dropdownOuter.clone().append($fontSizes.prepend($dropdownClose.clone())));
        var $fontColors = $dropdownList.clone();
        $fontColors.html(loadColors("forecolor"));
        $btnFontColor.append($dropdownOuter.clone().append($fontColors.prepend($dropdownClose.clone())));
        var $linksDropdown = $dropdownBox.clone();
        var $linksForm = $form.clone().attr("id", "richText-URL").attr("data-editor", editorID);
        $linksForm.append($formItem.clone().append($formLabel.clone().text(settings.translations.url).attr("for", "url")).append($formInput.clone().attr("id", "url")));
        $linksForm.append($formItem.clone().append($formLabel.clone().text(settings.translations.text).attr("for", "urlText")).append($formInput.clone().attr("id", "urlText")));
        $linksForm.append($formItem.clone().append($formLabel.clone().text(settings.translations.openIn).attr("for", "openIn")).append($formInputSelect.clone().attr("id", "openIn").append($("<option />", {
            value: "_self",
            text: settings.translations.sameTab
        })).append($("<option />", {
            value: "_blank",
            text: settings.translations.newTab
        }))));
        $linksForm.append($formItem.clone().append($formButton.clone()));
        $linksDropdown.append($linksForm);
        $btnURLs.append($dropdownOuter.clone().append($linksDropdown.prepend($dropdownClose.clone())));
        var $videoDropdown = $dropdownBox.clone();
        var $videoForm = $form.clone().attr("id", "richText-Video").attr("data-editor", editorID);
        $videoForm.append($formItem.clone().append($formLabel.clone().text(settings.translations.url).attr("for", "videoURL")).append($formInput.clone().attr("id", "videoURL")));
        $videoForm.append($formItem.clone().append($formLabel.clone().text(settings.translations.size).attr("for", "size")).append($formInputSelect.clone().attr("id", "size").append($("<option />", {
            value: "responsive",
            text: settings.translations.responsive
        })).append($("<option />", {
            value: "640x360",
            text: "640x360"
        })).append($("<option />", {
            value: "560x315",
            text: "560x315"
        })).append($("<option />", {
            value: "480x270",
            text: "480x270"
        })).append($("<option />", {
            value: "320x180",
            text: "320x180"
        }))));
        $videoForm.append($formItem.clone().append($formButton.clone()));
        $videoDropdown.append($videoForm);
        $btnVideoEmbed.append($dropdownOuter.clone().append($videoDropdown.prepend($dropdownClose.clone())));
        var $imageDropdown = $dropdownBox.clone();
        var $imageForm = $form.clone().attr("id", "richText-Image").attr("data-editor", editorID);
        if (settings.imageHTML && ($(settings.imageHTML).find("#imageURL").length > 0 || $(settings.imageHTML).attr("id") === "imageURL")) {
            $imageForm.html(settings.imageHTML)
        } else {
            $imageForm.append($formItem.clone().append($formLabel.clone().text(settings.translations.imageURL).attr("for", "imageURL")).append($formInput.clone().attr("id", "imageURL")));
            $imageForm.append($formItem.clone().append($formLabel.clone().text(settings.translations.align).attr("for", "align")).append($formInputSelect.clone().attr("id", "align").append($("<option />", {
                value: "left",
                text: settings.translations.left
            })).append($("<option />", {
                value: "center",
                text: settings.translations.center
            })).append($("<option />", {
                value: "right",
                text: settings.translations.right
            }))))
        }
        $imageForm.append($formItem.clone().append($formButton.clone()));
        $imageDropdown.append($imageForm);
        $btnImageUpload.append($dropdownOuter.clone().append($imageDropdown.prepend($dropdownClose.clone())));
        var $fileDropdown = $dropdownBox.clone();
        var $fileForm = $form.clone().attr("id", "richText-File").attr("data-editor", editorID);
        if (settings.fileHTML && ($(settings.fileHTML).find("#fileURL").length > 0 || $(settings.fileHTML).attr("id") === "fileURL")) {
            $fileForm.html(settings.fileHTML)
        } else {
            $fileForm.append($formItem.clone().append($formLabel.clone().text(settings.translations.fileURL).attr("for", "fileURL")).append($formInput.clone().attr("id", "fileURL")));
            $fileForm.append($formItem.clone().append($formLabel.clone().text(settings.translations.linkText).attr("for", "fileText")).append($formInput.clone().attr("id", "fileText")))
        }
        $fileForm.append($formItem.clone().append($formButton.clone()));
        $fileDropdown.append($fileForm);
        $btnFileUpload.append($dropdownOuter.clone().append($fileDropdown.prepend($dropdownClose.clone())));
        var $tableDropdown = $dropdownBox.clone();
        var $tableForm = $form.clone().attr("id", "richText-Table").attr("data-editor", editorID);
        $tableForm.append($formItem.clone().append($formLabel.clone().text(settings.translations.rows).attr("for", "tableRows")).append($formInput.clone().attr("id", "tableRows").attr("type", "number")));
        $tableForm.append($formItem.clone().append($formLabel.clone().text(settings.translations.columns).attr("for", "tableColumns")).append($formInput.clone().attr("id", "tableColumns").attr("type", "number")));
        $tableForm.append($formItem.clone().append($formButton.clone()));
        $tableDropdown.append($tableForm);
        $btnTable.append($dropdownOuter.clone().append($tableDropdown.prepend($dropdownClose.clone())));

        function init() {
            var value, attributes, attributes_html = "";
            if (settings.useParagraph !== false) {
                document.execCommand("DefaultParagraphSeparator", false, "p")
            }
            if ($inputElement.prop("tagName") === "TEXTAREA") {} else if ($inputElement.val()) {
                value = $inputElement.val();
                attributes = $inputElement.prop("attributes");
                $.each(attributes, function() {
                    if (this.name) {
                        attributes_html += " " + this.name + '="' + this.value + '"'
                    }
                });
                $inputElement.replaceWith($("<textarea" + attributes_html + ' data-richtext="init">' + value + "</textarea>"));
                $inputElement = $('[data-richtext="init"]');
                $inputElement.removeAttr("data-richtext")
            } else if ($inputElement.html()) {
                value = $inputElement.html();
                attributes = $inputElement.prop("attributes");
                $.each(attributes, function() {
                    if (this.name) {
                        attributes_html += " " + this.name + '="' + this.value + '"'
                    }
                });
                $inputElement.replaceWith($("<textarea" + attributes_html + ' data-richtext="init">' + value + "</textarea>"));
                $inputElement = $('[data-richtext="init"]');
                $inputElement.removeAttr("data-richtext")
            } else {
                attributes = $inputElement.prop("attributes");
                $.each(attributes, function() {
                    if (this.name) {
                        attributes_html += " " + this.name + '="' + this.value + '"'
                    }
                });
                $inputElement.replaceWith($("<textarea" + attributes_html + ' data-richtext="init"></textarea>'));
                $inputElement = $('[data-richtext="init"]');
                $inputElement.removeAttr("data-richtext")
            }
            $editor = $("<div />", {
                class: "richText"
            });
            var $toolbar = $("<div />", {
                class: "richText-toolbar"
            });
            var $editorView = $("<div />", {
                class: "richText-editor",
                id: editorID,
                contenteditable: true
            });
            var tabindex = $inputElement.prop("tabindex");
            if (tabindex >= 0 && settings.useTabForNext === true) {
                $editorView.attr("tabindex", tabindex)
            }
            $toolbar.append($toolbarList);
            settings.$editor = $editor;
            if (settings.bold === true) {
                $toolbarList.append($toolbarElement.clone().append($btnBold))
            }
            if (settings.italic === true) {
                $toolbarList.append($toolbarElement.clone().append($btnItalic))
            }
            if (settings.underline === true) {
                $toolbarList.append($toolbarElement.clone().append($btnUnderline))
            }
            if (settings.title === true) {
                $toolbarList.append($toolbarElement.clone().append($btnTitle))
                $btnTitle.click(function(event) {
                    $(this).toggleClass('on');
                });
            }
            if (settings.leftAlign === true) {
                $toolbarList.append($toolbarElement.clone().append($btnLeftAlign))
            }
            if (settings.centerAlign === true) {
                $toolbarList.append($toolbarElement.clone().append($btnCenterAlign))
            }
            if (settings.rightAlign === true) {
                $toolbarList.append($toolbarElement.clone().append($btnRightAlign))
            }
            if (settings.justify === true) {
                $toolbarList.append($toolbarElement.clone().append($btnJustify))
            }
            if (settings.ol === true) {
                $toolbarList.append($toolbarElement.clone().append($btnOL))
            }
            if (settings.ul === true) {
                $toolbarList.append($toolbarElement.clone().append($btnUL))
            }
            if (settings.fonts === true && settings.fontList.length > 0) {
                $toolbarList.append($toolbarElement.clone().append($btnFont))
            }
            if (settings.fontSize === true) {
                $toolbarList.append($toolbarElement.clone().append($btnFontSize))
            }
            if (settings.heading === true) {
                $toolbarList.append($toolbarElement.clone().append($btnHeading))
            }
            if (settings.fontColor === true) {
                $toolbarList.append($toolbarElement.clone().append($btnFontColor))
            }
            if (settings.imageUpload === true) {
                $toolbarList.append($toolbarElement.clone().append($btnImageUpload))
            }
            if (settings.fileUpload === true) {
                $toolbarList.append($toolbarElement.clone().append($btnFileUpload))
            }
            if (settings.videoEmbed === true) {
                $toolbarList.append($toolbarElement.clone().append($btnVideoEmbed))
            }
            if (settings.urls === true) {
                $toolbarList.append($toolbarElement.clone().append($btnURLs))
            }
            if (settings.table === true) {
                $toolbarList.append($toolbarElement.clone().append($btnTable))
            }
            if (settings.removeStyles === true) {
                $toolbarList.append($toolbarElement.clone().append($btnRemoveStyles))
            }
            if (settings.code === true) {
                $toolbarList.append($toolbarElement.clone().append($btnCode))
            }
            $editorView.html($inputElement.val());
            $editor.append($toolbar);
            $editor.append($editorView);
            $editor.append($inputElement.clone().hide());
            $inputElement.replaceWith($editor);
            $editor.append($("<div />", {
                class: "richText-toolbar"
            }).append($("<a />", {
                class: "richText-undo is-disabled",
                html: '<span class="fa fa-undo"></span>',
                title: settings.translations.undo
            })).append($("<a />", {
                class: "richText-redo is-disabled",
                html: '<span class="fa fa-repeat fa-redo"></span>',
                title: settings.translations.redo
            })).append($("<a />", {
                class: "richText-help",
                html: '<span class="fa fa-question-circle"></span>'
            })));
            if (settings.maxlength > 0) {
                $editor.data("maxlength", settings.maxlength);
                $editor.children(".richText-toolbar").children(".richText-help").before($("<a />", {
                    class: "richText-length",
                    text: "0/" + settings.maxlength
                }))
            }
            if (settings.height && settings.height > 0) {
                $editor.children(".richText-editor, .richText-initial").css({
                    "min-height": settings.height + "px",
                    height: settings.height + "px"
                })
            } else if (settings.heightPercentage && settings.heightPercentage > 0) {
                var parentHeight = $editor.parent().innerHeight();
                var height = settings.heightPercentage / 100 * parentHeight;
                height -= $toolbar.outerHeight() * 2;
                height -= parseInt($editor.css("margin-top"));
                height -= parseInt($editor.css("margin-bottom"));
                height -= parseInt($editor.find(".richText-editor").css("padding-top"));
                height -= parseInt($editor.find(".richText-editor").css("padding-bottom"));
                $editor.children(".richText-editor, .richText-initial").css({
                    "min-height": height + "px",
                    height: height + "px"
                })
            }
            if (settings.class) {
                $editor.addClass(settings.class)
            }
            if (settings.id) {
                $editor.attr("id", settings.id)
            }
            fixFirstLine();
            history[editorID].push($editor.find("textarea").val());
            if (settings.callback && typeof settings.callback === "function") {
                settings.callback($editor)
            }
        }
        init();
        settings.$editor.find(".richText-help").on("click", function() {
            var $editor = $(this).parents(".richText");
            if ($editor) {
                var $outer = $("<div />", {
                    class: "richText-help-popup",
                    style: "position:absolute;top:0;right:0;bottom:0;left:0;background-color: rgba(0,0,0,0.3);"
                });
                var $inner = $("<div />", {
                    style: "position:relative;margin:60px auto;padding:20px;background-color:#FAFAFA;width:70%;font-family:Calibri,Verdana,Helvetica,sans-serif;font-size:small;"
                });
                var $content = $("<div />", {
                    html: '<span id="closeHelp" style="display:block;position:absolute;top:0;right:0;padding:10px;cursor:pointer;" title="' + settings.translations.close + '"><span class="fa fa-times"></span></span>'
                });
                $content.append('<h3 style="margin:0;">RichText</h3>');
                $content.append('<hr><br>Powered by <a href="https://github.com/webfashionist/RichText" target="_blank">webfashionist/RichText</a> (Github) <br>License: <a href="https://github.com/webfashionist/RichText/blob/master/LICENSE" target="_blank">AGPL-3.0</a>');
                $outer.append($inner.append($content));
                $editor.append($outer);
                $outer.on("click", "#closeHelp", function() {
                    $(this).parents(".richText-help-popup").remove()
                })
            }
        });
        settings.$editor.find(".richText-undo, .richText-redo").on("click", function() {
            var $this = $(this);
            if ($this.hasClass("richText-undo") && !$this.hasClass("is-disabled")) {
                undo(settings.$editor)
            } else if ($this.hasClass("richText-redo") && !$this.hasClass("is-disabled")) {
                redo(settings.$editor)
            }
        });
        settings.$editor.find(".richText-editor").on("input change blur keydown keyup", function(e) {
            if ((e.keyCode === 9 || e.keyCode === "9") && e.type === "keydown") {
                if (settings.useTabForNext === true) {
                    focusNextElement();
                    return false
                }
                e.preventDefault();
                tabifyEditableTable(window, e);
                return false
            }
            fixFirstLine();
            updateTextarea();
            doSave($(this).attr("id"));
            updateMaxLength($(this).attr("id"))
        });
        settings.$editor.find(".richText-editor").on("contextmenu", ".richText-editor", function(e) {
            var $list = $("<ul />", {
                class: "list-rightclick richText-list"
            });
            var $li = $("<li />");
            $(".richText-editor").find(".richText-editNode").removeClass("richText-editNode");
            var $target = $(e.target);
            var $richText = $target.parents(".richText");
            var $toolbar = $richText.find(".richText-toolbar");
            var positionX = e.pageX - $richText.offset().left;
            var positionY = e.pageY - $richText.offset().top;
            $list.css({
                top: positionY,
                left: positionX
            });
            if ($target.prop("tagName") === "A") {
                e.preventDefault();
                $list.append($li.clone().html('<span class="fa fa-link"></span>'));
                $target.parents(".richText").append($list);
                $list.find(".fa-link").on("click", function() {
                    $(".list-rightclick.richText-list").remove();
                    $target.addClass("richText-editNode");
                    var $popup = $toolbar.find("#richText-URL");
                    $popup.find("input#url").val($target.attr("href"));
                    $popup.find("input#urlText").val($target.text());
                    $popup.find("select#openIn").val($target.attr("target"));
                    $toolbar.find(".richText-btn").children(".fa-link").parents("li").addClass("is-selected")
                });
                return false
            } else if ($target.prop("tagName") === "IMG") {
                e.preventDefault();
                $list.append($li.clone().html('<span class="fa fa-image"></span>'));
                $target.parents(".richText").append($list);
                $list.find(".fa-image").on("click", function() {
                    var align;
                    if ($target.parent("div").length > 0 && $target.parent("div").attr("style") === "text-align:center;") {
                        align = "center"
                    } else {
                        align = $target.attr("align")
                    }
                    $(".list-rightclick.richText-list").remove();
                    $target.addClass("richText-editNode");
                    var $popup = $toolbar.find("#richText-Image");
                    $popup.find("input#imageURL").val($target.attr("src"));
                    $popup.find("select#align").val(align);
                    $toolbar.find(".richText-btn").children(".fa-image").parents("li").addClass("is-selected")
                });
                return false
            }
        });
        settings.$editor.find(".richText-initial").on("input change blur", function() {
            if (settings.useSingleQuotes === true) {
                $(this).val(changeAttributeQuotes($(this).val()))
            }
            var editorID = $(this).siblings(".richText-editor").attr("id");
            updateEditor(editorID);
            doSave(editorID);
            updateMaxLength(editorID)
        });
        settings.$editor.find(".richText-editor").on("dblclick mouseup", function() {
            doSave($(this).attr("id"))
        });
        settings.$editor.find("#richText-Video button.btn").on("click", function(event) {
            event.preventDefault();
            var $button = $(this);
            var $form = $button.parent(".richText-form-item").parent(".richText-form");
            if ($form.attr("data-editor") === editorID) {
                var url = $form.find("input#videoURL").val();
                var size = $form.find("select#size").val();
                if (!url) {
                    $form.prepend($("<div />", {
                        style: "color:red;display:none;",
                        class: "form-item is-error",
                        text: settings.translations.pleaseEnterURL
                    }));
                    $form.children(".form-item.is-error").slideDown();
                    setTimeout(function() {
                        $form.children(".form-item.is-error").slideUp(function() {
                            $(this).remove()
                        })
                    }, 5e3)
                } else {
                    var html = "";
                    html = getVideoCode(url, size);
                    if (!html) {
                        $form.prepend($("<div />", {
                            style: "color:red;display:none;",
                            class: "form-item is-error",
                            text: settings.translations.videoURLnotSupported
                        }));
                        $form.children(".form-item.is-error").slideDown();
                        setTimeout(function() {
                            $form.children(".form-item.is-error").slideUp(function() {
                                $(this).remove()
                            })
                        }, 5e3)
                    } else {
                        if (settings.useSingleQuotes === true) {} else {}
                        restoreSelection(editorID, true);
                        pasteHTMLAtCaret(html);
                        updateTextarea();
                        $form.find("input#videoURL").val("");
                        $(".richText-toolbar li.is-selected").removeClass("is-selected")
                    }
                }
            }
        });
        $(document).on("mousedown", function(e) {
            var $target = $(e.target);
            if (!$target.hasClass("richText-list") && $target.parents(".richText-list").length === 0) {
                $(".richText-list.list-rightclick").remove();
                if (!$target.hasClass("richText-form") && $target.parents(".richText-form").length === 0) {
                    $(".richText-editNode").each(function() {
                        var $this = $(this);
                        $this.removeClass("richText-editNode");
                        if ($this.attr("class") === "") {
                            $this.removeAttr("class")
                        }
                    })
                }
            }
            if ($target.prop("tagName") === "IMG" && $target.parents("#" + editorID)) {
                startX = e.pageX;
                startY = e.pageY;
                startW = $target.innerWidth();
                startH = $target.innerHeight();
                var left = $target.offset().left;
                var right = $target.offset().left + $target.innerWidth();
                var bottom = $target.offset().top + $target.innerHeight();
                var top = $target.offset().top;
                var resize = false;
                $target.css({
                    cursor: "default"
                });
                if (startY <= bottom && startY >= bottom - 20 && startX >= right - 20 && startX <= right) {
                    $resizeImage = $target;
                    $resizeImage.css({
                        cursor: "nwse-resize"
                    });
                    resize = true
                }
                if ((resize === true || $resizeImage) && !$resizeImage.data("width")) {
                    $resizeImage.data("width", $target.parents("#" + editorID).innerWidth());
                    $resizeImage.data("height", $target.parents("#" + editorID).innerHeight() * 3);
                    e.preventDefault()
                } else if (resize === true || $resizeImage) {
                    e.preventDefault()
                } else {
                    $resizeImage = null
                }
            }
        });
        $(document).mouseup(function() {
            if ($resizeImage) {
                $resizeImage.css({
                    cursor: "default"
                })
            }
            $resizeImage = null
        }).mousemove(function(e) {
            if ($resizeImage !== null) {
                var maxWidth = $resizeImage.data("width");
                var currentWidth = $resizeImage.width();
                var maxHeight = $resizeImage.data("height");
                var currentHeight = $resizeImage.height();
                if (startW + e.pageX - startX <= maxWidth && startH + e.pageY - startY <= maxHeight) {
                    $resizeImage.innerWidth(startW + e.pageX - startX);
                    updateTextarea()
                } else if (startW + e.pageX - startX <= currentWidth && startH + e.pageY - startY <= currentHeight) {
                    $resizeImage.innerWidth(startW + e.pageX - startX);
                    updateTextarea()
                }
            }
        });
        settings.$editor.find("#richText-URL button.btn").on("click", function(event) {
            event.preventDefault();
            var $button = $(this);
            var $form = $button.parent(".richText-form-item").parent(".richText-form");
            if ($form.attr("data-editor") === editorID) {
                var url = $form.find("input#url").val();
                var text = $form.find("input#urlText").val();
                var target = $form.find("#openIn").val();
                if (!target) {
                    target = "_self"
                }
                if (!text) {
                    text = url
                }
                if (!url) {
                    $form.prepend($("<div />", {
                        style: "color:red;display:none;",
                        class: "form-item is-error",
                        text: settings.translations.pleaseEnterURL
                    }));
                    $form.children(".form-item.is-error").slideDown();
                    setTimeout(function() {
                        $form.children(".form-item.is-error").slideUp(function() {
                            $(this).remove()
                        })
                    }, 5e3)
                } else {
                    var html = "";
                    if (settings.useSingleQuotes === true) {
                        html = "<a href='" + url + "' target='" + target + "'>" + text + "</a>"
                    } else {
                        html = '<a href="' + url + '" target="' + target + '">' + text + "</a>"
                    }
                    restoreSelection(editorID, false, true);
                    var $editNode = $(".richText-editNode");
                    if ($editNode.length > 0 && $editNode.prop("tagName") === "A") {
                        $editNode.attr("href", url);
                        $editNode.attr("target", target);
                        $editNode.text(text);
                        $editNode.removeClass("richText-editNode");
                        if ($editNode.attr("class") === "") {
                            $editNode.removeAttr("class")
                        }
                    } else {
                        pasteHTMLAtCaret(html)
                    }
                    $form.find("input#url").val("");
                    $form.find("input#urlText").val("");
                    $(".richText-toolbar li.is-selected").removeClass("is-selected")
                }
            }
        });
        settings.$editor.find("#richText-Image button.btn").on("click", function(event) {
            event.preventDefault();
            var $button = $(this);
            var $form = $button.parent(".richText-form-item").parent(".richText-form");
            if ($form.attr("data-editor") === editorID) {
                var url = $form.find("#imageURL").val();
                var align = $form.find("select#align").val();
                if (!align) {
                    align = "center"
                }
                if (!url) {
                    $form.prepend($("<div />", {
                        style: "color:red;display:none;",
                        class: "form-item is-error",
                        text: settings.translations.pleaseSelectImage
                    }));
                    $form.children(".form-item.is-error").slideDown();
                    setTimeout(function() {
                        $form.children(".form-item.is-error").slideUp(function() {
                            $(this).remove()
                        })
                    }, 5e3)
                } else {
                    var html = "";
                    if (settings.useSingleQuotes === true) {
                        if (align === "center") {
                            html = "<div style='text-align:center;'><img src='" + url + "'></div>"
                        } else {
                            html = "<img src='" + url + "' align='" + align + "'>"
                        }
                    } else {
                        if (align === "center") {
                            html = '<div style="text-align:center;"><img src="' + url + '"></div>'
                        } else {
                            html = '<img src="' + url + '" align="' + align + '">'
                        }
                    }
                    restoreSelection(editorID, true);
                    var $editNode = $(".richText-editNode");
                    if ($editNode.length > 0 && $editNode.prop("tagName") === "IMG") {
                        $editNode.attr("src", url);
                        if ($editNode.parent("div").length > 0 && $editNode.parent("div").attr("style") === "text-align:center;" && align !== "center") {
                            $editNode.unwrap("div");
                            $editNode.attr("align", align)
                        } else if (($editNode.parent("div").length === 0 || $editNode.parent("div").attr("style") !== "text-align:center;") && align === "center") {
                            $editNode.wrap('<div style="text-align:center;"></div>');
                            $editNode.removeAttr("align")
                        } else {
                            $editNode.attr("align", align)
                        }
                        $editNode.removeClass("richText-editNode");
                        if ($editNode.attr("class") === "") {
                            $editNode.removeAttr("class")
                        }
                    } else {
                        pasteHTMLAtCaret(html)
                    }
                    $form.find("input#imageURL").val("");
                    $(".richText-toolbar li.is-selected").removeClass("is-selected")
                }
            }
        });
        settings.$editor.find("#richText-File button.btn").on("click", function(event) {
            event.preventDefault();
            var $button = $(this);
            var $form = $button.parent(".richText-form-item").parent(".richText-form");
            if ($form.attr("data-editor") === editorID) {
                var url = $form.find("#fileURL").val();
                var text = $form.find("#fileText").val();
                if (!text) {
                    text = url
                }
                if (!url) {
                    $form.prepend($("<div />", {
                        style: "color:red;display:none;",
                        class: "form-item is-error",
                        text: settings.translations.pleaseSelectFile
                    }));
                    $form.children(".form-item.is-error").slideDown();
                    setTimeout(function() {
                        $form.children(".form-item.is-error").slideUp(function() {
                            $(this).remove()
                        })
                    }, 5e3)
                } else {
                    var html = "";
                    if (settings.useSingleQuotes === true) {
                        html = "<a href='" + url + "' target='_blank'>" + text + "</a>"
                    } else {
                        html = '<a href="' + url + '" target="_blank">' + text + "</a>"
                    }
                    restoreSelection(editorID, true);
                    pasteHTMLAtCaret(html);
                    $form.find("input#fileURL").val("");
                    $form.find("input#fileText").val("");
                    $(".richText-toolbar li.is-selected").removeClass("is-selected")
                }
            }
        });
        settings.$editor.find("#richText-Table button.btn").on("click", function(event) {
            event.preventDefault();
            var $button = $(this);
            var $form = $button.parent(".richText-form-item").parent(".richText-form");
            if ($form.attr("data-editor") === editorID) {
                var rows = $form.find("input#tableRows").val();
                var columns = $form.find("input#tableColumns").val();
                if (!rows || rows <= 0) {
                    rows = 2
                }
                if (!columns || columns <= 0) {
                    columns = 2
                }
                var html = "";
                if (settings.useSingleQuotes === true) {
                    html = "<table class='table-1'><tbody>"
                } else {
                    html = '<table class="table-1"><tbody>'
                }
                for (var i = 1; i <= rows; i++) {
                    html += "<tr>";
                    for (var n = 1; n <= columns; n++) {
                        html += "<td> </td>"
                    }
                    html += "</tr>"
                }
                html += "</tbody></table>";
                restoreSelection(editorID, true);
                pasteHTMLAtCaret(html);
                $form.find("input#tableColumns").val("");
                $form.find("input#tableRows").val("");
                $(".richText-toolbar li.is-selected").removeClass("is-selected")
            }
        });
        $(document).on("click", function(event) {
            var $clickedElement = $(event.target);
            if ($clickedElement.parents(".richText-toolbar").length === 0) {} else if ($clickedElement.hasClass("richText-dropdown-outer")) {
                $clickedElement.parent("a").parent("li").removeClass("is-selected")
            } else if ($clickedElement.find(".richText").length > 0) {
                $(".richText-toolbar li").removeClass("is-selected")
            } else if ($clickedElement.parent().hasClass("richText-dropdown-close")) {
                $(".richText-toolbar li").removeClass("is-selected")
            } else if ($clickedElement.hasClass("richText-btn") && $(event.target).children(".richText-dropdown-outer").length > 0) {
                $clickedElement.parent("li").addClass("is-selected");
                if ($clickedElement.children(".fa,svg").hasClass("fa-link")) {
                    restoreSelection(editorID, false, true);
                    var selectedText = getSelectedText();
                    $clickedElement.find("input#urlText").val("");
                    $clickedElement.find("input#url").val("");
                    if (selectedText) {
                        $clickedElement.find("input#urlText").val(selectedText)
                    }
                } else if ($clickedElement.hasClass("fa-image")) {}
            }
        });
        settings.$editor.find(".richText-toolbar a[data-command]").on("click", function(event) {
            var $button = $(this);
            var $toolbar = $button.closest(".richText-toolbar");
            var $editor = $toolbar.siblings(".richText-editor");
            var id = $editor.attr("id");
            if ($editor.length > 0 && id === editorID && (!$button.parent("li").attr("data-disable") || $button.parent("li").attr("data-disable") === "false")) {
                event.preventDefault();
                var command = $(this).data("command");
                if (command === "toggleCode") {
                    toggleCode($editor.attr("id"))
                } else {
                    var option = null;
                    if ($(this).data("option")) {
                        option = $(this).data("option").toString();
                        if (option.match(/^h[1-6]$/)) {
                            command = "heading"
                        }
                    }
                    formatText(command, option, id);
                    if (command === "removeFormat") {
                        $editor.find("*").each(function() {
                            var keepAttributes = ["id", "class", "name", "action", "method", "src", "align", "alt", "title", "style", "webkitallowfullscreen", "mozallowfullscreen", "allowfullscreen", "width", "height", "frameborder"];
                            var element = $(this);
                            var attributes = $.map(this.attributes, function(item) {
                                return item.name
                            });
                            $.each(attributes, function(i, item) {
                                if (keepAttributes.indexOf(item) < 0 && item.substr(0, 5) !== "data-") {
                                    element.removeAttr(item)
                                }
                            });
                            if (element.prop("tagName") === "A") {
                                element.replaceWith(function() {
                                    return $("<span />", {
                                        html: $(this).html()
                                    })
                                })
                            }
                        });
                        formatText("formatBlock", "div", id)
                    }
                    $editor.find("div:empty,p:empty,li:empty,h1:empty,h2:empty,h3:empty,h4:empty,h5:empty,h6:empty").remove();
                    $editor.find("h1,h2,h3,h4,h5,h6").unwrap("h1,h2,h3,h4,h5,h6")
                }
            }
            $button.parents("li.is-selected").removeClass("is-selected")
        });

        function focusNextElement() {
            var focussableElements = 'a:not([disabled]):not(.richText-btn,.richText-undo,.richText-redo,.richText-help), button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
            if (document.activeElement) {
                var focussable = Array.prototype.filter.call(document.querySelectorAll(focussableElements), function(element) {
                    return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                });
                var index = focussable.indexOf(document.activeElement);
                if (index > -1) {
                    var nextElement = focussable[index + 1] || focussable[0];
                    nextElement.focus()
                }
            }
        }

        function formatText(command, option, editorID) {
            if (typeof option === "undefined") {
                option = null
            }
            doRestore(editorID);
            if (command === "heading" && getSelectedText()) {
                pasteHTMLAtCaret("<" + option + ">" + getSelectedText() + "</" + option + ">")
            } else if (command === "fontSize" && parseInt(option) > 0) {
                var selection = getSelectedText();
                selection = (selection + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1" + "<br>" + "$2");
                var html = settings.useSingleQuotes ? "<span style='font-size:" + option + "px;'>" + selection + "</span>" : '<span style="font-size:' + option + 'px;">' + selection + "</span>";
                pasteHTMLAtCaret(html)
            } else {
                document.execCommand(command, false, option)
            }
        }

        function updateTextarea() {
            var $editor = $("#" + editorID);
            var content = $editor.html();
            if (settings.useSingleQuotes === true) {
                content = changeAttributeQuotes(content)
            }
            $editor.siblings(".richText-initial").val(content)
        }

        function updateEditor(editorID) {
            var $editor = $("#" + editorID);
            var content = $editor.siblings(".richText-initial").val();
            $editor.html(content)
        }

        function saveSelection(editorID) {
            var containerEl = document.getElementById(editorID);
            var range, start, end, type;
            if (window.getSelection && document.createRange) {
                var sel = window.getSelection && window.getSelection();
                if (sel && sel.rangeCount > 0 && $(sel.anchorNode).parents("#" + editorID).length > 0) {
                    range = window.getSelection().getRangeAt(0);
                    var preSelectionRange = range.cloneRange();
                    preSelectionRange.selectNodeContents(containerEl);
                    preSelectionRange.setEnd(range.startContainer, range.startOffset);
                    start = preSelectionRange.toString().length;
                    end = start + range.toString().length;
                    type = start === end ? "caret" : "selection";
                    anchor = sel.anchorNode;
                    start = type === "caret" && anchor !== false ? start : preSelectionRange.toString().length;
                    end = type === "caret" && anchor !== false ? end : start + range.toString().length;
                    return {
                        start: start,
                        end: end,
                        type: type,
                        anchor: anchor,
                        editorID: editorID
                    }
                }
            }
            return savedSelection ? savedSelection : {
                start: 0,
                end: 0
            }
        }

        function restoreSelection(editorID, media, url) {
            var containerEl = document.getElementById(editorID);
            var savedSel = savedSelection;
            if (!savedSel) {
                savedSel = {
                    start: 0,
                    end: 0,
                    type: "caret",
                    editorID: editorID,
                    anchor: $("#" + editorID).children("div")[0]
                }
            }
            if (savedSel.editorID !== editorID) {
                return false
            } else if (media === true) {
                containerEl = savedSel.anchor ? savedSel.anchor : containerEl
            } else if (url === true) {
                if (savedSel.start === 0 && savedSel.end === 0) {
                    containerEl = savedSel.anchor ? savedSel.anchor : containerEl
                }
            }
            if (window.getSelection && document.createRange) {
                var charIndex = 0,
                    range = document.createRange();
                if (!range || !containerEl) {
                    window.getSelection().removeAllRanges();
                    return true
                }
                range.setStart(containerEl, 0);
                range.collapse(true);
                var nodeStack = [containerEl],
                    node, foundStart = false,
                    stop = false;
                while (!stop && (node = nodeStack.pop())) {
                    if (node.nodeType === 3) {
                        var nextCharIndex = charIndex + node.length;
                        if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                            range.setStart(node, savedSel.start - charIndex);
                            foundStart = true
                        }
                        if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                            range.setEnd(node, savedSel.end - charIndex);
                            stop = true
                        }
                        charIndex = nextCharIndex
                    } else {
                        var i = node.childNodes.length;
                        while (i--) {
                            nodeStack.push(node.childNodes[i])
                        }
                    }
                }
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range)
            }
        }

        function tabifyEditableTable(win, e) {
            if (e.keyCode !== 9) {
                return false
            }
            var sel;
            if (win.getSelection) {
                sel = win.getSelection();
                if (sel.rangeCount > 0) {
                    var textNode = null,
                        direction = null;
                    if (!e.shiftKey) {
                        direction = "next";
                        textNode = sel.focusNode.nodeName === "TD" ? sel.focusNode.nextSibling != null ? sel.focusNode.nextSibling : sel.focusNode.parentNode.nextSibling != null ? sel.focusNode.parentNode.nextSibling.childNodes[0] : null : sel.focusNode.parentNode.nextSibling != null ? sel.focusNode.parentNode.nextSibling : sel.focusNode.parentNode.parentNode.nextSibling != null ? sel.focusNode.parentNode.parentNode.nextSibling.childNodes[0] : null
                    } else {
                        direction = "previous";
                        textNode = sel.focusNode.nodeName === "TD" ? sel.focusNode.previousSibling != null ? sel.focusNode.previousSibling : sel.focusNode.parentNode.previousSibling != null ? sel.focusNode.parentNode.previousSibling.childNodes[sel.focusNode.parentNode.previousSibling.childNodes.length - 1] : null : sel.focusNode.parentNode.previousSibling != null ? sel.focusNode.parentNode.previousSibling : sel.focusNode.parentNode.parentNode.previousSibling != null ? sel.focusNode.parentNode.parentNode.previousSibling.childNodes[sel.focusNode.parentNode.parentNode.previousSibling.childNodes.length - 1] : null
                    }
                    if (textNode != null) {
                        sel.collapse(textNode, Math.min(textNode.length, sel.focusOffset + 1));
                        if (textNode.textContent != null) {
                            sel.selectAllChildren(textNode)
                        }
                        e.preventDefault();
                        return true
                    } else if (textNode === null && direction === "next" && sel.focusNode.nodeName === "TD") {
                        var $table = $(sel.focusNode).parents("table");
                        var cellsPerLine = $table.find("tr").first().children("td").length;
                        var $tr = $("<tr />");
                        var $td = $("<td />");
                        for (var i = 1; i <= cellsPerLine; i++) {
                            $tr.append($td.clone())
                        }
                        $table.append($tr);
                        tabifyEditableTable(window, {
                            keyCode: 9,
                            shiftKey: false,
                            preventDefault: function() {}
                        })
                    }
                }
            }
            return false
        }

        function getSelectedText() {
            var range;
            if (window.getSelection) {
                range = window.getSelection();
                return range.toString() ? range.toString() : range.focusNode.nodeValue
            } else if (document.selection.createRange) {
                range = document.selection.createRange();
                return range.text
            }
            return false
        }

        function doSave(editorID) {
            var $textarea = $(".richText-editor#" + editorID).siblings(".richText-initial");
            addHistory($textarea.val(), editorID);
            savedSelection = saveSelection(editorID)
        }

        function updateMaxLength(editorID) {
            var $editorInner = $(".richText-editor#" + editorID);
            var $editor = $editorInner.parents(".richText");
            if (!$editor.data("maxlength")) {
                return true
            }
            var color;
            var maxLength = parseInt($editor.data("maxlength"));
            var content = $editorInner.text();
            var percentage = content.length / maxLength * 100;
            if (percentage > 99) {
                color = "red"
            } else if (percentage >= 90) {
                color = "orange"
            } else {
                color = "black"
            }
            $editor.find(".richText-length").html('<span class="' + color + '">' + content.length + "</span>/" + maxLength);
            if (content.length > maxLength) {
                undo($editor);
                return false
            }
            return true
        }

        function addHistory(val, id) {
            if (!history[id]) {
                return false
            }
            if (history[id].length - 1 > historyPosition[id]) {
                history[id].length = historyPosition[id] + 1
            }
            if (history[id][history[id].length - 1] !== val) {
                history[id].push(val)
            }
            historyPosition[id] = history[id].length - 1;
            setHistoryButtons(id)
        }

        function setHistoryButtons(id) {
            if (historyPosition[id] <= 0) {
                $editor.find(".richText-undo").addClass("is-disabled")
            } else {
                $editor.find(".richText-undo").removeClass("is-disabled")
            }
            if (historyPosition[id] >= history[id].length - 1 || history[id].length === 0) {
                $editor.find(".richText-redo").addClass("is-disabled")
            } else {
                $editor.find(".richText-redo").removeClass("is-disabled")
            }
        }

        function undo($editor) {
            var id = $editor.children(".richText-editor").attr("id");
            historyPosition[id]--;
            if (!historyPosition[id] && historyPosition[id] !== 0) {
                return false
            }
            var value = history[id][historyPosition[id]];
            $editor.find("textarea").val(value);
            $editor.find(".richText-editor").html(value);
            setHistoryButtons(id)
        }

        function redo($editor) {
            var id = $editor.children(".richText-editor").attr("id");
            historyPosition[id]++;
            if (!historyPosition[id] && historyPosition[id] !== 0) {
                return false
            }
            var value = history[id][historyPosition[id]];
            $editor.find("textarea").val(value);
            $editor.find(".richText-editor").html(value);
            setHistoryButtons(id)
        }

        function doRestore(id) {
            if (savedSelection) {
                restoreSelection(id ? id : savedSelection.editorID)
            }
        }

        function pasteHTMLAtCaret(html) {
            var sel, range;
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();
                    var el = document.createElement("div");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(),
                        node, lastNode;
                    while (node = el.firstChild) {
                        lastNode = frag.appendChild(node)
                    }
                    range.insertNode(frag);
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range)
                    }
                }
            } else if (document.selection && document.selection.type !== "Control") {
                document.selection.createRange().pasteHTML(html)
            }
        }

        function changeAttributeQuotes(string) {
            if (!string) {
                return ""
            }
            var regex;
            var rstring;
            if (settings.useSingleQuotes === true) {
                regex = /\s+(\w+\s*=\s*(["][^"]*["])|(['][^']*[']))+/g;
                rstring = string.replace(regex, function($0, $1, $2) {
                    if (!$2) {
                        return $0
                    }
                    return $0.replace($2, $2.replace(/\"/g, "'"))
                })
            } else {
                regex = /\s+(\w+\s*=\s*(['][^']*['])|(["][^"]*["]))+/g;
                rstring = string.replace(regex, function($0, $1, $2) {
                    if (!$2) {
                        return $0
                    }
                    return $0.replace($2, $2.replace(/'/g, '"'))
                })
            }
            return rstring
        }

        function loadColors(command) {
            var colors = [];
            var result = "";
            colors["#FFFFFF"] = settings.translations.white;
            colors["#000000"] = settings.translations.black;
            colors["#7F6000"] = settings.translations.brown;
            colors["#938953"] = settings.translations.beige;
            colors["#1F497D"] = settings.translations.darkBlue;
            colors["blue"] = settings.translations.blue;
            colors["#4F81BD"] = settings.translations.lightBlue;
            colors["#953734"] = settings.translations.darkRed;
            colors["red"] = settings.translations.red;
            colors["#4F6128"] = settings.translations.darkGreen;
            colors["green"] = settings.translations.green;
            colors["#3F3151"] = settings.translations.purple;
            colors["#31859B"] = settings.translations.darkTurquois;
            colors["#4BACC6"] = settings.translations.turquois;
            colors["#E36C09"] = settings.translations.darkOrange;
            colors["#F79646"] = settings.translations.orange;
            colors["#FFFF00"] = settings.translations.yellow;
            if (settings.colors && settings.colors.length > 0) {
                colors = settings.colors
            }
            for (var i in colors) {
                result += '<li class="inline"><a data-command="' + command + '" data-option="' + i + '" style="text-align:left;" title="' + colors[i] + '"><span class="box-color" style="background-color:' + i + '"></span></a></li>'
            }
            return result
        }

        function toggleCode(editorID) {
            doRestore(editorID);
            if ($editor.find(".richText-editor").is(":visible")) {
                $editor.find(".richText-initial").show();
                $editor.find(".richText-editor").hide();
                $(".richText-toolbar").find(".richText-btn").each(function() {
                    if ($(this).children(".fa-code").length === 0) {
                        $(this).parent("li").attr("data-disable", "true")
                    }
                });
                convertCaretPosition(editorID, savedSelection)
            } else {
                $editor.find(".richText-initial").hide();
                $editor.find(".richText-editor").show();
                convertCaretPosition(editorID, savedSelection, true);
                $(".richText-toolbar").find("li").removeAttr("data-disable")
            }
        }

        function convertCaretPosition(editorID, selection, reverse) {
            var $editor = $("#" + editorID);
            var $textarea = $editor.siblings(".richText-initial");
            var code = $textarea.val();
            if (!selection || !code) {
                return {
                    start: 0,
                    end: 0
                }
            }
            if (reverse === true) {
                savedSelection = {
                    start: $editor.text().length,
                    end: $editor.text().length,
                    editorID: editorID
                };
                restoreSelection(editorID);
                return true
            }
            selection.node = $textarea[0];
            var states = {
                start: false,
                end: false,
                tag: false,
                isTag: false,
                tagsCount: 0,
                isHighlight: selection.start !== selection.end
            };
            for (var i = 0; i < code.length; i++) {
                if (code[i] === "<") {
                    states.isTag = true;
                    states.tag = false;
                    states.tagsCount++
                } else if (states.isTag === true && code[i] !== ">") {
                    states.tagsCount++
                } else if (states.isTag === true && code[i] === ">") {
                    states.isTag = false;
                    states.tag = true;
                    states.tagsCount++
                } else if (states.tag === true) {
                    states.tag = false
                }
                if (!reverse) {
                    if (selection.start + states.tagsCount <= i && states.isHighlight && !states.isTag && !states.tag && !states.start) {
                        selection.start = i;
                        states.start = true
                    } else if (selection.start + states.tagsCount <= i + 1 && !states.isHighlight && !states.isTag && !states.tag && !states.start) {
                        selection.start = i + 1;
                        states.start = true
                    }
                    if (selection.end + states.tagsCount <= i + 1 && !states.isTag && !states.tag && !states.end) {
                        selection.end = i + 1;
                        states.end = true
                    }
                }
            }
            createSelection(selection.node, selection.start, selection.end);
            return selection
        }

        function createSelection(field, start, end) {
            if (field.createTextRange) {
                var selRange = field.createTextRange();
                selRange.collapse(true);
                selRange.moveStart("character", start);
                selRange.moveEnd("character", end);
                selRange.select();
                field.focus()
            } else if (field.setSelectionRange) {
                field.focus();
                field.setSelectionRange(start, end)
            } else if (typeof field.selectionStart != "undefined") {
                field.selectionStart = start;
                field.selectionEnd = end;
                field.focus()
            }
        }

        function getVideoCode(url, size) {
            var video = getVideoID(url);
            var responsive = false,
                success = false;
            if (!video) {
                return false
            }
            if (!size) {
                size = "640x360";
                size = size.split("x")
            } else if (size !== "responsive") {
                size = size.split("x")
            } else {
                responsive = true;
                size = "640x360";
                size = size.split("x")
            }
            var html = "<br><br>";
            if (responsive === true) {
                html += '<div class="videoEmbed" style="position:relative;height:0;padding-bottom:56.25%">'
            }
            var allowfullscreen = "webkitallowfullscreen mozallowfullscreen allowfullscreen";
            if (video.platform === "YouTube") {
                var youtubeDomain = settings.youtubeCookies ? "www.youtube.com" : "www.youtube-nocookie.com";
                html += '<iframe src="https://' + youtubeDomain + "/embed/" + video.id + '?ecver=2" width="' + size[0] + '" height="' + size[1] + '" frameborder="0"' + (responsive === true ? ' style="position:absolute;width:100%;height:100%;left:0"' : "") + " " + allowfullscreen + "></iframe>";
                success = true
            } else if (video.platform === "Vimeo") {
                html += '<iframe src="https://player.vimeo.com/video/' + video.id + '" width="' + size[0] + '" height="' + size[1] + '" frameborder="0"' + (responsive === true ? ' style="position:absolute;width:100%;height:100%;left:0"' : "") + " " + allowfullscreen + "></iframe>";
                success = true
            } else if (video.platform === "Facebook") {
                html += '<iframe src="https://www.facebook.com/plugins/video.php?href=' + encodeURI(url) + "&show_text=0&width=" + size[0] + '" width="' + size[0] + '" height="' + size[1] + '" style="' + (responsive === true ? 'position:absolute;width:100%;height:100%;left:0;border:none;overflow:hidden"' : "border:none;overflow:hidden") + '" scrolling="no" frameborder="0" allowTransparency="true" ' + allowfullscreen + "></iframe>";
                success = true
            } else if (video.platform === "Dailymotion") {
                html += '<iframe frameborder="0" width="' + size[0] + '" height="' + size[1] + '" src="//www.dailymotion.com/embed/video/' + video.id + '"' + (responsive === true ? ' style="position:absolute;width:100%;height:100%;left:0"' : "") + " " + allowfullscreen + "></iframe>";
                success = true
            }
            if (responsive === true) {
                html += "</div>"
            }
            html += "<br><br>";
            if (success) {
                return html
            }
            return false
        }

        function getVideoID(url) {
            var vimeoRegExp = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/;
            var youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var facebookRegExp = /(?:http?s?:\/\/)?(?:www\.)?(?:facebook\.com)\/.*\/videos\/[0-9]+/;
            var dailymotionRegExp = /(?:http?s?:\/\/)?(?:www\.)?(?:dailymotion\.com)\/video\/([a-zA-Z0-9]+)/;
            var youtubeMatch = url.match(youtubeRegExp);
            var vimeoMatch = url.match(vimeoRegExp);
            var facebookMatch = url.match(facebookRegExp);
            var dailymotionMatch = url.match(dailymotionRegExp);
            if (youtubeMatch && youtubeMatch[2].length === 11) {
                return {
                    platform: "YouTube",
                    id: youtubeMatch[2]
                }
            } else if (vimeoMatch && vimeoMatch[1]) {
                return {
                    platform: "Vimeo",
                    id: vimeoMatch[1]
                }
            } else if (facebookMatch && facebookMatch[0]) {
                return {
                    platform: "Facebook",
                    id: facebookMatch[0]
                }
            } else if (dailymotionMatch && dailymotionMatch[1]) {
                return {
                    platform: "Dailymotion",
                    id: dailymotionMatch[1]
                }
            }
            return false
        }

        function fixFirstLine() {
            if ($editor && !$editor.find(".richText-editor").html()) {
                if (settings.useParagraph !== false) {
                    $editor.find(".richText-editor").html("<p><br></p>")
                } else {
                    $editor.find(".richText-editor").html("<div><br></div>")
                }
            } else {
                if (settings.useParagraph !== false) {
                    $editor.find(".richText-editor").find("div:not(.videoEmbed)").replaceWith(function() {
                        return $("<p />", {
                            html: $(this).html()
                        })
                    })
                } else {
                    $editor.find(".richText-editor").find("p").replaceWith(function() {
                        return $("<div />", {
                            html: $(this).html()
                        })
                    })
                }
            }
            updateTextarea()
        }
        return $(this)
    };
    $.fn.unRichText = function(options) {
        var settings = $.extend({
            delay: 0
        }, options);
        var $editor, $textarea, $main;
        var $el = $(this);

        function init() {
            if ($el.hasClass("richText")) {
                $main = $el
            } else if ($el.hasClass("richText-initial") || $el.hasClass("richText-editor")) {
                $main = $el.parents(".richText")
            }
            if (!$main) {
                return false
            }
            $editor = $main.find(".richText-editor");
            $textarea = $main.find(".richText-initial");
            if (parseInt(settings.delay) > 0) {
                setTimeout(remove, parseInt(settings.delay))
            } else {
                remove()
            }
        }
        init();

        function remove() {
            $main.find(".richText-toolbar").remove();
            $main.find(".richText-editor").remove();
            $textarea.unwrap(".richText").data("editor", "richText").removeClass("richText-initial").show();
            if (settings.callback && typeof settings.callback === "function") {
                settings.callback()
            }
        }
    }
})(jQuery);

