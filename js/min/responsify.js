!function(t){t.fn.responsify=function(){return this.each(function(){var e,r,a,i,o,h,n,s,f,u,c,d,p=t(this);if(e=p.width(),r=p.height(),a=p.parent().width(),i=p.parent().height(),o=Number(p.attr("data-focus-left")),h=Number(p.attr("data-focus-top")),n=Number(p.attr("data-focus-right")),s=Number(p.attr("data-focus-bottom")),e/r>a/i){var b=(n-o)*e;b/r>a/i?(u=r*a/b,f=e*a/b,d=-o*f,c=(i-u)/2):(u=i,f=i*e/r,d=a/2-(o+n)*f/2,d=d>0?0:d,d=a-d-f>0?a-f:d,c=0)}else{var l=(s-h)*r;l/e>i/a?(f=e*i/l,u=r*i/l,c=-h*u,d=(a-f)/2):(f=a,u=a*r/e,c=i/2-(h+s)*u/2,c=c>0?0:c,c=i-c-u>0?i-u:c,d=0)}p.parent().css({overflow:"hidden"}),p.css({position:"relative",height:u,width:f,left:d,top:c})})}}(jQuery);