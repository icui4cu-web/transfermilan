/* https://www.toptal.com/developers/javascript-minifier */

$(document).ready(function() {
	//faq accordion-list -> faq-list
	$('.faq-list > li > .answer').hide();
	$('.faq-list > li.faq_first').addClass("active").find(".answer").slideDown(400);
		    
	$('.faq-list > li').click(function() {
		if ($(this).hasClass("active")) {
        	$(this).removeClass("active").find(".answer").slideUp(400);
			$(".faq-list > li > h4 > span").text('+');
		} else {
			$(".faq-list > li.active .answer").slideUp(400);
			$(".faq-list > li.active > h4 > span").text('+');
			$(".faq-list > li.active").removeClass("active");
		  	$(this).addClass("active").find(".answer").slideDown(400);
			$(".faq-list > li.active > h4 > span").text('-');
		}
		return false;
	});
	
	// fixed top menu
	$(window).scroll(function(){
	  var winScrollTop = $(this).scrollTop();
	  if(winScrollTop > 200){
		$('div.menu').css("background-color","#000");
	  }
	  if (winScrollTop <= 200){
		  $('div.menu').css("background-color", "transparent");
	  }
	});
	
	// show language top menu
	jQuery('#lang-switcher').find('.ui-dropdown-list-trigger').each(function() {
		jQuery(this).click(function(){
			jQuery(this).parent().toggleClass('active');
		});
	});
	
    // mobile hide Main menu
	$(".header a.icon-nav").click(function(){
        $(".header .navbar-mobile").show();
        $(".header a.icon-nav-close").show();
    });
    
    $(".header a.icon-nav-close").click(function(){
        $(".header .navbar-mobile").hide();
        $(".header a.icon-nav-close").hide();
    });
	
    // Banner Trigger if Not Closed
    if (!localStorage.bannerClosed) {
        $('.privacy-banner').css('display', 'inherit');
    } else {
	$('.privacy-banner').css('display', 'none'); // none
    }
	
    $('.privacy-banner button').click(function() {
        consentGrantedALL();
        $('.privacy-banner').css('display', 'none');
	localStorage.bannerClosed = 'true';
    });

    //ok
    $('.banner-accept').click(function() {
        consentGrantedALL();
        $('.privacy-banner').css('display', 'none');
	localStorage.bannerClosed = 'true';
    });
    //no
    $('.banner-decline').click(function() {
        $('.privacy-banner').css('display', 'none');
		localStorage.bannerClosed = 'true'; //true - esli zakrili - bolshe ne pokazivat
    });
});
