$(function(){
	"use strict";
	
	var $portfolio = $('.portfolio-items'),
		$blog = $('.blog-posts');
	
	$('html').removeClass('no-js').addClass('js');
	
	/*=========================================================================
		Typed.js (Text typing effect)
	=========================================================================*/
	$('#typed').typed({
		stringsElement: $('#typed-strings'),
		loop: true,
		backDelay: 2000
	});
	
	/*=========================================================================
		Menu Functioning
	=========================================================================*/
	$('.menu-nav > .items > li').on('mouseenter', function(){
		$('.menu-nav > .items > li').addClass('low-opacity');
		$(this).removeClass('low-opacity');
	});
	
	$('.menu-nav > .items > li').on('mouseleave', function(){
		$('.menu-nav > .items > li').removeClass('low-opacity');
	});
	
	$('.toggle-menu').on('click', function(e){
		$('body').toggleClass('show-menu');
	});
	
	$('.menu-nav > .items > li > a').on('click', function(e){
		$('body').removeClass('show-menu').addClass('show-section');
		$('.section.active').removeClass('active');
		$( '#' + $(this).data('section') ).addClass('active');
		setTimeout(function(){
			$portfolio.shuffle('update');
			$blog.shuffle('update');
		},1000);
	});
	
	$('.menu-nav > .items > li > a.home-link').on('click', function(e){
		$('body').removeClass('show-menu show-section');
		$('.section.active').removeClass('active');
	});
	
	$(window).on('load', function(){
		
		$('body').addClass('loaded');
		
		var sect = window.location.hash;
		if ( $(sect).length == 1 ){
			$('body').addClass('show-section');
			$(sect).addClass('active');
		}
		
		/*=========================================================================
			Portfolio & Blog Grid
		=========================================================================*/
		setTimeout(function(){
			$portfolio.shuffle();
			$blog.shuffle();		
		}, 1000);
		
	});
	
	$(window).on('resize', function(){
		
		
		/*=========================================================================
			Update the portfolio & blog grid when window is resized
		=========================================================================*/
		setTimeout(function(){
			$portfolio.shuffle('update');
			$blog.shuffle('update');
		},1000);
		
	});
	
	
	
	/*=========================================================================
		Magnific Popup
	=========================================================================*/
	$('.has-popup').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	
	
	/*=========================================================================
		Initializing Skill Bars
	=========================================================================*/
	$('.skill').each(function(){
		var $this = $(this),
			percent = $this.data('percent') + '%';
		$('<span>').html(percent).appendTo(this);
		$("<div class='skill-bar' ><div class='percent' style='width:" + percent + ";' ></div></div>").appendTo(this);
	});
	
	/*=========================================================================
		Contact Form
	=========================================================================*/
	function isJSON(val){
		var str = val.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
		return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
	}
	$('#contact-form').validator().on('submit', function (e) {
		
		if (!e.isDefaultPrevented()) {
			// If there is no any error in validation then send the message
			
			e.preventDefault();
			var $this = $(this),
				
				//You can edit alerts here
				alerts = {
				
					success: 
					"<div class='form-group' >\
						<div class='alert alert-success' role='alert'> \
							<strong>Message Sent!</strong> We'll be in touch as soon as possible\
						</div>\
					</div>",
					
					
					error: 
					"<div class='form-group' >\
						<div class='alert alert-danger' role='alert'> \
							<strong>Oops!</strong> Sorry, an error occurred. Try again.\
						</div>\
					</div>"
					
				};
			
			$.ajax({
			
				url: 'mail.php',
				type: 'post',
				data: $this.serialize(),
				success: function(data){
					
					if( isJSON(data) ){
						
						data = $.parseJSON(data);
						
						if(data['error'] == false){
							
							$('#contact-form-result').html(alerts.success);
							
							$('#contact-form').trigger('reset');
							
						}else{
							
							$('#contact-form-result').html(
							"<div class='form-group' >\
								<div class='alert alert-danger alert-dismissible' role='alert'> \
									<button type='button' class='close' data-dismiss='alert' aria-label='Close' > \
										<i class='ion-ios-close-empty' ></i> \
									</button> \
									"+ data['error'] +"\
								</div>\
							</div>"
							);
							
						}
						
						
					}else{
						$('#contact-form-result').html(alerts.error);
					}
					
				},
				error: function(){
					$('#contact-form-result').html(alerts.error);
				}
			});
		}
	});
	
});