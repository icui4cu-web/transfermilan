$(document).ready(function(){$(".faq-list > li > .answer").hide(),$(".faq-list > li.faq_first").addClass("active").find(".answer").slideDown(400),$(".faq-list > li").click(function(){return $(this).hasClass("active")?($(this).removeClass("active").find(".answer").slideUp(400),$(".faq-list > li > h4 > span").text("+")):($(".faq-list > li.active .answer").slideUp(400),$(".faq-list > li.active > h4 > span").text("+"),$(".faq-list > li.active").removeClass("active"),$(this).addClass("active").find(".answer").slideDown(400),$(".faq-list > li.active > h4 > span").text("-")),!1}),$(window).scroll(function(){var n=$(this).scrollTop();n>200&&$("div.menu").css("background-color","#000"),n<=200&&$("div.menu").css("background-color","transparent")}),jQuery("#lang-switcher").find(".ui-dropdown-list-trigger").each(function(){jQuery(this).click(function(){jQuery(this).parent().toggleClass("active")})}),$(".header .icon-nav").click(function(){$(".header .navbar-mobile").toggle()}),localStorage.bannerClosed?$(".privacy-banner").css("display","none"):$(".privacy-banner").css("display","inherit"),$(".privacy-banner button").click(function(){consentGrantedALL(),$(".privacy-banner").css("display","none"),localStorage.bannerClosed="true"}),$(".banner-accept").click(function(){consentGrantedALL(),$(".privacy-banner").css("display","none"),localStorage.bannerClosed="true"}),$(".banner-decline").click(function(){$(".privacy-banner").css("display","none"),localStorage.bannerClosed="true"})}); 
	$(function(){$("#bookingForm img.revert").click(function(){var o=$("#bookingForm input[name='direction_from_name']").val(),n=$("#bookingForm input[name='direction_to_name']").val(),i=$("#bookingForm input[name='direction_from']").val(),t=$("#bookingForm input[name='direction_to']").val();$("#bookingForm input[name='direction_from_name']").val(n),$("#bookingForm input[name='direction_to_name']").val(o),$("#bookingForm input[name='direction_from']").val(t),$("#bookingForm input[name='direction_to']").val(i)}),$("#direction_from_name").autocomplete({source:function(o,n){$.ajax({url:"https://www.transfermilan.com/ajax.html",dataType:"json",method:"post",data:{term:o.term,action:"search_form_tarif",row_num:1},success:function(o){n($.map(o,function(o){var n=o.split("|");return{label:n[0],value:n[0],data:o}}))}})},minLength:2,select:function(o,n){var i=n.item.data.split("|");$("#direction_from").val(i[1]),$(".loading_from").hide()},search:function(o,n){$(".loading_from").show()},focus:function(o,n){$(".loading_from").hide()}}),$("#direction_to_name").autocomplete({source:function(o,n){$.ajax({url:"https://www.transfermilan.com/ajax.html",dataType:"json",method:"post",data:{term:o.term,action:"search_form_tarif",row_num:1},success:function(o){n($.map(o,function(o){var n=o.split("|");return{label:n[0],value:n[0],data:o}}))}})},minLength:2,select:function(o,n){var i=n.item.data.split("|");$("#direction_to").val(i[1])},search:function(o,n){$(".loading_to").show()},focus:function(o,n){$(".loading_to").hide()}})});	

;(() => {
	const bookingForm = document.getElementById('bookingForm')

	// validation
	if(bookingForm) {
		bookingForm.addEventListener('submit', event => {
			event.preventDefault();
		
			const form = event.target;
			let isValid = true;
		
			form.querySelectorAll('input[required]').forEach(input => {
				if (!input.value.trim()) {
					isValid = false;
					input.setCustomValidity(input.dataset.errorMessage || 'This field is required.');
				}
			});
		
			if (!isValid) {
				form.reportValidity();
			} else {
				form.submit();
			}
		})

		bookingForm.querySelectorAll('input[required]').forEach((input) => {
			input.addEventListener('input', () => {
				input.setCustomValidity('')
			})
		});
	}

	// slider
	function initSliderNavigation(slider) {
		const wrapper = slider.container.closest('.slider')
		const prevBtn = wrapper.querySelector('.slider__btn_dir_prev')
		const nextBtn = wrapper.querySelector('.slider__btn_dir_next')

		prevBtn?.addEventListener("click", () => slider.prev())
 		nextBtn?.addEventListener("click", () => slider.next())
	}

	const fleetcompact = new KeenSlider(".fleetcompact", {
		loop: true,
		slides: { perView: 3, spacing: 20 },
		breakpoints: {
		  "(max-width: 719px)": { slides: { perView: 2, spacing: 10 } },
		  "(max-width: 480px)": { slides: { perView: 1, spacing: 10 } }
		}
	})

	initSliderNavigation(fleetcompact)
})();