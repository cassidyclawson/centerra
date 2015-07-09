/*!
 * USED TO PREVENT FLICKERING IN FLEXNAV
 *
 * hoverIntent v1.8.1 // 2014.08.11 // jQuery v1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):jQuery&&!jQuery.fn.hoverIntent&&e(jQuery)}(function(e){"use strict";var t,n,o={interval:100,sensitivity:6,timeout:0},i=0,r=function(e){t=e.pageX,n=e.pageY},u=function(e,o,i,v){return Math.sqrt((i.pX-t)*(i.pX-t)+(i.pY-n)*(i.pY-n))<v.sensitivity?(o.off("mousemove.hoverIntent"+i.namespace,r),delete i.timeoutId,i.isActive=!0,delete i.pX,delete i.pY,v.over.apply(o[0],[e])):(i.pX=t,i.pY=n,i.timeoutId=setTimeout(function(){u(e,o,i,v)},v.interval),void 0)},v=function(e,t,n,o){return delete t.data("hoverIntent")[n.id],o.apply(t[0],[e])};e.fn.hoverIntent=function(t,n,s){var a=i++,d=e.extend({},o);d=e.isPlainObject(t)?e.extend(d,t):e.isFunction(n)?e.extend(d,{over:t,out:n,selector:s}):e.extend(d,{over:t,out:t,selector:n});var m=function(t){var n=e.extend({},t),o=e(this),i=o.data("hoverIntent");i||o.data("hoverIntent",i={});var s=i[a];s||(i[a]=s={id:a}),s.timeoutId&&(s.timeoutId=clearTimeout(s.timeoutId));var m=s.namespace=".hoverIntent"+a;if("mouseenter"===t.type){if(s.isActive)return;s.pX=n.pageX,s.pY=n.pageY,o.on("mousemove.hoverIntent"+m,r),s.timeoutId=setTimeout(function(){u(n,o,s,d)},d.interval)}else{if(!s.isActive)return;o.off("mousemove.hoverIntent"+m,r),s.timeoutId=setTimeout(function(){v(n,o,s,d.out)},d.timeout)}};return this.on({"mouseenter.hoverIntent":m,"mouseleave.hoverIntent":m},d.selector)}});