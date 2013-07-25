/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: Jun 7 13:43
*/
KISSY.add("dom/base/api",function(c){var a=c.Env.host,g=c.UA,o={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12},m={isCustomDomain:function(c){var c=c||a,g=c.document.domain,c=c.location.hostname;return g!=c&&g!="["+c+"]"},getEmptyIframeSrc:function(c){c=c||a;return g.ie&&m.isCustomDomain(c)?"javascript:void(function(){"+
encodeURIComponent("document.open();document.domain='"+c.document.domain+"';document.close();")+"}())":""},NodeType:o,getWindow:function(c){return!c?a:"scrollTo"in c&&c.document?c:c.nodeType==o.DOCUMENT_NODE?c.defaultView||c.parentWindow:!1},_isNodeList:function(a){return a&&!a.nodeType&&a.item&&!a.setTimeout},nodeName:function(a){var c=m.get(a),a=c.nodeName.toLowerCase();g.ie&&(c=c.scopeName)&&"HTML"!=c&&(a=c.toLowerCase()+":"+a);return a},_RE_NUM_NO_PX:RegExp("^("+/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source+
")(?!px)[a-z%]+$","i")};c.mix(m,o);return m});
KISSY.add("dom/base/attr",function(c,a,g){function o(a,i){var i=n[i]||i,e=r[i];return e&&e.get?e.get(a,i):a[i]}var m=c.Env.host.document,q=a.NodeType,m=m&&m.documentElement,t=a.nodeName,h=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:button|input|object|select|textarea)$/i,j=/^a(?:rea)?$/i,p=/:|^on/,e=/\r/g,b={},k={val:1,css:1,html:1,text:1,data:1,width:1,height:1,offset:1,scrollTop:1,scrollLeft:1},v={tabindex:{get:function(a){var i=
a.getAttributeNode("tabindex");return i&&i.specified?parseInt(i.value,10):f.test(a.nodeName)||j.test(a.nodeName)&&a.href?0:g}}},n={hidefocus:"hideFocus",tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},y={get:function(e,i){return a.prop(e,i)?i.toLowerCase():g},set:function(e,i,b){!1===i?
a.removeAttr(e,b):(i=n[b]||b,i in e&&(e[i]=!0),e.setAttribute(b,b.toLowerCase()));return b}},r={},l={},d={select:{get:function(e){var i=e.selectedIndex,b=e.options,d;if(0>i)return null;if("select-one"===""+e.type)return a.val(b[i]);e=[];i=0;for(d=b.length;i<d;++i)b[i].selected&&e.push(a.val(b[i]));return e},set:function(e,i){var b=c.makeArray(i);c.each(e.options,function(e){e.selected=c.inArray(a.val(e),b)});b.length||(e.selectedIndex=-1);return b}}};c.each(["radio","checkbox"],function(e){d[e]={get:function(a){return null===
a.getAttribute("value")?"on":a.value},set:function(e,b){return c.isArray(b)?e.checked=c.inArray(a.val(e),b):g}}});v.style={get:function(a){return a.style.cssText}};c.mix(a,{_valHooks:d,_propFix:n,_attrHooks:v,_propHooks:r,_attrNodeHook:l,_attrFix:b,prop:function(e,i,b){var d=a.query(e),l,s;if(c.isPlainObject(i))return c.each(i,function(e,i){a.prop(d,i,e)}),g;i=n[i]||i;s=r[i];if(b!==g)for(e=d.length-1;0<=e;e--)l=d[e],s&&s.set?s.set(l,b,i):l[i]=b;else if(d.length)return o(d[0],i);return g},hasProp:function(e,
i){var b=a.query(e),d,c=b.length,s;for(d=0;d<c;d++)if(s=b[d],o(s,i)!==g)return!0;return!1},removeProp:function(e,b){var b=n[b]||b,d=a.query(e),c,l;for(c=d.length-1;0<=c;c--){l=d[c];try{l[b]=g,delete l[b]}catch(s){}}},attr:function(e,i,d,f){var j=a.query(e),s=j[0];if(c.isPlainObject(i)){var f=d,x;for(x in i)a.attr(j,x,i[x],f);return g}if(f&&k[i])return a[i](e,d);i=i.toLowerCase();if(f&&k[i])return a[i](e,d);i=b[i]||i;e=h.test(i)?y:p.test(i)?l:v[i];if(d===g){if(s&&s.nodeType===q.ELEMENT_NODE){"form"==
t(s)&&(e=l);if(e&&e.get)return e.get(s,i);d=s.getAttribute(i);return""===d&&(i=s.getAttributeNode(i),!i||!i.specified)?g:null===d?g:d}}else for(f=j.length-1;0<=f;f--)if((s=j[f])&&s.nodeType===q.ELEMENT_NODE)"form"==t(s)&&(e=l),e&&e.set?e.set(s,d,i):s.setAttribute(i,""+d);return g},removeAttr:function(e,d){var d=d.toLowerCase(),d=b[d]||d,c=a.query(e),l,f,s;for(s=c.length-1;0<=s;s--)if(f=c[s],f.nodeType==q.ELEMENT_NODE&&(f.removeAttribute(d),h.test(d)&&(l=n[d]||d)in f))f[l]=!1},hasAttr:m&&!m.hasAttribute?
function(e,d){var d=d.toLowerCase(),b=a.query(e),c,l;for(c=0;c<b.length;c++)if(l=b[c],(l=l.getAttributeNode(d))&&l.specified)return!0;return!1}:function(e,d){var b=a.query(e),c,l=b.length;for(c=0;c<l;c++)if(b[c].hasAttribute(d))return!0;return!1},val:function(b,i){var l,f,k,s,x;if(i===g){if(k=a.get(b)){if((l=d[t(k)]||d[k.type])&&"get"in l&&(f=l.get(k,"value"))!==g)return f;f=k.value;return"string"===typeof f?f.replace(e,""):null==f?"":f}return g}f=a.query(b);for(s=f.length-1;0<=s;s--){k=f[s];if(1!==
k.nodeType)break;x=i;null==x?x="":"number"===typeof x?x+="":c.isArray(x)&&(x=c.map(x,function(a){return a==null?"":a+""}));l=d[t(k)]||d[k.type];if(!l||!("set"in l)||l.set(k,x,"value")===g)k.value=x}return g},text:function(e,d){var b,c,l,s;if(d===g)return b=a.get(e),a._getText(b);c=a.query(e);for(l=c.length-1;0<=l;l--)if(b=c[l],s=b.nodeType,s==q.ELEMENT_NODE)a.empty(b),b.appendChild(b.ownerDocument.createTextNode(d));else if(s==q.TEXT_NODE||s==q.CDATA_SECTION_NODE)b.nodeValue=d;return g},_getText:function(a){return a.textContent}});
return a},{requires:["./api"]});
KISSY.add("dom/base/class",function(c,a){function g(a){for(var a=c.trim(a||""),a=a.split(h),g=[],p,e=a.length,b=0;b<e;b++)(p=a[b])&&g.push(p);return g}function o(a){return function(c,g){var e,b,k,v=c.classList,h=q.call(arguments,2);e=0;for(b=g.length;e<b;e++)(k=g[e])&&v[a].apply(v,[k].concat(h))}}function m(c){return function(h,p){var e=g(p),b=q.call(arguments,2);a.query(h).each(function(k){k.nodeType==t.ELEMENT_NODE&&a[c].apply(a,[k,e].concat(b))})}}var q=[].slice,t=a.NodeType,h=/[\.\s]\s*\.?/;c.mix(a,
{_hasClass:function(a,c){var g,e,b,k=a.classList;if(k.length){g=0;for(e=c.length;g<e;g++)if((b=c[g])&&!k.contains(b))return!1;return!0}return!1},_addClass:o("add"),_removeClass:o("remove"),_toggleClass:o("toggle"),hasClass:function(c,h){var p=a.get(c);return p&&p.nodeType==t.ELEMENT_NODE&&a._hasClass(p,g(h))},replaceClass:function(c,g,h){a.removeClass(c,g);a.addClass(c,h)},addClass:m("_addClass"),removeClass:m("_removeClass"),toggleClass:m("_toggleClass")});return a},{requires:["./api"]});
KISSY.add("dom/base/create",function(c,a,g){function o(e){var b=c.require("event/dom/base");b&&b.detach(e);a.removeData(e)}function m(a,d){var c=d&&d!=f?d.createElement(e):b;c.innerHTML="m<div>"+a+"</div>";return c.lastChild}function q(a,e,b){var d=e.nodeType;if(d==j.DOCUMENT_FRAGMENT_NODE){e=e.childNodes;b=b.childNodes;for(d=0;e[d];)b[d]&&q(a,e[d],b[d]),d++}else if(d==j.ELEMENT_NODE){e=e.getElementsByTagName("*");b=b.getElementsByTagName("*");for(d=0;e[d];)b[d]&&a(e[d],b[d]),d++}}function t(e,d){var b=
c.require("event/dom"),l,w;if(d.nodeType!=j.ELEMENT_NODE||a.hasData(e)){l=a.data(e);for(w in l)a.data(d,w,l[w]);b&&(b._DOMUtils.removeData(d),b._clone(e,d))}}function h(a){var e=null,d,b;if(a&&(a.push||a.item)&&a[0]){e=a[0].ownerDocument;e=e.createDocumentFragment();a=c.makeArray(a);d=0;for(b=a.length;d<b;d++)e.appendChild(a[d])}return e}var f=c.Env.host.document,j=a.NodeType,p=c.UA.ie,e="div",b=f&&f.createElement(e),k=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,v=/<([\w:]+)/,
n=/^\s+/,y=/\s+$/,r=p&&9>p,l=/<|&#?\w+;/,d=f&&"outerHTML"in f.documentElement,A=/^<(\w+)\s*\/?>(?:<\/\1>)?$/;c.mix(a,{create:function(d,b,i,p){var w=null;if(!d)return w;if(d.nodeType)return a.clone(d);if("string"!=typeof d)return w;p===g&&(p=!0);p&&(d=c.trim(d));var p=a._creators,u,C,i=i||f,D,F=e;if(l.test(d))if(D=A.exec(d))w=i.createElement(D[1]);else{d=d.replace(k,"<$1></$2>");if((D=v.exec(d))&&(u=D[1]))F=u.toLowerCase();u=(p[F]||m)(d,i);r&&(C=d.match(n))&&u.insertBefore(i.createTextNode(C[0]),
u.firstChild);r&&/\S/.test(d)&&(C=d.match(y))&&u.appendChild(i.createTextNode(C[0]));d=u.childNodes;1===d.length?w=d[0].parentNode.removeChild(d[0]):d.length&&(w=h(d))}else w=i.createTextNode(d);c.isPlainObject(b)&&(w.nodeType==j.ELEMENT_NODE?a.attr(w,b,!0):w.nodeType==j.DOCUMENT_FRAGMENT_NODE&&a.attr(w.childNodes,b,!0));return w},_fixCloneAttributes:function(e,d){"textarea"===a.nodeName(e)&&(d.defaultValue=e.defaultValue,d.value=e.value)},_creators:{div:m},_defaultCreator:m,html:function(e,d,b){var e=
a.query(e),c=e[0],l=!1,u,i;if(!c)return null;if(d===g)return c.nodeType==j.ELEMENT_NODE?c.innerHTML:null;d+="";if(!d.match(/<(?:script|style|link)/i)&&(!r||!d.match(n))&&!z[(d.match(v)||["",""])[1].toLowerCase()])try{for(u=e.length-1;0<=u;u--)i=e[u],i.nodeType==j.ELEMENT_NODE&&(o(i.getElementsByTagName("*")),i.innerHTML=d);l=!0}catch(k){}l||(d=a.create(d,0,c.ownerDocument,0),a.empty(e),a.append(d,e,b));return g},outerHTML:function(c,l,i){var k=a.query(c),w=k.length,c=k[0];if(!c)return null;if(l===
g){if(d)return c.outerHTML;l=(l=c.ownerDocument)&&l!=f?l.createElement(e):b;l.innerHTML="";l.appendChild(a.clone(c,!0));l.appendChild(a.clone(c,!0));return l.innerHTML}l+="";if(!l.match(/<(?:script|style|link)/i)&&d)for(i=w-1;0<=i;i--)c=k[i],c.nodeType==j.ELEMENT_NODE&&(o(c),o(c.getElementsByTagName("*")),c.outerHTML=l);else c=a.create(l,0,c.ownerDocument,0),a.insertBefore(c,k,i),a.remove(k);return g},remove:function(e,d){var b,l=a.query(e),i,u,k=c.require("event/dom/base"),g;for(g=l.length-1;0<=
g;g--)b=l[g],!d&&b.nodeType==j.ELEMENT_NODE&&(i=c.makeArray(b.getElementsByTagName("*")),i.push(b),a.removeData(i),k&&k.detach(i)),(u=b.parentNode)&&u.removeChild(b)},clone:function(e,d,b,c){"object"===typeof d&&(c=d.deepWithDataAndEvent,b=d.withDataAndEvent,d=d.deep);var e=a.get(e),l,i=a._fixCloneAttributes,k;if(!e)return null;k=e.nodeType;l=e.cloneNode(d);if(k==j.ELEMENT_NODE||k==j.DOCUMENT_FRAGMENT_NODE)i&&k==j.ELEMENT_NODE&&i(e,l),d&&i&&q(i,e,l);b&&(t(e,l),d&&c&&q(t,e,l));return l},empty:function(e){var e=
a.query(e),d,b;for(b=e.length-1;0<=b;b--)d=e[b],a.remove(d.childNodes)},_nodeListToFragment:h});var i=a._creators,E=a.create,z={option:"select",optgroup:"select",area:"map",thead:"table",td:"tr",th:"tr",tr:"tbody",tbody:"table",tfoot:"table",caption:"table",colgroup:"table",col:"colgroup",legend:"fieldset"},B;for(B in z)(function(a){i[B]=function(e,d){return E("<"+a+">"+e+"</"+a+">",null,d)}})(z[B]);return a},{requires:["./api"]});
KISSY.add("dom/base/data",function(c,a,g){var o=c.Env.host,m="_ks_data_"+c.now(),q={},t={},h={applet:1,object:1,embed:1},f={hasData:function(a,b){if(a)if(b!==g){if(b in a)return!0}else if(!c.isEmptyObject(a))return!0;return!1}},j={hasData:function(a,b){return a==o?j.hasData(t,b):f.hasData(a[m],b)},data:function(a,b,c){if(a==o)return j.data(t,b,c);var f=a[m];if(c!==g)f=a[m]=a[m]||{},f[b]=c;else return b!==g?f&&f[b]:f=a[m]=a[m]||{}},removeData:function(a,b){if(a==o)return j.removeData(t,b);var k=a[m];
if(b!==g)delete k[b],c.isEmptyObject(k)&&j.removeData(a);else try{delete a[m]}catch(f){a[m]=g}}},p={hasData:function(a,b){var c=a[m];return!c?!1:f.hasData(q[c],b)},data:function(a,b,k){if(h[a.nodeName.toLowerCase()])return g;var f=a[m];if(!f){if(b!==g&&k===g)return g;f=a[m]=c.guid()}a=q[f];if(k!==g)a=q[f]=q[f]||{},a[b]=k;else return b!==g?a&&a[b]:a=q[f]=q[f]||{}},removeData:function(a,b){var k=a[m],f;if(k)if(f=q[k],b!==g)delete f[b],c.isEmptyObject(f)&&p.removeData(a);else{delete q[k];try{delete a[m]}catch(h){a[m]=
g}a.removeAttribute&&a.removeAttribute(m)}}};c.mix(a,{__EXPANDO:m,hasData:function(e,b){for(var c=!1,f=a.query(e),g=0;g<f.length&&!(c=f[g],c=c.nodeType?p.hasData(c,b):j.hasData(c,b));g++);return c},data:function(e,b,f){var e=a.query(e),h=e[0];if(c.isPlainObject(b)){for(var n in b)a.data(e,n,b[n]);return g}if(f===g){if(h)return h.nodeType?p.data(h,b):j.data(h,b)}else for(n=e.length-1;0<=n;n--)h=e[n],h.nodeType?p.data(h,b,f):j.data(h,b,f);return g},removeData:function(e,b){var c=a.query(e),f,g;for(g=
c.length-1;0<=g;g--)f=c[g],f.nodeType?p.removeData(f,b):j.removeData(f,b)}});return a},{requires:["./api"]});
KISSY.add("dom/base/insertion",function(c,a){function g(a,b){var c=[],m,n,o;for(m=0;a[m];m++)if(n=a[m],o=h(n),n.nodeType==q.DOCUMENT_FRAGMENT_NODE)c.push.apply(c,g(f(n.childNodes),b));else if("script"===o&&(!n.type||p.test(n.type)))n.parentNode&&n.parentNode.removeChild(n),b&&b.push(n);else{if(n.nodeType==q.ELEMENT_NODE&&!t.test(o)){o=[];var r,l,d=n.getElementsByTagName("script");for(l=0;l<d.length;l++)r=d[l],(!r.type||p.test(r.type))&&o.push(r);j.apply(a,[m+1,0].concat(o))}c.push(n)}return c}function o(a){a.src?
c.getScript(a.src):(a=c.trim(a.text||a.textContent||a.innerHTML||""))&&c.globalEval(a)}function m(e,b,f,h){e=a.query(e);h&&(h=[]);e=g(e,h);a._fixInsertionChecked&&a._fixInsertionChecked(e);var b=a.query(b),j,p,r,l,d=b.length;if((e.length||h&&h.length)&&d){e=a._nodeListToFragment(e);1<d&&(l=a.clone(e,!0),b=c.makeArray(b));for(j=0;j<d;j++)p=b[j],e&&(r=0<j?a.clone(l,!0):e,f(r,p)),h&&h.length&&c.each(h,o)}}var q=a.NodeType,t=/^(?:button|input|object|select|textarea)$/i,h=a.nodeName,f=c.makeArray,j=[].splice,
p=/\/(java|ecma)script/i;c.mix(a,{_fixInsertionChecked:null,insertBefore:function(a,b,c){m(a,b,function(a,b){b.parentNode&&b.parentNode.insertBefore(a,b)},c)},insertAfter:function(a,b,c){m(a,b,function(a,b){b.parentNode&&b.parentNode.insertBefore(a,b.nextSibling)},c)},appendTo:function(a,b,c){m(a,b,function(a,b){b.appendChild(a)},c)},prependTo:function(a,b,c){m(a,b,function(a,b){b.insertBefore(a,b.firstChild)},c)},wrapAll:function(c,b){b=a.clone(a.get(b),!0);c=a.query(c);c[0].parentNode&&a.insertBefore(b,
c[0]);for(var f;(f=b.firstChild)&&1==f.nodeType;)b=f;a.appendTo(c,b)},wrap:function(e,b){e=a.query(e);b=a.get(b);c.each(e,function(c){a.wrapAll(c,b)})},wrapInner:function(e,b){e=a.query(e);b=a.get(b);c.each(e,function(c){var e=c.childNodes;e.length?a.wrapAll(e,b):c.appendChild(b)})},unwrap:function(e){e=a.query(e);c.each(e,function(b){b=b.parentNode;a.replaceWith(b,b.childNodes)})},replaceWith:function(c,b){var f=a.query(c),b=a.query(b);a.remove(b,!0);a.insertBefore(b,f);a.remove(f)}});c.each({prepend:"prependTo",
append:"appendTo",before:"insertBefore",after:"insertAfter"},function(c,b){a[b]=a[c]});return a},{requires:["./api"]});
KISSY.add("dom/base/offset",function(c,a,g){function o(a){var d,b=a.ownerDocument.body;if(!a.getBoundingClientRect)return{left:0,top:0};d=a.getBoundingClientRect();a=d[k];d=d[v];a-=j.clientLeft||b.clientLeft||0;d-=j.clientTop||b.clientTop||0;return{left:a,top:d}}function m(c,d){var e={left:0,top:0},i=p(c[b]),f,g=c,d=d||i;do{if(i==d){var h=g;f=o(h);h=p(h[b]);f.left+=a[y](h);f.top+=a[r](h)}else f=o(g);e.left+=f.left;e.top+=f.top}while(i&&i!=d&&(g=i.frameElement)&&(i=i.parent));return e}var q=c.Env.host,
t=c.UA,h=q.document,f=a.NodeType,j=h&&h.documentElement,p=a.getWindow,e=Math.max,b="ownerDocument",k="left",v="top",n=c.isNumber,y="scrollLeft",r="scrollTop";c.mix(a,{offset:function(b,d,c){if(d===g){var b=a.get(b),e;b&&(e=m(b,c));return e}c=a.query(b);for(e=c.length-1;0<=e;e--){var b=c[e],f=d;"static"===a.css(b,"position")&&(b.style.position="relative");var h=m(b),k={},j=void 0,r=void 0;for(r in f)j=parseFloat(a.css(b,r))||0,k[r]=j+f[r]-h[r];a.css(b,k)}return g},scrollIntoView:function(b,d,e,i){var h,
j,r,m;if(r=a.get(b)){d&&(d=a.get(d));d||(d=r.ownerDocument);d.nodeType==f.DOCUMENT_NODE&&(d=p(d));c.isPlainObject(e)&&(i=e.allowHorizontalScroll,m=e.onlyScrollIfNeeded,e=e.alignWithTop);i=i===g?!0:i;j=!!p(d);var b=a.offset(r),o=a.outerHeight(r);h=a.outerWidth(r);var n,q,w,u;j?(j=d,n=a.height(j),q=a.width(j),u={left:a.scrollLeft(j),top:a.scrollTop(j)},j=b[k]-u[k],r=b[v]-u[v],h=b[k]+h-(u[k]+q),b=b[v]+o-(u[v]+n)):(n=a.offset(d),q=d.clientHeight,w=d.clientWidth,u={left:a.scrollLeft(d),top:a.scrollTop(d)},
j=b[k]-(n[k]+(parseFloat(a.css(d,"borderLeftWidth"))||0)),r=b[v]-(n[v]+(parseFloat(a.css(d,"borderTopWidth"))||0)),h=b[k]+h-(n[k]+w+(parseFloat(a.css(d,"borderRightWidth"))||0)),b=b[v]+o-(n[v]+q+(parseFloat(a.css(d,"borderBottomWidth"))||0)));if(m){if(0>r||0<b)!0===e?a.scrollTop(d,u.top+r):!1===e?a.scrollTop(d,u.top+b):0>r?a.scrollTop(d,u.top+r):a.scrollTop(d,u.top+b)}else(e=e===g?!0:!!e)?a.scrollTop(d,u.top+r):a.scrollTop(d,u.top+b);if(i)if(m){if(0>j||0<h)!0===e?a.scrollLeft(d,u.left+j):!1===e?a.scrollLeft(d,
u.left+h):0>j?a.scrollLeft(d,u.left+j):a.scrollLeft(d,u.left+h)}else(e=e===g?!0:!!e)?a.scrollLeft(d,u.left+j):a.scrollLeft(d,u.left+h)}},docWidth:0,docHeight:0,viewportHeight:0,viewportWidth:0,scrollTop:0,scrollLeft:0});c.each(["Left","Top"],function(b,d){var c="scroll"+b;a[c]=function(e,h){if(n(e))return arguments.callee(q,e);var e=a.get(e),j,r,k,m=p(e);m?h!==g?(h=parseFloat(h),r="Left"==b?h:a.scrollLeft(m),k="Top"==b?h:a.scrollTop(m),m.scrollTo(r,k)):(j=m["page"+(d?"Y":"X")+"Offset"],n(j)||(r=m.document,
j=r.documentElement[c],n(j)||(j=r.body[c]))):e.nodeType==f.ELEMENT_NODE&&(h!==g?e[c]=parseFloat(h):j=e[c]);return j}});c.each(["Width","Height"],function(b){a["doc"+b]=function(d){d=a.get(d);d=p(d).document;return e(d.documentElement["scroll"+b],d.body["scroll"+b],a["viewport"+b](d))};a["viewport"+b]=function(d){var d=a.get(d),c=p(d),d=c["inner"+b];if(t.mobile&&d)return d;var d="client"+b,c=c.document,e=c.body,f=c.documentElement[d];return"CSS1Compat"===c.compatMode&&f||e&&e[d]||f}});return a},{requires:["./api"]});
KISSY.add("dom/base/style",function(c,a,g){function o(a,b){return b.toUpperCase()}function m(a){return a.replace(l,"ms-").replace(x,o)}function q(a,b,d){var c={},e;for(e in b)c[e]=a[k][e],a[k][e]=b[e];d.call(a);for(e in b)a[k][e]=c[e]}function t(a,b,d){var c,e,f;if(3===a.nodeType||8===a.nodeType||!(c=a[k]))return g;b=m(b);f=z[b];b=B[b]||b;if(d!==g){null===d||d===A?d=A:!isNaN(Number(d))&&!r[b]&&(d+=i);f&&f.set&&(d=f.set(a,d));if(d!==g){try{c[b]=d}catch(h){}d===A&&c.removeAttribute&&c.removeAttribute(b)}c.cssText||
a.removeAttribute("style");return g}if(!f||!("get"in f&&(e=f.get(a,!1))!==g))e=c[b];return e===g?"":e}function h(a){var b,d=arguments;0!==a.offsetWidth?b=f.apply(g,d):q(a,G,function(){b=f.apply(g,d)});return b}function f(b,d,e){if(c.isWindow(b))return d==n?a.viewportWidth(b):a.viewportHeight(b);if(9==b.nodeType)return d==n?a.docWidth(b):a.docHeight(b);var f=d===n?["Left","Right"]:["Top","Bottom"],h=d===n?b.offsetWidth:b.offsetHeight;if(0<h)return"border"!==e&&c.each(f,function(d){e||(h-=parseFloat(a.css(b,
"padding"+d))||0);h="margin"===e?h+(parseFloat(a.css(b,e+d))||0):h-(parseFloat(a.css(b,"border"+d+"Width"))||0)}),h;h=a._getComputedStyle(b,d);if(null==h||0>Number(h))h=b.style[d]||0;h=parseFloat(h)||0;e&&c.each(f,function(d){h+=parseFloat(a.css(b,"padding"+d))||0;"padding"!==e&&(h+=parseFloat(a.css(b,"border"+d+"Width"))||0);"margin"===e&&(h+=parseFloat(a.css(b,e+d))||0)});return h}var j=c.Env.host,p=c.UA,e=a.nodeName,b=j.document,k="style",v=/^margin/,n="width",y="display"+c.now(),r={fillOpacity:1,
fontWeight:1,lineHeight:1,opacity:1,orphans:1,widows:1,zIndex:1,zoom:1},l=/^-ms-/,d=/([A-Z]|^ms)/g,A="",i="px",E=/\d(?!px)[a-z%]+$/i,z={},B={"float":"cssFloat"},s={},x=/-([a-z])/ig;c.mix(a,{_camelCase:m,_CUSTOM_STYLES:z,_cssProps:B,_getComputedStyle:function(b,e){var c="",f,h,i,g,l;h=b.ownerDocument;e=e.replace(d,"-$1").toLowerCase();if(f=h.defaultView.getComputedStyle(b,null))c=f.getPropertyValue(e)||f[e];""===c&&!a.contains(h,b)&&(e=B[e]||e,c=b[k][e]);a._RE_NUM_NO_PX.test(c)&&v.test(e)&&(l=b.style,
h=l.width,i=l.minWidth,g=l.maxWidth,l.minWidth=l.maxWidth=l.width=c,c=f.width,l.width=h,l.minWidth=i,l.maxWidth=g);return c},style:function(b,d,e){var b=a.query(b),f,h=b[0];if(c.isPlainObject(d)){for(f in d)for(h=b.length-1;0<=h;h--)t(b[h],f,d[f]);return g}if(e===g)return f="",h&&(f=t(h,d,e)),f;for(h=b.length-1;0<=h;h--)t(b[h],d,e);return g},css:function(b,d,e){var b=a.query(b),f=b[0],h;if(c.isPlainObject(d)){for(h in d)for(f=b.length-1;0<=f;f--)t(b[f],h,d[h]);return g}d=m(d);h=z[d];if(e===g){e="";
if(f&&(!h||!("get"in h&&(e=h.get(f,!0))!==g)))e=a._getComputedStyle(f,d);return"undefined"==typeof e?"":e}for(f=b.length-1;0<=f;f--)t(b[f],d,e);return g},show:function(d){var d=a.query(d),e,c,f;for(f=d.length-1;0<=f;f--)if(c=d[f],c[k].display=a.data(c,y)||A,"none"===a.css(c,"display")){e=c.tagName.toLowerCase();var h=void 0,i=s[e],g=void 0;s[e]||(h=b.body||b.documentElement,g=b.createElement(e),a.prepend(g,h),i=a.css(g,"display"),h.removeChild(g),s[e]=i);e=i;a.data(c,y,e);c[k].display=e}},hide:function(b){var b=
a.query(b),d,e;for(e=b.length-1;0<=e;e--){d=b[e];var c=d[k],f=c.display;"none"!==f&&(f&&a.data(d,y,f),c.display="none")}},toggle:function(b){var b=a.query(b),d,e;for(e=b.length-1;0<=e;e--)d=b[e],"none"===a.css(d,"display")?a.show(d):a.hide(d)},addStyleSheet:function(b,d,e){b=b||j;"string"==typeof b&&(e=d,d=b,b=j);var b=a.get(b),b=a.getWindow(b).document,c;if(e&&(e=e.replace("#",A)))c=a.get("#"+e,b);c||(c=a.create("<style>",{id:e},b),a.get("head",b).appendChild(c),c.styleSheet?c.styleSheet.cssText=
d:c.appendChild(b.createTextNode(d)))},unselectable:function(b){var b=a.query(b),d,f,h=0,i,g;for(f=b.length-1;0<=f;f--)if(d=b[f],g=d[k],g.UserSelect="none",p.gecko)g.MozUserSelect="none";else if(p.webkit)g.WebkitUserSelect="none";else if(p.ie||p.opera){g=d.getElementsByTagName("*");d.setAttribute("unselectable","on");for(i=["iframe","textarea","input","select"];d=g[h++];)c.inArray(e(d),i)||d.setAttribute("unselectable","on")}},innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0,width:0,height:0});
c.each([n,"height"],function(b){a["inner"+c.ucfirst(b)]=function(d){return(d=a.get(d))&&h(d,b,"padding")};a["outer"+c.ucfirst(b)]=function(d,e){var c=a.get(d);return c&&h(c,b,e?"margin":"border")};a[b]=function(d,e){var c=a.css(d,b,e);c&&(c=parseFloat(c));return c};z[b]={get:function(a,d){var e;d&&(e=h(a,b)+"px");return e}}});var G={position:"absolute",visibility:"hidden",display:"block"};c.each(["left","top"],function(d){z[d]={get:function(e,c){var f,h,i;if(c){i=a.css(e,"position");if("static"===
i)return"auto";f=a._getComputedStyle(e,d);if((h="auto"===f)&&"relative"===i)return"0px";if(h||E.test(f)){i={top:0,left:0};if("fixed"==a.css(e,"position"))h=e.getBoundingClientRect();else{for(f=e.offsetParent||(e.ownerDocument||b).body;f&&!H.test(f.nodeName)&&"static"===a.css(f,"position");)f=f.offsetParent;h=a.offset(e);i=a.offset(f);i.top+=parseFloat(a.css(f,"borderTopWidth"))||0;i.left+=parseFloat(a.css(f,"borderLeftWidth"))||0}h.top-=parseFloat(a.css(e,"marginTop"))||0;h.left-=parseFloat(a.css(e,
"marginLeft"))||0;f={top:h.top-i.top,left:h.left-i.left}[d]+"px"}}return f}}});var H=/^(?:body|html)$/i;return a},{requires:["./api"]});
KISSY.add("dom/base/selector",function(c,a){function g(a){var b=this.length,d;for(d=0;d<b&&!1!==a(this[d],d);d++);}function o(c,f){var d,j;d="string"==typeof c;var i=f?o(f):(j=1)&&[h],k=i.length;if(c)if(d)if(c=y(c),j&&"body"==c)d=[h.body];else{d=[];for(j=0;j<k;j++)v.apply(d,a._selectInternal(c,i[j]));1<d.length&&1<k&&a.unique(d)}else{if(d=c.nodeType||c.setTimeout?[c]:c.getDOMNodes?c.getDOMNodes():p(c)?c:b(c)?e(c):[c],!j){var m=d,n,s=m.length;d=[];for(j=0;j<s;j++)for(n=0;n<k;n++)if(a._contains(i[n],
m[j])){d.push(m[j]);break}}}else d=[];d.each=g;return d}function m(a,b){var d=a&&(a.className||q(a,"class"));return d&&-1<(k+d+k).indexOf(k+b+k)}function q(a,b){var d=a&&a.getAttributeNode(b);if(d&&d.specified)return d.nodeValue}function t(a,b){return"*"==b||a.nodeName.toLowerCase()===b.toLowerCase()}var h=c.Env.host.document,f=h.documentElement,j=f.matches||f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector,p=c.isArray,e=c.makeArray,b=a._isNodeList,k=" ",v=Array.prototype.push,
n=/^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/,y=c.trim;c.mix(a,{_compareNodeOrder:function(a,b){return!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition?-1:1:a.compareDocumentPosition(b)&4?-1:1},_getSimpleAttr:q,_isTag:t,_hasSingleClass:m,_matchesInternal:function(a,b){for(var d=[],e=0,c,f=b.length;e<f;e++)c=b[e],j.call(c,a)&&d.push(c);return d},_selectInternal:function(a,b){return e(b.querySelectorAll(a))},query:o,get:function(a,b){return o(a,b)[0]||null},unique:function(){function b(d,
c){return d==c?(e=!0,0):a._compareNodeOrder(d,c)}var e,d=!0;[0,0].sort(function(){d=!1;return 0});return function(a){e=d;a.sort(b);if(e)for(var c=1,f=a.length;c<f;)a[c]===a[c-1]?(a.splice(c,1),--f):c++;return a}}(),filter:function(b,e,d){var b=o(b,d),f,h,g,j,d=[];if("string"==typeof e&&(e=y(e))&&(g=n.exec(e)))f=g[1],h=g[2],j=g[3],f?f&&!h&&!j&&(e=function(a){return q(a,"id")==f}):e=function(a){var b=!0,d=!0;h&&(b=t(a,h));j&&(d=m(a,j));return d&&b};return d=c.isFunction(e)?c.filter(b,e):a._matchesInternal(e,
b)},test:function(b,e,d){b=o(b,d);return b.length&&a.filter(b,e,d).length===b.length}});return a},{requires:["./api"]});
KISSY.add("dom/base/traversal",function(c,a,g){function o(h,f,j,p,e,b,k){if(!(h=a.get(h)))return null;if(0===f)return h;b||(h=h[j]);if(!h)return null;e=e&&a.get(e)||null;f===g&&(f=1);var b=[],o=c.isArray(f),n,q;c.isNumber(f)&&(n=0,q=f,f=function(){return++n===q});for(;h&&h!=e;){if((h.nodeType==t.ELEMENT_NODE||h.nodeType==t.TEXT_NODE&&k)&&m(h,f)&&(!p||p(h)))if(b.push(h),!o)break;h=h[j]}return o?b:b[0]||null}function m(h,f){if(!f)return!0;if(c.isArray(f)){var g,m=f.length;if(!m)return!0;for(g=0;g<m;g++)if(a.test(h,
f[g]))return!0}else if(a.test(h,f))return!0;return!1}function q(h,f,g,m){var e=[],b,k;if((b=h=a.get(h))&&g)b=h.parentNode;if(b){g=c.makeArray(b.childNodes);for(b=0;b<g.length;b++)k=g[b],(m||k.nodeType==t.ELEMENT_NODE)&&k!=h&&e.push(k);f&&(e=a.filter(e,f))}return e}var t=a.NodeType;c.mix(a,{_contains:function(a,c){return!!(a.compareDocumentPosition(c)&16)},closest:function(a,c,g,m){return o(a,c,"parentNode",function(a){return a.nodeType!=t.DOCUMENT_FRAGMENT_NODE},g,!0,m)},parent:function(a,c,j){return o(a,
c,"parentNode",function(a){return a.nodeType!=t.DOCUMENT_FRAGMENT_NODE},j,g)},first:function(c,f,j){c=a.get(c);return o(c&&c.firstChild,f,"nextSibling",g,g,!0,j)},last:function(c,f,j){c=a.get(c);return o(c&&c.lastChild,f,"previousSibling",g,g,!0,j)},next:function(a,c,j){return o(a,c,"nextSibling",g,g,g,j)},prev:function(a,c,j){return o(a,c,"previousSibling",g,g,g,j)},siblings:function(a,c,g){return q(a,c,!0,g)},children:function(a,c){return q(a,c,g)},contents:function(a,c){return q(a,c,g,1)},contains:function(c,
f){c=a.get(c);f=a.get(f);return c&&f?a._contains(c,f):!1},index:function(h,f){var g=a.query(h),m,e=0;m=g[0];if(!f){g=m&&m.parentNode;if(!g)return-1;for(;m=m.previousSibling;)m.nodeType==t.ELEMENT_NODE&&e++;return e}e=a.query(f);return"string"===typeof f?c.indexOf(m,e):c.indexOf(e[0],g)},equals:function(c,f){c=a.query(c);f=a.query(f);if(c.length!=f.length)return!1;for(var g=c.length;0<=g;g--)if(c[g]!=f[g])return!1;return!0}});return a},{requires:["./api"]});
KISSY.add("dom/base",function(c,a){c.mix(c,{DOM:a,get:a.get,query:a.query});return a},{requires:"./base/api,./base/attr,./base/class,./base/create,./base/data,./base/insertion,./base/offset,./base/style,./base/selector,./base/traversal".split(",")});