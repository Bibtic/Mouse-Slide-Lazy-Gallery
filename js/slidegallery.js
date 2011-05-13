(function($){
	$.fn.slidegallery = function(options) {
		
		var settings = {
			preloadd:4,
			maxSpeed:10,		//Velocitat màxima del scroll en pixels
			histeresis:250,		//Limits de histeresis (0px fins a 250  i de gal_view_width-histeresis fins a gal_view_width) en pixels
			imagebuffer:600,		//Buffer de pos per carregar la seguent imatge: quant la imatge es trobi a gal_view_width+imagebuffer farà el load.
			showlabel:true
		};
		
		return this.each(function () {
			if ( options ) { 
				$.extend( settings, options );
			}
			
			//Variables del programa:
			var $wrapper = $(this);
			var	$slider = $wrapper.find('> ul');
			var	$images = $slider.find('a');
			var	$lis = $slider.find('> li');

			var imgsrc = new Array();
			var imgw = new Array();
			var imgh = new Array();
			var pos = new Array();
			var hasimg = new Array();
			var interval;
			var valor=0;
			var indeximg=0;
			var totalimg=0;
			var totalwidth=0;
			var gal_view_width=0;
			var limits=false;
			
			
			$wrapper.css({"overflow":"hidden","position":"relative"});
			$slider.css({"position":"relative"});
			$lis.css({"float":"left","list-style":"none","left":"0px","position":"relative"});

			//	$wrapper.after('<div id="log">');
			var arrImgs = $images;
			var maxHeight=0;
			$.each(arrImgs, function(index) {
				imgsrc[index] = $(this).attr("href");
				var aux=$(this).attr("rel").split(",");
				imgw[index] = aux[0];
				imgh[index] = aux[1];
				if (maxHeight<imgh[index])	maxHeight=imgh[index];
				pos[index] = $(this).parent('li').css("left");
				hasimg[index] = false;
				totalimg++;
				$(this).css({"float":"left","display":"block","width":imgw[index]+"px","height":imgh[index]+"px"});
				totalwidth+= $(this).parent('li').outerWidth(true);
				$(this).parent().append('<span class="holder" id="img_'+index+'"></span>');
			});
			$wrapper.css({"height":maxHeight+"px"});
			$slider.css({"width":totalwidth+"px"});
			$lis.css({"heigh":maxHeight+"px"});
			gal_view_width=parseFloat($wrapper.css("width").replace("px",""));	
			
			//Mouse enters into galeria Carousel
			$wrapper.mouseenter(function(){
				//Bind mouseover method:
				$wrapper.bind('mousemove', function(e){
					var offset = $wrapper.offset();
					var x = parseFloat(e.pageX - offset.left);
					var y = parseFloat(e.pageY - offset.top);
					var lft=parseFloat($slider.css("left").replace("px",""));
					if (!limits){
						if ((x>0)&&(x<settings.histeresis)){		//Mou a la dreta
							valor=speedIt(x,1);
						}
						if ((x<gal_view_width)&&(x>(gal_view_width-settings.histeresis))){		//Mou a la esquerra
							valor=speedIt(x,-1);
						}
						if ((x>=settings.histeresis)&&(x<=(gal_view_width-settings.histeresis))){	//No moguis res
							valor=0;
						}
					}else{
						valor=0;
					}
				});
			});
			
			//Mouse leaves galeria Carousel
			$wrapper.mouseleave(function(){
				valor=0;
				//unBind mouseover method:
				$wrapper.unbind('mousemove');
			});
			limits=false;
			indeximg=0;
			if (settings.preloadd>totalimg)	settings.preloadd=totalimg;
			for (i=0;i<settings.preloadd;i++){
				loadImage();	//0  Load 1
			}
			scrollgal();	//Start ScrollGallery
			
	
		
			function speedIt(ix,sentit)
				{
				var tant=0;
				if (sentit>0){
					tant=100-(ix*100/settings.histeresis);
				}else{
					tant=100-((gal_view_width-ix)*100/settings.histeresis);
				}
				return sentit*Math.round(settings.maxSpeed*tant/100);
			}

			function scrollgal(){
				testPosition();
				activateLazyLoad();
				var lft=parseFloat($slider.css("left").replace("px",""));
				if (!limits){
				$slider.animate({left: '+='+valor+'px'},{queue:false, duration:10, easing:'linear', complete: function(){
					scrollgal();  
					}
				});
				}else{
					scrollgal();
				}
			}

			function testPosition(){
				var lft=parseFloat($slider.css("left").replace("px",""));
				//$('#log').html('<div>'+$("#galeria_ul").css("left")+','+lft+','+totalwidth+','+valor+','+limits+'</div>');
				if ((lft>=0)&&(valor>0)){
					limits=true;
					valor=0; //out	
					$slider.css("left","0px");
					return true;
				}
				if ((valor<0)&&((-1)*lft>=(totalwidth-gal_view_width))){
					limits=true;
					valor=0; //out
					$slider.css("left",(-1)*(totalwidth-gal_view_width)+"px");
					return true;
				}	
				limits=false;
			}

			function activateLazyLoad(){
				var offset = $wrapper.offset();
				var x = parseFloat(offset.left);
				var y = parseFloat(offset.top);
				offset = $slider.children('li:eq('+indeximg+')').offset();
				if ((offset.left<(gal_view_width+settings.imagebuffer))&&(!hasimg[indeximg]))	loadImage();
			}

			function loadImage(){
				if (indeximg<totalimg){
					hasimg[indeximg] = true;
					var caption=$slider.children('li:eq('+indeximg+')').children('a').attr("title");
					$lis.children('#img_'+indeximg).prev('a').remove();
					$lis.children('#img_'+indeximg).hide();
					$lis.children('#img_'+indeximg).append('<img class="load" src="'+imgsrc[indeximg]+'" width="'+imgw[indeximg]+'" height="'+imgh[indeximg]+'" />').fadeIn();
					if (settings.showlabel){
						$lis.children('#img_'+indeximg).append('<span class="caption">'+caption+'</span>');
					}
					if ((indeximg+1)<totalimg){
						indeximg++;
					}
				}
			}
			
		}); //return
	};
})(jQuery);

