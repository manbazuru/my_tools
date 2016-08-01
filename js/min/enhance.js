+function(t){"use strict";function i(){this._activeZoom=this._initialScrollPosition=this._initialTouchPosition=this._touchMoveListener=null,this._$document=t(document),this._$window=t(window),this._$body=t(document.body),this._boundClick=t.proxy(this._clickHandler,this)}function o(i){this._fullHeight=this._fullWidth=this._overlay=this._targetImageWrap=null,this._targetImage=i,this._$body=t(document.body),this._transitionDuration=300}i.prototype.listen=function(){this._$body.on("click",'[data-action="zoom"]',t.proxy(this._zoom,this))},i.prototype._zoom=function(i){var e=i.target;if(e&&"IMG"==e.tagName&&!this._$body.hasClass("zoom-overlay-open"))return i.metaKey||i.ctrlKey?window.open(i.target.src,"_blank"):void(e.width>=window.innerWidth-o.OFFSET||(this._activeZoomClose(!0),this._activeZoom=new o(e),this._activeZoom.zoomImage(),this._$window.on("scroll.zoom",t.proxy(this._scrollHandler,this)),this._$document.on("keyup.zoom",t.proxy(this._keyHandler,this)),this._$document.on("touchstart.zoom",t.proxy(this._touchStart,this)),document.addEventListener("click",this._boundClick,!0),i.stopPropagation()))},i.prototype._activeZoomClose=function(t){this._activeZoom&&(t?this._activeZoom.dispose():this._activeZoom.close(),this._$window.off(".zoom"),this._$document.off(".zoom"),document.removeEventListener("click",this._boundClick,!0),this._activeZoom=null)},i.prototype._scrollHandler=function(t){null===this._initialScrollPosition&&(this._initialScrollPosition=window.scrollY);var i=this._initialScrollPosition-window.scrollY;Math.abs(i)>=40&&this._activeZoomClose()},i.prototype._keyHandler=function(t){27==t.keyCode&&this._activeZoomClose()},i.prototype._clickHandler=function(t){t.stopPropagation(),t.preventDefault(),this._activeZoomClose()},i.prototype._touchStart=function(i){this._initialTouchPosition=i.touches[0].pageY,t(i.target).on("touchmove.zoom",t.proxy(this._touchMove,this))},i.prototype._touchMove=function(i){Math.abs(i.touches[0].pageY-this._initialTouchPosition)>10&&(this._activeZoomClose(),t(i.target).off("touchmove.zoom"))},o.OFFSET=80,o.prototype.zoomImage=function(){var i=document.createElement("img");i.onload=t.proxy(function(){this._fullHeight=Number(i.height),this._fullWidth=Number(i.width),this._zoomOriginal()},this),i.src=this._targetImage.src},o.prototype._zoomOriginal=function(){this._targetImageWrap=document.createElement("div"),this._targetImageWrap.className="zoom-img-wrap",this._targetImage.parentNode.insertBefore(this._targetImageWrap,this._targetImage),this._targetImageWrap.appendChild(this._targetImage),t(this._targetImage).addClass("zoom-img").attr("data-action","zoom-out"),this._overlay=document.createElement("div"),this._overlay.className="zoom-overlay",document.body.appendChild(this._overlay),this._calculateZoom(),this._triggerAnimation()},o.prototype._calculateZoom=function(){this._targetImage.offsetWidth;var t=this._fullWidth,i=this._fullHeight,e=(window.scrollY,window.innerHeight-o.OFFSET),a=window.innerWidth-o.OFFSET,s=a/e,r=t/i,h=this._targetImage.width/this._targetImage.height;this._trueHeight=this._targetImage.height,this._trueWidth=this._targetImage.width,h>r?this._trueHeight=this._fullHeight*this._targetImage.width/this._fullWidth:this._trueWidth=this._fullWidth*this._targetImage.height/this._fullHeight;var n=t/this._trueWidth;a>t&&e>i?this._imgScaleFactor=n:s>r?this._imgScaleFactor=e/i*n:this._imgScaleFactor=a/t*n},o.prototype._triggerAnimation=function(){this._targetImage.offsetWidth;var i=t(this._targetImage).offset(),o=t(window).scrollTop(),e=o+window.innerHeight/2,a=window.innerWidth/2,s=i.top+this._trueHeight/2,r=i.left+this._trueWidth/2;this._translateY=e-s,this._translateX=a-r,t(this._targetImage).velocity({scale:this._imgScaleFactor,height:this._trueHeight,width:this._trueWidth},this._transitionDuration),t(this._targetImageWrap).velocity({translateX:this._translateX,translateY:this._translateY,translateZ:0},this._transitionDuration),this._$body.addClass("zoom-overlay-open")},o.prototype.close=function(){this._$body.removeClass("zoom-overlay-open").addClass("zoom-overlay-transitioning"),t(this._targetImage).velocity("reverse",{duration:this._transitionDuration});var i=this;t(this._targetImageWrap).velocity({translateX:0,translateY:0},{duration:this._transitionDuration,complete:function(t){i.dispose()}})},o.prototype.dispose=function(){this._targetImageWrap&&this._targetImageWrap.parentNode&&(t(this._targetImage).removeClass("zoom-img").attr("data-action","zoom").css({width:"",height:"",transform:""}),this._targetImageWrap.parentNode.replaceChild(this._targetImage,this._targetImageWrap),this._overlay.parentNode.removeChild(this._overlay),this._$body.removeClass("zoom-overlay-transitioning"))},t(function(){(new i).listen()})}(jQuery);