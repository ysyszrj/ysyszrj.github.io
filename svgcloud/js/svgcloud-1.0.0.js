!function(t){"use strict";t.fn.SvgCloud=function(e,r){var n=this,a=n.attr("id")||Math.floor(1e6*Math.random()).toString(36),i={width:n.width(),height:n.height()-20,center:{x:(r&&r.width?r.width:n.width())/2,y:(r&&r.height?r.height:n.height())/2},delayedMode:e.length<50,shape:!1,encodeURI:!0,removeOverflowing:!0,font_color:"#369"};r=t.extend(i,r||{});new Array,new Array;"static"===n.css("position")&&n.css("position","relative");var h=function(){for(var i=d3.select(n.selector).append("svg").attr("width",n.width()).attr("height",n.height()).attr("id","wordcloudsvg"),h=function(t,e){var r=function(t,e){var r=parseInt(t.attr("x")),n=parseInt(t.attr("y")),a=parseInt(t.style("width")),i=parseInt(t.style("height")),h=parseInt(e.attr("x")),o=parseInt(e.attr("y")),l=parseInt(e.style("width")),s=parseInt(e.style("height")),d=r+a/2,c=n-i/2,g=h+l/2,f=o-s/2;return Math.abs(2*d-2*g)<a+l&&Math.abs(2*c-2*f)<i+s},n=0;for(n=0;n<e.length;n++)if(r(t,e[n]))return!0;return!1},o=0;o<e.length;o++)e[o].weight=parseFloat(e[o].weight,10);e.sort(function(t,e){return t.weight<e.weight?1:t.weight>e.weight?-1:0});var l="rectangular"===r.shape?18:2,s=[],d=r.width/r.height,c=function(n,o){var c,g=a+"_word_"+n,f=6.28*Math.random(),u=0,w=0,p=0,v=5,y="",m="";o.html=t.extend(o.html,{id:g}),o.html&&o.html["class"]&&(y=o.html["class"],delete o.html["class"]),e[0].weight>e[e.length-1].weight&&(v=Math.round((o.weight-e[e.length-1].weight)/(e[0].weight-e[e.length-1].weight)*9)+1),c=i.append("g").attr("class","wd").append("text").attr("class","w"+v+" "+y).attr("id",o.html.id).attr("fill",r.font_color).style("font-size",5*v),o.link?("string"==typeof o.link&&(o.link={href:o.link}),r.encodeURI&&(o.link=t.extend(o.link,{href:encodeURI(o.link.href).replace(/'/g,"%27")})),m=t("<a>").attr(o.link).text(o.text)):m=o.text,c.text(o.text);var x=parseInt(c.style("width")),M=parseInt(c.style("height")),I=r.center.x-x/2,k=r.center.y-M/2;for(c.attr("x",I),c.attr("y",k);h(c,s);){if("rectangular"===r.shape)switch(w++,w*l>(1+Math.floor(p/2))*l*(p%4%2===0?1:d)&&(w=0,p++),p%4){case 1:I+=l*d+2*Math.random();break;case 2:k-=l+2*Math.random();break;case 3:I-=l*d+2*Math.random();break;case 0:k+=l+2*Math.random()}else u+=l,f+=(n%2===0?1:-1)*l,I=r.center.x-x/2+u*Math.cos(f)*d,k=r.center.y+u*Math.sin(f)-M/2;c.attr("x",I),c.attr("y",k)}return r.removeOverflowing&&(I<0||k<0||I+x>r.width||k+M>r.height)?void c.remove():(s.push(c),void(t.isFunction(o.afterWordRender)&&o.afterWordRender.call(c)))},g=function(a){return a=a||0,n.is(":visible")?void(a<e.length?(c(a,e[a]),setTimeout(function(){g(a+1)},10)):t.isFunction(r.afterCloudRender)&&r.afterCloudRender.call(n)):void setTimeout(function(){g(a)},10)};r.delayedMode?g():(t.each(e,c),t.isFunction(r.afterCloudRender)&&r.afterCloudRender.call(n))};return h(),n}}(jQuery);