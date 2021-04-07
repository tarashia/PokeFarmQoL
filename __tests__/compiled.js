
/* instanbul ignore next */
// eslint-disable-next-line camelcase
const GM_getResourceText = require('../__mocks__/tampermonkey').GM_getResourceText;
/* instanbul ignore next */
// eslint-disable-next-line camelcase
const GM_xmlhttpRequest  = require('../__mocks__/tampermonkey').GM_xmlhttpRequest;
/* instanbul ignore next */
// eslint-disable-next-line camelcase
const GM_addStyle        = require('../__mocks__/tampermonkey').GM_addStyle;
/* instanbul ignore next */
// eslint-disable-next-line camelcase
const GM_info            = require('../__mocks__/tampermonkey').GM_info;
/* istanbul ignore next */
/* eslint-disable */
/*! jQuery v1.11.2 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.2",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b=a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=hb(),z=hb(),A=hb(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},eb=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fb){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function gb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+rb(o[l]);w=ab.test(a)&&pb(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function hb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ib(a){return a[u]=!0,a}function jb(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function kb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function lb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function nb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function ob(a){return ib(function(b){return b=+b,ib(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pb(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=gb.support={},f=gb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=gb.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",eb,!1):e.attachEvent&&e.attachEvent("onunload",eb)),p=!f(g),c.attributes=jb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=jb(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=jb(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(jb(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),jb(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&jb(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return lb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?lb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},gb.matches=function(a,b){return gb(a,null,null,b)},gb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return gb(b,n,null,[a]).length>0},gb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},gb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},gb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},gb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=gb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=gb.selectors={cacheLength:50,createPseudo:ib,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||gb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&gb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=gb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||gb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ib(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ib(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ib(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ib(function(a){return function(b){return gb(a,b).length>0}}),contains:ib(function(a){return a=a.replace(cb,db),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ib(function(a){return W.test(a||"")||gb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:ob(function(){return[0]}),last:ob(function(a,b){return[b-1]}),eq:ob(function(a,b,c){return[0>c?c+b:c]}),even:ob(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:ob(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:ob(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:ob(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=mb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=nb(b);function qb(){}qb.prototype=d.filters=d.pseudos,d.setFilters=new qb,g=gb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?gb.error(a):z(a,i).slice(0)};function rb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function tb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ub(a,b,c){for(var d=0,e=b.length;e>d;d++)gb(a,b[d],c);return c}function vb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wb(a,b,c,d,e,f){return d&&!d[u]&&(d=wb(d)),e&&!e[u]&&(e=wb(e,f)),ib(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ub(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:vb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=vb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=vb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sb(function(a){return a===b},h,!0),l=sb(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sb(tb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wb(i>1&&tb(m),i>1&&rb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xb(a.slice(i,e)),f>e&&xb(a=a.slice(e)),f>e&&rb(a))}m.push(c)}return tb(m)}function yb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=vb(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&gb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ib(f):f}return h=gb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,yb(e,d)),f.selector=a}return f},i=gb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&pb(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&rb(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&pb(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=jb(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),jb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||kb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&jb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||kb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),jb(function(a){return null==a.getAttribute("disabled")})||kb(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),gb}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;
return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function ab(){return!0}function bb(){return!1}function cb(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==cb()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===cb()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ab:bb):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:bb,isPropagationStopped:bb,isImmediatePropagationStopped:bb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ab,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ab,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ab,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=bb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=bb),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function db(a){var b=eb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var eb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fb=/ jQuery\d+="(?:null|\d+)"/g,gb=new RegExp("<(?:"+eb+")[\\s/>]","i"),hb=/^\s+/,ib=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,jb=/<([\w:]+)/,kb=/<tbody/i,lb=/<|&#?\w+;/,mb=/<(?:script|style|link)/i,nb=/checked\s*(?:[^=]|=\s*.checked.)/i,ob=/^$|\/(?:java|ecma)script/i,pb=/^true\/(.*)/,qb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,rb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sb=db(y),tb=sb.appendChild(y.createElement("div"));rb.optgroup=rb.option,rb.tbody=rb.tfoot=rb.colgroup=rb.caption=rb.thead,rb.th=rb.td;function ub(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ub(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function vb(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wb(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xb(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function yb(a){var b=pb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function zb(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Ab(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Bb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xb(b).text=a.text,yb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!gb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(tb.innerHTML=a.outerHTML,tb.removeChild(f=tb.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ub(f),h=ub(a),g=0;null!=(e=h[g]);++g)d[g]&&Bb(e,d[g]);if(b)if(c)for(h=h||ub(a),d=d||ub(f),g=0;null!=(e=h[g]);g++)Ab(e,d[g]);else Ab(a,f);return d=ub(f,"script"),d.length>0&&zb(d,!i&&ub(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=db(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(lb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(jb.exec(f)||["",""])[1].toLowerCase(),l=rb[i]||rb._default,h.innerHTML=l[1]+f.replace(ib,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&hb.test(f)&&p.push(b.createTextNode(hb.exec(f)[0])),!k.tbody){f="table"!==i||kb.test(f)?"<table>"!==l[1]||kb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ub(p,"input"),vb),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ub(o.appendChild(f),"script"),g&&zb(h),c)){e=0;while(f=h[e++])ob.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ub(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&zb(ub(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ub(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fb,""):void 0;if(!("string"!=typeof a||mb.test(a)||!k.htmlSerialize&&gb.test(a)||!k.leadingWhitespace&&hb.test(a)||rb[(jb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ib,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ub(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ub(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&nb.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ub(i,"script"),xb),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ub(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,yb),j=0;f>j;j++)d=g[j],ob.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qb,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Cb,Db={};function Eb(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fb(a){var b=y,c=Db[a];return c||(c=Eb(a,b),"none"!==c&&c||(Cb=(Cb||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Cb[0].contentWindow||Cb[0].contentDocument).document,b.write(),b.close(),c=Eb(a,b),Cb.detach()),Db[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Gb=/^margin/,Hb=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ib,Jb,Kb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ib=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Hb.test(g)&&Gb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ib=function(a){return a.currentStyle},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Hb.test(g)&&!Kb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Lb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight),b.removeChild(i)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Mb=/alpha\([^)]*\)/i,Nb=/opacity\s*=\s*([^)]*)/,Ob=/^(none|table(?!-c[ea]).+)/,Pb=new RegExp("^("+S+")(.*)$","i"),Qb=new RegExp("^([+-])=("+S+")","i"),Rb={position:"absolute",visibility:"hidden",display:"block"},Sb={letterSpacing:"0",fontWeight:"400"},Tb=["Webkit","O","Moz","ms"];function Ub(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Tb.length;while(e--)if(b=Tb[e]+c,b in a)return b;return d}function Vb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fb(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wb(a,b,c){var d=Pb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Yb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ib(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Jb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Hb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xb(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Jb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ub(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ub(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Jb(a,b,d)),"normal"===f&&b in Sb&&(f=Sb[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Ob.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Rb,function(){return Yb(a,b,d)}):Yb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ib(a);return Wb(a,c,d?Xb(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Nb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Mb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Mb.test(f)?f.replace(Mb,e):f+" "+e)}}),m.cssHooks.marginRight=Lb(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Jb,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Gb.test(a)||(m.cssHooks[a+b].set=Wb)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ib(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Vb(this,!0)},hide:function(){return Vb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Zb(a,b,c,d,e){return new Zb.prototype.init(a,b,c,d,e)
}m.Tween=Zb,Zb.prototype={constructor:Zb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")},cur:function(){var a=Zb.propHooks[this.prop];return a&&a.get?a.get(this):Zb.propHooks._default.get(this)},run:function(a){var b,c=Zb.propHooks[this.prop];return this.pos=b=this.options.duration?m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Zb.propHooks._default.set(this),this}},Zb.prototype.init.prototype=Zb.prototype,Zb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Zb.propHooks.scrollTop=Zb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Zb.prototype.init,m.fx.step={};var $b,_b,ac=/^(?:toggle|show|hide)$/,bc=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cc=/queueHooks$/,dc=[ic],ec={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bc.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bc.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fc(){return setTimeout(function(){$b=void 0}),$b=m.now()}function gc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hc(a,b,c){for(var d,e=(ec[b]||[]).concat(ec["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ic(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fb(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fb(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ac.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fb(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hc(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jc(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kc(a,b,c){var d,e,f=0,g=dc.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$b||fc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$b||fc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jc(k,j.opts.specialEasing);g>f;f++)if(d=dc[f].call(j,a,k,j.opts))return d;return m.map(k,hc,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kc,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],ec[c]=ec[c]||[],ec[c].unshift(b)},prefilter:function(a,b){b?dc.unshift(a):dc.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kc(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gc(b,!0),a,d,e)}}),m.each({slideDown:gc("show"),slideUp:gc("hide"),slideToggle:gc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($b=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$b=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_b||(_b=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_b),_b=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lc=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lc,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mc,nc,oc=m.expr.attrHandle,pc=/^(?:checked|selected)$/i,qc=k.getSetAttribute,rc=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nc:mc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rc&&qc||!pc.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qc?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nc={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rc&&qc||!pc.test(c)?a.setAttribute(!qc&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=oc[b]||m.find.attr;oc[b]=rc&&qc||!pc.test(b)?function(a,b,d){var e,f;return d||(f=oc[b],oc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,oc[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rc&&qc||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mc&&mc.set(a,b,c)}}),qc||(mc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},oc.id=oc.name=oc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mc.set},m.attrHooks.contenteditable={set:function(a,b,c){mc.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sc=/^(?:input|select|textarea|button|object)$/i,tc=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sc.test(a.nodeName)||tc.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var uc=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(uc," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vc=m.now(),wc=/\?/,xc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yc,zc,Ac=/#.*$/,Bc=/([?&])_=[^&]*/,Cc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Dc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Ec=/^(?:GET|HEAD)$/,Fc=/^\/\//,Gc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hc={},Ic={},Jc="*/".concat("*");try{zc=location.href}catch(Kc){zc=y.createElement("a"),zc.href="",zc=zc.href}yc=Gc.exec(zc.toLowerCase())||[];function Lc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mc(a,b,c,d){var e={},f=a===Ic;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nc(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Oc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zc,type:"GET",isLocal:Dc.test(yc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nc(Nc(a,m.ajaxSettings),b):Nc(m.ajaxSettings,a)},ajaxPrefilter:Lc(Hc),ajaxTransport:Lc(Ic),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zc)+"").replace(Ac,"").replace(Fc,yc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yc[1]&&c[2]===yc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yc[3]||("http:"===yc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mc(Hc,k,b,v),2===t)return v;h=m.event&&k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Ec.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bc.test(e)?e.replace(Bc,"$1_="+vc++):e+(wc.test(e)?"&":"?")+"_="+vc++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mc(Ic,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Oc(k,v,c)),u=Pc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qc=/%20/g,Rc=/\[\]$/,Sc=/\r?\n/g,Tc=/^(?:submit|button|image|reset|file)$/i,Uc=/^(?:input|select|textarea|keygen)/i;function Vc(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rc.test(a)?d(a,e):Vc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vc(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vc(c,a[c],b,e);return d.join("&").replace(Qc,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Uc.test(this.nodeName)&&!Tc.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sc,"\r\n")}}):{name:b.name,value:c.replace(Sc,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zc()||$c()}:Zc;var Wc=0,Xc={},Yc=m.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Xc)Xc[a](void 0,!0)}),k.cors=!!Yc&&"withCredentials"in Yc,Yc=k.ajax=!!Yc,Yc&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xc[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zc(){try{return new a.XMLHttpRequest}catch(b){}}function $c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _c=[],ad=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_c.pop()||m.expando+"_"+vc++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ad.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ad.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ad,"$1"+e):b.jsonp!==!1&&(b.url+=(wc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_c.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bd=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bd)return bd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cd=a.document.documentElement;function dd(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dd(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cd;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cd})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dd(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=Lb(k.pixelPosition,function(a,c){return c?(c=Jb(a,b),Hb.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ed=a.jQuery,fd=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fd),b&&a.jQuery===m&&(a.jQuery=ed),m},typeof b===K&&(a.jQuery=a.$=m),m});
//# sourceMappingURL=jquery.min.map/* eslint-enable */

// eslint-disable-next-line no-unused-vars
let Helpers = (function Helpers() {
    /* public stuff */
    const API = {
        buildOptionsString(arr) {
            let str = '<option value="none">None</option> ';
            for(let i = 0; i < arr.length; i++) {
                str += `<option value="${i}">${arr[i]}</option> `;
            }
            return str;
        },

        toggleSetting(key, set) {
            // update values for checkboxes
            if (typeof set === 'boolean') {
                let element = document.querySelector(`.qolsetting[data-key="${key}"]`);
                if (element && element.type === 'checkbox') {
                    element.checked = set;
                }
            }
        }, // toggleSetting

        setupFieldArrayHTML($, arr, id, div, cls) {
            let n = arr.length;
            for(let i = 0; i < n; i++) {
                let rightDiv = i + 1;
                let rightValue = arr[i];
                $(`#${id}`).append(div);
                $(`.${cls}`).removeClass(cls).addClass(''+rightDiv+'').find('.qolsetting').val(rightValue);
            }
        },

        loadSettings($, KEY, DEFAULT, obj) {
            if (localStorage.getItem(KEY) === null) {
                API.saveSettings(KEY);
            } else {
                try {
                    let countScriptSettings = Object.keys(obj).length;
                    let localStorageString = JSON.parse(localStorage.getItem(KEY));
                    let countLocalStorageSettings = Object.keys(localStorageString).length;
                    if (countLocalStorageSettings < countScriptSettings) { // adds new objects (settings) to the local storage
                        let defaultsSetting = DEFAULT;
                        let userSetting = JSON.parse(localStorage.getItem(KEY));
                        let newSetting = $.extend(true,{}, defaultsSetting, userSetting);

                        obj = newSetting;
                        API.saveSettings(KEY, obj);
                    }
                    if (countLocalStorageSettings > countScriptSettings) {
                        API.saveSettings(KEY, obj);
                    }
                }
                catch(err) {
                    API.saveSettings(KEY, obj);
                }
                if (localStorage.getItem(KEY) != obj) {
                    obj = JSON.parse(localStorage.getItem(KEY));
                }
            }

            return obj;
        },
        saveSettings(key, obj) {
            localStorage.setItem(key, JSON.stringify(obj));
        },

        textSearchDiv(cls, dataKey, id, arrayName) {
            return `<div class='${cls}'><label><input type="text" class="qolsetting" data-key="${dataKey}" ` +
                `array-name='${arrayName}'` +
                `/></label><input type='button' value='Remove' id='${id}'></div>`;
        },

        selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName) {
            return `<div class='${cls}'> <select name='${name}' class="qolsetting" data-key='${dataKey}' ` +
                `array-name='${arrayName}'> ${options} </select> <input type='button' value='Remove' id='${id}'> </div>`;
        },

        parseFieldPokemonTooltip($, GLOBALS, tooltip) {
            const dataElements = $(tooltip).children(0).children();
            let index = 1;
            // nickname
            const nickname = dataElements[index].textContent;
            if(!nickname) {
                console.error(`Helpers.parseFieldPokemonTooltip - nickname '${nickname}' (is not a valid name)`);
            }
            index++;

            // Issue #59 - Pokefarm added a new h3 element after the nickname
            // that contains no data
            index++;

            // species
            let species = '';
            if(dataElements[index].textContent) {
                let tc = dataElements[index].textContent;
                let tcSplit = tc.trim().split(':  ');
                if(tcSplit.length == 1) {
                    console.error('Helpers.parseFieldPokemonTooltip - species text does not contain \':  \'');
                }
                else {
                    species = tcSplit[1];
                }
            }
            index++;

            // dataElements[3] will be a forme if the pokemon has a forme
            let forme = '';
            if(dataElements[index].textContent &&
               dataElements[index].textContent.startsWith('Forme')) {
                forme = dataElements[index].textContent.substr('Forme: '.length);
                index++;
            }

            // types
            const typeElements = $(dataElements[index]).children().slice(1,);
            const typeUrls = typeElements.map(idx => typeElements[idx]['src']);
            let types = typeUrls.map(idx =>
                typeUrls[idx].substring(typeUrls[idx].indexOf('types/')+'types/'.length,
                    typeUrls[idx].indexOf('.png')));
            types = types.map(idx => types[idx].charAt(0).toUpperCase() + types[idx].substring(1));
            types = types.map(idx => GLOBALS.TYPE_LIST.indexOf(types[idx]));
            index++;

            // level
            let level = -1;
            if(dataElements[index].textContent) {
                let tcSplit = dataElements[index].textContent.split(' ');
                if(tcSplit.length > 1) {
                    level = parseInt(tcSplit[1]);
                }
            } else {
                console.error('Helpers.parseFieldPokemonToolTip - could not load level because text was empty');
            }
            index++;

            // if the pokemon's happiness is less than max, skip the next index, since it will be a progress bar
            if(!dataElements[index].textContent ||
               !dataElements[index].textContent.startsWith('Happiness')) {
                index++;
            }

            // happiness
            let happiness = -1;
            if(dataElements[index].textContent) {
                let tcSplit = dataElements[index].textContent.split(' ');
                if(tcSplit.length > 1) {
                    happiness = tcSplit[1].trim();
                    happiness = (happiness == 'MAX') ? 100 : parseInt(happiness.substring(0, happiness.length-1));
                }
            } else {
                console.error('Helpers.parseFieldPokemonToolTip - could not load happiness because text was empty');
            }
            index++;

            // nature
            let nature = -1;
            if(dataElements[index].textContent) {
                let tcSplit = dataElements[index].textContent.split(' ');
                if(tcSplit.length > 1) {
                    nature = tcSplit[1].replace('(', '').trim();
                    nature = GLOBALS.NATURE_LIST.indexOf(nature); // .substring(0, nature.length-1))
                }
            } else {
                console.error('Helpers.parseFieldPokemonToolTip - could not load nature because text was empty');
            }
            index++;

            // held item
            let item = '';
            if(dataElements[index].textContent !== 'Item: None') {
                item = dataElements[index].textContent.substring(dataElements[8].textContent.indexOf(' ')+1);
            } else {
                item = 'None';
            }
            index++;

            // egg groups
            let eggGroups = [];
            if(dataElements[index].textContent) {
                eggGroups = dataElements[index].textContent.substring('Egg Group: '.length).split('/');
            }
            else {
                console.error('Helpers.parseFieldPokemonToolTip - could not load egg groups because text was empty');
            }
            index++;

            const ret = {
                'nickname': nickname,
                'species': species,
                'types': types,
                'level': level,
                'happiness_percent': happiness,
                'nature': nature,
                'item': item,
                'eggGroups': eggGroups,
            };
            if(forme !== '') {
                ret.forme = forme;
            }
            return ret;
        } // parseFieldPokemonToolTip
    };

    return API;
})();

if (module) {
    module.exports.Helpers = Helpers;
}
// eslint-disable-next-line no-unused-vars
class Globals {
    // eslint-disable-next-line camelcase
    static fillTemplates(GM_getResourceText) {
        Globals.TEMPLATES.shelterOptionsHTML = GM_getResourceText('shelterOptionsHTML');
        Globals.TEMPLATES.fieldSortHTML = GM_getResourceText('fieldSortHTML');
        Globals.TEMPLATES.fieldSearchHTML = GM_getResourceText('fieldSearchHTML');
        Globals.TEMPLATES.privateFieldSearchHTML = GM_getResourceText('privateFieldSearchHTML');
        Globals.TEMPLATES.qolHubHTML = GM_getResourceText('qolHubHTML');
        Globals.TEMPLATES.evolveFastHTML = GM_getResourceText('evolveFastHTML');
        Globals.TEMPLATES.labOptionsHTML = GM_getResourceText('labOptionsHTML');
        Globals.TEMPLATES.publicFieldTooltipModHTML = GM_getResourceText('publicFieldTooltipModHTML');
        Globals.TEMPLATES.privateFieldTooltipModHTML = GM_getResourceText('privateFieldTooltipModHTML');
    }
    static fillOptionsLists(helpers) {
        Globals.TYPE_OPTIONS = helpers.buildOptionsString(Globals.TYPE_LIST);
        Globals.NATURE_OPTIONS = helpers.buildOptionsString(Globals.NATURE_LIST);
        Globals.EGG_GROUP_OPTIONS = helpers.buildOptionsString(Globals.EGG_GROUP_LIST);
    }
    static TEMPLATES = { // all the new/changed HTML for the userscript
        qolHubLinkHTML: '<li data-name="QoL"><a title="QoL Settings"><img src="https://i.imgur.com/L6KRli5.png" alt="QoL Settings">QoL</a></li>',
        qolHubUpdateLinkHTML: '<li data-name="QoLupdate"><a href="https://github.com/jpgualdarrama/PokeFarmQoL/raw/master/Poke-Farm-QoL.user.js" target="_blank"><img src="https://i.imgur.com/SJhgsU8.png" alt="QoL Update">QoL Update Available!</a></li>',
        // qolSettingsMenuHTML   : GM_getResourceText('QoLSettingsMenuHTML'),
        massReleaseSelectHTML: '<label id="selectallfish"><input class="qolsetting" id="selectallfishcheckbox" type="checkbox">Select all</label>' +
            '<label id="movefishselectany"><input class="qolsetting" id="movefishselectanycheckbox" type="checkbox">Select Any  </label>' +
            '<label id="movefishselectsour"><input class="qolsetting" id="movefishselectsourcheckbox" type="checkbox">Select Sour  </label>' +
            '<label id="movefishselectspicy"><input class="qolsetting" id="movefishselectspicycheckbox" type="checkbox">Select Spicy</label>' +
            '<label id="movefishselectdry"><input class="qolsetting" id="movefishselectdrycheckbox" type="checkbox">Select Dry  </label>' +
            '<label id="movefishselectsweet"><input class="qolsetting" id="movefishselectsweetcheckbox" type="checkbox">Select Sweet  </label>' +
            '<label id="movefishselectbitter"><input class="qolsetting" id="movefishselectbittercheckbox" type="checkbox">Select Bitter  </label>',
        partyModHTML: '<div id=\'qolpartymod\'><label><input type="checkbox" class="qolsetting qolalone" data-key="hideDislike"/>Hide disliked berries</label><label><input type="checkbox" class="qolsetting qolalone" data-key="niceTable"/>Show in table</label><label><input type="checkbox" class="qolsetting qolalone" data-key="hideAll"/>Hide all click fast</label></div>',
        // filled in by fillTemplates
        shelterOptionsHTML: null,
        fieldSortHTML: null,
        fieldSearchHTML: null,
        privateFieldSearchHTML: null,
        qolHubHTML: null,
        evolveFastHTML: null,
        labOptionsHTML: null,
        publicFieldTooltipModHTML: null,
        privateFieldTooltipModHTML: null
    };

    static SETTINGS_SAVE_KEY = 'QoLSettings';
    // Note - the order of TYPE_LIST is important. It looks like PFQ uses an array in this order in its code
    // Don't change the order without looking for where this array is used
    static TYPE_LIST = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
    static NATURE_LIST = ['Lonely', 'Mild', 'Hasty', 'Gentle', 'Bold', 'Modest', 'Timid', 'Calm',
        'Impish', 'Adamant', 'Jolly', 'Careful', 'Relaxed', 'Brave', 'Quiet', 'Sassy',
        'Lax', 'Naughty', 'Rash', 'Naïve', 'Hardy', 'Docile', 'Serious', 'Bashful', 'Quirky'];
    static EGG_GROUP_LIST = [
        'Undiscovered', // 0
        'Monster', // 1
        'Dragon', // 2
        'Field', // 3
        'Bug', // 4
        'Grass', // 5
        'Water 1', // 6
        'Water 2', // 7
        'Water 3', // 8
        'Amorphous', // 9
        'Fairy', // 10
        'Human-Like', // 11
        'Mineral', // 12
        'Flying', // 13 <-- This skip is correct
        'Ditto', // 15
    ];
    static EGG_GROUP_ID_TO_NAME = [
        'Undiscovered', // 0
        'Monster', // 1
        'Dragon', // 2
        'Field', // 3
        'Bug', // 4
        'Grass', // 5
        'Water 1', // 6
        'Water 2', // 7
        'Water 3', // 8
        'Amorphous', // 9
        'Fairy', // 10
        'Human-Like', // 11
        'Mineral', // 12
        'Flying', // 13
        'ERROR', // 14
        'Ditto', // 15
    ];
    static SHELTER_TYPE_TABLE = [
        '0', 'Normal', '<img src="//pfq-static.com/img/types/normal.png/t=1262702646">',
        '1', 'Fire', '<img src="//pfq-static.com/img/types/fire.png/t=1262702645">',
        '2', 'Water', '<img src="//pfq-static.com/img/types/water.png/t=1262702646">',
        '3', 'Electric', '<img src="//pfq-static.com/img/types/electric.png/t=1262702645">',
        '4', 'Grass', '<img src="//pfq-static.com/img/types/grass.png/t=1262702645">',
        '5', 'Ice', '<img src="//pfq-static.com/img/types/ice.png/t=1262702646">',
        '6', 'fighting', '<img src="//pfq-static.com/img/types/fighting.png/t=1262702645">',
        '7', 'Poison', '<img src="//pfq-static.com/img/types/poison.png/t=1262702646">',
        '8', 'Ground', '<img src="//pfq-static.com/img/types/ground.png/t=1262702646">',
        '9', 'Flying', '<img src="//pfq-static.com/img/types/flying.png/t=1262702645">',
        '10', 'Psychic', '<img src="//pfq-static.com/img/types/psychic.png/t=1262702646">',
        '11', 'Bug', '<img src="//pfq-static.com/img/types/bug.png/t=1262702645">',
        '12', 'Rock', '<img src="//pfq-static.com/img/types/rock.png/t=1262702646">',
        '13', 'Ghost', '<img src="//pfq-static.com/img/types/ghost.png/t=1262702645">',
        '14', 'Dragon', '<img src="//pfq-static.com/img/types/dragon.png/t=1263605747">',
        '15', 'Dark', '<img src="//pfq-static.com/img/types/dark.png/t=1262702645">',
        '16', 'Steel', '<img src="//pfq-static.com/img/types/steel.png/t=1262702646">',
        '17', 'Fairy', '<img src="//pfq-static.com/img/types/fairy.png/t=1374419124">',
    ];
    static SHELTER_SEARCH_DATA = [
        'findNewEgg', 'Egg', 'new egg', '<img src="//pfq-static.com/img/pkmn/egg.png/t=1451852195">',
        'findNewPokemon', 'Pokémon', 'new Pokémon', '<img src="//pfq-static.com/img/pkmn/pkmn.png/t=1451852507">',
        'findShiny', 'SHINY', 'Shiny', '<img src="//pfq-static.com/img/pkmn/shiny.png/t=1400179603">',
        'findAlbino', 'ALBINO', 'Albino', '<img src="//pfq-static.com/img/pkmn/albino.png/t=1414662094">',
        'findMelanistic', 'MELANISTIC', 'Melanistic', '<img src="//pfq-static.com/img/pkmn/melanistic.png/t=1435353274">',
        'findPrehistoric', 'PREHISTORIC', 'Prehistoric', '<img src="//pfq-static.com/img/pkmn/prehistoric.png/t=1465558964">',
        'findDelta', 'DELTA', 'Delta', '<img src="//pfq-static.com/img/pkmn/_delta/dark.png/t=1501325214">',
        'findMega', 'MEGA', 'Mega', '<img src="//pfq-static.com/img/pkmn/mega.png/t=1400179603">',
        'findStarter', 'STARTER', 'Starter', '<img src="//pfq-static.com/img/pkmn/starter.png/t=1484919510">',
        'findCustomSprite', 'CUSTOM SPRITE', 'Custom Sprite', '<img src="//pfq-static.com/img/pkmn/cs.png/t=1405806997">',
        'findMale', '[M]', 'Male', '<img src="//pfq-static.com/img/pkmn/gender_m.png/t=1401213006">',
        'findFemale', '[F]', 'Female', '<img src="//pfq-static.com/img/pkmn/gender_f.png/t=1401213007">',
        'findNoGender', '[N]', 'Genderless', '<img src="//pfq-static.com/img/pkmn/gender_n.png/t=1401213004">',
        'findLegendary', '', 'Legendary', '<img src="//pfq-static.com/img/pkmn/pkmn.png/t=1451852507">',
    ];
    static SHELTER_SEARCH_LISTS = {
        'findLegendary': [
            // List of official legendaries more or less based on
            // https://bulbapedia.bulbagarden.net/wiki/Legendary_Pok%C3%A9mon#Generation_IV
            // Kanto
            'Articuno', 'Zapdos', 'Moltres', 'Mewtwo', 'Mew',
            // Johto
            'Raikou', 'Entei', 'Suicune', 'Lugia', 'Ho-oh', 'Celebi',
            // Hoenn
            'Regirock', 'Regice', 'Registeel', 'Latias', 'Latios', 'Kyogre', 'Groudon', 'Rayquaza', 'Deoxys', 'Jirachi',
            // Sinnoh
            'Uxie', 'Mesprit', 'Azelf', 'Dialga', 'Palkia', 'Heatran', 'Regigigas', 'Giratina', 'Cresselia',
            'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',
            // Unova
            'Cobalion', 'Terrakion', 'Virizion', 'Tornadus', 'Thundurus', 'Reshiram', 'Zekrom',
            'Landorus', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect',
            // Kalos
            'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion',
            // Alola
            'Type: Null', 'Silvally', 'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini',
            'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma',
            // Galar
            'Zacian', 'Zamazenta', 'Eternatus',
            // PFQ
            /* None */
        ]
    };

    // filled in by fillOptionsLists
    static TYPE_OPTIONS = null;
    static NATURE_OPTIONS = null;
    static EGG_GROUP_OPTIONS = null;

    // filled in by LocalStorageManager
    static DEX_DATA = null;
    static DEX_UPDATE_DATE = null;
    static EVOLVE_BY_LEVEL_LIST = null;
    static EVOLUTIONS_LEFT = null;
}

/* EvolutionTreeParser class
 * This purely static class provides functions for parsing the evolution div of a dex page. 
 * This class should only be used by the DexPageParser class.
 * This classes complies with the practice of prepending an underscore on private items. This includes
 * "private" methods within this class, and the class itself.
 */
// eslint-disable-next-line no-unused-vars
class EvolutionTreeParser {
    
    /* _parseEvolutionLi
     * Parses the contents of an <li> element from the evolution tree div of a dex page
     * Inputs:
     * - li - an HTML node representing the <li> to be parsed
     * - dex_id_map - object mapping Pokemon names to their ID values
     *                e.g. {'Rattata' => '019'}
     *     > TODO - there's definitely a better way to handle this that is used somewhere else
     *              in DexPageParser already
     * Output:
     * - ret - object mapping the name of the evolution target to the evolution conditions and parsed evolutions of said Pokemon
     *         e.g. {
     *               'Vaporeon' => {
     *                           'condition' => 'Water Stone', 
     *                           'evolutions' => [
     *                                            // parsed <ul> containing Vaporeon [Mega Forme Q]
     *                                           ]
     *                          }, ...
     *              }
     */
    static _parseEvolutionLi(li, dexIDMap) {
        let condition = li.children('.condition');
        let targetElem = li.find('.name').eq(0);
        let target = targetElem.text().trim();

        // if the targetElem has a link as a child, store the dex ID in the link
        if(targetElem.find('a').length) {
            let link = targetElem.find('a')[0]['href'];
            let id = link.substring('/dex/'.length);
            dexIDMap[target] = id;
        }

        let ret = {};
        ret[target] = {
            'condition': condition[0],
            'evolutions': []
        };
        const uls = li.children('ul');
        if(uls.length) {
            for(let i = 0; i < uls.length; i++) {
                let nest = EvolutionTreeParser._parseEvolutionUl(uls.eq(i), dexIDMap);
                ret[target]['evolutions'].push(nest);
            }
            return ret;
        } else {
            return ret;
        }
    }

    /* _parseEvolutionUl
     * Parses the contents of an <ul> element from the evolution tree div of a dex page
     * Inputs:
     * - ul - an HTML node representing the <ul> to be parsed
     * - dex_id_map - object mapping Pokemon names to their ID values
     *                e.g. {'Rattata' => '019'}
     *     > TODO - there's definitely a better way to handle this that is used somewhere else
     *              in DexPageParser already
     * Output:
     * - ret - object mapping the names of the evolution targets to the evolution conditions and parsed evolutions of said Pokemon.
     *         ret will contain one key (i.e., one evolution target name) for each <li> found in the <ul> passed
     *         e.g. {
     *               'Vaporeon' => {
     *                              'condition' => 'Water Stone', 
     *                              'evolutions' => [
     *                                               // parsed <ul> containing Vaporeon [Mega Forme Q]
     *                                               {
     *                                                'Vaporeon' => {
     *                                                               'condition' => 'Water Stone', 
     *                                                               'evolutions' => []
     *                                                              }
     *                                               }
     *                                              ]
     *                             }, ...
     *              }
     */
    static _parseEvolutionUl(ul, dexIDMap) {
        const lis = ul.children('li');
        const numParallelEvolutions = lis.length;

        let ret = {};
        for(let i = 0; i < numParallelEvolutions; i++) {
            let nest = EvolutionTreeParser._parseEvolutionLi(lis.eq(i), dexIDMap);
            for(let d in nest) {
                ret[d] = nest[d];
            }
        }
        return ret;
    }
    
    /* parseEvolutionTree
     * Parses the content of an evolution tree of a dex page
     * Inputs:
     * - root - a string with the name of the pokemon at the base of the tree (e.g., 'Rattata')
     * - evotree - the contents of $('.evolutiontree'). Example:
     *             <div class="evolutiontree">
     *               <span class="Name">
     *                 <span class="icon" style="background-image:url(//url//)"></span>
     *                 <b>Eevee</b>
     *               </span>
     *               <ul>
     *                 <li>
     *                   <span class="condition">Water Stone</span>
     *                   <span class="name">
     *                     <span class="icon" style="background-image:url(//url//)"></span>
     *                     <a href="/dex/144">Vaporeon</a>
     *                   </span>
     *                   <ul>
     *                     <li>
     *                       <span class="condition">
     *                         <img src=//url//>
     *                         "Vaporeonite Q"
     *                       </span>
     *                       <span class="name">
     *                         <span class="icon" style="background-image:url(//url//)"></span>
     *                         <a href="/dex/144-Q">Vaporeon</a>
     *                         <i class="small">[Mega Forme Q</i>
     *                       </span>
     *                     </li>
     *                   </ul>
     *                 </li>
     *                 <li> ... data for Jolteon </li>
     *                 ... data for Flareon, Espeon, Umbreon, Leafeon, Glaceon, Sylveon
     *               </ul>
     *             </div>
     * - dex_id_map - object mapping Pokemon names to their ID values
     *                e.g. {'Eevee' => '143'}
     *     > TODO - there's definitely a better way to handle this that is used somewhere else
     *              in DexPageParser already
     * Outputs:
     * - flat - Contains evolution data for a subtree of evolution data. For the base (non-recursive) call,
     *          is an object containing evolutions for a single pokemon family. For recursive calls,
     *          is an array which contains an object in each index.
     *          Example (of whole object and of one index of array):
     *          {
     *           'members' => ['Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Espeon', 'Umbreon',
     *                         'Leafeon', 'Glaceon', 'Sylveon'],
     *           'evolutions' => [
     *             {'source' => 'Eevee'   , 'target' => 'Vaporeon', 'condition' => 'Water Stone'},
     *             {'source' => 'Vaporeon', 'target' => 'Vaporeon [Mega Forme Q]', 'condition' => 'Vaporeonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Jolteon' , 'condition' => 'ThunderStone'},
     *             {'source' => 'Jolteon' , 'target' => 'Jolteon [Mega Forme Q]' , 'condition' => 'Jolteonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Flareon' , 'condition' => 'Fire Stone'},
     *             {'source' => 'Flareon' , 'target' => 'Flareon [Mega Forme Q]' , 'condition' => 'Flareonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Espeon'  , 'condition' => 'Happiess during Daytime'},
     *             {'source' => 'Espeon'  , 'target' => 'Espeon [Mega Forme Q]'  , 'condition' => 'Espeonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Umbreon' , 'condition' => 'Happiness during Nighttime'},
     *             {'source' => 'Umbreon' , 'target' => 'Umbreon [Mega Forme Q]' , 'condition' => 'Umbreonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Leafeon' , 'condition' => 'In Grass-type Field'},
     *             {'source' => 'Leafeon' , 'target' => 'Leafeon [Mega Forme Q]' , 'condition' => 'Leafeonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Glaceon' , 'condition' => 'In Ice-type Field'},
     *             {'source' => 'Glaceon' , 'target' => 'Glaceon [Mega Forme Q]' , 'condition' => 'Glaceonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Sylveon' , 'condition' => 'Affection'},
     *             {'source' => 'Sylveon' , 'target' => 'Sylveon [Mega Forme Q]' , 'condition' => 'Sylveonite Q'},
     *           ]
     *          }
     */
    static parseEvolutionTree(root, evotree, dexIDMap) {
        const uls = evotree.children('ul');
        const tree = {};
        const textContent = evotree.text();

        const doesNotEvolveMarker = ' is not known to evolve';
        const markerIndex = textContent.indexOf(doesNotEvolveMarker);
        if(markerIndex > -1) {
            // mimic the format of the output of flattenEvolutionFamily
            return {'members': ['Ditto'], 'evolutions': []};
        }

        // TODO: Pull this side effect out of this function
        if(evotree.children('span').length) {
            let linkElem = evotree.children('span').children('a');
            if(linkElem.length) {
                let link = linkElem[0]['href'];
                let dexID = link.substring('https://pokefarm.com/dex/'.length);
                dexIDMap[root] = dexID;
            }
        }

        /* tree format example
         * {
         *  'Eevee' => [
         *              {
         *               'Vaporeon' => {
         *                              'condition' => 'Water Stone', 
         *                               'evolutions' => [
         *                                                // parsed <ul> containing Vaporeon [Mega Forme Q]
         *                                               ],
         *                             }, ...
         *              },
         *              // data for Jolteon, Flareon, Espeon, Umbreon, Leafeon, Glaceon, Sylveon
         *            ]
         * }
         */
        tree[root] = [];
        for(let i = 0; i < uls.length; i++) {
            tree[root].push(EvolutionTreeParser._parseEvolutionUl(uls.eq(i), dexIDMap));
        }

        // flatten the tree
        let flat = EvolutionTreeParser._flattenEvolutionTree(tree);

        // parse the evolution conditions
        EvolutionTreeParser._parseEvolutionConditions(flat);
        return flat;
    }

    /* _flattenEvolutionTree
     * Parses a tree structure representing the evolutions of a pokemon into an object containing flat arrays.
     * Called recursively to parse the nested evolution data.
     * Inputs:
     * - family_obj - Contains evolution data for a subtree of evolution data. For the base (non-recursive) call,
     *                is an object containing evolutions for a single pokemon family. For recursive calls,
     *                is an array which contains an object in each index.
     *                Example (of whole object and of one index of array):
     *                {
     *                 'Eevee' => [
     *                             {
     *                              'Vaporeon' => {
     *                                             'condition' => 'Water Stone', 
     *                                              'evolutions' => [
     *                                                               // parsed <ul> containing 
     *                                                               // Vaporeon [Mega Forme Q]
     *                                                              ],
     *                                            }, ...
     *                             },
     *                             // data for Jolteon, Flareon, Espeon, Umbreon, Leafeon, Glaceon, Sylveon
     *                           ]
     *                }
     * - ret_obj - An aggregator for the flattened data for a given family. Is undefined for the base
     *             (non-recursive) call, and for each recursive call is an object containing family member 
     *             and evolutions data.
     *             Example: 
     *             {
     *               'members' => ['Bulbausaur', 'Ivysaur', 'Venusaur', 'Venusaur [Mega Forme]'],
     *               'evolutions' => [
     *                 {'source' => 'Bulbasaur', 'target' => 'Ivysaur', 'condition' => 'Level 16'},
     *                 {'source' => 'Ivysaur', 'target' => 'Venusaur', 'condition' => 'Level 36'},
     *                 {'source' => 'Venusaur', 'target' => 'Venusaur [Mega Forme]', 'condition => 'Venusaurite'}
     *               ]
     *             }
     * - evo_src - The name of the pokemon at the root of the current call. Is undefined for the base
     *             (non-resursive) call, and for each recursive call it is the name of the pokemon at the 
     *             root of the subtree being parsed
     * Outputs:
     * - ret_obj - This will be equal to the the value of ret_obj that was passed in plus the evolution
     *             data parsed during the current recursion
     * - 
     */
    static _flattenEvolutionTree(familyObj, retObj, evoSrc) {
        retObj = retObj || {
            'members': [],
            'evolutions': []
        };

        if(Array.isArray(familyObj)) {
            for(let i = 0; i < familyObj.length; i++) {
                for(let key in familyObj[i]) {
                    retObj.members.push(key);
                    retObj.evolutions.push({
                        'source': evoSrc,
                        'target': key,
                        'condition': familyObj[i][key]['condition']
                    });
                    this._flattenEvolutionTree(familyObj[i][key]['evolutions'], retObj, key);
                }
            }
        } else if(typeof familyObj === 'object') {
            for(let key in familyObj) {
                retObj.members.push(key);
                this._flattenEvolutionTree(familyObj[key], retObj, key);
            }
        }
        return retObj;
    }

    /* _parseEvolutionConditions
     * Parse the HTML in the conditions list from the flattened object.
     * Currently this only successfully parses Level conditions
     * Inputs:
     * - flattened - See _flattenEvolutionTree for input format. Modified in
     *               place to extract condition information from html
     * Outputs: None
     */
    static _parseEvolutionConditions(flattened) {
        for(let e = 0; e < flattened.evolutions.length; e++) {
            let condition = flattened.evolutions[e].condition;
            let condText = condition.textContent;
            // for now, let's just parse for pokemon that evolve by level
            // TODO: Non-Level conditions
            if(condText.indexOf('Level ') > -1) {
                flattened.evolutions[e].condition = [];
                let words = condText.split(' ');
                let cond = '', clearCurrentCondition = false;

                for(let w = 0; w < words.length; w++) {
                    clearCurrentCondition = false;
                    if(words[w] === 'Level') {
                        clearCurrentCondition = true;
                        flattened.evolutions[e].condition.push({'condition': words[w], 'data': words[w+1]});
                        w++;
                    } else if(words[w] === 'Happiness') {
                        clearCurrentCondition = true;
                        flattened.evolutions[e].condition.push({'condition': words[w], 'data': ''});
                    } else { // catch-all for now
                        clearCurrentCondition = false;
                        cond = cond + ' ' + words[w];
                    }

                    if(clearCurrentCondition) {
                        if(cond !== '') {
                            flattened.evolutions[e].condition.push({'condition': cond.trim(), 'data': ''});
                        }
                        cond = '';
                    }
                } // for

                // if there's any leftover conditions, add it into the list
                if(cond !== '') {
                    flattened.evolutions[e].condition.push({'condition': cond.trim(), 'data': ''});
                }
            } // if level
            else {
                flattened.evolutions[e].condition = condition.textContent.trim();
            }
        }
    }
} // EvolutionTreeParser

if (module) {
    module.exports.EvolutionTreeParser = EvolutionTreeParser;
}
/* This class includes static functions for parsing data from a single dex page.
   Functions which process multiple text pages are in DexUtilities.
*/

// eslint-disable-next-line no-unused-vars
class DexPageParser {
    /* Parse the header from a dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - (anonymous) - struct containing data from header.
     *                 Example:
     *                 {
     *                   base_number: 003,
     *                   base_name: "Venusaur",
     *                   name: "Venusaur [Mega Forme]"
     *                 }
     */
    static getInfoFromDexPageHeader(html) {
        // Note - I thought this wouldn't work for exclusives because they're pokedex numbers all start with "000",
        // but when exclusives have multiple forms, each form has its dex entry, and the forms are not grouped
        // into the panel of a single pokemon. See Lunupine and Lunupine [Mega Forme Q] as an example, contrasted with
        // Venusaur and Venusaur [Mega Forme]. This means that exclusives will never have any links in the form panel
        // and thus will never get into this if statement
        const nameHeader = html.find('#dexinfo>h3').eq(0);
        const formI = nameHeader.children('i.small');

        // https://stackoverflow.com/questions/3442394/using-text-to-retrieve-only-text-not-nested-in-child-tags
        // get text but not children's text
        let nameText = nameHeader.clone().children().remove().end().text();
        let nameSplits = nameText.split(' ');
        let basePokemonNumber = nameSplits[0].replace('#','').replace(':','');
        // just in case the name is more than one word, join the remaining elements back together
        nameSplits.splice(0, 1);
        let basePokemonName = nameSplits.join(' ').trim();
        let pokemonName = (formI.length) ?
            basePokemonName + ' ' + formI.text() :
            basePokemonName;

        return {
            // dex number of the base pokemon
            // eslint-disable-next-line camelcase
            base_number: basePokemonNumber,
            // name of the base pokemon
            // eslint-disable-next-line camelcase
            base_name: basePokemonName,
            // name of the form
            name: pokemonName
        };
    }

    /* Parse the footer from a dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - (anonymous) - struct containing data from footer.
     *                 Example:
     *                 {
     *                   shortlink: "/shortlinks/save/dex/003-M",
     *                   shortlinkNumber: "003-M"
     *                 }
     */
    static getInfoFromDexPageFooter(html) {
        let currentLink = html.find('#footbar>span>a[href^="/shortlinks"]').attr('href');
        let currentNumber = currentLink.substr(currentLink.indexOf('/dex/')+5);

        return {
            shortlink: currentLink,
            shortlinkNumber: currentNumber
        };
    }

    /* Parse the types of a pokemon from a dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - types - array containing the indices of the pokemon's type(s) in the GLOBALS.TYPE_LIST array
     *           Example: For Venusaur:
     *                 [
     *                  4, // Grass
     *                  7 // Poison
     *                 ]
     */
    static parseTypesFromDexPage(html, typeList) {
        let typeImgs = html.find('.dexdetails>li>img');
        let typeUrls = typeImgs.map((idx, img) => {
            return img.src;
        });
        let types = typeUrls.map((idx, url) =>
            url.substring(url.indexOf('types/')+'types/'.length,
                url.indexOf('.png')));
        types = types.map((idx, type) => type.charAt(0).toUpperCase() + type.substring(1));
        types = types.map((idx, type) => typeList.indexOf(type)); // GLOBALS.TYPE_LIST.indexOf(type));
        return types.toArray();
    }

    /* Parse egg png link from dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - eggUrl - Partial UTL to the png of the egg from the dex page.
     *             'https://pfq-static.com/img/' is removed from the URL since it is always the same
     */
    static parseEggPngFromDexPage(html) {
        let eggUrl = (html.find('.eggspr').find('img')
            .attr('src') || '')
            .replace('https://pfq-static.com/img/', '');
        return eggUrl;
    }

    /* Parse the evolution tree from a dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - flattened - See EvolutionTreeParser.parseEvolutionTree for description
     */
    static parseEvolutionTreeFromDexPage(evolutionTreeParser, html, dexIDMap) {
        const rootName = DexPageParser.getInfoFromDexPageHeader(html).name;
        const tree = html.find('.evolutiontree').eq(0);
        const flattened = evolutionTreeParser.parseEvolutionTree(rootName, tree, dexIDMap);
        return flattened;
    }    
} // DexPageParser

if (module) {
    module.exports.DexPageParser = DexPageParser;
}
// eslint-disable-next-line no-unused-vars
class LocalStorageManager {
    constructor(storage) {
        self.storage = storage;
    }

    /* Set GLOBALS.DEX_DATA and GLOBALS.DEX_UPDATE_DATE from the QoLPokedex data stored in localStorage
     * Inputs:
     * - globals - reference to the GLOBALS settings object
     */
    loadDexIntoGlobalsFromStorage(globals) {
        if(self.storage.getItem('QoLPokedex') === null) {
            return false;
        }
        if(Object.keys(JSON.parse(self.storage.getItem('QoLPokedex'))).length === 0) {
            return false;
        }

        let dateAndDex = JSON.parse(self.storage.getItem('QoLPokedex'));
        // if QoLPokedex only contains date
        if((dateAndDex.length === 1) ||
           // or if the dex part of the array is empty
           (dateAndDex[1] === undefined) ||
            (dateAndDex[1] === null)) {
            return false;
        }

        globals.DEX_UPDATE_DATE = dateAndDex[0];
        let dex = dateAndDex.slice(1);
        globals.DEX_DATA = dex;
        return true;
    }
    /* Set globals.DEX_DATA and globals.DEX_UPDATE_DATE by loading the main dex page from the web
     * Inputs:
     * - $ - reference to jQuery
     * - globals - reference to the GLOBALS settings object
     */
    loadDexIntoGlobalsFromWeb($, document, dexUtilities, globals) {
        dexUtilities.getMainDexPage($).done((data) => {
            globals.DEX_UPDATE_DATE = (new Date()).toUTCString();
            let html = $.parseHTML(data);
            let dex = $(html[html.length-1], document).find('#dexdata').html();
            globals.DEX_DATA = dex.split(',');
            this.updateLocalStorageDex($, document, globals.DEX_UPDATE_DATE, globals);
        }).catch((error) => {
            console.error('Error occurred in loadDexIntoGlobalsFromWeb. ' + 
                          'Error message: ' + error);
        });
    }
    
    loadEvolveByLevelList(GLOBALS) {
        GLOBALS.EVOLVE_BY_LEVEL_LIST = JSON.parse(localStorage.getItem('QoLEvolveByLevel'));
    }
    
    loadEvolutionTreeDepthList(GLOBALS) {
        GLOBALS.EVOLUTIONS_LEFT = JSON.parse(localStorage.getItem('QoLEvolutionTreeDepth'));
    }

    /* Call loadDexIntoGlobalsFromWeb if more than 30 days have passed since it was last loaded
     * Inputs:
     * - $ - reference to jQuery
     * - globals - reference to the GLOBALS settings object
     */
    loadDexIntoGlobalsFromWebIfOld($, document, dexUtilities, globals) {
        // If it's more than 30 days old, update the dex
        const THIRTY_DAYS_IN_MS = 30*24*3600*1000;
        let dateAndDex = JSON.parse(self.storage.getItem('QoLPokedex'));
        if ((Date.now() - Date.parse(dateAndDex[0])) > THIRTY_DAYS_IN_MS) {
            this.loadDexIntoGlobalsFromWeb($, document, dexUtilities, globals);
            return true;
        }
        return false;
    }
    updateLocalStorageDex($, document, updateDate, globals) {
        let dateString = '';
        if(updateDate === undefined) {
            dateString = (new Date()).toUTCString();
        } else {
            dateString = updateDate;
        }
        const datePlusDex = [dateString].concat(globals.DEX_DATA);
        self.storage.setItem('QoLPokedex', JSON.stringify(datePlusDex));
        $('.qolDate', document).val(dateString);
    }

    saveEvolveByLevelList(globals, parsedFamilies, dexIDs) {
        // load current evolve by level list
        let evolveByLevelList = {};
        if(self.storage.getItem('QoLEvolveByLevel') !== null) {
            evolveByLevelList = JSON.parse(self.storage.getItem('QoLEvolveByLevel'));
        }

        for(let pokemon in parsedFamilies) {
            let evolutions = parsedFamilies[pokemon];
            for(let i = 0; i < evolutions.length; i++) {
                let evo = evolutions[i];
                if(!(evo.source in evolveByLevelList) && Array.isArray(evo.condition)) {
                    for(let j = 0; j < evo.condition.length; j++) {
                        let cond = evo.condition[j];
                        if(cond.condition === 'Level') {
                            evolveByLevelList[evo.source] = cond.condition + ' ' + cond.data;
                            evolveByLevelList[dexIDs[evo.source]] = cond.condition + ' ' + cond.data;
                        } // if
                    } // for
                } // if
            } // for
        } // for pokemon

        globals.EVOLVE_BY_LEVEL_LIST = evolveByLevelList;
        self.storage.setItem('QoLEvolveByLevel', JSON.stringify(evolveByLevelList));
    } // saveEvolveByLevelList

    saveEvolutionTreeDepths(globals, maxEvoTreeDepth) {
        // GLOBALS.EVOLUTIONS_LEFT stores the number of remaining evolutions and the total number of evolutions
        // for a pokemon and it's family
        // e.g. - GLOBALS.EVOLUTIONS_LEFT["019s2"] = { remaining: 4, total: 5 } // 019s2 = Super Saiyan Rattata
        
        self.storage.setItem('QoLEvolutionTreeDepth', JSON.stringify(maxEvoTreeDepth));
        globals.EVOLUTIONS_LEFT = maxEvoTreeDepth;

    } // saveEvolutionTreeDepths

    saveRegionalFormsList(globals, parsedFamilies, dexIDs, regionalFormMap) {
        // GLOBALS.REGIONAL_FORMS_LIST maps base pokemon species names to the list
        // of regional forms, including the base name.
        // e.g. - GLOBALS.REGIONAL_FORMS_LIST[Rattata] = ["Rattata", "Rattata [Alolan Forme]"]
        const key = 'QoLRegionalFormsList';
        const list = regionalFormMap;

        self.storage.setItem(key, JSON.stringify(list));
        globals.REGIONAL_FORMS_LIST = list;

    } // saveRegionalFormsList

    saveEggTypesMap(globals, map) {
        // GLOBALS.EGGS_PNG_TO_TYPES_LIST will map a pokemon's base name to all the egg pngs that
        // will appear in the shelter with that name, and map each of those pngs to the type(s)
        // of that egg
        // e.g. GLOBALS.EGGS_PNG_TO_TYPES_LIST[Rattata] = {
        //           <kantonian.png> : [Normal],
        //           <alolan.png> : [Normal, Dark]
        // }
        const key = 'QoLEggTypesMap';
        self.storage.setItem(key, JSON.stringify(map));
        globals.EGGS_PNG_TO_TYPES_LIST = map;
    }

    /* parseAndStoreDexNumbers
     * 
     */
    parseAndStoreDexNumbers(dex) {
        let json = JSON.parse(dex);
        // load current list of processed dex IDs
        let dexIDsCache = [];
        if(self.storage.getItem('QoLDexIDsCache') !== null) {
            dexIDsCache = JSON.parse(self.storage.getItem('QoLDexIDsCache'));
        }
        
        let dexNumbers = [];
        // get the list of pokedex numbers that haven't been processed before
        for(let r in json.regions) {
            for(let i = 0; i < json.regions[r].length; i++) {
                if(dexIDsCache.indexOf(json.regions[r][i][0]) == -1) {
                    dexNumbers.push(json.regions[r][i][0]);
                }
            }
        }
        
        // Add the list of dexNumbers to the cache and write it back to local storage
        dexIDsCache = dexIDsCache.concat(dexNumbers);
        self.storage.setItem('QoLDexIDsCache', JSON.stringify(dexIDsCache));
        return dexNumbers;
    }
}

if (module) {
    module.exports.LocalStorageManager = LocalStorageManager;
}
// eslint-disable-next-line no-unused-vars
class DexUtilities {
    /* Load the main dex page.
     * Note: Testing this would essentially be testing jQuery, so no need to test
     * Inputs:
     * - $ - reference to jQuery
     * Outputs:
     * - (anonymous) - A Promise that will be resolved when the page is loaded
     */
    static getMainDexPage($) {
        return $.get('https://pokefarm.com/dex');
    }
    /* Load the dex page for a pokemon.
     * Inputs:
     * - $ - reference to jQuery
     * - id - dex ID number to load
     * Outputs:
     * - (anonymous) - A promise that will be resolved when the page is loaded
     */
    static getPokemonDexPage($, id) {
        return $.get('https://pokefarm.com/dex/' + id);
    }
    /* Loads the dex pages for the pokemon whose dex numbers are in the dexNumbers input
     * Inputs:
     * - $ - reference to jQuery
     * - dexNumbers - an array containing dex IDs
     *                Example: ["001", "002", "003", "004"];
     * - progressBar - a <progress> tag that will show how many of the IDs in 
     *                 'dexNumbers' have been loaded
     * - progressSpan - a <span> tag that will contain text about the progress
     *                  of loading the dex pages
     * Outputs:
     * - (anonymous) - A Promise that will be resolved when all the dex pages
     *                 have been loaded
     */
    static loadDexPages($, dexNumbers, progressBar, progressSpan) {
        let requests = [];
        progressBar.value = 0;
        progressSpan.textContent = 'Loading Pokedex info. Please wait until this is complete...';

        for(let d = 0; d < dexNumbers.length; d++) {
            // if the dex number is 000, the user has not seen the pokemon,
            // so just increment the progress bar value
            if(dexNumbers[d] === '000') {
                progressBar.value = progressBar['value'] + 1;
                progressSpan.textContent = `Loaded ${progressBar['value']} of ${dexNumbers.length} Pokemon`;
            } else {
                // eslint-disable-next-line no-unused-vars
                let r = DexUtilities.getPokemonDexPage($, dexNumbers[d]).done((data, status, jqXHR) => {
                    progressBar.value = progressBar.value + 1;
                    progressSpan.textContent = `Loaded ${progressBar['value']} of ${dexNumbers.length} Pokemon`;
                    return data;
                }).fail((error) => {
                    console.log(error);
                });
                requests.push(r);
            }
        }

        return $.when.apply(undefined, requests);
    } // loadDexPages
    /* Loads the dex pages for the forms of a pokemon
     * Inputs:
     * - $ - reference to jQuery
     * - firstFormHTML - An array containing the HTML for the dex pages for a set of pokemon.
     *                   The HTML in this array will be parsed to find the forms of a pokemon
     * - progressBar - a <progress> tag that will show how many of the IDs in 
     *                 'dexNumbers' have been loaded
     * - progressSpan - a <span> tag that will contain text about the progress
     *                  of loading the dex pages
     * Outputs:
     * - (anonymous) - A Promise that will be resolved when all the forms' dex pages
     *                 have been loaded
     */
    static loadFormPages($, ownerDocument, firstFormHTML, progressBar, progressSpan) {
        let requests = [];
        for(let a = 0; a < firstFormHTML.length; a++) {
            let data = firstFormHTML[a];
            // load data from pages for other forms
            const formLinks = $(data, ownerDocument).find('.formeregistration a');
            if(formLinks.length) {
                progressBar['max'] = progressBar['max'] + formLinks.length;
                for(let i = 0; i < formLinks.length; i++) {
                    let link = formLinks.eq(i).attr('href');
                    let r = DexUtilities.getPokemonDexPage($, link.substring('/dex/'.length))
                        .done((formHTML) => {
                            progressBar.value = progressBar['value'] + 1;
                            progressSpan.textContent = `Loaded ${progressBar['value']} of ${progressBar['max']} Pokemon`;
                            return formHTML;
                        }).fail((error) => {
                            console.log(error);
                        });
                    requests.push(r);
                }
            }
        } // for
        
        return $.when.apply(undefined, requests);
    } // loadFormPages
    /* Parses HTML from pokedex pages
     * Inputs:
     * - $ - reference to jQuery
     * - ownerDocument - reference to virtual document to load HTML into
     * - args - an array of HTML from pokedex pages
     * Outputs:
     * - flat_families - See DexPageParser.parseEvolutionTreeFromDexPage for details
     * - dex_id_map - object mapping dex IDs to pokemon's names. Used to track which
     *                pokemon's dex pages have been processed
     */  
    static parseEvolutionTrees($, ownerDocument, dexPageParser, evolutionTreeParser, args) {
        const flatFamilies = {};
        const dexIDMap = {};

        for(let a = 0; a < args.length; a++) {
            let data = $(args[a], ownerDocument);
            const rootName = dexPageParser.getInfoFromDexPageHeader(data).name;

            // the evolution tree won't have the dex ID for the form of the pokemon that we're currently using
            // use the footbar to get the full pokedex number for the current form
            const fullIDNumber = dexPageParser.getInfoFromDexPageFooter(data).shortlinkNumber;

            // if the root name is already in in the flat files, but the root of the tree is not in the dexIDMap
            if((!(rootName in flatFamilies)) || (!(rootName in dexIDMap))) {
                dexIDMap[rootName] = fullIDNumber;

                let flattened = dexPageParser.parseEvolutionTreeFromDexPage(evolutionTreeParser, data, dexIDMap);

                // copy the data into the global object to prevent loading data multiple times
                if(flattened.evolutions.length) {
                    for(let i = 0; i < flattened.members.length; i++) {
                        flatFamilies[flattened.members[i]] = flattened.evolutions;
                    }
                } else {
                    flatFamilies[rootName] = flattened.evolutions;
                }
            } // if not in flatFamilies
        } // for a

        return [flatFamilies, dexIDMap];
    } // parseEvolutionTrees
    
    static buildEvolutionTreeDepthsList(parsedFamilies, dexIDs, formData, formMap) {
        // store the maximum depth of the evolution tree for each pokemon
        // for highlighting each pokemon based on how fully evolved they are
        // https://github.com/jpgualdarrama/PokeFarmQoL/issues/11
        let maxEvoTreeDepth = {};
        for(let pokemon in parsedFamilies) {
            let evolutions = parsedFamilies[pokemon];

            // filter out "evolutions" that are really changes between forms of the
            // same pokemon
            for(let i = evolutions.length - 1; i>= 0; i--) {
                if(formMap[evolutions[i].source] === undefined) {
                    console.error(`Could not find form data for ${evolutions[i].source}`);
                } else {
                    if(formMap[evolutions[i].target] === undefined) {
                        console.error(`Could not find form data for ${evolutions[i].target}`);
                    } else if(JSON.stringify(formMap[evolutions[i].source]) === JSON.stringify(formMap[evolutions[i].target])) {
                        evolutions.splice(i, 1);
                    }
                }
            }

            if(!(pokemon in maxEvoTreeDepth)) {
                if(evolutions.length) {
                    // initialize new entries in the structure
                    maxEvoTreeDepth[pokemon] = {'remaining': 0, 'total': 0};
                    maxEvoTreeDepth[dexIDs[pokemon]] = {'remaining': 0, 'total': 0};

                    let sourcesList = evolutions.map( el => el.source );

                    // don't redo the processing if the root of the tree is already in the list
                    if(sourcesList[0] in maxEvoTreeDepth && pokemon !== sourcesList[0]) {
                        // data for all evolutions is added when the first pokemon is added
                        continue;
                    }

                    let evoTree = {};

                    for(let i = evolutions.length - 1; i >= 0; i--) {
                        let evolution = evolutions[i];
                        let source = evolution.source;
                        let target = evolution.target;

                        if(sourcesList.indexOf(target) == -1) {
                            evoTree[target] = {[target]: []};
                        }

                        if(!(source in evoTree)) {
                            evoTree[source] = {[source]: [evoTree[target]]};
                        } else {
                            evoTree[source][source].push(evoTree[target]);
                        }
                    }

                    let finalTree = evoTree[sourcesList[0]];
                    let createPaths = function(stack, tree, paths) {
                        let name = Object.keys(tree)[0];
                        let children = tree[name];
                        let numChildren = children.length;

                        // append this node to the path array
                        stack.push(name);
                        if(numChildren === 0) {
                            // append all of its children
                            paths.push(stack.reverse().join('|'));
                            stack.reverse();
                        } else {
                            // otherwise try subtrees
                            for(let i = 0; i < numChildren; i++) {
                                createPaths(stack, children[i], paths);
                            }
                        }
                        stack.pop();
                    };
                    let parseEvolutionPaths = function(tree) {
                        let paths = [];
                        createPaths([], tree, paths);

                        // get remaining number of evolutions in each path and total number
                        // of evolutions along each path
                        let pokemonPathData = {};
                        for(let p = 0; p < paths.length; p++) {
                            let mons = paths[p].split('|');
                            for(let m = 0; m < mons.length; m++) {
                                // first or only appearance
                                if(!(mons[m] in pokemonPathData)) {
                                    pokemonPathData[mons[m]] = {'remaining': m, 'total': mons.length - 1};
                                }
                                // pokemon has multiple evolution paths
                                else {
                                    const remaining = pokemonPathData[mons[m]].remaining;
                                    const total = pokemonPathData[mons[m]].total;
                                    pokemonPathData[mons[m]].remaining = (remaining + m) / 2;
                                    pokemonPathData[mons[m]].total = (total + mons.length - 1) / 2;
                                }
                            }
                        }

                        // return paths.map((p) => { return p.split('|').length })
                        return pokemonPathData;
                    };
                    // - 1 because there is one less evolution then there are pokemon
                    let parsedPathData = parseEvolutionPaths(finalTree);
                    for(let p in parsedPathData) {
                        maxEvoTreeDepth[p] = parsedPathData[p];
                        maxEvoTreeDepth[dexIDs[p]] = parsedPathData[p];
                    }
                    // maxEvoTreeDepth[pokemon] = Math.max(...parseEvolutionPaths(finalTree)) - 1;
                    // maxEvoTreeDepth[dexIDs[pokemon]] = maxEvoTreeDepth[pokemon]
                } // if evolutions.length
                // add pokemon that don't evolve
                else {
                    maxEvoTreeDepth[pokemon] = {'remaining': 0, 'total': 0};
                    maxEvoTreeDepth[dexIDs[pokemon]] = maxEvoTreeDepth[pokemon];
                }
            } // if not in maxEvoTreeDepth
        } // for pokemon in parsedFamilies
        
        return maxEvoTreeDepth;

    } // buildEvolutionTreeDepthsList

    static parseFormData($, ownerDocument, dexPageParser, args) {
        const formData = {};
        const formMap = {};

        // because the evolution tree for all the members of a single family will have the same text,
        // use the text as a key in families
        // use the ownerDocument parameter to jQuery to stop jQuery from loading images and audio files
        for(let a = 0; a < args.length; a++) {
            let data = $(args[a], ownerDocument);
            const headerInfo = dexPageParser.getInfoFromDexPageHeader(data);
            const footerInfo = dexPageParser.getInfoFromDexPageFooter(data);

            // use the footbar to get the full pokedex number for the current form
            let currentNumber = footerInfo.shortlinkNumber;

            (formData[headerInfo.name] = formData[headerInfo.name] || []).push({
                // dex number of the base pokemon
                // eslint-disable-next-line camelcase
                base_number: headerInfo.base_number,
                // name of the base pokemon
                // eslint-disable-next-line camelcase
                base_name: headerInfo.base_name,
                // dex number of the form
                number: currentNumber,
                // name of the form
                name: headerInfo.name
            });
        } // for a

        // reorganize forms to all be under the base
        for(let name in formData) {
            for(let i = 0; i < formData[name].length; i++) {
                (formMap[formData[name][i].base_name] = formMap[formData[name][i].base_name] || []).push({
                    name: formData[name][i].name,
                    number: formData[name][i].number
                });
            } // i
        } // name

        // duplicate data from base pokemon into entries for each form
        for(let name in formData) {
            for(let i = 0; i < formData[name].length; i++) {
                if(formData[name][i].base_name !== formData[name][i].name) {
                    // formMap[formData[name][i].number] = formMap[formData[name][i].base_name];
                    formMap[formData[name][i].name] = formMap[formData[name][i].base_name];
                }
            }
        }

        return [formData, formMap];
    } // parseFormData

    /* base_names = {
       'Rattata' : 'Rattata',
       'Rattata [Alolan Forme]' : 'Rattata',
       'Raticate [Alolan Totem Forme]' : 'Raticate'
       }
    */
    static parseBaseNames($, ownerDocument, dexPageParser, args) {
        const list = {};
        for(let a = 0; a <args.length; a++) {
            let data = $(args[a], ownerDocument);
            const headerInfo = dexPageParser.getInfoFromDexPageHeader(data);
            list[headerInfo.name] = headerInfo.base_name;
        }
        return list;
    }

    /* egg_pngs = {
       'Rattata' : '... .png',
       'Rattata [Alolan Forme]' : '... .png'
       }
    */
    static parseEggsPngsList($, ownerDocument, dexPageParser, args) {
        const list = {};
        for(let a = 0; a <args.length; a++) {
            let data = $(args[a], ownerDocument);
            const headerInfo = dexPageParser.getInfoFromDexPageHeader(data);
            const name = headerInfo.name;
            const eggUrl = dexPageParser.parseEggPngFromDexPage(data);

            if(eggUrl) {
                list[name] = eggUrl;
            }
        }
        return list;
    }

    /* types = {
       'Rattata' : [Normal],
       'Raticate' : [Normal],
       'Rattata [Alolan Forme]' : [Normal, Dark],
       'Raticate [Alolan Forme]' : [Normal, Dark]
       }
    */
    static parseTypesList($, ownerDocument, dexPageParser, globals, args) {
        const list = {};
        for(let a = 0; a < args.length; a++) {
            let data = $(args[a], ownerDocument);
            const headerInfo = dexPageParser.getInfoFromDexPageHeader(data);
            const name = headerInfo.name;
            const types = dexPageParser.parseTypesFromDexPage(data, globals.TYPE_LIST);

            list[name] = types;
        }
        return list;
    }

    static buildRegionalFormsMap(formMap) {
        const regionalFormData = {};

        const REGIONAL_NAME_MARKERS = ['Kantonian',
            'Johtoian', // unused
            'Hoennian', // unused
            'Sinnohian', // unused
            'Unovan',
            'Kalosian', // unused
            'Alolan',
            'Galarian'];

        const allSpecies = Object.keys(formMap);
        let checkedSpecies = {};
        for(let i = 0; i < allSpecies.length; i++) {
            let current = allSpecies[i];
            let base = (current.indexOf('[') > -1) ? current.substring(0, current.indexOf('[')).trim() : current;
            if(!Object.prototype.hasOwnProperty.call(checkedSpecies, base)) {
                checkedSpecies[base] = true;

                let formNames = formMap[base].map((e) => e.name);

                // if any of the names have one of the regional markers,
                // add the regional names to the list
                let formWithMarkers = formNames.filter((n) => {
                    return REGIONAL_NAME_MARKERS.filter((r) => n.indexOf(`${r}`) > -1).length > 0;
                });

                // filter out megas/totems
                // these are filtered out this way to allow for Galarian Zen Mode Darmanitan
                formWithMarkers = formWithMarkers.filter((n) => n.indexOf('Mega Forme') == -1);
                formWithMarkers = formWithMarkers.filter((n) => n.indexOf('Totem Forme') == -1);

                if(formWithMarkers && formWithMarkers.length) {
                    (regionalFormData[base] = regionalFormData[base] || []).push(base);
                    regionalFormData[base] = regionalFormData[base].concat(formWithMarkers);
                }
            }
        }

        return regionalFormData;
    }

    /* egg_pngs_types_map = {
       'Rattata' : {
             <kantonian.png> : [Normal],
             <alolan.png> : [Normal, Dark],
          }
       }
    */
    static buildEggPngsTypesMap(baseNamesList, eggPngsList, typesList) {
        const map = {};
        for(let name in eggPngsList) {
            const base = baseNamesList[name];
            const png = eggPngsList[name];
            const types = typesList[name];
            (map[base] = map[base] || {})[png] = types;
        }

        return map;
    }

} // DexUtilities

if (module) {
    module.exports.DexUtilities = DexUtilities;
}
/* This class handles creating, removing, and handling the DOM object actions 
 * for the QoL Hub.
 */

// eslint-disable-next-line no-unused-vars
class QoLHub {
    static build($, document, templates, globals, settings, settingsChange) {
        $('body', document).append(templates.qolHubHTML);
        $('#core', document).addClass('scrolllock');
        let qolHubCssBackgroundHead = $('.qolHubHead.qolHubSuperHead', document).css('background-color');
        let qolHubCssTextColorHead = $('.qolHubHead.qolHubSuperHead', document).css('color');
        let qolHubCssBackground = $('.qolHubTable', document).css('background-color');
        let qolHubCssTextColor = $('.qolHubTable', document).css('color');
        $('.qolHubHead', document).css({ 'backgroundColor': '' + qolHubCssBackgroundHead + '', 'color': '' + qolHubCssTextColorHead + '' });
        $('.qolChangeLogHead', document).css({ 'backgroundColor': '' + qolHubCssBackgroundHead + '', 'color': '' + qolHubCssTextColorHead + '' });
        $('.qolopencloselist.qolChangeLogContent', document).css({ 'backgroundColor': '' + qolHubCssBackground + '', 'color': '' + qolHubCssTextColor + '' });
        $('.qolDate', document).text(globals.DEX_UPDATE_DATE);

        let customCss = settings.customCss;

        $('.textareahub', document).append('<textarea id="qolcustomcss" rows="15" cols="60" class="qolsetting" data-key="customCss"/></textarea>');
        if (customCss === '') {
            $('.textareahub textarea', document).val('#thisisanexample {\n    color: yellow;\n}\n\n.thisisalsoanexample {\n    background-color: blue!important;\n}\n\nhappycssing {\n    display: absolute;\n}');
        } else {
            $('.textareahub textarea', document).val(customCss);
        }

        $('#qolcustomcss', document).on('keydown', function (e) {
            if (e.keyCode == 9 || e.which == 9) {
                e.preventDefault();
                var s = this.selectionStart;
                $(this).val(function (i, v) {
                    return v.substring(0, s) + '\t' + v.substring(this.selectionEnd);
                });
                this.selectionEnd = s + 1;
            }
        });

        $(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
        }));

        $(document).on('click', '.closeHub', (function () { //close QoL hub
            QoLHub.close($, document);
        }));
    }

    static close($, document) {
        $('.dialog', document).remove();
        $('#core', document).removeClass('scrolllock');
    }

    static handleUpdateDexClick($, document, dexUtilities, localStorageManager, dexPageParser, evolutionTreeParser, globals) {
        // Manually update GLOBALS.DEX_DATA
        localStorageManager.loadDexIntoGlobalsFromWeb($, document, dexUtilities, globals);

        // globals.DEX_DATA will contain the latest info as is read from local storage
        // this handler updates the local storage
        const progressSpan = $('span.qolDexUpdateProgress', document)[0];
        progressSpan.textContent = 'Loading...';

        let date = (new Date()).toUTCString();
        globals.DEX_UPDATE_DATE = date;
        $('.qolDate', document).text(globals.DEX_UPDATE_DATE);
        localStorageManager.updateLocalStorageDex($, document, date, globals);

        // this will update the globals.EVOLVE_BY_LEVEL_LIST
        // and local storage
        const virtualDocument = document.implementation.createHTMLDocument('virtual');
        dexUtilities.getMainDexPage($).done((data) => {
            let html = $.parseHTML(data);
            let dex = $(html[html.length - 1], virtualDocument).find('#dexdata').html();
            const dexNumbers = localStorageManager.parseAndStoreDexNumbers(dex);

            if (dexNumbers.length > 0) {
                // update the progress bar in the hub
                const limit = dexNumbers.length;
                const progressBar = $('progress.qolDexUpdateProgress', document)[0];
                progressBar['max'] = limit;
                dexUtilities.loadDexPages($, dexNumbers, progressBar, progressSpan).done((...data) => {
                    const dexPagesHTML = data.map(d => (Array.isArray(d) ? d[0] : d));
                    dexUtilities.loadFormPages($, virtualDocument, dexPagesHTML, progressBar, progressSpan).done((...data) => {
                        const formPagesHTML = data.map(d => (Array.isArray(d) ? d[0] : d));

                        // Combine the arrays of HTML into one array
                        let allPagesHTML = dexPagesHTML.concat(formPagesHTML);

                        // Parse evolution data
                        const [parsedFamilies, dexIDs] = dexUtilities.parseEvolutionTrees($, virtualDocument, dexPageParser, evolutionTreeParser, allPagesHTML);
                        
                        // Parse form data
                        const [formData, formMap] = dexUtilities.parseFormData($, virtualDocument, dexPageParser, allPagesHTML);
                        
                        // Build evolution tree depths
                        const evolutionTreeDepthList = dexUtilities.buildEvolutionTreeDepthsList(parsedFamilies, dexIDs, formData, formMap);

                        // Collect regional form data
                        const regionalFormMap = dexUtilities.buildRegionalFormsMap(formMap);

                        // Collect list of base names to make it easier down the line
                        const baseNames = dexUtilities.parseBaseNames($, virtualDocument, dexPageParser, allPagesHTML);
                        // Collect list of egg pngs
                        const eggPngs = dexUtilities.parseEggsPngsList($, virtualDocument, dexPageParser, allPagesHTML);
                        // Collect list of types
                        const types = dexUtilities.parseTypesList($, virtualDocument, dexPageParser, globals, allPagesHTML);
                        const eggPngsTypeMap = dexUtilities.buildEggPngsTypesMap(baseNames, eggPngs, types);

                        localStorageManager.saveEvolveByLevelList(globals, parsedFamilies, dexIDs);
                        localStorageManager.saveEvolutionTreeDepths(globals, evolutionTreeDepthList);
                        localStorageManager.saveRegionalFormsList(globals, parsedFamilies, dexIDs, regionalFormMap);
                        localStorageManager.saveEggTypesMap(globals, eggPngsTypeMap);
                        progressSpan.textContent = 'Complete!';
                    }).fail((error) => {
                        console.log(error);
                    }); // loadFormPages
                }).fail((error) => {
                    console.log(error);
                }); // loadDexData
            } // if dexNumbers.length > 0
            else {
                progressSpan.textContent = 'Complete!';
            }
        }).fail((error) => {
            console.log(error);
        });// getMainDexPage
    } // handleUpdateDexClick
} // QoLHub

if (module) {
    module.exports.QoLHub = QoLHub;
}
/* global Helpers */
// eslint-disable-next-line no-unused-vars
class Page {
    constructor(jQuery, ssk, ds, url) {
        this.jQuery = jQuery;
        this.settingsSaveKey = ssk;
        this.defaultSettings = ds;
        this.url = url;
        this.settings = this.defaultSettings;
    }

    onPage(w) {
        return w.location.href.indexOf(this.url) != -1;
    }

    loadSettings() {
        this.settings =
            Helpers.loadSettings(this.jQuery,this.settingsSaveKey,
                this.defaultSettings,
                this.settings);
    }

    saveSettings() {
        Helpers.saveSettings(this.settingsSaveKey, this.settings);
    }

    populateSettings(obj) {
        if(obj === undefined) {
            obj = this.settings;
        }
        for (let key in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                continue;
            }
            let value = obj[key];
            if (typeof value === 'object') {
                this.populateSettings(obj[key]);
            }
            else if (typeof value === 'boolean') {
                Helpers.toggleSetting(key, value);//, false);
            }
            else if (typeof value === 'string') {
                console.log('TODO - split and populate');
                // Helpers.toggleSetting(key, value, false);
            }
        }
    }

    resetSettings() {
        this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
        this.saveSettings();
    }

    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if (JSON.stringify(this.settings).indexOf(element) >= 0) {
            if (typeof this.settings[element] === 'boolean') {
                this.settings[element] = !this.settings[element];
            }
            else if (typeof this.settings[element] === 'string') {
                if (arrayName !== undefined && arrayName !== '') {
                    if (textElement === 'none') {
                        let tempIndex = typeClass - 1;
                        this[arrayName].splice(tempIndex, tempIndex);
                        this.settings[element] = this[arrayName].toString();
                    } else {
                        let tempIndex = -1;
                        if(typeClass !== undefined) {
                            tempIndex = typeClass - 1; // select array
                        } else if(customClass !== undefined) {
                            tempIndex = customClass - 1; // textfield array
                        }
                        this[arrayName][tempIndex] = textElement;
                        this.settings[element] = this[arrayName].toString();
                    }
                }
                else {
                    this.settings[element] = textElement;
                }
            }
            return true;
        }
        else { return false; }
    }

    setupHTML() { /* empty */ }
    setupCSS() { /* empty */ }
    setupObserver() { /* empty */ }
    setupHandlers() { /* empty */ }
} // Page
/* globals Page Helpers */
const ShelterBase = Page;

// eslint-disable-next-line no-unused-vars
class ShelterPage extends ShelterBase {
    constructor(jQuery, GLOBALS) {
        super(jQuery, 'QoLShelter', {
            findCustom: '',
            findType: '',
            findTypeEgg: true,
            findTypePokemon: false,
            findNewEgg: true,
            findNewPokemon: true,
            findShiny: true,
            findAlbino: true,
            findMelanistic: true,
            findPrehistoric: true,
            findDelta: true,
            findMega: true,
            findStarter: true,
            findCustomSprite: true,
            findLegendary: false,
            findReadyToEvolve: false,
            findMale: true,
            findFemale: true,
            findNoGender: true,
            findNFE: false,
            customEgg: true,
            customPokemon: true,
            customPng: false,
            shelterGrid: true,
        }, '/shelter');
        this.customArray = [];
        this.typeArray = [];
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function (mutation) {
                obj.customSearch(GLOBALS);
            });
        });

        // when the page is loaded, check to see if the data needed for finding eggs by type is loaded (if it's needed)
        if (this.onPage(window) &&
            this.settings.findTypeEgg &&
            !(GLOBALS.EGGS_PNG_TO_TYPES_LIST || JSON.parse(localStorage.getItem('QoLEggTypesMap')))) {
            window.alert('Message from QoL script:\nUnable to load list of pokemon eggs and their types, ' +
                'which is used to distinguish eggs with the same name but different types (Vulpix and ' +
                'Alolan Vulpix).\n\nCan still find eggs by type, but there may be mistakes. ' +
                'Please clear and reload your pokedex data by clicking the "Clear Cached Dex" ' +
                'and then clicking the "Update Pokedex" button in the QoL Hub to load list of eggs and types.');
        }

        // used to keep track of the currently selected match
        // matches can be selected via a shortcut key, specified via this.selectNextMatchKey
        this.selectNextMatchKey = 78; // 'n'
        this.currentlySelectedMatch = undefined;
    }

    setupHTML(GLOBALS) {
        this.jQuery('.tabbed_interface.horizontal>div').removeClass('tab-active');
        this.jQuery('.tabbed_interface.horizontal>ul>li').removeClass('tab-active');
        document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class="tab-active"><label>Search</label></li>');
        document.querySelector('.tabbed_interface.horizontal>ul>li').insertAdjacentHTML('afterend', '<li class=""><label>Sort</label></li>');
        document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.shelterOptionsHTML);
        document.querySelector('#shelteroptionsqol').insertAdjacentHTML('afterend', '<div id="qolsheltersort"><label><input type="checkbox" class="qolsetting" data-key="shelterGrid"/><span>Sort by Grid</span></label>');
        this.jQuery('#shelteroptionsqol').addClass('tab-active');

        document.querySelector('#sheltercommands').insertAdjacentHTML('beforebegin', '<div id="sheltersuccess"></div>');

        const theField = Helpers.textSearchDiv('numberDiv', 'findCustom', 'removeShelterTextfield', 'customArray');
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findType', GLOBALS.TYPE_OPTIONS,
            'removeShelterTypeList', 'fieldTypes', 'typeArray');

        this.customArray = this.settings.findCustom.split(',');
        this.typeArray = this.settings.findType.split(',');

        Helpers.setupFieldArrayHTML(this.jQuery, this.customArray, 'searchkeys', theField, 'numberDiv');
        Helpers.setupFieldArrayHTML(this.jQuery, this.typeArray, 'shelterTypes', theType, 'typeNumber');

        this.jQuery('[data-shelter=reload]').addClass('customSearchOnClick');
        this.jQuery('[data-shelter=whiteflute]').addClass('customSearchOnClick');
        this.jQuery('[data-shelter=blackflute]').addClass('customSearchOnClick');
    }
    setupCSS() {
        let shelterSuccessCss = this.jQuery('#sheltercommands').css('background-color');
        this.jQuery('#sheltersuccess').css('background-color', shelterSuccessCss);
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#shelterarea'), {
            childList: true,
        });
    }
    setupHandlers(GLOBALS) {
        const obj = this;
        this.jQuery(document).on('change', '#shelteroptionsqol input', (function () { //shelter search
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        this.jQuery(document).on('change', '.qolsetting', (function () {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        this.jQuery(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                obj.jQuery(this).val(),
                obj.jQuery(this).parent().parent().attr('class'),
                obj.jQuery(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        this.jQuery('.customSearchOnClick').on('click', (function () {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        this.jQuery(document).on('click', '#addShelterTextfield', (function () { //add shelter text field
            obj.addTextField();
            obj.saveSettings();
        }));

        this.jQuery(document).on('click', '#removeShelterTextfield', (function () { //remove shelter text field
            obj.removeTextField(this, obj.jQuery(this).parent().find('input').val());
            obj.saveSettings();
            obj.customSearch(GLOBALS);
        }));

        this.jQuery(document).on('click', '#addShelterTypeList', (function () { //add shelter type list
            obj.addTypeList(GLOBALS);
            obj.customSearch(GLOBALS);
        }));

        this.jQuery(document).on('click', '#removeShelterTypeList', (function () { //remove shelter type list
            obj.removeTypeList(this, obj.jQuery(this).parent().find('select').val());
            obj.saveSettings();
            obj.customSearch(GLOBALS);
        }));

        this.jQuery(window).on('keyup.qol_shelter_shortcuts', function (a) {
            if (0 == obj.jQuery(a.target).closest('input, textarea').length) {
                switch (a.keyCode) {
                case obj.selectNextMatchKey:
                    var numMatches = obj.jQuery('#shelterarea').find('.pokemon').find('.shelterfoundme').length;

                    // remove all existing locks
                    obj.jQuery('#shelterarea').find('.pokemon').removeClass('lock').removeClass('dismiss');

                    // default is undefined, so set the value to either 0 or 1+current
                    obj.currentlySelectedMatch = (obj.currentlySelectedMatch + 1) || 0;

                    if (numMatches) {
                        let modIndex = (numMatches == 1) ? 0 : (obj.currentlySelectedMatch + 1) % numMatches - 1;
                        let selected = obj.jQuery('#shelterarea').find('.pokemon').find('.shelterfoundme').parent().eq(modIndex);
                        // these steps mimic clicking on the pokemon/egg
                        selected.parent().addClass('selected');
                        selected.addClass('tooltip_trigger').addClass('lock').removeClass('dismiss');
                        selected.next().find('[data-shelter=adopt]').focus();
                    } else {
                        obj.currentlySelectedMatch = undefined;
                    }
                }
            }
        });
    }
    addTextField() {
        const theField = Helpers.textSearchDiv('numberDiv', 'findCustom', 'removeShelterTextfield', 'customArray');
        let numberDiv = this.jQuery('#searchkeys>div').length;
        this.jQuery('#searchkeys').append(theField);
        this.jQuery('.numberDiv').removeClass('numberDiv').addClass('' + numberDiv + '');
    }
    removeTextField(byebye, key) {
        this.customArray = this.jQuery.grep(this.customArray, function (value) { //when textfield is removed, the value will be deleted from the localstorage
            return value != key;
        });
        this.settings.findCustom = this.customArray.toString();

        this.jQuery(byebye).parent().remove();

        let i;
        for (i = 0; i < this.jQuery('#searchkeys>div').length; i++) {
            let rightDiv = i + 1;
            this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    addTypeList(GLOBALS) {
        const theList = Helpers.selectSearchDiv('typeNumber', 'types', 'findType', GLOBALS.TYPE_OPTIONS,
            'removeShelterTypeList', 'fieldTypes', 'typeArray');
        let numberTypes = this.jQuery('#shelterTypes>div').length;
        this.jQuery('#shelterTypes').append(theList);
        this.jQuery('.typeNumber').removeClass('typeNumber').addClass('' + numberTypes + '');
    }
    removeTypeList(byebye, key) {
        this.typeArray = this.jQuery.grep(this.typeArray, function (value) {
            return value != key;
        });
        this.settings.findType = this.typeArray.toString();

        this.jQuery(byebye).parent().remove();

        let i;
        for (i = 0; i < this.jQuery('#shelterTypes>div').length; i++) {
            let rightDiv = i + 1;
            this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    insertShelterFoundDiv(number, name, img) {
        document.querySelector('#sheltersuccess').
            insertAdjacentHTML('beforeend',
                '<div id="shelterfound">' + name + ((number !== 1) ? 's' : '') + ' found ' + img + '</div>');
    }
    insertShelterTypeFoundDiv(number, type, stage, names) {
        let stageNoun = '';
        if (stage === 'egg') {
            stageNoun = stage + (number !== 1 ? 's' : '');
        } else { // i.e. stage === 'Pokemon'
            stageNoun = stage;
        }
        document.querySelector('#sheltersuccess').
            insertAdjacentHTML('beforeend',
                '<div id="shelterfound">' + number + ' ' + type + ' type ' +
                stageNoun + ' found!' + (names.length > 0 ? '(' + names.toString() + ')' : '') + '</div>');
    }

    searchForImgTitle(GLOBALS, key) {
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        const value = SEARCH_DATA[keyIndex + 1];
        const selected = this.jQuery('img[title*="' + value + '"]');
        if (selected.length) {
            let searchResult = SEARCH_DATA[keyIndex + 2]; //type of Pokémon found
            let imgResult = selected.length + ' ' + searchResult; //amount + type found
            let imgFitResult = SEARCH_DATA[keyIndex + 3]; //image for type of Pokémon
            let shelterBigImg = selected.parent().prev().children('img.big');
            this.jQuery(shelterBigImg).addClass('shelterfoundme');

            this.insertShelterFoundDiv(selected.length, imgResult, imgFitResult);
        }
    }

    searchForTooltipText(GLOBALS, key) {
        const LIST = GLOBALS.SHELTER_SEARCH_LISTS[key];
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        for (let i = 0; i < LIST.length; i++) {
            const entry = LIST[i];
            const selected = this.jQuery(`div.pokemon+div.tooltip_content:contains('${entry}')`);
            if (selected.length) {
                const searchResult = SEARCH_DATA[keyIndex + 2]; //type of Pokémon found
                const imgResult = selected.length + ' ' + searchResult; //amount + type found
                const imgFitResult = SEARCH_DATA[keyIndex + 3]; //image for type of Pokémon
                const shelterBigImg = selected.prev().children('img.big');
                shelterBigImg.addClass('shelterfoundme');

                this.insertShelterFoundDiv(selected.length, imgResult, imgFitResult);
            }
        }
    }

    searchForReadyToEvolveByLevel(GLOBALS) {
        const obj = this;
        let selected = this.jQuery('#shelterarea .tooltip_content');
        let readyBigImg = [];
        selected.each((idx, s) => {
            let text = s.textContent.split(' ');
            let name = text[0];
            let level = parseInt(text[1].substring(4));

            // get level that pokemon needs to be at to evolve
            let evolveLevel = undefined;
            if (GLOBALS.EVOLVE_BY_LEVEL_LIST[name] !== undefined) {
                evolveLevel = parseInt(GLOBALS.EVOLVE_BY_LEVEL_LIST[name].split(' ')[1]);
            }

            if (evolveLevel !== undefined && level >= evolveLevel) {
                let shelterBigImg = obj.jQuery(s).prev().children('img.big');
                readyBigImg.push(shelterBigImg);
            }
        });

        for (let i = 0; i < readyBigImg.length; i++) {
            this.jQuery(readyBigImg[i]).addClass('shelterfoundme');
        }

        let imgResult = readyBigImg.length + ' ' + 'ready to evolve';
        this.insertShelterFoundDiv(readyBigImg.length, imgResult, '');

    }

    highlightByHowFullyEvolved(GLOBALS, pokemonElem) {
        // if a pokemon is clicked-and-dragged, the tooltip element after the pokemon
        // will not exist. If this occurs. don't try highlighting anything until the
        // pokemon is "put down"
        if (!this.jQuery(pokemonElem).next().length) { return; }

        const tooltipElem = this.jQuery(pokemonElem).next()[0];
        const tooltip = {
            species: tooltipElem.textContent.split(' ')[0],
            forme: ''
        };
        let pokemon = tooltip['species'];

        if (GLOBALS.EVOLUTIONS_LEFT !== undefined && GLOBALS.EVOLUTIONS_LEFT !== null) {
            const evolutionData = GLOBALS.EVOLUTIONS_LEFT;
            // if can't find the pokemon directly, try looking for its form data
            if (!evolutionData[pokemon]) {
                if (tooltip['forme']) {
                    pokemon = pokemon + ' [' + tooltip['forme'] + ']';
                }
            }
            if (!evolutionData[pokemon]) {
                // Do not log error here. Repeated errors can (will) slow down the page
                // console.error(`Private Fields Page - Could not find evolution data for ${pokemon}`);
            } else {
                const evolutionsLeft = evolutionData[pokemon].remaining;

                if (evolutionsLeft === 1) {
                    this.jQuery(pokemonElem).children('img.big').addClass('oneevolutionleft');
                } else if (evolutionsLeft === 2) {
                    this.jQuery(pokemonElem).children('img.big').addClass('twoevolutionleft');
                }
            }
        } else {
            console.error('Unable to load evolution data. In QoL Hub, please clear cached dex and reload dex data');
        }
    }

    customSearch(GLOBALS) {
        const obj = this;
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;

        let dexData = GLOBALS.DEX_DATA;
        // search whatever you want to find in the shelter & grid

        //sort in grid
        this.jQuery('#shelterarea').removeClass('qolshelterareagrid');
        this.jQuery('.mq2 #shelterarea').removeClass('qolshelterareagridmq2');
        this.jQuery('#shelterarea .tooltip_content').removeClass('qoltooltipgrid');
        this.jQuery('#shelterpage #shelter #shelterarea > .pokemon').removeClass('qolpokemongrid');
        this.jQuery('#sheltergridthingy').remove();

        if (this.settings.shelterGrid === true) { //shelter grid
            this.jQuery('#shelterarea').addClass('qolshelterareagrid');
            this.jQuery('.mq2 #shelterarea').addClass('qolshelterareagridmq2');
            this.jQuery('#shelterarea .tooltip_content').addClass('qoltooltipgrid');
            this.jQuery('#shelterpage #shelter #shelterarea > .pokemon').addClass('qolpokemongrid');
            // this.jQuery('#shelterpage #shelter #shelterarea:before').css({'display' : 'none!important'});
            // this.jQuery('<pseudo:before>').attr('style', 'display: none!important');
            this.jQuery('head').append('<style id="sheltergridthingy">#shelterarea:before{display:none !important;}</style>');
        }

        //search values depending on settings
        //emptying the sheltersuccess div to avoid duplicates
        document.querySelector('#sheltersuccess').innerHTML = '';
        this.jQuery('#shelterarea>div>img').removeClass('shelterfoundme');

        if (this.settings.findShiny === true) {
            this.searchForImgTitle(GLOBALS, 'findShiny');
        }
        if (this.settings.findAlbino === true) {
            this.searchForImgTitle(GLOBALS, 'findAlbino');
        }
        if (this.settings.findMelanistic === true) {
            this.searchForImgTitle(GLOBALS, 'findMelanistic');
        }
        if (this.settings.findPrehistoric === true) {
            this.searchForImgTitle(GLOBALS, 'findPrehistoric');
        }
        if (this.settings.findDelta === true) {
            this.searchForImgTitle(GLOBALS, 'findDelta');
        }
        if (this.settings.findMega === true) {
            this.searchForImgTitle(GLOBALS, 'findMega');
        }
        if (this.settings.findStarter === true) {
            this.searchForImgTitle(GLOBALS, 'findStarter');
        }
        if (this.settings.findCustomSprite === true) {
            this.searchForImgTitle(GLOBALS, 'findCustomSprite');
        }
        if (this.settings.findLegendary === true) {
            this.searchForTooltipText(GLOBALS, 'findLegendary');
        }
        if (this.settings.findNFE === true) {
            this.jQuery('#shelterarea>[data-stage=pokemon]').each(function () {
                obj.highlightByHowFullyEvolved(GLOBALS, this);
            });
        } else {
            this.jQuery('.oneevolutionleft').each((k, v) => {
                obj.jQuery(v).removeClass('oneevolutionleft');
            });
            this.jQuery('.twoevolutionleft').each((k, v) => {
                obj.jQuery(v).removeClass('twoevolutionleft');
            });
        }

        if (this.settings.findNewPokemon === true) {
            let key = 'findNewPokemon';
            let value = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 1];
            let selected = this.jQuery('#shelterarea .tooltip_content:contains(' + value + ')');
            if (selected.length) {
                let searchResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 2];
                let imgFitResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 3];
                let tooltipResult = selected.length + ' ' + searchResult;
                let shelterImgSearch = selected;
                let shelterBigImg = shelterImgSearch.prev().children('img.big');
                this.jQuery(shelterBigImg).addClass('shelterfoundme');

                this.insertShelterFoundDiv(selected.length, tooltipResult, imgFitResult);
            }
        }

        if (this.settings.findNewEgg === true) {
            let key = 'findNewEgg';
            let value = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 1];
            let selected = this.jQuery('#shelterarea .tooltip_content:contains(' + value + ')').filter(function () {
                // .text() will include the text in the View/Adopt and Hide buttons, so there will be a space
                return obj.jQuery(this).text().startsWith(value + ' ');
            });

            if (selected.length) {
                let searchResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 2];
                let imgFitResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 3];
                if (selected.length >= 1) {
                    let shelterImgSearch = selected;
                    let shelterBigImg = shelterImgSearch.prev().children('img.big');
                    this.jQuery(shelterBigImg).addClass('shelterfoundme');
                }
                this.insertShelterFoundDiv(selected.length, searchResult, imgFitResult);
            }
        }

        if (this.settings.findReadyToEvolve === true) {
            if (GLOBALS.EVOLVE_BY_LEVEL_LIST === null) {
                window.alert('Unable to load list of pokemon that can evolve by level. Please try updating dex ' +
                    'by clicking "Update Pokedex" in the QoL Hub. If the problem persists, please post in the thread.\n\n' +
                    'Disabling this function until the checkbox is clicked again');
                this.settings.findReadyToEvolve = false;
                // uncheck checkbox
                this.jQuery('[data-key=findReadyToEvolve]')[0].checked = false;
            } else {
                this.searchForReadyToEvolveByLevel(GLOBALS);
            }
        }

        //loop to find all search genders for the custom
        const shelterValueArrayCustom = [];
        for (let key in this.settings) {
            let value = this.settings[key];
            if (value === true) {
                if (key === 'findMale' || key === 'findFemale' || key === 'findNoGender') {
                    let searchKey = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(key) + 1];
                    shelterValueArrayCustom.push(searchKey);
                }
            }
        }

        //loop to find all the custom search parameters
        let customSearchAmount = this.customArray.length;
        const heartPng = '<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952">';
        const eggPng = '<img src="//pfq-static.com/img/pkmn/egg.png/t=1451852195">';
        for (let i = 0; i < customSearchAmount; i++) {
            let customValue = this.customArray[i];
            if (customValue != '') {
                //custom pokemon search
                if (this.settings.customPokemon === true) {
                    let genderMatches = [];
                    if (shelterValueArrayCustom.indexOf('[M]') > -1) {
                        genderMatches.push('[M]');
                    }
                    if (shelterValueArrayCustom.indexOf('[F]') > -1) {
                        genderMatches.push('[F]');
                    }
                    if (shelterValueArrayCustom.indexOf('[N]') > -1) {
                        genderMatches.push('[N]');
                    }

                    if (genderMatches.length > 0) {
                        for (let i = 0; i < genderMatches.length; i++) {
                            let genderMatch = genderMatches[i];
                            let selected = this.jQuery('#shelterarea .tooltip_content:containsIN(' + customValue + ') img[title*=\'' + genderMatch + '\']');
                            if (selected.length) {
                                let searchResult = customValue;
                                let genderName = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(genderMatch) + 1];
                                let imgGender = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(genderMatch) + 2];
                                let tooltipResult = selected.length + ' ' + genderName + imgGender + ' ' + searchResult;
                                let shelterImgSearch = selected;
                                let shelterBigImg = shelterImgSearch.parent().prev().children('img.big');
                                this.jQuery(shelterBigImg).addClass('shelterfoundme');

                                this.insertShelterFoundDiv(selected.length, tooltipResult, heartPng);
                            }
                        }
                    }

                    //No genders
                    else if (shelterValueArrayCustom.length === 0) {
                        let selected = this.jQuery('#shelterarea .tooltip_content:containsIN(' + customValue + '):not(:containsIN("Egg"))');
                        if (selected.length) {
                            let searchResult = customValue;
                            let tooltipResult = selected.length + ' ' + searchResult;
                            let shelterImgSearch = selected;
                            let shelterBigImg = shelterImgSearch.parent().prev().children('img.big');
                            this.jQuery(shelterBigImg).addClass('shelterfoundme');
                            this.insertShelterFoundDiv(selected.length, tooltipResult, heartPng);
                        }
                    }
                }

                //custom egg
                if (this.settings.customEgg === true) {
                    let selected = this.jQuery('#shelterarea .tooltip_content:containsIN(' + customValue + '):contains("Egg")');
                    if (selected.length) {
                        let searchResult = customValue;
                        let tooltipResult = selected.length + ' ' + searchResult;
                        let shelterImgSearch = selected;
                        let shelterBigImg = shelterImgSearch.prev().children('img.big');
                        this.jQuery(shelterBigImg).addClass('shelterfoundme');
                        this.insertShelterFoundDiv(selected.length, tooltipResult, eggPng);
                    }
                }

                //imgSearch with Pokémon
                if (this.settings.customPng === true) {
                    let selected = this.jQuery('#shelterarea img.big[src*="' + customValue + '"]');
                    if (selected.length) {
                        let searchResult = selected.parent().next().text().split('(')[0];
                        let tooltipResult = selected.length + ' ' + searchResult + ' (Custom img search)';
                        let shelterImgSearch = selected;
                        this.jQuery(shelterImgSearch).addClass('shelterfoundme');
                        this.insertShelterFoundDiv(selected.length, tooltipResult, heartPng);
                    }
                }
            }
        }

        //loop to find all the types

        const filteredTypeArray = this.typeArray.filter(v => v != '');

        if (filteredTypeArray.length > 0) {
            const eggPngsToTypes = GLOBALS.EGGS_PNG_TO_TYPES_LIST ||
                JSON.parse(localStorage.getItem('QoLEggTypesMap')) || undefined;
            for (let i = 0; i < filteredTypeArray.length; i++) {
                let value = filteredTypeArray[i];
                let foundType = GLOBALS.SHELTER_TYPE_TABLE[GLOBALS.SHELTER_TYPE_TABLE.indexOf(value) + 2];

                let typePokemonNames = [];
                let selected = undefined;
                if (this.settings.findTypeEgg === true) {
                    let pokemonElems = [];
                    typePokemonNames = [];
                    selected = this.jQuery('#shelterarea>.tooltip_content:contains("Egg")');
                    selected.each(function () {
                        let searchPokemon = (obj.jQuery(this).text().split(' ')[0]);
                        let searchTypeOne = '';
                        let searchTypeTwo = '';
                        if (eggPngsToTypes) {
                            let imgUrl = obj.jQuery(obj.jQuery(this).prev().find('img')[0]).attr('src').replace('https://pfq-static.com/img/', '');
                            searchTypeOne = eggPngsToTypes[searchPokemon] &&
                                eggPngsToTypes[searchPokemon][imgUrl] &&
                                ('' + eggPngsToTypes[searchPokemon][imgUrl][0]);
                            searchTypeTwo = eggPngsToTypes[searchPokemon] &&
                                eggPngsToTypes[searchPokemon][imgUrl] &&
                                ('' + (eggPngsToTypes[searchPokemon][imgUrl][1] || -1));
                        } else {
                            let searchPokemonIndex = dexData.indexOf('"' + searchPokemon + '"');
                            searchTypeOne = dexData[searchPokemonIndex + 1];
                            searchTypeTwo = dexData[searchPokemonIndex + 2];
                        }
                        if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                            typePokemonNames.push(searchPokemon);
                            pokemonElems.push(this);
                        }
                    });

                    for (let o = 0; o < pokemonElems.length; o++) {
                        let shelterImgSearch = this.jQuery(pokemonElems[o]);
                        let shelterBigImg = shelterImgSearch.prev().children('img.big');
                        this.jQuery(shelterBigImg).addClass('shelterfoundme');
                    }

                    this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'egg', typePokemonNames);
                }

                if (this.settings.findTypePokemon === true) {
                    typePokemonNames = [];
                    selected = this.jQuery('#shelterarea>.tooltip_content').not(':contains("Egg")');
                    selected.each(function () {
                        let searchPokemon = (obj.jQuery(this).text().split(' ')[0]);
                        let searchPokemonIndex = dexData.indexOf('"' + searchPokemon + '"');
                        let searchTypeOne = dexData[searchPokemonIndex + 1];
                        let searchTypeTwo = dexData[searchPokemonIndex + 2];
                        if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                            typePokemonNames.push(searchPokemon);
                        }
                    });

                    for (let o = 0; o < typePokemonNames.length; o++) {
                        let shelterImgSearch = this.jQuery('#shelterarea .tooltip_content:containsIN(\'' + typePokemonNames[o] + ' (\')');
                        let shelterBigImg = shelterImgSearch.prev().children('img.big');
                        this.jQuery(shelterBigImg).addClass('shelterfoundme');
                    }

                    this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'Pokemon', typePokemonNames);
                }
            }
        } // filteredTypeArray
    } // customSearch
}

/* globals Page Helpers */
const PrivateFieldsBase = Page;

// eslint-disable-next-line no-unused-vars
class PrivateFieldsPage extends PrivateFieldsBase {
    constructor(jQuery, GLOBALS) {
        super(jQuery, 'QoLPrivateFields', {
            fieldCustom: '',
            fieldType: '',
            fieldNature: '',
            fieldEggGroup: '',
            fieldNewPokemon: true,
            fieldShiny: true,
            fieldAlbino: true,
            fieldMelanistic: true,
            fieldPrehistoric: true,
            fieldDelta: true,
            fieldMega: true,
            fieldStarter: true,
            fieldCustomSprite: true,
            fieldMale: true,
            fieldFemale: true,
            fieldNoGender: true,
            fieldItem: true,
            fieldNFE: false,
            customItem: true, // unused
            customEgg: true,
            customPokemon: true,
            customPng: false,
            releaseSelectAll: true,
            /* tooltip settings */
            tooltipEnableMods: false,
            tooltipNoBerry: false,
            tooltipBerry: false,
        }, 'fields');
        this.customArray = [];
        this.typeArray = [];
        this.natureArray = [];
        this.eggGroupArray = [];
        const obj = this;
        this.observer = new MutationObserver((mutations) => {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach((mutation) => {
                obj.customSearch(GLOBALS);
                obj.handleTooltipSettings();
            });
        });
    }

    onPage(w) {
        return w.location.href.indexOf('fields') != -1 &&
            w.location.href.indexOf('fields/') == -1;
    }

    setupHTML(GLOBALS) {
        document.querySelector('#field_field').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.privateFieldTooltipModHTML);
        document.querySelector('#field_field').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.privateFieldSearchHTML);

        const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS,
            'removePrivateFieldTypeSearch', 'fieldTypes', 'typeArray');
        const theNature = Helpers.selectSearchDiv('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS,
            'removePrivateFieldNature', 'natureTypes', 'natureArray');
        const theEggGroup = Helpers.selectSearchDiv('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS,
            'removePrivateFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
        this.customArray = this.settings.fieldCustom.split(',');
        this.typeArray = this.settings.fieldType.split(',');
        this.natureArray = this.settings.fieldNature.split(',');
        this.eggGroupArray = this.settings.fieldEggGroup.split(',');
        Helpers.setupFieldArrayHTML(this.jQuery, this.customArray, 'searchkeys', theField, 'numberDiv');
        Helpers.setupFieldArrayHTML(this.jQuery, this.typeArray, 'fieldTypes', theType, 'typeNumber');
        Helpers.setupFieldArrayHTML(this.jQuery, this.natureArray, 'natureTypes', theNature, 'natureNumber');
        Helpers.setupFieldArrayHTML(this.jQuery, this.eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');

        this.handleTooltipSettings();
    }
    setupCSS() {
        // same as public fields
        let fieldOrderCssColor = this.jQuery('#field_field').css('background-color');
        let fieldOrderCssBorder = this.jQuery('#field_field').css('border');
        this.jQuery('#fieldorder').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('#fieldorder').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('#fieldsearch').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('#fieldsearch').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('#tooltipenable').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('#tooltipenable').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('#tooltipenable').css('max-width', '600px');
        this.jQuery('#tooltipenable').css('position', 'relative');
        this.jQuery('#tooltipenable').css('margin', '16px auto');
        this.jQuery('#fieldsearch').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('#fieldsearch').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('.collapsible').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('.collapsible').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('.collapsible_content').css('background-color', '' + fieldOrderCssColor + '');

        // Issue #47 - Since the default Pokefarm CSS for buttons does not use the same color
        // settings as most of the text on the site, manually set the text color for
        // '.collapsible' to match the text around it
        this.jQuery('.collapsible').css('color', this.jQuery('#content').find('h1').eq(0).css('color'));
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#field_field'), {
            childList: true,
            characterdata: true,
            subtree: true,
            characterDataOldValue: true,
        });
    }
    setupHandlers(GLOBALS) {
        const obj = this;
        this.jQuery(window).on('load', (() => {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.handleTooltipSettings();
            obj.saveSettings();
        }));

        this.jQuery(document).on('load', '.field', (function () {
            obj.customSearch(GLOBALS);
        }));

        this.jQuery(document).on('click', '*[data-menu="release"]', (function (e) { //select all feature
            e.stopPropagation();
            obj.releaseEnableReleaseAll();
        }));

        this.jQuery(document).on('click', '#addPrivateFieldTypeSearch', (function (e) { //add field type list
            e.stopPropagation();
            obj.addSelectSearch('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS, 'removePrivateFieldTypeSearch', 'fieldTypes', 'typeArray');
            obj.customSearch(GLOBALS);
        }));

        this.jQuery(document).on('click', '#removePrivateFieldTypeSearch', (function (e) { //remove field type list
            e.stopPropagation();
            obj.typeArray = obj.removeSelectSearch(obj.typeArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldType', 'fieldTypes');
            obj.saveSettings();
            obj.customSearch(GLOBALS);
        }));

        this.jQuery(document).on('click', '#addPrivateFieldNatureSearch', (function (e) { //add field nature search
            e.stopPropagation();
            obj.addSelectSearch('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS, 'removePrivateFieldNature', 'natureTypes', 'natureArray');
            obj.customSearch(GLOBALS);
        }));

        this.jQuery(document).on('click', '#removePrivateFieldNature', (function (e) { //remove field nature search
            e.stopPropagation();
            obj.natureArray = obj.removeSelectSearch(obj.natureArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldNature', 'natureTypes');
            obj.saveSettings();
            obj.customSearch(GLOBALS);
        }));

        this.jQuery(document).on('click', '#addPrivateFieldEggGroupSearch', (function (e) { //add egg group nature search
            e.stopPropagation();
            obj.addSelectSearch('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS, 'removePrivateFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
            obj.customSearch(GLOBALS);
        }));

        this.jQuery(document).on('click', '#removePrivateFieldEggGroup', (function (e) { //remove egg group nature search
            e.stopPropagation();
            obj.eggGroupArray = obj.removeSelectSearch(obj.eggGroupArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldEggGroup', 'eggGroupTypes');
            obj.saveSettings();
            obj.customSearch(GLOBALS);
        }));

        this.jQuery(document).on('click', '#addTextField', (function (e) {
            e.stopPropagation();
            obj.addTextField();
            obj.saveSettings();
        }));

        this.jQuery(document).on('click', '#removeTextField', (function (e) {
            e.stopPropagation();
            obj.removeTextField(this, obj.jQuery(this).parent().find('input').val());
            obj.saveSettings();
            obj.customSearch(GLOBALS);
        }));

        this.jQuery(document).on('change', '.qolsetting', (function () {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        this.jQuery(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                obj.jQuery(this).val(),
                obj.jQuery(this).parent().parent().attr('class'),
                obj.jQuery(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        this.jQuery(document).on('click', '*[data-menu="bulkmove"]', (function () { // select all feature
            obj.moveEnableReleaseAll();
        }));

        this.jQuery('.collapsible').on('click', function () {
            this.classList.toggle('active');
            var content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });

        this.jQuery('.tooltipsetting[data-key=tooltipEnableMods]').on('click', function () {
            obj.loadSettings();
            obj.handleTooltipSettings();
            obj.saveSettings();
        });

        this.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').on('click', function () {
            obj.loadSettings();
            obj.handleTooltipSettings();
            obj.saveSettings();
        });
    }
    // specific
    /*
    insertFoundDiv(number, name, img) {
        document.querySelector('#sheltersuccess').
            insertAdjacentHTML('beforeend',
                               '<div id="shelterfound">' + name + ((number > 1) ? 's' : '') + ' found ' + img + '</div>')
    }
    */
    handleTooltipSettings() {
        const obj = this;
        if (obj.jQuery('.tooltipsetting[data-key=tooltipEnableMods]').prop('checked')) {
            // make sure checkboxes are enabled
            obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', false);

            // use the correct setting to turn on the tooltips based on the berries
            if (obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) { obj.disableTooltips(); }
            else { obj.enableTooltips(); }
        } else {
            obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', true);
            // if tooltipNoBerry was checked before the mods were disabled, reenable the tooltips
            if (obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) {
                obj.enableTooltips();
            }
        }
    }
    disableTooltips() {
        this.jQuery('#field_field>div.field>.fieldmon').removeAttr('data-tooltip').removeClass('tooltip_trigger');
    }
    enableTooltips() {
        this.jQuery('#field_field>div.field>.fieldmon').attr('data-tooltip', '');
    }
    highlightByHowFullyEvolved(GLOBALS, pokemonElem) {
        // if a pokemon is clicked-and-dragged, the tooltip element after the pokemon
        // will not exist. If this occurs. don't try highlighting anything until the
        // pokemon is "put down"
        if (!this.jQuery(pokemonElem).next().length) { return; }

        const tooltip = Helpers.parseFieldPokemonTooltip(this.jQuery, GLOBALS, this.jQuery(pokemonElem).next()[0]);
        let pokemon = tooltip['species'];

        const key = 'QoLEvolutionTreeDepth';
        if (localStorage.getItem(key) !== null) {
            const evolutionData = JSON.parse(localStorage.getItem(key));
            if (Object.keys(evolutionData).length > 0) {
                // if can't find the pokemon directly, try looking for its form data
                if (!evolutionData[pokemon]) {
                    if (tooltip['forme']) {
                        pokemon = pokemon + ' [' + tooltip['forme'] + ']';
                    }
                }
                if (!evolutionData[pokemon]) {
                    console.error(`Private Fields Page - Could not find evolution data for ${pokemon}`);
                } else {
                    const evolutionsLeft = evolutionData[pokemon].remaining;

                    if (evolutionsLeft === 1) {
                        this.jQuery(pokemonElem).children('img.big').addClass('oneevolutionleft');
                    } else if (evolutionsLeft === 2) {
                        this.jQuery(pokemonElem).children('img.big').addClass('twoevolutionleft');
                    }
                }
            } else {
                console.error('Unable to load evolution data. In QoL Hub, please clear cached dex and reload dex data');
            }
        } else {
            console.error('Unable to load evolution data. In QoL Hub, please clear cached dex and reload dex data');
        }
    }

    searchForImgTitle(GLOBALS, key) {
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        const value = SEARCH_DATA[keyIndex + 1];
        const selected = this.jQuery('img[title*="' + value + '"]');
        if (selected.length) {
            // next line different from shelter
            let bigImg = selected.parent().parent().parent().parent().prev().children('img.big');
            this.jQuery(bigImg).addClass('privatefoundme');

            // this.insertFoundDiv(selected.length, imgResult, imgFitResult)
        }
    }

    searchForCustomPokemon(value, male, female, nogender) {
        let genderMatches = [];
        if (male) { genderMatches.push('[M]'); }
        if (female) { genderMatches.push('[F]'); }
        if (nogender) { genderMatches.push('[N]'); }

        if (genderMatches.length > 0) {
            for (let i = 0; i < genderMatches.length; i++) {
                let genderMatch = genderMatches[i];
                let selected = this.jQuery('#field_field .tooltip_content:containsIN(' + value + ') img[title*=\'' + genderMatch + '\']');
                if (selected.length) {
                    let shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big');
                    this.jQuery(shelterBigImg).addClass('privatefoundme');
                }
            }
        }

        //No genders
        else {
            let selected = this.jQuery('#field_field .tooltip_content:containsIN(' + value + ')');
            if (selected.length) {
                let shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big');
                this.jQuery(shelterBigImg).addClass('privatefoundme');
            }
        }

    }
    searchForCustomEgg(value) {
        let selected = this.jQuery('#field_field .tooltip_content:containsIN(' + value + '):contains("Egg")');
        if (selected.length) {
            let shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big');
            this.jQuery(shelterBigImg).addClass('privatefoundme');
        }
    }
    searchForCustomPng(value) {
        let selected = this.jQuery('#field_field img[src*="' + value + '"]');
        if (selected.length) {
            let shelterImgSearch = selected;
            this.jQuery(shelterImgSearch).addClass('privatefoundme');
        }
    }
    customSearch(GLOBALS) {
        const obj = this;
        let bigImgs = document.querySelectorAll('.privatefoundme');
        if (bigImgs !== null) {
            bigImgs.forEach((b) => { obj.jQuery(b).removeClass('privatefoundme'); });
        }

        if (this.settings.fieldShiny === true) {
            this.searchForImgTitle(GLOBALS, 'findShiny');
        }
        if (this.settings.fieldAlbino === true) {
            this.searchForImgTitle(GLOBALS, 'findAlbino');
        }
        if (this.settings.fieldMelanistic === true) {
            this.searchForImgTitle(GLOBALS, 'findMelanistic');
        }
        if (this.settings.fieldPrehistoric === true) {
            this.searchForImgTitle(GLOBALS, 'findPrehistoric');
        }
        if (this.settings.fieldDelta === true) {
            this.searchForImgTitle(GLOBALS, 'findDelta');
        }
        if (this.settings.fieldMega === true) {
            this.searchForImgTitle(GLOBALS, 'findMega');
        }
        if (this.settings.fieldStarter === true) {
            this.searchForImgTitle(GLOBALS, 'findStarter');
        }
        if (this.settings.fieldCustomSprite === true) {
            this.searchForImgTitle(GLOBALS, 'findCustomSprite');
        }
        if (this.settings.fieldItem === true) {
            // pokemon that hold items will have HTML that matches the following selector
            let items = obj.jQuery('.tooltip_content .item>div>.tooltip_item');
            if (items.length) {
                let itemBigImgs = items.parent().parent().parent().parent().prev().children('img.big');
                obj.jQuery(itemBigImgs).addClass('privatefoundme');
            }
        }
        if (this.settings.fieldNFE === true) {
            obj.jQuery('.fieldmon').each(function () {
                obj.highlightByHowFullyEvolved(GLOBALS, this);
            });
        } else {
            obj.jQuery('.oneevolutionleft').each((k, v) => {
                obj.jQuery(v).removeClass('oneevolutionleft');
            });
            obj.jQuery('.twoevolutionleft').each((k, v) => {
                obj.jQuery(v).removeClass('twoevolutionleft');
            });
        }
        const filteredTypeArray = this.typeArray.filter(v => v != '');
        const filteredNatureArray = this.natureArray.filter(v => v != '');
        const filteredEggGroupArray = this.eggGroupArray.filter(v => v != '');

        //loop to find all the types
        if (filteredTypeArray.length > 0 || filteredNatureArray.length > 0 || filteredEggGroupArray.length > 0) {
            obj.jQuery('.fieldmon').each(function () {
                let searchPokemonBigImg = obj.jQuery(this)[0].childNodes[0];
                const tooltipData = Helpers.parseFieldPokemonTooltip(obj.jQuery, GLOBALS, obj.jQuery(searchPokemonBigImg).parent().next()[0]);

                let searchTypeOne = tooltipData.types[0] + '';
                let searchTypeTwo = (tooltipData.types.length > 1) ? tooltipData.types[1] + '' : '';

                let searchNature = GLOBALS.NATURE_LIST[tooltipData.nature];

                let searchEggGroup = obj.jQuery(this).next().find('.fieldmontip').
                    children(':contains(Egg Group)').eq(0).text().slice('Egg Group: '.length);

                for (let i = 0; i < filteredTypeArray.length; i++) {
                    if ((searchTypeOne === filteredTypeArray[i]) || (searchTypeTwo === filteredTypeArray[i])) {
                        obj.jQuery(searchPokemonBigImg).addClass('privatefoundme');
                    }
                }

                for (let i = 0; i < filteredNatureArray.length; i++) {
                    if (searchNature === GLOBALS.NATURE_LIST[filteredNatureArray[i]]) {
                        obj.jQuery(searchPokemonBigImg).addClass('privatefoundme');
                    }
                }

                for (let i = 0; i < filteredEggGroupArray.length; i++) {
                    let value = GLOBALS.EGG_GROUP_LIST[filteredEggGroupArray[i]];
                    if (searchEggGroup === value ||
                        searchEggGroup.indexOf(value + '/') > -1 ||
                        searchEggGroup.indexOf('/' + value) > -1) {
                        obj.jQuery(searchPokemonBigImg).addClass('privatefoundme');
                    }
                }
            }); // each
        } // end

        // custom search
        for (let i = 0; i < this.customArray.length; i++) {
            let value = this.customArray[i];
            if (value != '') {
                //custom pokemon search
                if (this.settings.customPokemon === true) {
                    this.searchForCustomPokemon(value, this.settings.fieldMale,
                        this.settings.fieldFemale,
                        this.settings.fieldNoGender);
                }

                //custom egg
                if (this.settings.customEgg === true) {
                    this.searchForCustomEgg(value);
                }

                //imgSearch with Pokémon
                if (this.settings.customPng === true) {
                    this.searchForCustomPng(value);
                }
            }
        }
    }
    addSelectSearch(cls, name, dataKey, options, id, divParent, arrayName) {
        const theList = Helpers.selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName);
        let number = this.jQuery(`#${divParent}>div`).length;
        this.jQuery(`#${divParent}`).append(theList);
        this.jQuery(`.${cls}`).removeClass(cls).addClass('' + number + '');
    }
    removeSelectSearch(arr, byebye, key, settingsKey, divParent) {
        arr = this.jQuery.grep(arr, function (value) { return value != key; });
        this.settings[settingsKey] = arr.toString();

        this.jQuery(byebye).parent().remove();

        for (let i = 0; i < this.jQuery(`#${divParent}>div`).length; i++) {
            let rightDiv = i + 1;
            this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }

        return arr;
    }
    addTextField() {
        const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
        let numberDiv = this.jQuery('#searchkeys>div').length;
        this.jQuery('#searchkeys').append(theField);
        this.jQuery('.numberDiv').removeClass('numberDiv').addClass('' + numberDiv + '');
    }
    removeTextField(byebye, key) {
        this.customArray = this.jQuery.grep(this.customArray, function (value) {
            return value != key;
        });
        this.settings.fieldCustom = this.customArray.toString();

        this.jQuery(byebye).parent().remove();

        let i;
        for (i = 0; i < this.jQuery('#searchkeys>div').length; i++) {
            let rightDiv = i + 1;
            this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    releaseEnableReleaseAll() {
        const obj = this;
        if (this.settings.releaseSelectAll === true && 
            !this.jQuery('#selectallfield').length) {
            const checkboxes = '<label id="selectallfield"><input id="selectallfieldcheckbox" type="checkbox">Select all  </label><label id="selectallfieldany"><input id="selectallfieldanycheckbox" type="checkbox">Select Any  </label><label id="selectallfieldsour"><input id="selectallfieldsourcheckbox" type="checkbox">Select Sour  </label><label id="selectallfieldspicy"><input id="selectallfieldspicycheckbox" type="checkbox">Select Spicy</label><label id="selectallfielddry"><input id="selectallfielddrycheckbox" type="checkbox">Select Dry  </label><label id="selectallfieldsweet"><input id="selectallfieldsweetcheckbox" type="checkbox">Select Sweet  </label><label id="selectallfieldbitter"><input id="selectallfieldbittercheckbox" type="checkbox">Select Bitter  </label>';
            this.jQuery('.dialog>div>div>div>div>button').eq(0).after(checkboxes);
            this.jQuery('#selectallfieldcheckbox').click(function () {
                obj.jQuery('#massreleaselist>ul>li>label>input').not(this).prop('checked', this.checked);
            });

            this.jQuery('#selectallfieldanycheckbox').click(function () {
                let selectAny = obj.jQuery('.icons:contains("Any")').prev().prev().prev('input');
                obj.jQuery(selectAny).not(this).prop('checked', this.checked);
            });

            this.jQuery('#selectallfieldsourcheckbox').click(function () {
                let selectSour = obj.jQuery('.icons:contains("Sour")').prev().prev().prev('input');
                obj.jQuery(selectSour).not(this).prop('checked', this.checked);
            });

            this.jQuery('#selectallfieldspicycheckbox').click(function () {
                let selectSpicy = obj.jQuery('.icons:contains("Spicy")').prev().prev().prev('input');
                obj.jQuery(selectSpicy).not(this).prop('checked', this.checked);
            });

            this.jQuery('#selectallfielddrycheckbox').click(function () {
                let selectDry = obj.jQuery('.icons:contains("Dry")').prev().prev().prev('input');
                obj.jQuery(selectDry).not(this).prop('checked', this.checked);
            });

            this.jQuery('#selectallfieldsweetcheckbox').click(function () {
                let selectSweet = obj.jQuery('.icons:contains("Sweet")').prev().prev().prev('input');
                obj.jQuery(selectSweet).not(this).prop('checked', this.checked);
            });

            this.jQuery('#selectallfieldbittercheckbox').click(function () {
                let selectBitter = obj.jQuery('.icons:contains("Bitter")').prev().prev().prev('input');
                obj.jQuery(selectBitter).not(this).prop('checked', this.checked);
            });
        } // if
    } // releaseAll
    moveEnableReleaseAll() {
        const obj = this;
        if (this.settings.releaseSelectAll === true && 
            !this.jQuery('#movefieldselectall').length) {
            const checkboxes = '<label id="movefieldselectall"><input id="movefieldselectallcheckbox" type="checkbox">Select all  </label><label id="movefieldselectany"><input id="movefieldselectanycheckbox" type="checkbox">Select Any  </label><label id="movefieldselectsour"><input id="movefieldselectsourcheckbox" type="checkbox">Select Sour  </label><label id="movefieldselectspicy"><input id="movefieldselectspicycheckbox" type="checkbox">Select Spicy</label><label id="movefieldselectdry"><input id="movefieldselectdrycheckbox" type="checkbox">Select Dry  </label><label id="movefieldselectsweet"><input id="movefieldselectsweetcheckbox" type="checkbox">Select Sweet  </label><label id="movefieldselectbitter"><input id="movefieldselectbittercheckbox" type="checkbox">Select Bitter  </label>';
            obj.jQuery('.dialog>div>div>div>div>button').eq(0).after(checkboxes);
            obj.jQuery('#movefieldselectallcheckbox').click(function () {
                obj.jQuery('#massmovelist>ul>li>label>input').not(this).prop('checked', this.checked);
            });

            obj.jQuery('#movefieldselectanycheckbox').click(function () {
                let selectAny = obj.jQuery('.icons:contains("Any")').prev().prev().prev('input');
                obj.jQuery(selectAny).not(this).prop('checked', this.checked);
            });

            obj.jQuery('#movefieldselectsourcheckbox').click(function () {
                let selectSour = obj.jQuery('.icons:contains("Sour")').prev().prev().prev('input');
                obj.jQuery(selectSour).not(this).prop('checked', this.checked);
            });

            obj.jQuery('#movefieldselectspicycheckbox').click(function () {
                let selectSpicy = obj.jQuery('.icons:contains("Spicy")').prev().prev().prev('input');
                obj.jQuery(selectSpicy).not(this).prop('checked', this.checked);
            });

            obj.jQuery('#movefieldselectdrycheckbox').click(function () {
                let selectDry = obj.jQuery('.icons:contains("Dry")').prev().prev().prev('input');
                obj.jQuery(selectDry).not(this).prop('checked', this.checked);
            });

            obj.jQuery('#movefieldselectsweetcheckbox').click(function () {
                let selectSweet = obj.jQuery('.icons:contains("Sweet")').prev().prev().prev('input');
                obj.jQuery(selectSweet).not(this).prop('checked', this.checked);
            });

            obj.jQuery('#movefieldselectbittercheckbox').click(function () {
                let selectBitter = obj.jQuery('.icons:contains("Bitter")').prev().prev().prev('input');
                obj.jQuery(selectBitter).not(this).prop('checked', this.checked);
            });
        } // if
    } // moveEnableReleaseAll
}
/* globals Page Helpers */
const PublicFieldsBase = Page;

// eslint-disable-next-line no-unused-vars
class PublicFieldsPage extends PublicFieldsBase {
    constructor(jQuery, GLOBALS) {
        super(jQuery, 'QoLPublicFields', {
            fieldByBerry: false,
            fieldByMiddle: false,
            fieldByGrid: false,
            fieldClickCount: true,
            fieldCustom: '',
            fieldType: '',
            fieldNature: '',
            fieldEggGroup: '',
            fieldNewPokemon: true,
            fieldShiny: true,
            fieldAlbino: true,
            fieldMelanistic: true,
            fieldPrehistoric: true,
            fieldDelta: true,
            fieldMega: true,
            fieldStarter: true,
            fieldCustomSprite: true,
            fieldMale: true,
            fieldFemale: true,
            fieldNoGender: true,
            fieldCustomItem: true, // unused
            fieldCustomPokemon: true,
            fieldCustomEgg: true,
            fieldCustomPng: false,
            fieldItem: true,
            /* tooltip settings */
            tooltipEnableMods: false,
            tooltipNoBerry: false,
            tooltipBerry: false,
        }, 'fields/');
        this.customArray = [];
        this.typeArray = [];
        this.natureArray = [];
        this.eggGroupArray = [];
        const obj = this;
        this.observer = new MutationObserver(function(mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function(mutation) {
                obj.customSearch(GLOBALS);
                obj.handleTooltipSettings();
            });
        });
    }

    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if(super.settingsChange(element, textElement, customClass, typeClass, arrayName) === false) {
            return false;
        }

        const mutuallyExclusive = ['fieldByBerry', 'fieldByMiddle', 'fieldByGrid'];
        const idx = mutuallyExclusive.indexOf(element);
        if(idx > -1) {
            for(let i = 0; i < mutuallyExclusive.length; i++) {
                if(i !== idx) {
                    this.settings[mutuallyExclusive[i]] = false;
                }
            }
            return true;
        }
        else { return false; }
    }

    setupHTML(GLOBALS) {
        document.querySelector('#field_field').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.publicFieldTooltipModHTML);
        document.querySelector('#field_field').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.fieldSortHTML);
        document.querySelector('#field_field').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.fieldSearchHTML);

        const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS,
            'removeFieldTypeSearch', 'fieldTypes', 'typeArray');
        const theNature = Helpers.selectSearchDiv('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS,
            'removeFieldNature', 'natureTypes', 'natureArray');
        const theEggGroup = Helpers.selectSearchDiv('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS,
            'removeFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
        this.customArray = this.settings.fieldCustom.split(',');
        this.typeArray = this.settings.fieldType.split(',');
        this.natureArray = this.settings.fieldNature.split(',');
        this.eggGroupArray = this.settings.fieldEggGroup.split(',');
        Helpers.setupFieldArrayHTML(this.jQuery, this.customArray, 'searchkeys', theField, 'numberDiv');
        Helpers.setupFieldArrayHTML(this.jQuery, this.typeArray, 'fieldTypes', theType, 'typeNumber');
        Helpers.setupFieldArrayHTML(this.jQuery, this.natureArray, 'natureTypes', theNature, 'natureNumber');
        Helpers.setupFieldArrayHTML(this.jQuery, this.eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');

        this.handleTooltipSettings();
    }
    setupCSS() {
        let fieldOrderCssColor = this.jQuery('#field_field').css('background-color');
        let fieldOrderCssBorder = this.jQuery('#field_field').css('border');
        this.jQuery('#fieldorder').css('background-color', ''+fieldOrderCssColor+'');
        this.jQuery('#fieldorder').css('border', ''+fieldOrderCssBorder+'');
        this.jQuery('#tooltipenable').css('background-color', ''+fieldOrderCssColor+'');
        this.jQuery('#tooltipenable').css('border', ''+fieldOrderCssBorder+'');
        this.jQuery('#tooltipenable').css('max-width', '600px');
        this.jQuery('#tooltipenable').css('position', 'relative');
        this.jQuery('#tooltipenable').css('margin', '16px auto');
        this.jQuery('#fieldsearch').css('background-color', ''+fieldOrderCssColor+'');
        this.jQuery('#fieldsearch').css('border', ''+fieldOrderCssBorder+'');
        this.jQuery('.collapsible').css('background-color', ''+fieldOrderCssColor+'');
        this.jQuery('.collapsible').css('border', ''+fieldOrderCssBorder+'');
        this.jQuery('.collapsible_content').css('background-color', ''+fieldOrderCssColor+'');
        
        // Issue #47 - Since the default Pokefarm CSS for buttons does not use the same color
        // settings as most of the text on the site, manually set the text color for
        // '.collapsible' to match the text around it
        this.jQuery('.collapsible').css('color', this.jQuery('#content').find('h1').eq(0).css('color'));
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#field_field'), {
            childList: true,
            characterdata: true,
            subtree: true,
            characterDataOldValue: true,
        });
    }
    setupHandlers(GLOBALS) {
        const obj = this;
        obj.jQuery(window).on('load', (function() {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.handleTooltipSettings();
            obj.saveSettings();
        }));

        obj.jQuery(document).on('click input', '#fieldorder, #field_field, #field_berries, #field_nav', (function() { //field sort
            obj.customSearch(GLOBALS);
        }));

        document.addEventListener('keydown', function() {
            obj.customSearch(GLOBALS);
        });

        obj.jQuery(document).on('click', '#addFieldTypeSearch', (function() { //add field type list
            obj.addSelectSearch('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS, 'removeFieldTypeSearch', 'fieldTypes', 'typeArray');
            obj.customSearch(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#removeFieldTypeSearch', (function() { //remove field type list
            obj.typeArray = obj.removeSelectSearch(obj.typeArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldType', 'fieldTypes');
            obj.saveSettings();
            obj.customSearch(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#addFieldNatureSearch', (function() { //add field nature search
            obj.addSelectSearch('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS, 'removeFieldNature', 'natureTypes', 'natureArray');
            obj.customSearch(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#removeFieldNature', (function() { //remove field nature search
            obj.natureArray = obj.removeSelectSearch(obj.natureArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldNature', 'natureTypes');
            obj.saveSettings();
            obj.customSearch(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#addFieldEggGroupSearch', (function() { //add egg group nature search
            obj.addSelectSearch('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS, 'removeFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
            obj.customSearch(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#removeFieldEggGroup', (function() { //remove egg group nature search
            obj.eggGroupArray = obj.removeSelectSearch(obj.eggGroupArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldEggGroup', 'eggGroupTypes');
            obj.saveSettings();
            obj.customSearch(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#addTextField', (function() {
            obj.addTextField();
            obj.saveSettings();
        }));

        obj.jQuery(document).on('click', '#removeTextField', (function() {
            obj.removeTextField(this, obj.jQuery(this).parent().find('input').val());
            obj.saveSettings();
            obj.customSearch(GLOBALS);
        }));

        obj.jQuery(document).on('change', '.qolsetting', (function() {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        obj.jQuery(document).on('input', '.qolsetting', (function() { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                obj.jQuery(this).val(),
                obj.jQuery(this).parent().parent().attr('class'),
                obj.jQuery(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        obj.jQuery('input.qolalone').on('change', function() { //only 1 textbox may be true
            obj.jQuery('input.qolalone').not(this).prop('checked', false);
        });

        obj.jQuery('.collapsible').on('click', function() {
            this.classList.toggle('active');
            var content = this.nextElementSibling;
            if(content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });

        obj.jQuery('#field_berries').on('click', function() {
            obj.loadSettings();
            obj.handleTooltipSettings();
        });

        obj.jQuery('.tooltipsetting[data-key=tooltipEnableMods]').on('click', function() {
            obj.loadSettings();
            obj.handleTooltipSettings();
            obj.saveSettings();
        });

        obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').on('click', function() {
            obj.loadSettings();
            obj.handleTooltipSettings();
            obj.saveSettings();
        });

        obj.jQuery('.tooltipsetting[data-key=tooltipBerry]').on('click', function() {
            obj.loadSettings();
            obj.handleTooltipSettings();
            obj.saveSettings();
        });

        // based on PFQ's code in fields_public.min.js
        obj.jQuery(window).on('keyup.field_shortcuts', function (a) {
            const k = obj.jQuery('#field_berries');
            if (0 == obj.jQuery(a.target).closest('input, textarea').length) {
                switch (a.keyCode) {
                case 49: // 1
                case 97: // Num-1
                    k.find('a').eq(0).trigger('click');
                    break;
                case 50: // 2
                case 98: // Num-2
                    k.find('a').eq(1).trigger('click');
                    break;
                case 51: // 3
                case 99: // Num-3
                    k.find('a').eq(2).trigger('click');
                    break;
                case 52: // 4
                case 100: // Num-4
                    k.find('a').eq(3).trigger('click');
                    break;
                case 53: // 5
                case 101: // Num-5
                    k.find('a').eq(4).trigger('click');
                }
            }
        });
    }
    // specific
    handleTooltipSettings() {
        const obj = this;
        if(obj.jQuery('.tooltipsetting[data-key=tooltipEnableMods]').prop('checked')) {
            // make sure checkboxes are enabled
            obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', false);
            obj.jQuery('.tooltipsetting[data-key=tooltipBerry]').prop('disabled', false);

            // use the correct setting to turn on the tooltips based on the berries
            if(obj.jQuery('#field_berries').hasClass('selected')) {
                if(obj.jQuery('.tooltipsetting[data-key=tooltipBerry]').prop('checked')) { obj.disableTooltips(); }
                else { obj.enableTooltips(); }
            } else {
                if(obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) { obj.disableTooltips(); }
                else { obj.enableTooltips(); }
            }
        } else {
            obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', true);
            obj.jQuery('.tooltipsetting[data-key=tooltipBerry]').prop('disabled', true);
            // if tooltipNoBerry was checked before the mods were disabled, reenable the tooltips
            if(obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) {
                obj.enableTooltips();
            }
            // same for tooltipBerry
            if(obj.jQuery('.tooltipsetting[data-key=tooltipBerry]').prop('checked')) {
                obj.enableTooltips();
            }
        }
    }
    disableTooltips() {
        this.jQuery('#field_field>div.field>.fieldmon').removeAttr('data-tooltip').removeClass('tooltip_trigger');
    }
    enableTooltips() {
        this.jQuery('#field_field>div.field>.fieldmon').attr('data-tooltip', '');
    }
    searchForImgTitle(GLOBALS, key) {
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        const value = SEARCH_DATA[keyIndex + 1];
        const selected = this.jQuery('img[title*="'+value+'"]');
        if (selected.length) {
            // next line different from shelter
            let bigImg = selected.parent().parent().parent().parent().prev().children('img.big');
            this.jQuery(bigImg).addClass('publicfoundme');
        }
    }
    searchForCustomPokemon(value, male, female, nogender) {
        let genderMatches = [];
        if (male) { genderMatches.push('[M]'); }
        if(female) { genderMatches.push('[F]'); }
        if(nogender) { genderMatches.push('[N]'); }

        if(genderMatches.length > 0) {
            for(let i = 0; i < genderMatches.length; i++) {
                let genderMatch = genderMatches[i];
                let selected = this.jQuery('#field_field .tooltip_content:containsIN('+value+') img[title*=\'' + genderMatch + '\']');
                if (selected.length) {
                    let shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big');
                    this.jQuery(shelterBigImg).addClass('publicfoundme');
                }
            }
        }

        //No genders
        else {
            let selected = this.jQuery('#field_field .tooltip_content:containsIN('+value+'):not(:containsIN("Egg"))');
            if (selected.length) {
                let shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big');
                this.jQuery(shelterBigImg).addClass('publicfoundme');
            }
        }

    }
    searchForCustomEgg(value) {
        let selected = this.jQuery('#field_field .tooltip_content:containsIN('+value+'):contains("Egg")');
        if (selected.length) {
            let shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big');
            this.jQuery(shelterBigImg).addClass('publicfoundme');
        }
    }
    searchForCustomPng(value) {
        let selected = this.jQuery('#field_field img[src*="'+value+'"]');
        if (selected.length) {
            let shelterImgSearch = selected;
            this.jQuery(shelterImgSearch).addClass('publicfoundme');
        }
    }
    customSearch(GLOBALS) {
        const obj = this;

        /////////////////////////////////////////////////
        //////////////////// sorting ////////////////////
        /////////////////////////////////////////////////
        if (this.settings.fieldByBerry === true) { //sort field by berries
            this.jQuery('.fieldmon').removeClass('qolSortMiddle');
            this.jQuery('.field').removeClass('qolGridField');
            this.jQuery('.fieldmon').removeClass('qolGridPokeSize');
            this.jQuery('.fieldmon>img').removeClass('qolGridPokeImg');

            if(this.jQuery('#field_field [data-flavour*="any-"]').length) {
                this.jQuery('#field_field [data-flavour*="any-"]').addClass('qolAnyBerry');
            }
            if(this.jQuery('#field_field [data-flavour*="sour-"]').length) {
                this.jQuery('#field_field [data-flavour*="sour-"]').addClass('qolSourBerry');
            }
            if(this.jQuery('#field_field [data-flavour*="spicy-"]').length) {
                this.jQuery('#field_field [data-flavour*="spicy-"]').addClass('qolSpicyBerry');
            }
            if(this.jQuery('#field_field [data-flavour*="dry-"]').length) {
                this.jQuery('#field_field [data-flavour*="dry-"]').addClass('qolDryBerry');
            }
            if(this.jQuery('#field_field [data-flavour*="sweet-"]').length) {
                this.jQuery('#field_field [data-flavour*="sweet-"]').addClass('qolSweetBerry');
            }
            if(this.jQuery('#field_field [data-flavour*="bitter-"]').length) {
                this.jQuery('#field_field [data-flavour*="bitter-"]').addClass('qolBitterBerry');
            }
        }
        else if (this.settings.fieldByMiddle === true) { //sort field in the middle
            this.jQuery('#field_field [data-flavour*="any-"]').removeClass('qolAnyBerry');
            this.jQuery('#field_field [data-flavour*="sour-"]').removeClass('qolSourBerry');
            this.jQuery('#field_field [data-flavour*="spicy-"]').removeClass('qolSpicyBerry');
            this.jQuery('#field_field [data-flavour*="dry-"]').removeClass('qolDryBerry');
            this.jQuery('#field_field [data-flavour*="sweet-"]').removeClass('qolSweetBerry');
            this.jQuery('#field_field [data-flavour*="bitter-"]').removeClass('qolBitterBerry');
            this.jQuery('.field').removeClass('qolGridField');
            this.jQuery('.fieldmon').removeClass('qolGridPokeSize');
            this.jQuery('.fieldmon>img').removeClass('qolGridPokeImg');

            this.jQuery('.fieldmon').addClass('qolSortMiddle');
        }
        else if (this.settings.fieldByGrid === true) { //sort field in a grid
            this.jQuery('#field_field [data-flavour*="any-"]').removeClass('qolAnyBerry');
            this.jQuery('#field_field [data-flavour*="sour-"]').removeClass('qolSourBerry');
            this.jQuery('#field_field [data-flavour*="spicy-"]').removeClass('qolSpicyBerry');
            this.jQuery('#field_field [data-flavour*="dry-"]').removeClass('qolDryBerry');
            this.jQuery('#field_field [data-flavour*="sweet-"]').removeClass('qolSweetBerry');
            this.jQuery('#field_field [data-flavour*="bitter-"]').removeClass('qolBitterBerry');
            this.jQuery('.fieldmon').removeClass('qolSortMiddle');

            this.jQuery('.field').addClass('qolGridField');
            this.jQuery('.fieldmon').addClass('qolGridPokeSize');
            this.jQuery('.fieldmon>img').addClass('qolGridPokeImg');
        }
        else {
            this.jQuery('#field_field [data-flavour*="any-"]').removeClass('qolAnyBerry');
            this.jQuery('#field_field [data-flavour*="sour-"]').removeClass('qolSourBerry');
            this.jQuery('#field_field [data-flavour*="spicy-"]').removeClass('qolSpicyBerry');
            this.jQuery('#field_field [data-flavour*="dry-"]').removeClass('qolDryBerry');
            this.jQuery('#field_field [data-flavour*="sweet-"]').removeClass('qolSweetBerry');
            this.jQuery('#field_field [data-flavour*="bitter-"]').removeClass('qolBitterBerry');
            this.jQuery('.fieldmon').removeClass('qolSortMiddle');
            this.jQuery('.field').removeClass('qolGridField');
            this.jQuery('.fieldmon').removeClass('qolGridPokeSize');
            this.jQuery('.fieldmon>img').removeClass('qolGridPokeImg');
        }

        //Pokémon click counter
        if (this.settings.fieldClickCount === false) {
            this.jQuery('#pokemonclickcount').remove();
        } else if (this.settings.fieldClickCount === true) {
            let pokemonFed = this.jQuery('.fieldmon').map(function() { return obj.jQuery(this).attr('data-fed'); }).get();

            let pokemonClicked = 0;
            for (var i = 0; i < pokemonFed.length; i++) {
                pokemonClicked += pokemonFed[i] << 0;
            }

            let pokemonInField = this.jQuery('.fieldpkmncount').text();

            if (this.jQuery('#pokemonclickcount').length === 0) {
                document.querySelector('.fielddata').insertAdjacentHTML('beforeend','<div id="pokemonclickcount">'+pokemonClicked+' / '+pokemonInField+' Clicked</div>');
            } else if(this.jQuery('#pokemonclickcount').text() !== (pokemonClicked+' / '+pokemonInField+' Clicked')) {
                this.jQuery('#pokemonclickcount').text(pokemonClicked+' / '+pokemonInField+' Clicked');
            }

            if(pokemonInField !== '') {
                if (JSON.stringify(pokemonClicked) === pokemonInField) {
                    this.jQuery('#pokemonclickcount').css({'color' : '#059121'});
                }
                if (pokemonClicked !== JSON.parse(pokemonInField)) {
                    this.jQuery('#pokemonclickcount').css({'color' : '#a30323'});
                }
            }
        }

        /////////////////////////////////////////////////
        /////////////////// searching ///////////////////
        /////////////////////////////////////////////////
        let bigImgs = document.querySelectorAll('.publicfoundme');
        if(bigImgs !== null) {
            bigImgs.forEach((b) => {obj.jQuery(b).removeClass('publicfoundme');});
        }

        if(this.settings.fieldShiny === true) {
            this.searchForImgTitle(GLOBALS, 'findShiny');
        }
        if(this.settings.fieldAlbino === true) {
            this.searchForImgTitle(GLOBALS, 'findAlbino');
        }
        if(this.settings.fieldMelanistic === true) {
            this.searchForImgTitle(GLOBALS, 'findMelanistic');
        }
        if(this.settings.fieldPrehistoric === true) {
            this.searchForImgTitle(GLOBALS, 'findPrehistoric');
        }
        if(this.settings.fieldDelta === true) {
            this.searchForImgTitle(GLOBALS, 'findDelta');
        }
        if(this.settings.fieldMega === true) {
            this.searchForImgTitle(GLOBALS, 'findMega');
        }
        if(this.settings.fieldStarter === true) {
            this.searchForImgTitle(GLOBALS, 'findStarter');
        }
        if(this.settings.fieldCustomSprite === true) {
            this.searchForImgTitle(GLOBALS, 'findCustomSprite');
        }
        if(this.settings.fieldItem === true) {
            // pokemon that hold items will have HTML that matches the following selector
            let items = this.jQuery('.tooltip_content .item>div>.tooltip_item');
            if(items.length) {
                let itemBigImgs = items.parent().parent().parent().parent().prev().children('img.big');
                this.jQuery(itemBigImgs).addClass('publicfoundme');
            }
        }

        const filteredTypeArray = this.typeArray.filter(v=>v!='');
        const filteredNatureArray = this.natureArray.filter(v=>v!='');
        const filteredEggGroupArray = this.eggGroupArray.filter(v=>v!='');

        //loop to find all the types
        if (filteredTypeArray.length > 0 || filteredNatureArray.length > 0 || filteredEggGroupArray.length > 0) {
            this.jQuery('.fieldmon').each(function() {
                let searchPokemonBigImg = obj.jQuery(this)[0].childNodes[0];
                const tooltipData = Helpers.parseFieldPokemonTooltip(obj.jQuery, GLOBALS, obj.jQuery(searchPokemonBigImg).parent().next()[0]);

                let searchTypeOne = tooltipData.types[0] + '';
                let searchTypeTwo = (tooltipData.types.length > 1) ? tooltipData.types[1] + '': '';

                let searchNature = GLOBALS.NATURE_LIST[tooltipData.nature];

                let searchEggGroup = obj.jQuery(this).next().find('.fieldmontip').
                    children(':contains(Egg Group)').eq(0).text().slice('Egg Group: '.length);

                for (let i = 0; i < filteredTypeArray.length; i++) {
                    if ((searchTypeOne === filteredTypeArray[i]) || (searchTypeTwo === filteredTypeArray[i])) {
                        obj.jQuery(searchPokemonBigImg).addClass('publicfoundme');
                    }
                }

                for (let i = 0; i < filteredNatureArray.length; i++) {
                    if(searchNature === GLOBALS.NATURE_LIST[filteredNatureArray[i]]) {
                        obj.jQuery(searchPokemonBigImg).addClass('publicfoundme');
                    }
                }

                for (let i = 0; i < filteredEggGroupArray.length; i++) {
                    let value = GLOBALS.EGG_GROUP_LIST[filteredEggGroupArray[i]];
                    if(searchEggGroup === value ||
                       searchEggGroup.indexOf(value + '/') > -1 ||
                       searchEggGroup.indexOf('/' + value) > -1) {
                        obj.jQuery(searchPokemonBigImg).addClass('publicfoundme');
                    }
                }
            }); // each
        } // end            

        // custom search
        for (let i = 0; i < this.customArray.length; i++) {
            let value = this.customArray[i];
            if (value != '') {
                //custom pokemon search
                if (this.settings.fieldCustomPokemon === true) {
                    this.searchForCustomPokemon(value, this.settings.fieldMale,
                        this.settings.fieldFemale,
                        this.settings.fieldNoGender);
                }

                //custom egg
                if (this.settings.fieldCustomEgg === true) {
                    this.searchForCustomEgg(value);
                }

                //imgSearch with Pokémon
                if (this.settings.fieldCustomPng === true) {
                    this.searchForCustomPng(value);
                }
            }
        }
    } // customSearch
    addSelectSearch(cls, name, dataKey, options, id, divParent, arrayName) {
        const theList = Helpers.selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName);
        let number = this.jQuery(`#${divParent}>div`).length;
        this.jQuery(`#${divParent}`).append(theList);
        this.jQuery(`.${cls}`).removeClass(cls).addClass(''+number+'');
    }
    removeSelectSearch(arr, byebye, key, settingsKey, divParent) {
        arr = this.jQuery.grep(arr, function(value) { return value != key; });
        this.settings[settingsKey] = arr.toString();

        this.jQuery(byebye).parent().remove();

        for(let i = 0; i < this.jQuery(`#${divParent}>div`).length; i++) {
            let rightDiv = i + 1;
            this.jQuery('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }

        return arr;
    }
    addTextField() {
        const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
        let numberDiv = this.jQuery('#searchkeys>div').length;
        this.jQuery('#searchkeys').append(theField);
        this.jQuery('.numberDiv').removeClass('numberDiv').addClass(''+numberDiv+'');
    }
    removeTextField(byebye, key) {
        this.customArray = this.jQuery.grep(this.customArray, function(value) {
            return value != key;
        });
        this.settings.fieldCustom = this.customArray.toString();

        this.jQuery(byebye).parent().remove();

        let i;
        for(i = 0; i < this.jQuery('#searchkeys>div').length; i++) {
            let rightDiv = i + 1;
            this.jQuery('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }
    }
}
/* globals Page Helpers */
const LabBase = Page;

// eslint-disable-next-line no-unused-vars
class LabPage extends LabBase {
    constructor(jQuery, GLOBALS) {
        super(jQuery, 'QoLLab', {
            findLabEgg: '', // same as findCustom in shelter
            customEgg: true,
            findLabType: '', // same as findType in shelter
            findTypeEgg: true,
        }, '/lab');
        this.searchArray = [];
        this.listArray = [];
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function (mutation) {
                obj.customSearch(GLOBALS);
            });
        });

        // when the page is loaded, check to see if the data needed for finding eggs by type is loaded (if it's needed)
        if (this.onPage(window) &&
            this.settings.findTypeEgg &&
            !(GLOBALS.EGGS_PNG_TO_TYPES_LIST || JSON.parse(localStorage.getItem('QoLEggTypesMap')))) {
            window.alert('Message from QoL script:\nUnable to load list of pokemon eggs and their types, ' +
                'which is used to distinguish eggs with the same name but different types (Vulpix and ' +
                'Alolan Vulpix).\n\nCan still find eggs by type, but there may be mistakes. ' +
                'Please clear and reload your pokedex data by clicking the "Clear Cached Dex" ' +
                'and then clicking the "Update Pokedex" button in the QoL Hub to load list of eggs and types.');
        }
    }

    setupHTML(GLOBALS) {
        document.querySelector('#eggsbox360>p.center').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.labOptionsHTML);
        document.querySelector('#egglist').insertAdjacentHTML('afterend', '<div id="labsuccess"></div>');

        const theField = Helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray');
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', GLOBALS.TYPE_OPTIONS,
            'removeLabTypeList', 'labTypes', 'listArray');

        this.searchArray = this.settings.findLabEgg.split(',');
        this.listArray = this.settings.findLabType.split(',');

        Helpers.setupFieldArrayHTML(this.jQuery, this.searchArray, 'searchkeys', theField, 'numberDiv');
        Helpers.setupFieldArrayHTML(this.jQuery, this.listArray, 'labTypes', theType, 'typeNumber');
    }
    setupCSS() {
        //lab css
        let labSuccessCss = this.jQuery('#labpage>div').css('background-color');
        this.jQuery('#labsuccess').css('background-color', labSuccessCss);
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#labpage>div>div>div'), {
            childList: true,
            characterdata: true,
            subtree: true,
            characterDataOldValue: true,
        });
    }
    setupHandlers(GLOBALS) {
        const obj = this;
        obj.jQuery(document).on('click', '#addLabSearch', (function () { //add lab text field
            obj.addTextField();
        }));

        obj.jQuery(document).on('click', '#removeLabSearch', (function () { //remove lab text field
            obj.removeTextField(this, obj.jQuery(this).parent().find('input').val());
            obj.saveSettings();
        }));

        obj.jQuery(document).on('click', '#addLabTypeList', (function () { //add lab type list
            obj.addTypeList(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#removeLabTypeList', (function () { //remove lab type list
            obj.removeTypeList(this, obj.jQuery(this).parent().find('select').val());
            obj.saveSettings();
        }));

        obj.jQuery(document).on('change', '#labCustomSearch input', (function () { //lab search
            obj.customSearch(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#labpage', (function () { //shelter search
            obj.customSearch(GLOBALS);
        }));

        obj.jQuery(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                obj.jQuery(this).val(),
                obj.jQuery(this).parent().parent().attr('class'),
                obj.jQuery(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        obj.jQuery(window).on('load', (function () {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
        }));
    }
    addTextField() {
        const theField = Helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray');
        let numberDiv = this.jQuery('#searchkeys>div').length;
        this.jQuery('#searchkeys').append(theField);
        this.jQuery('.numberDiv').removeClass('numberDiv').addClass('' + numberDiv + '');
    }
    removeTextField(byebye, key) {
        // when textfield is removed, the value will be deleted from the localstorage
        this.searchArray = this.jQuery.grep(this.searchArray, function (value) {
            return value != key;
        });
        this.settings.findCustom = this.searchArray.toString();

        this.jQuery(byebye).parent().remove();

        for (let i = 0; i < this.jQuery('#searchkeys>div').length; i++) {
            let rightDiv = i + 1;
            this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    addTypeList(GLOBALS) {
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', GLOBALS.TYPE_OPTIONS,
            'removeLabTypeList', 'labTypes', 'listArray');
        let numberTypes = this.jQuery('#labTypes>div').length;
        this.jQuery('#labTypes').append(theType);
        this.jQuery('.typeNumber').removeClass('typeNumber').addClass('' + numberTypes + '');
    }
    removeTypeList(byebye, key) {
        this.listArray = this.jQuery.grep(this.listArray, function (value) {
            return value != key;
        });
        this.settings.findType = this.listArray.toString();

        this.jQuery(byebye).parent().remove();

        for (let i = 0; i < this.jQuery('#labTypes>div').length; i++) {
            let rightDiv = i + 1;
            this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    customSearch(GLOBALS) {
        const obj = this;
        let dexData = GLOBALS.DEX_DATA;
        document.querySelector('#labsuccess').innerHTML = '';
        obj.jQuery('#egglist>div>img').removeClass('labfoundme');

        if (!(this.listArray.length == 1 && this.listArray[0] == '')) {
            if (this.settings.findTypeEgg === true) {
                const eggPngsToTypes = GLOBALS.EGGS_PNG_TO_TYPES_LIST ||
                    JSON.parse(localStorage.getItem('QoLEggTypesMap')) || undefined;
                let typesArrayNoEmptySpace = this.listArray.filter(v => v != '');
                let typeSearchAmount = typesArrayNoEmptySpace.length;
                for (let i = 0; i < typeSearchAmount; i++) {
                    let value = typesArrayNoEmptySpace[i];
                    let amountOfTypesFound = [];
                    let typePokemonNames = [];

                    obj.jQuery('#egglist>div>h3').each(function () {
                        let searchPokemon = (obj.jQuery(this).text().split(' ')[0]);
                        let searchTypeOne = '';
                        let searchTypeTwo = '';

                        if (eggPngsToTypes) {
                            let imgUrl = obj.jQuery(this).next().attr('src').replace('https://pfq-static.com/img/', '');
                            searchTypeOne = eggPngsToTypes[searchPokemon] &&
                                eggPngsToTypes[searchPokemon][imgUrl] &&
                                ('' + eggPngsToTypes[searchPokemon][imgUrl][0]);
                            searchTypeTwo = eggPngsToTypes[searchPokemon] &&
                                eggPngsToTypes[searchPokemon][imgUrl] &&
                                ('' + (eggPngsToTypes[searchPokemon][imgUrl][1] || -1));
                        } else {
                            let searchPokemonIndex = dexData.indexOf('"' + searchPokemon + '"');
                            searchTypeOne = dexData[searchPokemonIndex + 1];
                            searchTypeTwo = dexData[searchPokemonIndex + 2];
                        }
                        if (searchTypeOne === value) {
                            amountOfTypesFound.push('found');
                            typePokemonNames.push(searchPokemon);
                        }

                        if (searchTypeTwo === value) {
                            amountOfTypesFound.push('found');
                            typePokemonNames.push(searchPokemon);
                        }
                    }); // each

                    let foundType = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(value) + 2];

                    let typeImgStandOutLength = typePokemonNames.length;
                    for (let o = 0; o < typeImgStandOutLength; o++) {
                        let value = typePokemonNames[o];
                        let shelterImgSearch = this.jQuery('#egglist>div>h3:containsIN(' + value + ')');
                        let shelterBigImg = shelterImgSearch.next();
                        obj.jQuery(shelterBigImg).addClass('labfoundme');
                    }

                    if (amountOfTypesFound.length > 1) {
                        document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + amountOfTypesFound.length + ' ' + foundType + ' egg types found! (' + typePokemonNames.toString() + ')</div>');
                    } else if (amountOfTypesFound.length == 1) {
                        document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + amountOfTypesFound.length + ' ' + foundType + ' egg type found! (' + typePokemonNames.toString() + ')</div>');
                    }
                } // for
            } // if
        } // else

        if (!(this.searchArray.length == 1 && this.searchArray[0] == '')) {
            let customSearchAmount = this.searchArray.length;

            if (this.settings.customEgg === true) {
                for (let i = 0; i < customSearchAmount; i++) {
                    let value = this.searchArray[i];
                    // skip falsy values (including empty strings)
                    if(!value) { 
                        continue; 
                    }

                    if (this.jQuery('#egglist>div>h3:containsIN(' + value + ')').length) {
                        let searchResult = value;

                        let shelterImgSearch = this.jQuery('#egglist>div>h3:containsIN(' + value + ')');
                        let shelterBigImg = shelterImgSearch.next();
                        obj.jQuery(shelterBigImg).addClass('labfoundme');

                        if (this.jQuery('#egglist>div>h3:containsIN(' + value + ')').length > 1) {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        } else {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        }
                    } // if

                    if (obj.jQuery('#egglist>div img[src*="' + value + '"]').length) {
                        let searchResult = obj.jQuery('#egglist>div img[src*="' + value + '"]').prev().text();

                        let shelterImgSearch = obj.jQuery('#egglist>div img[src*="' + value + '"]');
                        obj.jQuery(shelterImgSearch).addClass('labfoundme');

                        if (obj.jQuery('#egglist>div img[src*="' + value + '"]').length > 1) {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        } else {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        }
                    } // if
                } // for
            } // if
        } // else
    } // customSearch
}
// eslint-disable-next-line no-undef
const FishingBase = Page;

// eslint-disable-next-line no-unused-vars
class FishingPage extends FishingBase {
    constructor(jQuery) {
        super(jQuery, 'QoLFishing', {}, 'fishing');
        // no observer
    }
    setupHTML(GLOBALS) {
        // fishing select all button on caught fishing
        document.querySelector('#caughtfishcontainer label').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.massReleaseSelectHTML);
    }
    setupHandlers() {
        const obj = this;
        obj.jQuery('#selectallfishcheckbox').on('click', function () {
            obj.jQuery('li[data-flavour]>label>input').prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectanycheckbox').on('click', function () {
            obj.jQuery('li[data-flavour=Any]>label>input').prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectsourcheckbox').on('click', function () {
            obj.jQuery('li[data-flavour=Sour]>label>input').prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectspicycheckbox').on('click', function () {
            obj.jQuery('li[data-flavour=Spicy]>label>input').prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectdrycheckbox').on('click', function () {
            obj.jQuery('li[data-flavour=Dry]>label>input').prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectsweetcheckbox').on('click', function () {
            obj.jQuery('li[data-flavour=Sweet]>label>input').prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectbittercheckbox').on('click', function () {
            obj.jQuery('li[data-flavour=Bitter]>label>input').prop('checked', this.checked);
        });
    }
}
/* globals Page */
const MultiuserBase = Page;

// eslint-disable-next-line no-unused-vars
class MultiuserPage extends MultiuserBase {
    constructor(jQuery) {
        super(jQuery, 'QoLMultiuser', {
            hideDislike: false,
            hideAll: false,
            niceTable: false,
        }, 'users/');
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function (mutation) {
                obj.partyModification();
            });
        });
    }

    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if (super.settingsChange(element, textElement, customClass, typeClass, arrayName) === false) {
            return false;
        }

        const mutuallyExclusive = ['hideAll', 'hideDislike', 'niceTable'];
        const idx = mutuallyExclusive.indexOf(element);
        if (idx > -1) {
            for (let i = 0; i < mutuallyExclusive.length; i++) {
                if (i !== idx) {
                    this.settings[mutuallyExclusive[i]] = false;
                }
            }
            return true;
        }
        else { return false; }
    }
    setupHTML(GLOBALS) {
        document.querySelector('#multiuser').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.partyModHTML);
    }
    setupCSS() {
        let menuBackground = this.jQuery('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
        this.jQuery('#qolpartymod').css('background-color', '' + menuBackground + '');
        let menuColor = this.jQuery('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
        this.jQuery('#qolpartymod').css('color', '' + menuColor + '');
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#multiuser'), {
            childList: true,
        });
    }
    setupHandlers() {
        const obj = this;
        obj.jQuery(window).on('load', (function () {
            obj.loadSettings();
            obj.partyModification();
        }));

        obj.jQuery(document).on('click input', '#qolpartymod', (function () {
            obj.partyModification();
        }));

        obj.jQuery(document).on('click', '.tabbed_interface', (function () {
            obj.partyModification();
        }));

        obj.jQuery(document).on('change', '.qolsetting', (function () {
            obj.loadSettings();
            obj.settingsChange(this.getAttribute('data-key'),
                obj.jQuery(this).val(),
                obj.jQuery(this).parent().parent().attr('class'),
                obj.jQuery(this).parent().attr('class'));
            obj.partyModification();
            obj.saveSettings();
        }));

        obj.jQuery('input.qolalone').on('change', function () { //only 1 textbox may be true
            obj.jQuery('input.qolalone').not(this).prop('checked', false);
        });
    }
    partyModification() {
        if (this.settings.hideDislike === false && this.settings.hideAll === false && this.settings.niceTable === false) {
            this.jQuery('#trainerimage').removeClass('qolpartyclickhide');
            this.jQuery('#profilebox').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
            this.jQuery('#partybox .party>div>.action.working').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').removeClass('qolpartyclickwidth');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').removeClass('qolpartyclickblock');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickalot');
            this.jQuery('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
            this.jQuery('.mu_navlink.next').removeClass('qolpartyclicknav');
            this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            this.jQuery('#multiuser.tabbed_interface.horizontal>ul').removeClass('qolpartyclickul');
            this.jQuery('#multiuser.tabbed_interface>ul>li>label').removeClass('qolpartyclicklilabel');
            this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons').removeClass('qolpartyclicktextalign');
        }

        if (this.settings.hideDislike === true) {
            this.jQuery('#trainerimage').removeClass('qolpartyclickhide');
            this.jQuery('#profilebox').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
            this.jQuery('#partybox .party>div>.action.working').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').removeClass('qolpartyclickwidth');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').removeClass('qolpartyclickblock');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickalot');
            this.jQuery('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
            this.jQuery('.mu_navlink.next').removeClass('qolpartyclicknav');
            this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            this.jQuery('#multiuser.tabbed_interface.horizontal>ul').removeClass('qolpartyclickul');
            this.jQuery('#multiuser.tabbed_interface>ul>li>label').removeClass('qolpartyclicklilabel');
            this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons').addClass('qolpartyclicktextalign');
            this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').addClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').addClass('qolpartyclickwidth');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').addClass('qolpartyclickblock');
        }

        if (this.settings.niceTable === true) {
            this.jQuery('#trainerimage').removeClass('qolpartyclickhide');
            this.jQuery('#profilebox').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
            this.jQuery('#partybox .party>div>.action.working').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').removeClass('qolpartyclickwidth');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').removeClass('qolpartyclickblock');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickalot');
            this.jQuery('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
            this.jQuery('.mu_navlink.next').removeClass('qolpartyclicknav');
            this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            this.jQuery('#multiuser.tabbed_interface.horizontal>ul').removeClass('qolpartyclickul');
            this.jQuery('#multiuser.tabbed_interface>ul>li>label').removeClass('qolpartyclicklilabel');
            this.jQuery('.party>div>.action>.berrybuttons').removeClass('qolpartyclicktextalign');
            this.jQuery('#multiuser .pkmn').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .party').addClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').addClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').addClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').addClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').addClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').addClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').addClass('qolpartyclickborderfive');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').addClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons').addClass('qolpartyclicktextalign');
            this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').addClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').addClass('qolpartyclickwidth');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').addClass('qolpartyclickblock');
        }


        if (this.settings.hideAll === true) {
            this.jQuery('.party>div>.action>.berrybuttons').removeClass('qolpartyclicktextalign');
            this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').removeClass('qolpartyclickwidth');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').removeClass('qolpartyclickblock');
            this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
            this.jQuery('#trainerimage').addClass('qolpartyclickhide');
            this.jQuery('#profilebox').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .pkmn').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').addClass('qolpartyclickhide');
            this.jQuery('#partybox .party>div>.action.working').addClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').addClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').addClass('qolpartyclickwidth');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').addClass('qolpartyclickblock');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .party>div').addClass('qolpartyclickalot');
            this.jQuery('#multiuser .party>div>.action a[data-berry]').addClass('qolpartyclickz');
            this.jQuery('.mu_navlink.next').addClass('qolpartyclicknav');
            this.jQuery('#multiuser .party').addClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').addClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').addClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').addClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').addClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').addClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').addClass('qolpartyclickborderfive');
            this.jQuery('#multiuser.tabbed_interface.horizontal>ul').addClass('qolpartyclickul');
            this.jQuery('#multiuser.tabbed_interface>ul>li>label').addClass('qolpartyclicklilabel');
        }
    }
}
/* globals Page */
const FarmBase = Page;

// eslint-disable-next-line no-unused-vars
class FarmPage extends FarmBase {
    DEFAULT_SETTINGS(GLOBALS) {
        let d = { TYPE_APPEND: {} };
        // .TYPE_APPEND needs to be fully defined before it can be used in kNOWN_EXCEPTIONS
        for (let i = 0; i < GLOBALS.TYPE_LIST.length; i++) {
            let type = GLOBALS.TYPE_LIST[i];
            d.TYPE_APPEND[type.toUpperCase()] = '.' + i;
        }
        d.TYPE_APPEND['NONE'] = '.' + GLOBALS.TYPE_LIST.length;
        d.KNOWN_EXCEPTIONS = {
            'Gastrodon [Orient]': [d.TYPE_APPEND['WATER'], d.TYPE_APPEND['GROUND']],
            'Gastrodon [Occident]': [d.TYPE_APPEND['WATER'], d.TYPE_APPEND['GROUND']],
            'Wormadam [Plant Cloak]': [d.TYPE_APPEND['BUG'], d.TYPE_APPEND['GRASS']],
            'Wormadam [Trash Cloak]': [d.TYPE_APPEND['BUG'], d.TYPE_APPEND['STEEL']],//, d.['GRASS']],
            'Chilldoom': [d.TYPE_APPEND['DARK'], d.TYPE_APPEND['ICE']],
            'Raticate [Alolan Forme]': [d.TYPE_APPEND['DARK'], d.TYPE_APPEND['NORMAL']],
            'Ninetales [Alolan Forme]': [d.TYPE_APPEND['ICE'], d.TYPE_APPEND['FAIRY']],
            'Exeggutor [Alolan Forme]': [d.TYPE_APPEND['GRASS'], d.TYPE_APPEND['DRAGON']],
            'Marowak [Alolan Forme]': [d.TYPE_APPEND['FIRE'], d.TYPE_APPEND['GHOST']],
            'Dugtrio [Alolan Forme]': [d.TYPE_APPEND['GROUND'], d.TYPE_APPEND['STEEL']],
            'Graveler [Alolan Forme]': [d.TYPE_APPEND['ROCK'], d.TYPE_APPEND['ELECTRIC']],
            'Golem [Alolan Forme]': [d.TYPE_APPEND['ROCK'], d.TYPE_APPEND['ELECTRIC']],
            'Muk [Alolan Forme]': [d.TYPE_APPEND['POISON'], d.TYPE_APPEND['DARK']],
            'Raichu [Alolan Forme]': [d.TYPE_APPEND['ELECTRIC'], d.TYPE_APPEND['PSYCHIC']],
        };
        return d;
    }

    constructor(jQuery, GLOBALS, externals) {
        super(jQuery, 'QoLFarm', {}, 'farm#tab=1');
        this.defaultSettings = this.DEFAULT_SETTINGS(GLOBALS);
        this.settings = this.defaultSettings;
        this.evolveListCache = '';
        if (externals && externals.DexPageParser) {
            this.DexPageParser = externals.DexPageParser;
        }
        // if(externals) {
        //     for(let key in externals) {
        //         this[key] = externals[key];
        //     }
        // }
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function (mutation) {
                obj.easyQuickEvolve();
            });
        });
    }
    setupHTML() {
        const obj = this;
        this.jQuery(document).ready(function () {
            obj.jQuery('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
            document.querySelector('#farm-evolve>h3').insertAdjacentHTML('afterend',
                '<label id="qolevolvenormal"><input type="button" class="qolsortnormal" value="Normal list"/></label><label id="qolchangesletype"><input type="button" class="qolsorttype" value="Sort on types"/></label><label id="qolsortevolvename"><input type="button" class="qolsortname" value="Sort on name"/></label><label id="qolevolvenew"><input type="button" class="qolsortnew" value="New dex entry"/>');
            // use the evolve button
            obj.jQuery('#farmnews-evolutions>p>label>input').addClass('qolquickevo');
        });
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#farmnews-evolutions'), {
            childList: true,
            characterdata: true,
            subtree: true,
            characterDataOldValue: true,
        });
    }
    setupHandlers(GLOBALS) {
        const obj = this;
        obj.jQuery(document).on('click', '#qolevolvenormal', (function () {
            obj.easyEvolveNormalList(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#qolchangesletype', (function () {
            obj.easyEvolveTypeList(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#qolsortevolvename', (function () {
            obj.easyEvolveNameList(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#qolevolvenew', (function () {
            obj.easyEvolveNewList(GLOBALS);
        }));
    }

    clearSortedEvolveLists() {
        // first remove the sorted pokemon type list to avoid duplicates
        this.jQuery('.evolvepkmnlist').show();
        this.jQuery('.evolvepkmnlist').removeAttr('class');
        if (document.querySelector('.qolEvolveTypeList')) {
            document.querySelector('.qolEvolveTypeList').remove();
        }
        if (document.querySelector('.qolEvolveNameList')) {
            document.querySelector('.qolEvolveNameList').remove();
        }
        if (document.querySelector('.qolEvolveNewList')) {
            document.querySelector('.qolEvolveNewList').remove();
        }
    }
    checkForValidDexData(GLOBALS) {
        if (GLOBALS.DEX_DATA === undefined) {
            window.alert('Pokedex data is not currently loaded. Please load by pressing "Update Pokedex" in the QoL Hub');
        } else if (GLOBALS.DEX_DATA === null) {
            window.alert('Pokedex data is not currently loaded. Please load by pressing "Update Pokedex" in the QoL Hub');
        }
    }
    easyEvolveNormalList(GLOBALS) {
        this.clearSortedEvolveLists();
        this.checkForValidDexData(GLOBALS);
    }
    easyEvolveTypeList(GLOBALS) {
        const obj = this;
        obj.checkForValidDexData(GLOBALS);
        let dexData = GLOBALS.DEX_DATA;

        if (!GLOBALS.REGIONAL_FORMS_LIST && localStorage.getItem('QoLRegionalFormsList')) {
            GLOBALS.REGIONAL_FORMS_LIST = JSON.parse(localStorage.getItem('QoLRegionalFormsList'));
        }
        let regionalFormList = GLOBALS.REGIONAL_FORMS_LIST;

        if (!regionalFormList) {
            window.alert('Message from QoL script:\nUnable to load list of regional forms. ' +
                'The list will be sorted by types, but there may be mistakes. ' +
                'Please clear and reload your pokedex data by clicking the "Clear Cached Dex" ' +
                'and then clicking the "Update Pokedex" button in the QoL Hub.');
        }

        this.clearSortedEvolveLists();

        let typeBackground = obj.jQuery('.panel>h3').css('background-color');
        obj.jQuery('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', GLOBALS.TEMPLATES.evolveFastHTML);

        let typeBorder = obj.jQuery('.panel>h3').css('border');
        let typeColor = obj.jQuery('.panel>h3').css('color');
        obj.jQuery('.expandlist').css('background-color', '' + typeBackground + '');
        obj.jQuery('.expandlist').css('border', '' + typeBorder + '');
        obj.jQuery('.expandlist').css('color', '' + typeColor + '');

        let typeListBackground = obj.jQuery('.tabbed_interface>div').css('background-color');
        let typeListColor = obj.jQuery('.tabbed_interface>div').css('color');
        obj.jQuery('.qolChangeLogContent').css('background-color', '' + typeListBackground + '');
        obj.jQuery('.qolChangeLogContent').css('color', '' + typeListColor + '');

        /*
          Nested helper function
        */
        const findDivCoreIndex = function ($, html) {
            for (let j = 0; j < html.length; j++) {
                if ($(html[j]).is('div#core')) {
                    return j;
                }
            }
            return -1;
        };

        const loadEvolutionOriginTypes = function ($, evoUrl) {
            let species = '';
            let types = [];
            let inDex = false;
            // load the pokemon's species and set the pokemon's name to the species name for the rest of this loop
            loadSummaryPage($, evoUrl, (data) => {
                let html = obj.jQuery.parseHTML(data);
                // first find the right element in html to read from
                let htmlIndex = findDivCoreIndex($, html);
                if (!logErrorIfIndexNegativeOne(htmlIndex, `Unable to find species name on ${evoUrl}.`)) {
                    let links = Array.from(html[htmlIndex].querySelectorAll('#pkmnspecdata>p>a'));
                    // find the link that to the species page
                    let speciesIndex = links.findIndex((lnk) => lnk.getAttribute('href').match(/\/dex\/.*/));
                    // if the link is found, load the types
                    if (!logErrorIfIndexNegativeOne(speciesIndex,
                        `Unable to determine species of pokemon from ${evoUrl}.`)) {
                        species = links[speciesIndex].text;
                        types = getTypesFromSummaryData(html[htmlIndex]).map((t) => '' + t);
                        inDex = true;
                    } // speciesIndex > -1
                } // htmlIndex > -1
            }); // load
            return {
                status: inDex,
                types: types,
                species: species
            };
        };

        const loadEvolutionOriginDexNumber = function ($, evoUrl) {
            let dexNumber = '';
            loadSummaryPage($, evoUrl, (data) => {
                let html = obj.jQuery.parseHTML(data);
                let htmlIndex = findDivCoreIndex($, html);
                if (!logErrorIfIndexNegativeOne(htmlIndex,
                    `Unable to find find dex number in summary page ${evoUrl}.`)) {
                    dexNumber = getDexNumberFromSummaryData(html[htmlIndex]);
                }
            });
            return dexNumber;
        };

        const loadDataFromEvolutionOriginDexPage = function ($, dexPageParser, typeList, number, name) {
            let evolutions = {};
            let status = false;
            let types = [];
            loadDexPage($, number, name, (data) => {
                // Kill two birds with one stone: 1) get the evolutions, and 2) check that
                // evolveTypePrevOne and evolveTypePrevTwo are correct
                let html = $.parseHTML(data);
                // first find the right element in html to read from
                let htmlIndex = findDivCoreIndex($, html);
                if (!logErrorIfIndexNegativeOne(htmlIndex, `Unable to find evolutions for ${name}.`)) {
                    html = html[htmlIndex];
                    // Get the evolutions from the dex page
                    let evosSpans = html.querySelectorAll('.evolutiontree>ul>li>.name');
                    evosSpans.forEach((e) => {
                        if (e.querySelector('a')) {
                            let evoNumber = e.querySelector('a').attributes['href'].value.substr(5);
                            let evoName = e.textContent;
                            evolutions[evoNumber] = evoName;
                            evolutions[evoName] = evoNumber;
                        } else {
                            console.log('bang');
                        }
                    });
                    status = true;

                    // Get the types
                    types = getTypesFromDexPage(dexPageParser, typeList, $(html)).map((t) => '' + t);
                } // htmlIndex > -1
            }); // loadDexPage
            return {
                status: status,
                evolutions: evolutions,
                types: types
            };
        };

        const loadDataFromEvolutionDestinationDexPage = function ($, dexPageParser, typeList, number, name) {
            let status = false;
            let types = [];
            // Load dex page for the match
            loadDexPage($, number, name, (data) => {
                let html = obj.jQuery.parseHTML(data);
                let htmlIndex = findDivCoreIndex($, html);
                if (!logErrorIfIndexNegativeOne(htmlIndex,
                    `Unable to find dex details on dex page for pokedex number ${number}`)) {
                    types = getTypesFromDexPage(dexPageParser, typeList, $(html[htmlIndex])).map((t) => '' + t);
                    status = true;
                }
            });
            return {
                status: status,
                types: types
            };
        };

        const getEvolutionOrigin = function (evoString) {
            const summary = '/summary/';
            const originStart = evoString.indexOf(summary) + summary.length + 7;
            const originEnd = evoString.indexOf('</a>');
            return evoString.substring(originStart, originEnd);
        };

        const getEvolutionDestination = function (evoString) {
            const destStart = evoString.indexOf('into</span> ') + 12;
            return evoString.substr(destStart);
        };

        const getEvolutionURL = function (evoString) {
            const href = 'href="';
            const urlStart = evoString.indexOf(href) + href.length;
            const urlLength = '/summary/AAAAA'.length;
            return evoString.substr(urlStart, urlLength);
        };

        const logErrorIfIndexNegativeOne = function (index, msg) {
            if (index === -1) {
                console.error(msg);
                return true;
            }
            return false;
        };

        const loadSummaryPage = function ($, urlSuffix, success) {
            // urlSuffix is the part of the url after https://pokefarm.com/
            $.ajax({
                type: 'GET',
                url: 'https://pokefarm.com' + urlSuffix,
                async: false,
                success: success,
                // eslint-disable-next-line no-unused-vars
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error(`Unable to load the summary page ${urlSuffix}.`);
                },
            });
        };

        const loadDexPage = function ($, dexNumber, name, success) {
            let url = 'https://pokefarm.com/dex/' + dexNumber;
            $.ajax({
                type: 'GET',
                url: url,
                async: false,
                success: success,
                // eslint-disable-next-line no-unused-vars
                error: function (jqXHR, textStatus, errorThrown) {
                    const msg = `Unable to load the Pokedex page for ${name} (${url}).`;
                    console.error(msg);
                },
            });
        };

        const getTypesFromSummaryData = function (html) {
            let typeImgs = Array.from(html.querySelectorAll('.type>img'));
            let typeUrls = typeImgs.map((e) => e['src']);
            let types = typeUrls.map((url) =>
                url.substring(url.indexOf('types/') + 'types/'.length,
                    url.indexOf('.png')));
            types = types.map((type) => type.charAt(0).toUpperCase() + type.substring(1));
            types = types.map((type) => GLOBALS.TYPE_LIST.indexOf(type));
            return types;
        };

        const getTypesFromDexPage = function (DexPageParser, typeList, html) {
            return DexPageParser.parseTypesFromDexPage(html, typeList);
        };

        const getDexNumberFromSummaryData = function (html) {
            const link = html.querySelector('#pkmnspecdata>p>a');
            return link.getAttribute('href').substring('/dex/'.length);
        };

        const addToKnownExceptions = function (name, type1, type2) {
            // add the exception to the known exceptions list
            obj.settings.KNOWN_EXCEPTIONS[name] = [type1];

            if (type2) {
                obj.settings.KNOWN_EXCEPTIONS[name].push(type2);
            }

            obj.saveSettings();
        };

        const appendDeltaTypeIfDelta = function ($, evoString, elemToAppendTo) {
            if (evoString.includes('title="[DELTA')) {
                let deltaType = evoString.match('DELTA-(.*)]">');
                $(elemToAppendTo).clone().appendTo(obj.settings.TYPE_APPEND[deltaType[1]]);
            }
        };

        obj.jQuery('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function () {
            // getting the <li> element from the pokemon & the pokemon evolved name
            let getEvolveString = obj.jQuery(this).html();
            let previousPokemon = getEvolutionOrigin(getEvolveString);
            let evolvePokemon = getEvolutionDestination(getEvolveString);
            let evoUrl = getEvolutionURL(getEvolveString);

            // Handle unicode characters
            previousPokemon = previousPokemon.replace(/é/g, '\\u00e9');

            let previousInDex = dexData.indexOf('"' + previousPokemon + '"') != -1;
            let evolveInDex = dexData.indexOf('"' + evolvePokemon + '"') != -1;
            let hasRegionalForms = regionalFormList && Object.prototype.hasOwnProperty.call(regionalFormList, previousPokemon);
            let evolveTypesPrevious = [];
            let evolveTypes = [];

            /* Procedure
             * 1. Load types for the evolution origin
             *    a. If it is not in the dex, or if it has regional forms, load the types from the pokemon's summary page
             *    b. If it is in the dex and if it does not have regional forms, load the types from the dex data
             * 2. If step 1.a or 1.b succeeded, load types for the evolution destination
             *    a. If the destination pokemon is in the dex, load the types from the dex
             *    b. Else, if the destination pokemon is one of the "known exceptions", load the types from KNOWN_EXCEPTIONS
             *    c. Else, load the destination pokemon's types by:
             *       i. Getting the origin pokemon's dex number from its summary page
             *       ii. Loading the list of the origin pokemon's evolutions from its dex page
             *       iii. Finding the dex number for the destination pokemon from the list
             *       iv. Loading the destination pokemon's type from its dex page using the dex number found in step 2.c.iii
             * 3. Use types to apply HTML classes to the list item that contains the current evolution
             *    a. Use the evolution origin's and destination's types as HTML classes
             *    b. If the origin pokemon is a Delta mon, use the delta type as an HTML class as well
             */

            // Step 1.a
            if (!previousInDex || hasRegionalForms) {
                let data = loadEvolutionOriginTypes(obj.jQuery, evoUrl);
                if (data.status) {
                    previousInDex = data.status;
                    previousPokemon = data.species;
                    evolveTypesPrevious = data.types;
                }
            }
            // Step 1.b
            else {
                evolveTypesPrevious = [1, 2].map((i) => dexData[dexData.indexOf('"' + previousPokemon + '"') + i]);
            }

            // don't try to load types for evolution endpoint if steps 1.a and 1.b failed
            if (!previousInDex) {
                const msg = `Unable to find load types for evolution origin (${evolvePokemon}) in pokedex data, or unable to load it from PokeFarm Dex page`;
                console.error(msg);
                return; // 'continue' for .each()
            }

            // will only get here if 1.a or 1.b succeeded
            if (!evolveInDex) {
                // Step 2.b
                if (evolvePokemon in obj.settings.KNOWN_EXCEPTIONS) {
                    evolveTypes = obj.settings.KNOWN_EXCEPTIONS[evolvePokemon].map((t) => '' + t);
                    evolveInDex = true;
                }
                // Step 2.c
                else {
                    // Get the dex number for previousPokemon
                    let dexNumber = loadEvolutionOriginDexNumber(obj.jQuery, evoUrl);

                    // Load the dex page for previousPokemon
                    let dexInfo = loadDataFromEvolutionOriginDexPage(obj.jQuery, obj.DexPageParser, GLOBALS.TYPE_LIST, dexNumber, previousPokemon);
                    let evolutions = {};
                    if (dexInfo.status) {
                        evolveInDex = dexInfo.status;
                        evolutions = dexInfo.evolutions;
                        evolveTypesPrevious = dexInfo.types;
                    }

                    if (evolveInDex && Object.keys(evolutions).indexOf(evolvePokemon) > -1) {
                        let info = loadDataFromEvolutionDestinationDexPage(obj.jQuery, obj.DexPageParser, GLOBALS.TYPE_LIST, evolutions[evolvePokemon], evolvePokemon);
                        if (info.status) {
                            evolveInDex = info.status;
                            evolveTypes = info.types;
                            addToKnownExceptions(evolvePokemon, evolveTypes[0],
                                evolveTypes.length > 1 && evolveTypes[1]);
                        }
                    } else {
                        const msg = `An error occurred when processing ${evolvePokemon}`;
                        console.error(msg);
                    }
                } // else ( if(evolvePokemon in obj.settings.KNOWN_EXCEPTIONS) )
            }
            // Step 2.a
            else {
                evolveTypes = [1, 2].map((i) => dexData[dexData.indexOf('"' + evolvePokemon + '"') + i]);
            }

            if (!evolveInDex) {
                const msg = `Unable to find pokemon evolving to (${evolvePokemon}) in pokedex data, or unable to load it from PokeFarm Dex page`;
                console.error(msg);
                return; // 'continue' for .each()
            }

            // the evolveTypes and evolveTypesPrevious entries can begin with a '.'
            // in some cases. Just strip it off
            evolveTypesPrevious = evolveTypesPrevious.map((t) => t.replace('.', ''));
            evolveTypes = evolveTypes.map((t) => t.replace('.', ''));

            // filter out invalid 2nd types (will be -1)
            evolveTypesPrevious = evolveTypesPrevious.filter((t) => t !== '-1');
            evolveTypes = evolveTypes.filter((t) => t !== '-1');

            // append types to DOM
            const elem = this;
            evolveTypes.map((t) => {
                obj.jQuery(elem).clone().appendTo('.' + t);
            });
            evolveTypesPrevious.map((t) => {
                if (!isNaN(parseInt(t)) && parseInt(t) > -1 && evolveTypes.indexOf(t) == -1) {
                    obj.jQuery(elem).clone().appendTo('.' + t);
                }
            });

            appendDeltaTypeIfDelta(obj.jQuery, getEvolveString, this);
        }); // each

        obj.jQuery('#farmnews-evolutions>.scrollable>.qolEvolveTypeList>Li').each(function () {
            let amountOfEvolves = obj.jQuery(this).children().children().length;
            let evolveTypeName = obj.jQuery(this).children('.slidermenu').html();

            // hide the types with no evolutions
            if (amountOfEvolves === 0) {
                this.nextSibling.hidden = true;
                this.hidden = true;
            } else {
                obj.jQuery(this).children('.slidermenu').html(evolveTypeName + ' (' + amountOfEvolves + ')');
            }
        });

        obj.jQuery('.evolvepkmnlist').hide();
    }
    easyEvolveNameList() {
        const obj = this;
        this.clearSortedEvolveLists();

        this.jQuery('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNameList">');

        let errorOccurred = false;
        this.jQuery('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function (index) {
            // getting the <li> element from the pokemon & the pokemon evolved name
            let getEvolveString = obj.jQuery(this).html();
            if (getEvolveString === undefined || getEvolveString === '') {
                console.error(`Unable to parse html from <li> at index ${index}`);
                errorOccurred = true;
            } else {
                let beforeEvolvePokemon = obj.jQuery(this).children().children().text().slice(0, -6);
                if (beforeEvolvePokemon === undefined || beforeEvolvePokemon === '') {
                    console.error(`Unable to parse pokemon-evolving-from from <li> at index ${index}`);
                    errorOccurred = true;
                } else {
                    // remove extraneous whitespace
                    beforeEvolvePokemon = beforeEvolvePokemon.trim();
                    // use a regex to find extra whitespace between words
                    let whitespace = beforeEvolvePokemon.match(/\s{2,}/g);
                    while (whitespace) {
                        for (let i = whitespace.length - 1; i >= 0; i--) {
                            let match = whitespace[i];
                            beforeEvolvePokemon = beforeEvolvePokemon.replace(match, ' ');
                        }
                        whitespace = beforeEvolvePokemon.match(/\s{2,}/g);
                    }
                    let evolvePokemon = getEvolveString.substr(getEvolveString.indexOf('into</span> ') + 12);
                    if (evolvePokemon === undefined || evolvePokemon === '') {
                        console.error(`Unable to parse pokemon-evolving-to from <li> at index ${index}`);
                        errorOccurred = true;
                    } else {
                        whitespace = evolvePokemon.match(/\s{2,}/g);
                        // remove extraneous whitespace
                        evolvePokemon = evolvePokemon.trim();
                        // use a regex to find extra whitespace between words
                        let whitespace = evolvePokemon.match(/\s{2,}/g);
                        while (whitespace) {
                            for (let i = whitespace.length - 1; i >= 0; i--) {
                                let match = whitespace[i];
                                evolvePokemon = evolvePokemon.replace(match, ' ');
                            }
                            whitespace = evolvePokemon.match(/\s{2,}/g);
                        }
                        // Replace all spaces with a character that is not part of any Pokemon's name, but is valid in a CSS selector
                        let evolvePokemonClass = evolvePokemon.replace(/ /g, '_').replace('[', '').replace(']', '').replace(/\./g, '');
                        if (evolvePokemonClass === undefined || evolvePokemonClass === '') {
                            console.error(`Unable to create valid CSS class for pokemon-evolving-to from <li> at index ${index}`);
                            errorOccurred = true;
                        } else {
                            if (obj.jQuery('#farmnews-evolutions>.scrollable>.qolEvolveNameList>Li>Ul').hasClass(evolvePokemonClass) === false) {
                                document.querySelector('.qolEvolveNameList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">' +
                                    beforeEvolvePokemon + ' > ' + evolvePokemon +
                                    '</h3><ul class="' + evolvePokemonClass +
                                    ' qolChangeLogContent"></ul></li><br>');
                            } // class
                            obj.jQuery(this).clone().appendTo('.' + evolvePokemonClass + '');
                        } // evolvePokemonClass
                    } // evolvePokemon
                } // beforeEvolvePokemon
            } // getEvolveString
        });

        if (errorOccurred) {
            window.alert('Error occurred while sorting pokemon by name');
            return;
        }

        obj.jQuery('#farmnews-evolutions>.scrollable>.qolEvolveNameList>Li').each(function (index) {
            let amountOfEvolves = obj.jQuery(this).children().children().length;
            if (amountOfEvolves === 0) {
                console.error(`Found 0 evolutions for <li> at ${index} of evolve name list`);
                errorOccurred = true;
            } else {
                let getEvolveString = obj.jQuery(this).children().children().html();
                if (getEvolveString === undefined || getEvolveString === '') {
                    console.error(`Unable to parse evolve string from <li> at ${index} from evolve name list`);
                    errorOccurred = true;
                } else {
                    let beforeEvolvePokemon = obj.jQuery(this).children().children().children().children().first().text(); // .split(' ').join('');

                    if (beforeEvolvePokemon === undefined || beforeEvolvePokemon === '') {
                        console.error(`Unable to parse pokemon-evolving-from from <li> at ${index} from evolve name list`);
                        errorOccurred = true;
                    } else {
                        let evolvePokemon = getEvolveString.substr(getEvolveString.indexOf('into</span> ') + 'into</span> '.length);
                        if (evolvePokemon === undefined || evolvePokemon === '') {
                            console.error(`Unable to parse pokemon-evolving-to from <li> at ${index} from evolve name list`);
                            errorOccurred = true;
                        } else {
                            obj.jQuery(this).children('.slidermenu').html(beforeEvolvePokemon + ' > ' + evolvePokemon + ' (' + amountOfEvolves + ')');
                        }
                    }
                } // getEvolveString
            } // amountOfEvolves
        });

        obj.jQuery('.evolvepkmnlist').hide();

        if (errorOccurred) {
            window.alert('Error occurred while sorting pokemon by name');
            return;
        }

        //layout of the created html
        let typeBackground = obj.jQuery('.panel>h3').css('background-color');
        let typeBorder = obj.jQuery('.panel>h3').css('border');
        let typeColor = obj.jQuery('.panel>h3').css('color');
        obj.jQuery('.expandlist').css('background-color', '' + typeBackground + '');
        obj.jQuery('.expandlist').css('border', '' + typeBorder + '');
        obj.jQuery('.expandlist').css('color', '' + typeColor + '');

        let typeListBackground = obj.jQuery('.tabbed_interface>div').css('background-color');
        let typeListColor = obj.jQuery('.tabbed_interface>div').css('color');
        obj.jQuery('.qolChangeLogContent').css('background-color', '' + typeListBackground + '');
        obj.jQuery('.qolChangeLogContent').css('color', '' + typeListColor + '');
    }
    easyEvolveNewList(GLOBALS) {
        const obj = this;
        let dexData = GLOBALS.DEX_DATA;

        this.clearSortedEvolveLists();

        // add a class to the original pokemon evolve list to be able to manipulate the element more easily and add the ul for the new dex search
        this.jQuery('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNewList">');

        const getNewCheckData = (name) => {
            const nameIndex = dexData.indexOf('"' + name + '"');
            const checkData = (nameIndex > -1 && dexData.length > nameIndex + 9) ?
                dexData.slice(nameIndex + 5, nameIndex + 10) :
                [undefined, undefined, undefined, undefined, undefined];
            if (checkData[4] !== undefined) {
                checkData[4] = checkData[4].replace(']', '');
            }
            return checkData;
        };

        const createListElements = (jQuery, cls, header, name, elem) => {
            if(jQuery('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass(cls) === false) {
                let html = '<li class="expandlist">' + 
                `<h3 class="slidermenu">${header}</h3>` + 
                `<ul class="${cls} qolChangeLogContent"></ul></li><br>`;
                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', html);
            }

            if(jQuery(`#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.${cls}>li:contains(${name})`).length == 0) {
                jQuery(elem).clone().appendTo(`.${cls}`);
            }
        };
        
        this.jQuery('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function () { //the actual search
            // getting the <li> element from the pokemon & the pokemon evolved name
            let getEvolveString = obj.jQuery(this).html();

            // every pokemon is a normal unless shiny, albino or melanistic pokemon is found
            let pokemonIsNormal = true;
            let pokemonIsShiny = false;
            let pokemonIsAlbino = false;
            let pokemonIsMelanistic = false;

            if (getEvolveString.includes('title="[SHINY]')) {
                pokemonIsShiny = true;
                pokemonIsNormal = false;
            }
            if (getEvolveString.includes('title="[ALBINO]')) {
                pokemonIsAlbino = true;
                pokemonIsNormal = false;
            }
            if (getEvolveString.includes('title="[MELANISTIC]')) {
                pokemonIsMelanistic = true;
                pokemonIsNormal = false;
            }

            let evolvePokemonName = getEvolveString.substr(getEvolveString.indexOf('into</span> ') + 12);
            // remove extraneous whitespace
            evolvePokemonName = evolvePokemonName.trim();
            // use a regex to find extra whitespace between words
            let whitespace = evolvePokemonName.match(/\s{2,}/g);
            while (whitespace) {
                for (let i = whitespace.length - 1; i >= 0; i--) {
                    let match = whitespace[i];
                    evolvePokemonName = evolvePokemonName.replace(match, ' ');
                }
                whitespace = evolvePokemonName.match(/\s{2,}/g);
            }
            const evolvePokemonNameIndex = dexData.indexOf('"' + evolvePokemonName + '"');
            const evolvePokemonNameInDex = evolvePokemonNameIndex != -1;

            const [evolveNewTotal, evolveNewCheck,
                evolveNewShinyCheck, evolveNewAlbinoCheck,
                evolveNewMelaCheck] = getNewCheckData(evolvePokemonName);

            const [evolvePokemonNameOne, pokemonDexKeepSecondName,
                pokemonDexKeepThirdName, pokemonDexKeepFourthName,
                pokemonDexKeepFifthName, pokemonDexKeepSixthName] = evolvePokemonName.split(' ');
            const [evolveNewTotalOne, evolveNewCheckOne, /* ignore */, /* ignore */, /* ignore */] = getNewCheckData(evolvePokemonNameOne);
            // if a pokemon has a name like gligar [Vampire] it won't be found. This tries to change the name as it's recorded in the pokedex data array
            // The remaining checks are a (not great) way of checking for names with '/' in them.
            // PFQ uses '/' in the names of PFQ variants and in PFQ exclusives with multiple forms
            // Example of evolvePokemonNameTwoBefore: 'Gliscor/Vampire'
            // Regex: \w+/\w+
            const evolvePokemonNameTwo = (evolvePokemonNameOne + '/' + pokemonDexKeepSecondName).replace('[', '').replace(']', '');
            const [evolveNewTotalTwo, evolveNewCheckTwo,
                evolveNewShinyCheckTwo, evolveNewAlbinoCheckTwo,
                evolveNewMelaCheckTwo] = getNewCheckData(evolvePokemonNameTwo);

            // Example of evolvePokemonNameThreeBefore: 'Phasmaleef/Forest Forme\'
            // Regex: \w+/\w+ \w+
            const evolvePokemonNameThree = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName).replace('[', '').replace(']', '');
            const [evolveNewTotalThree, evolveNewCheckThree,
                evolveNewShinyCheckThree, evolveNewAlbinoCheckThree,
                evolveNewMelaCheckThree] = getNewCheckData(evolvePokemonNameThree);

            // Example of evolvePokemonNameFourBefore: 'Butterfree/Mega Forme Q'
            // Regex: \w+/\w+ \w+ \w+
            const evolvePokemonNameFour = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName).replace('[', '').replace(']', '');
            const [evolveNewTotalFour, evolveNewCheckFour,
                evolveNewShinyCheckFour, evolveNewAlbinoCheckFour,
                evolveNewMelaCheckFour] = getNewCheckData(evolvePokemonNameFour);

            // Example of evolvePokemonNameFiveBefore: 'Marowak/Alolan Mega Forme Q'
            // Regex: \w+/\w+ \w+ \w+ \w+
            const evolvePokemonNameFive = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName + ' ' +
                pokemonDexKeepFifthName).replace('[', '').replace(']', '');
            const [evolveNewTotalFive, evolveNewCheckFive,
                evolveNewShinyCheckFive, evolveNewAlbinoCheckFive,
                evolveNewMelaCheckFive] = getNewCheckData(evolvePokemonNameFive);

            // Couldn't find any examples of pokemon that match evolvePokemonNameSixBefore
            // Regex: \w+/\w+ \w+ \w+ \w+ \w+
            const evolvePokemonNameSix = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName + ' ' +
                pokemonDexKeepFifthName + ' ' +
                pokemonDexKeepSixthName).replace('[', '').replace(']', '');
            const [evolveNewTotalSix, evolveNewCheckSix,
                evolveNewShinyCheckSix, evolveNewAlbinoCheckSix,
                evolveNewMelaCheckSix] = getNewCheckData(evolvePokemonNameSix);

            //prep done now the search
            if (evolvePokemonNameInDex) { //Looks for the Pokémon name in which it evolves to check if it's in your Pokédex
                if (pokemonIsNormal == true) { //normal Pokémon search
                    if (evolveNewCheckOne == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewCheck && evolveNewCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements(obj.jQuery, 'newpossiblepokedexentry', 'Possible Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                } else if (pokemonIsShiny == true) { //shiny Pokemon search
                    if (evolveNewShinyCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewShinyCheck && evolveNewShinyCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements(obj.jQuery, 'newpossibleshinypokedexentry', 'Possible Shiny Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                } else if (pokemonIsAlbino == true) { //albino pokemon search
                    if (evolveNewAlbinoCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewAlbinoCheck && evolveNewAlbinoCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements(obj.jQuery, 'newpossiblealbinopokedexentry', 'Possible Albino Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                } else if (pokemonIsMelanistic == true) { //melanistic pokemon search
                    if (evolveNewMelaCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewMelaCheck && evolveNewMelaCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements(obj.jQuery, 'newpossiblemelanisticpokedexentry', 'Possible Melanistic Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                }

                //Looks for the Pokémon name in which it evolves to check if it's in your Pokédex
            } else {
                if (pokemonIsNormal == true) {
                    if (evolveNewCheckTwo == 0 || evolveNewCheckThree == 0 || evolveNewCheckFour == 0 || evolveNewCheckFive == 0 || evolveNewCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements(obj.jQuery, 'possiblealolan', 'Possible new Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements(obj.jQuery, 'possibledifferent', 'Possible new forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements(obj.jQuery, 'newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                        }

                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements(obj.jQuery, 'newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements(obj.jQuery, 'errornotfound', 'Error contact ECEInTheHole!', evolvePokemonName, this);
                    }
                } else if (pokemonIsShiny == true) {
                    if (evolveNewShinyCheckTwo == 0 || evolveNewShinyCheckThree == 0 || evolveNewShinyCheckFour == 0 || evolveNewShinyCheckFive == 0 || evolveNewShinyCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements(obj.jQuery, 'possibleshinyalolan', 'Possible new Shiny Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements(obj.jQuery, 'possibleshinydifferent', 'Possible new Shiny forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements(obj.jQuery, 'newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                        }
                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements(obj.jQuery, 'newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements(obj.jQuery, 'errornotfound', 'Error contact ECEInTheHole!', evolvePokemonName, this);
                    }
                } else if (pokemonIsAlbino == true) {
                    if (evolveNewAlbinoCheckTwo == 0 || evolveNewAlbinoCheckThree == 0 || evolveNewAlbinoCheckFour == 0 || evolveNewAlbinoCheckFive == 0 || evolveNewAlbinoCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements(obj.jQuery, 'possiblealbinoalolan', 'Possible new Albino Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements(obj.jQuery, 'possiblealbinodifferent', 'Possible new Albino forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements(obj.jQuery, 'newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                        }
                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements(obj.jQuery, 'newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements(obj.jQuery, 'errornotfound', 'Error contact ECEInTheHole!', evolvePokemonName, this);
                    }

                } else if (pokemonIsMelanistic == true) {
                    if (evolveNewMelaCheckTwo == 0 || evolveNewMelaCheckThree == 0 || evolveNewMelaCheckFour == 0 || evolveNewMelaCheckFive == 0 || evolveNewMelaCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements(obj.jQuery, 'possiblemelanalolan', 'Possible new Melanistic Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements(obj.jQuery, 'possiblemelandifferent', 'Possible new Melanistic forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements(obj.jQuery, 'newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                        }
                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements(obj.jQuery, 'newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements(obj.jQuery, 'errornotfound', 'Error contact ECEInTheHole!', evolvePokemonName, this);
                    }
                }
            }
        });

        obj.jQuery('.evolvepkmnlist').hide();

        //layout
        let typeBackground = obj.jQuery('.panel>h3').css('background-color');
        let typeBorder = obj.jQuery('.panel>h3').css('border');
        let typeColor = obj.jQuery('.panel>h3').css('color');
        obj.jQuery('.expandlist').css('background-color', '' + typeBackground + '');
        obj.jQuery('.expandlist').css('border', '' + typeBorder + '');
        obj.jQuery('.expandlist').css('color', '' + typeColor + '');

        let typeListBackground = obj.jQuery('.tabbed_interface>div').css('background-color');
        let typeListColor = obj.jQuery('.tabbed_interface>div').css('color');
        obj.jQuery('.qolChangeLogContent').css('background-color', '' + typeListBackground + '');
        obj.jQuery('.qolChangeLogContent').css('color', '' + typeListColor + '');
    }
    easyQuickEvolve() {
        if (this.jQuery('.canevolve:contains("evolved into")').parent().length != 0) {
            this.jQuery('.canevolve:contains("evolved into")').parent().remove();
        }
    }
}
/* globals Page */
const DaycareBase = Page;
// eslint-disable-next-line no-unused-vars
class DaycarePage extends DaycareBase {
    constructor(jQuery, GLOBALS) {
        super(jQuery, 'QoLDaycare', {}, 'daycare');
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                let fsPokemon = document.querySelector('#fs_pokemon');
                if (fsPokemon !== null &&
                    obj.jQuery.contains(fsPokemon, mutation.target)) {
                    obj.customSearch(GLOBALS);
                }
            });
        });
    } // constructor

    setupObserver() {
        this.observer.observe(document.querySelector('body'), {
            childList: true,
            subtree: true
        });
    }
    customSearch(GLOBALS) {
        const obj = this;
        const button = document.querySelector('#pkmnadd');

        let gender = null;
        let eggGroup1 = null, eggGroup2 = null;

        if (button !== null) {
            if (button.attributes['data-gender'] !== undefined) {
                gender = button.attributes['data-gender'].value;
            }
            // the egg group is binary coded decimal
            // if a pokemon has two egg groups, the leftmost 4 bits of the number returned
            // are the first egg group and the rightmost 4 bits are the second egg group
            if (button.attributes['data-egggroup'] !== undefined) {
                eggGroup1 = parseInt(button.attributes['data-egggroup'].value);
                if (eggGroup1 > 15) { // two egg groups
                    eggGroup2 = eggGroup1 & 15;
                    eggGroup1 = eggGroup1 >> 4;
                }
            }
        }

        const EGG_ID_TO_NAME = GLOBALS.EGG_GROUP_ID_TO_NAME;
        if (eggGroup1 !== null) { eggGroup1 = EGG_ID_TO_NAME[eggGroup1]; }
        if (eggGroup2 !== null) { eggGroup2 = EGG_ID_TO_NAME[eggGroup2]; }

        // clear matches
        obj.jQuery('.daycarefoundme').removeClass('daycarefoundme');

        if (gender !== null && eggGroup1 !== null) {
            const fieldmons = document.querySelectorAll('.fieldmon');
            if (fieldmons !== null) {
                for (let m = 0; m < fieldmons.length; m++) {
                    let mon = fieldmons[m];
                    let searchPokemonBigImg = obj.jQuery(mon)[0].childNodes[0];
                    let searchPokemon = searchPokemonBigImg.alt;

                    let tooltip = obj.jQuery(mon).next();
                    let fieldmontip = tooltip[0].querySelector('.fieldmontip');
                    let speciesDiv = obj.jQuery(fieldmontip).children(':contains(Species)')[0];
                    let eggGroupDiv = obj.jQuery(fieldmontip).children(':contains(Egg Group)')[0];
                    let searchIcons = speciesDiv.querySelector('span').querySelectorAll('img');

                    // There can be other icons if the Pokemon is CS/Delta/Shiny/Albino/Melan
                    // The gender title can be "[M], [F], [N]"
                    let searchGender = searchIcons[0].title.toLowerCase().substring(1, 2);
                    let searchEggGroups = obj.jQuery(eggGroupDiv).text().slice('Egg Group: '.length).split('/');

                    // Match Ditto in Daycare to anything that can breed
                    if (gender === 'd' && eggGroup1 === 'Ditto' &&
                        searchPokemon !== 'Ditto' && searchEggGroups[0] !== 'Undiscovered') {
                        obj.jQuery(searchPokemonBigImg).addClass('daycarefoundme');
                    }
                    // Match Ditto in field to anything that can breed
                    else if (eggGroup1 !== 'Ditto' && searchPokemon === 'Ditto' && eggGroup1 !== 'Undiscovered') {
                        obj.jQuery(searchPokemonBigImg).addClass('daycarefoundme');
                    }
                    // Match correct gender
                    else {
                        let genderCorrect = (gender === 'f' && searchGender === 'm') ||
                            (gender === 'm' && searchGender === 'f');
                        let group1Correct = searchEggGroups.reduce((res, curr) => { res = res || (eggGroup1 === curr); return res; }, false);
                        let group2Correct = false;
                        if (eggGroup2 !== null) {
                            group2Correct = searchEggGroups.reduce((res, curr) => { res = res || (eggGroup2 === curr); return res; }, false);
                        }

                        if (genderCorrect && (group1Correct || group2Correct)) {
                            obj.jQuery(searchPokemonBigImg).addClass('daycarefoundme');
                        }
                    }

                } // for
            }
        } // if
    } // customSearch
}
/* globals Page */
const DexBase = Page;

// eslint-disable-next-line no-unused-vars
class DexPage extends DexBase {
    constructor(jQuery) {
        super(jQuery, 'QoLDexPage', {}, '/dex');
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function (mutation) {
                obj.applyTypeFilters();
            });
        });
        this.typeArray = [];
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#regionslist'), {
            childList: true,
            subtree: true,
        });
    }
    setupHTML() {
        const elem = document.querySelector('.filter-type');
        const clone = elem.cloneNode(true);
        elem.parentNode.appendChild(clone);
        // can't remove filter-type class or else the filtering
        // won't look right
        this.jQuery(clone).addClass('filter-type-2');
    }

    setupHandlers() {
        const obj = this;
        var h = obj.jQuery.parseJSON(obj.jQuery('#dexdata').html());
        const type2 = obj.jQuery('.filter-type-2');
        const l = obj.jQuery('.filter-type-2 .types');
        const c = l.children();

        const typesSpan = obj.jQuery('.filter-type-2 .types');

        type2.on('mousedown.dextfilter touchstart.dextfilter', function (event) {
            event.preventDefault();
            var leftedge = typesSpan.offset().left;
            var width = typesSpan.width();
            var rightedge = leftedge + width;
            var xLocation = (event.originalEvent.touches ? event.originalEvent.touches[0] : event).pageX;
            if (xLocation >= leftedge & xLocation < rightedge) {
                xLocation -= leftedge;
                xLocation = Math.floor(xLocation / width * c.length);
                xLocation = c.eq(xLocation);
                if (xLocation.data('type') == h) {
                    h = null;
                    obj.toggleSelectedTypes();
                    obj.applyTypeFilters();
                } else {
                    h = xLocation.data('type');
                    obj.toggleSelectedTypes(xLocation);
                    obj.applyTypeFilters();
                }
            } else {
                obj.toggleSelectedTypes();
                obj.applyTypeFilters();
            }
        });
    }

    toggleSelectedTypes(b) {
        const g = this.jQuery('.filter-type-2 .name i');
        const l = this.jQuery('.filter-type-2 .types');
        const c = l.children();

        l.addClass('selected');
        c.removeClass('selected');
        if (b && b.length && !b.hasClass('selected')) {
            b.addClass('selected');
            g.text(b.data('type').charAt(0).toUpperCase() + b.data('type').slice(1));
        } else {
            l.removeClass('selected');
            g.text('');
        }
    }

    applyTypeFilters() {
        const l1 = this.jQuery('.entry.filter-type:not(.filter-type-2) .types');
        const l = this.jQuery('.entry.filter-type-2 .types');
        const c1 = l1.children();
        const c = l.children();

        // get the first filter type
        const a1 = c1.filter('.selected').data('type');
        const a = c.filter('.selected').data('type');

        let selector = '.region-entries>li.entry';
        if (a1 !== undefined) {
            selector += '.t-' + a1;
        }
        if (a !== undefined) {
            selector += '.t-' + a;
        }
        if (a1 || a) {
            // Set "display" to "none" for all elements
            this.jQuery('.region-entries>li.entry').css('display', 'none');
            // Set "display" to "inline-block" for elements matching selector
            this.jQuery(selector).css('display', 'inline-block');
        } else {
            this.jQuery(selector).css('display', 'inline-block');
        }
    }
}
/* globals Page */
const WishforgeBase = Page;
    
// eslint-disable-next-line no-unused-vars
class WishforgePage extends WishforgeBase {
    constructor(jQuery, GLOBALS) {
        super(jQuery, 'QoLWishforge', {}, 'forge');
        const obj = this;
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if(mutation.type === 'childList' && mutation.addedNodes.length) {
                    obj.setupHTML(GLOBALS);
                }
            });
        });
    } // constructor

    setupHTML(GLOBALS) {
        const obj = this;
        // setup table format
        const header = '<th>Type</th> <th>Level</th> <th>Gem Progress</th> <th>Item</th> <th>Upgrade</th> <th>Notify</th>';

        // use GLOBALS.TYPE_LIST to get list of types
        const types = GLOBALS.TYPE_LIST;

        // build HTML table
        let rows = {};
        for (let i = 0; i < types.length; i++) {
            rows[types[i]] = `<td>${types[i]}</td> <td></td> <td></td> <td></td> <td></td> <td></td>`;
        }
        let table = '<table style="width: 100%">' +
            '<colgroup>' +
            '<col span="1" style="width: 10%;">' +
            '<col span="1" style="width: 20%;">' +
            '<col span="1" style="width: 20%;">' +
            '<col span="1" style="width: 20%;">' +
            '<col span="1" style="width: 10%;">' +
            '<col span="1" style="width: 10%;">' +
            '</colgroup>' +
            `<tr id="head"> ${header}</tr>`;
        for (let i = 0; i < types.length; i++) {
            table += `<tr id=${types[i]}> ${rows[types[i]]} </tr>`;
        }
        table += '</table>';

        // add table to page
        const craftedBadgesList = obj.jQuery('#badges').next().find('ul.badgelist');
        craftedBadgesList.prepend(table);

        // define column aliases to make the movements more logical
        const LEVEL_COL = 2;
        const GEM_COL = 3;
        const ITEM_COL = 4;
        const UPDATE_COL = 5;
        const NOTIFY_COL = 6;

        // move elements from original elements to table
        for (let j = 0; j < types.length; j++) {
            let type = types[j];
            let index = j + 1;
            let li = obj.jQuery(craftedBadgesList.children()[index]);

            // get badge image
            let badgeImg = obj.jQuery(obj.jQuery(li.children()[0]).children()[0]);
            badgeImg.appendTo(`tr#${type}>td:nth-child(${LEVEL_COL})`);

            // get badge name
            let badgeName = obj.jQuery(li.children()[0]);
            badgeName.text(' ' + badgeName.text().replace(` ${type} Badge`, ''));
            badgeName.css('display', 'inline-block');
            badgeName.appendTo(`tr#${type}>td:nth-child(${LEVEL_COL})`);

            // get gem progress bar
            let gemProgress = obj.jQuery(li.children()[0]);
            gemProgress.appendTo(`tr#${type}>td:nth-child(${GEM_COL})`);

            // if the badge is under construction, the tooltip will not be there
            if(obj.jQuery(li.children()[0]).hasClass('itemtooltip')) {
                let gemTooltip = obj.jQuery(li.children()[0]);
                gemTooltip.appendTo(`tr#${type}>td:nth-child(${GEM_COL})`);
            }

            // get item progress bar
            let itemProgress = obj.jQuery(li.children()[0]);
            itemProgress.appendTo(`tr#${type}>td:nth-child(${ITEM_COL})`);

            // if the badge is under construction, the tooltip will not be there
            if(obj.jQuery(li.children()[0]).hasClass('itemtooltip')) {
                let itemTooltip = obj.jQuery(li.children()[0]);
                itemTooltip.appendTo(`tr#${type}>td:nth-child(${ITEM_COL})`);
            }

            // get notify button
            let notifyBtn = obj.jQuery(li.children()[0]);
            notifyBtn.appendTo(`tr#${type}>td:nth-child(${NOTIFY_COL})`);

            // get upgrade button
            let updateBtn = obj.jQuery(li.children()[0]);
            updateBtn.appendTo(`tr#${type}>td:nth-child(${UPDATE_COL})`);
        }

        // remove the li's left over
        const children = craftedBadgesList.children();
        for (let i = types.length; i >= 1; i--) {
            obj.jQuery(children[i]).remove();
        }
    }
    
    setupObserver() {
        const obj = this;
        const target = obj.jQuery('#badges').next('div')[0];
        this.observer.observe(target, {
            childList: true
        });
    }
}
// ==UserScript==
// @name         Poké Farm QoL
// @namespace    https://github.com/jpgualdarrama/
// @author       Bentomon
// @homepage     https://github.com/jpgualdarrama/PokeFarmQoL
// @downloadURL  https://github.com/jpgualdarrama/PokeFarmQoL/raw/issue_72/Poke-Farm-QoL.user.js
// @description  Quality of Life changes to Pokéfarm!
// @version      1.6.8
// @match        https://pokefarm.com/*
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @require      https://raw.githubusercontent.com/lodash/lodash/4.17.4/dist/lodash.min.js
// @require      https://cdn.rawgit.com/omichelsen/compare-versions/v3.1.0/index.js
// @resource     qolHubHTML            https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/resources/templates/qolHubHTML.html
// @resource     shelterOptionsHTML    https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/resources/templates/shelterOptionsHTML.html
// @resource     evolveFastHTML         https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/resources/templates/evolveFastHTML.html
// @resource     labOptionsHTML         https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/resources/templates/labOptionsHTML.html
// @resource     fieldSortHTML        https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/resources/templates/fieldSortHTML.html
// @resource     publicFieldTooltipModHTML  https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/resources/templates/publicFieldTooltipModHTML.html
// @resource     privateFieldTooltipModHTML  https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/resources/templates/privateFieldTooltipModHTML.html
// @resource     fieldSearchHTML        https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/resources/templates/fieldSearchHTML.html
// @resource     privateFieldSearchHTML        https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/resources/templates/privateFieldSearchHTML.html
// @resource     QoLCSS                 https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/resources/css/pfqol.css
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/utils/helpers.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/utils/globals.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/utils/evolutionTreeParser.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/utils/dexPageParser.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/utils/localStorageManager.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/utils/dexUtilities.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/utils/qolHub.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/pages/basePage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/pages/shelterPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/pages/privateFieldsPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/pages/publicFieldsPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/pages/labPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/pages/fishingPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/pages/multiuserPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/pages/farmPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/pages/daycarePage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/pages/dexPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_72/requires/pages/wishforgePage.js
// @updateURL    https://github.com/jpgualdarrama/PokeFarmQoL/raw/issue_72/Poke-Farm-QoL.user.js
// @connect      github.com
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// ==/UserScript==

/* globals jQuery compareVersions GM_getResourceText GM_addStyle GM_xmlhttpRequest GM_info 
        Globals Helpers LocalStorageManager DexUtilities DexPageParser
        EvolutionTreeParser DaycarePage FarmPage LabPage PublicFieldsPage
        PrivateFieldsPage  ShelterPage FishingPage MultiuserPage DexPage 
        WishforgePage QoLHub */
const pfqol = function ($) {
    'use strict';
    // :contains to case insensitive
    $.extend($.expr[':'], {
        // eslint-disable-next-line no-unused-vars
        'containsIN': function (elem, i, match, array) {
            return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
        }
    });

    const DEFAULT_USER_SETTINGS = { // default settings when the script gets loaded the first time
        customCss: '',
        enableDaycare: true,
        shelterEnable: true,
        fishingEnable: true,
        publicFieldEnable: true,
        privateFieldEnable: true,
        partyMod: true,
        easyEvolve: true,
        labNotifier: true,
        dexFilterEnable: true,
        condenseWishforge: true
    };
    let USER_SETTINGS = DEFAULT_USER_SETTINGS;

    const GLOBALS = Globals;
    const HELPERS = Helpers;
    GLOBALS.fillTemplates(GM_getResourceText);
    GLOBALS.fillOptionsLists(HELPERS);

    // manage GLOBALS.DEX_DATA and GLOBALS.DEX_UPDATE_DATE
    // GLOBALS.DEX_DATA is the data loaded directly from the script contained in
    // the pokefarm.com/dex HTML. It contains the list of pokemon, and for each:
    // - their types
    // - if they hatch from an egg,
    // - if you have the eggdex, and
    // - if you have the regular, shiny, albino, and melanistic pokedex entries
    const LOCAL_STORAGE = new LocalStorageManager(localStorage);
    if (!LOCAL_STORAGE.loadDexIntoGlobalsFromStorage(GLOBALS)) { // can't load it from storage
        LOCAL_STORAGE.loadDexIntoGlobalsFromWeb($, document, DexUtilities, GLOBALS); // so load it from the web
    } else { // can load it from storage
        LOCAL_STORAGE.loadDexIntoGlobalsFromWebIfOld($, document, DexUtilities, GLOBALS); // reload it from web if it's old
    }
    LOCAL_STORAGE.loadEvolveByLevelList(GLOBALS);
    LOCAL_STORAGE.loadEvolutionTreeDepthList(GLOBALS);

    const PFQoL = (function PFQoL() {

        const SETTINGS_SAVE_KEY = GLOBALS.SETTINGS_SAVE_KEY;

        const PAGES = {
            instantiatePages: function () {
                for (const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true) {
                        PAGES.pages[key].object = new PAGES.pages[key].class($, GLOBALS, {
                            DexPageParser: DexPageParser
                        });
                    }
                }
            },
            loadSettings: function () {
                for (const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.loadSettings();
                    }
                }
            },
            saveSettings: function () {
                for (const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.saveSettings();
                    }
                }
            },
            populateSettings: function () {
                for (const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.populateSettings();
                    }
                }
            },
            clearPageSettings: function (pageName) {
                if (!(pageName in PAGES.pages)) {
                    console.error(`Could not proceed with clearing page settings. Page ${pageName} not found in list of pages`);
                } else if (PAGES.pages[pageName].object) {
                    PAGES.pages[pageName].object.resetSettings();
                }
            },
            setupHTML: function (GLOBALS) {
                for (const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.setupHTML(GLOBALS);
                        fn.backwork.populateSettingsPage();
                    }
                }
            },
            setupCSS: function () {
                for (const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.setupCSS();
                    }
                }
            },
            setupObservers: function () {
                for (const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.setupObserver();
                    }
                }
            },
            setupHandlers: function (GLOBALS) {
                for (const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.setupHandlers(GLOBALS);
                    }
                }
            },
            settingsChange: function () {
                for (const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.settingsChange();
                    }
                }
            },
            pages: {
                'Daycare': {
                    class: DaycarePage,
                    object: undefined,
                    setting: 'enableDaycare'
                },
                'Farm': {
                    class: FarmPage,
                    object: undefined,
                    setting: 'easyEvolve'
                },
                'Fishing': {
                    class: FishingPage,
                    object: undefined,
                    setting: 'fishingEnable'
                },
                'Lab': {
                    class: LabPage,
                    object: undefined,
                    setting: 'labNotifier'
                },
                'Multiuser': {
                    class: MultiuserPage,
                    object: undefined,
                    setting: 'partyMod'
                },
                'PrivateFields': {
                    class: PrivateFieldsPage,
                    object: undefined,
                    setting: 'privateFieldEnable'
                },
                'PublicFields': {
                    class: PublicFieldsPage,
                    object: undefined,
                    setting: 'publicFieldEnable'
                },
                'Shelter': {
                    class: ShelterPage,
                    object: undefined,
                    setting: 'shelterEnable'
                },
                'Dex': {
                    class: DexPage,
                    object: undefined,
                    setting: 'dexFilterEnable'
                },
                'Wishforge': {
                    class: WishforgePage,
                    object: undefined,
                    setting: 'condenseWishforge'
                },
            }
        };

        const fn = { // all the functions for the script
            /** background stuff */
            backwork: { // background stuff
                checkForUpdate() {
                    let version = '';
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: 'https://api.github.com/repos/jpgualdarrama/PokeFarmQoL/contents/Poke-Farm-QoL.user.js',
                        responseType: 'json',
                        onload: function (data) {
                            let match = atob(data.response.content).match(/\/\/\s+@version\s+([^\n]+)/);
                            version = match[1];
                            // eslint-disable-next-line camelcase
                            if (compareVersions(GM_info.script.version, version) < 0) {
                                document.querySelector('li[data-name*=\'QoL\']').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.qolHubUpdateLinkHTML);
                            }
                        }
                    });
                },
                instantiatePages() {
                    PAGES.instantiatePages();
                },
                loadSettings() { // initial settings on first run and setting the variable settings key
                    PAGES.loadSettings();
                    if (localStorage.getItem(SETTINGS_SAVE_KEY) === null) {
                        fn.backwork.saveSettings();
                    } else {
                        try {
                            let countScriptSettings = Object.keys(USER_SETTINGS).length;
                            let localStorageString = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                            let countLocalStorageSettings = Object.keys(localStorageString).length;
                            // adds new objects (settings) to the local storage
                            if (countLocalStorageSettings < countScriptSettings) {
                                let defaultsSetting = USER_SETTINGS;
                                let userSetting = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                                let newSetting = $.extend(true, {}, defaultsSetting, userSetting);

                                USER_SETTINGS = newSetting;
                                fn.backwork.saveSettings();
                            }
                            // removes objects from the local storage if they don't exist anymore. Not yet possible..
                            if (countLocalStorageSettings > countScriptSettings) {
                                //let defaultsSetting = USER_SETTINGS;
                                //let userSetting = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                                fn.backwork.saveSettings();
                            }
                        }
                        catch (err) {
                            fn.backwork.saveSettings();
                        }
                        if (localStorage.getItem(SETTINGS_SAVE_KEY) != USER_SETTINGS) {
                            USER_SETTINGS = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                        }
                    }
                }, // loadSettings
                saveSettings() { // Save changed settings
                    PAGES.saveSettings();
                    localStorage.setItem(SETTINGS_SAVE_KEY, JSON.stringify(USER_SETTINGS));
                }, // saveSettings
                populateSettingsPage() { // checks all settings checkboxes that are true in the settings
                    for (let key in USER_SETTINGS) {
                        if (Object.hasOwnProperty.call(USER_SETTINGS, key)) {
                            let value = USER_SETTINGS[key];
                            if (typeof value === 'boolean') {
                                HELPERS.toggleSetting(key, value);
                            }
                            else if (typeof value === 'string') {
                                HELPERS.toggleSetting(key, value);
                            }
                        }
                    }
                    PAGES.populateSettings();
                },
                clearPageSettings(pageName) {
                    PAGES.clearPageSettings(pageName);
                },
                setupHTML(GLOBALS) { // injects the HTML changes from GLOBALS.TEMPLATES into the site
                    // Header link to Userscript settings
                    document.querySelector('li[data-name*=\'Lucky Egg\']').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.qolHubLinkHTML);

                    PAGES.setupHTML(GLOBALS);
                },
                setupCSS() { // All the CSS changes are added here
                    GM_addStyle(GM_getResourceText('QoLCSS'));
                    PAGES.setupCSS();

                    //custom user css
                    let customUserCss = USER_SETTINGS.customCss;
                    //document.querySelector('head').append();
                    $('head').append('<style type="text/css">' + customUserCss + '</style>');
                },
                setupObservers() { // all the Observers that needs to run
                    PAGES.setupObservers();
                },
                setupHandlers(GLOBALS) { // all the event handlers
                    PAGES.setupHandlers(GLOBALS);
                },
                startup() { // All the functions that are run to start the script on Pokéfarm
                    return {
                        'creating Page handlers': fn.backwork.instantiatePages,
                        'loading Settings': fn.backwork.loadSettings,
                        'checking for update': fn.backwork.checkForUpdate,
                        'setting up HTML': fn.backwork.setupHTML,
                        'populating Settings': fn.backwork.populateSettingsPage,
                        'setting up CSS': fn.backwork.setupCSS,
                        'setting up Observers': fn.backwork.setupObservers,
                        'setting up Handlers': fn.backwork.setupHandlers,
                    };
                },
                init() { // Starts all the functions.
                    console.log('Starting up ..');
                    let startup = fn.backwork.startup();
                    for (let message in startup) {
                        if (Object.hasOwnProperty.call(startup, message)) {
                            console.log(message);
                            startup[message](GLOBALS);
                        }
                    }
                },
            }, // end of backwork

            /** public stuff */
            API: { // the actual seeable and interactable part of the userscript
                settingsChange(element, textElement) {
                    if (JSON.stringify(USER_SETTINGS).indexOf(element) >= 0) { // userscript settings
                        if (USER_SETTINGS[element] === false) {
                            USER_SETTINGS[element] = true;
                        } else if (USER_SETTINGS[element] === true) {
                            USER_SETTINGS[element] = false;
                        } else if (typeof USER_SETTINGS[element] === 'string') {
                            USER_SETTINGS[element] = textElement;
                        }
                        fn.backwork.saveSettings();
                    } else {
                        PAGES.settingsChange();
                    }
                }, // settingsChange

                clearPageSettings(pageName) {
                    if (pageName !== 'None') { // "None" matches option in HTML
                        fn.backwork.clearPageSettings(pageName);
                    }
                }, // clearPageSettings
                populateSettingsPage() {
                    fn.backwork.populateSettingsPage();
                } // populateSettingsPage
            }, // end of API
        }; // end of fn

        fn.backwork.init();

        return fn.API;
    })(); // end of PFQoL function

    $(document).on('click', 'li[data-name="QoL"]', (function () { //open QoL hub
        QoLHub.build($, document, GLOBALS.TEMPLATES, GLOBALS, USER_SETTINGS, PFQoL.settingsChange);
        PFQoL.populateSettingsPage();
    }));

    $(document).on('click', '#updateDex', (function () {
        QoLHub.handleUpdateDexClick($, document, DexUtilities, LOCAL_STORAGE, DexPageParser, EvolutionTreeParser, GLOBALS);
    }));

    $(document).on('click', '#resetPageSettings', (function () {
        const page = $(this).parent().find('select').val();
        PFQoL.clearPageSettings(page);
    }));

    // Issue #61 - Item 6 - Remove the 'Cleared!' message so the user knows they can click it again
    $(document).on('mouseover', '#clearCachedDex', (function() {
        $('#clearCachedDex').next().remove();
    }));

    // Issue #61 - Item 6 - Add a 'Cleared!' message so the user knows that the clearing works
    $(document).on('click', '#clearCachedDex', (function() {
        $('#clearCachedDex').next().remove();
        localStorage.removeItem('QoLEvolveByLevel');
        localStorage.removeItem('QoLDexIDsCache');
        localStorage.removeItem('QoLEvolutionTreeDepth');
        localStorage.removeItem('QoLRegionalFormsList');
        $('#clearCachedDex').after('<span> Cleared!</span>');
    }));

    $(document).on('click', 'h3.slidermenu', (function () { //show hidden li in change log
        $(this).next().slideToggle();
    }));
};

if (module) {
    module.exports.pfqol = pfqol;
}
else {
    pfqol(jQuery);
}

