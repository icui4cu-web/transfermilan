$(function() {
	
	/* fixed top menu */
	$(window).scroll(function(){
	  var winScrollTop = $(this).scrollTop();
	  if(winScrollTop > 200){
		$('div.menu').css("background-color","#000");
	  }
	  else if (winScrollTop <= 200){
		  $('div.menu').css("background-color", "transparent");
	  }
	});

    $('#date_from').datepicker();
    $('#date_from').datepicker( "option", "showAnim", "slideDown" );
    $('#date_from').datepicker( "option", "dateFormat", "dd/mm/yy" );
    $('#time_start').timepicker(); 
    $('select#id_a').multilineSelectmenu();
    $('select#country_from').multilineSelectmenu();
    $('select#direction_from').multilineSelectmenu();
    $('select#country_to').multilineSelectmenu();
    $('select#direction_to').multilineSelectmenu();
    $('ul.fleetcompact').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [

            {
            breakpoint: 719,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
            },

            {
                breakpoint: 480,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1
                }
            }

          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });
});



$(document).ready(function() {
	
	// show language dropdowns
	jQuery('#lang-switcher').find('.ui-dropdown-list-trigger').each(function() {
		jQuery(this).click(function(){
			jQuery(this).parent().toggleClass('active');
		});
	});
	

    $.validator.addMethod("telefono_regex", function(value, element) {

        return this.optional(element) || /^[3]{1}[0-9]{7,9}$/i.test(value);

        }, "Il numero di telefono deve iniziare con la cifra 3 e deve essere costituito da almeno 9 cifre prefisso compreso.");

    $.validator.addMethod("number_regex", function(value, element) {

        return this.optional(element) || /^[0-9a-z/ -]+$/i.test(value);

        }, "Il civico non risulta corretto.");

    $.validator.addMethod("cap_regex", function(value, element) {

        return this.optional(element) || /^[0-9]{5}$/i.test(value);

        }, "Il CAP non risulta corretto.");

    $.validator.addMethod( "addr_regex", function( value, element ) {

        return this.optional( element ) || /^\s*\S.*$/i.test( value );

        }, "Per procedere и necessario inserire un indirizzo di spedizione valido" );



    $("#bookingForm img.revert").click(function(){

        var from = $("#bookingForm input[name='from']").val();

        var to = $("#bookingForm input[name='to']").val();

        $("#bookingForm input[name='from']").val(to);

        $("#bookingForm input[name='to']").val(from);

    });



    $("#bookingForm a.btn").click(function(){

        $("#bookingForm").submit();

    });



    $("#orderForm a.btn").click(function(){

        $("#orderForm").submit();

    });



    $("#contactForm a.btn").click(function(){

        $("#contactForm").submit();

    });



    $(".header a.icon-nav").click(function(){

        $(".header .navbar-mobile").show();

        $(".header a.icon-nav-close").show();

    });

    

    $(".header a.icon-nav-close").click(function(){

        $(".header .navbar-mobile").hide();

        $(".header a.icon-nav-close").hide();

    });



    $("#routes .heading").click(function(){

        if($(this).next("#routes .content").is(':visible')){

            $(this).toggleClass("open");

            $(this).next("#routes .content").slideToggle(500);

        }else {

            $("#routes .heading").removeClass("open");

            $("#routes .content").slideUp(500);

            $(this).toggleClass("open");

            $(this).next("#routes .content").slideToggle(500);

        }

    });



    $("#bookingForm").validate({

        ignore: [],

        onclick: false,

        onkeyup: false,

        onfocusout: false,

        rules: {
            'from': { required: true },
            'to':{required: true },
        },

        messages: {
            'from': { required: "Insert pickup point" },
            'to':{required: "Insert destination point"},
        },

        submitHandler: function (form) {
            //form.submit();  
        }
    });



    $("#contactForm").validate({

        ignore: [],
        onclick: false,
        onkeyup: false,
        onfocusout: false,

        rules: {

            'username': { required: true },
            'email':{required: true },
            'message':{required: true },

        },

        messages: {

            'username': { required: "Insert full anme" },
            'email':{required: "Insert email address"},
            'message':{required: "Insert comment"},
        },

        submitHandler: function (form) {
            //form.submit();  
        }

    });



    $("#orderForm").validate({

        ignore: [],

        onclick: false,

        onkeyup: false,

        onfocusout: true,

        rules: {

            'id_a': { required: true },
            'country_from':{required: true },
            'direction_from':{required: true },
            'date_from':{required: true },
            'time_start':{required: true },
            'country_to':{required: true },
            'direction_to':{required: true },
            'qta_passenger':{required: true },
            'qta_bags':{required: true },
            'first_name':{required: true },
            'second_name':{required: true },
            'phone':{required: true },
            'email':{required: true },
            'message':{required: true },

        },

        messages: {

            'id_a': { required: 'Insert car' },
            'country_from':{required: 'Insert departure country' },
            'direction_from':{required: 'Insert departure point' },
            'date_from':{required: 'Insert date' },
            'time_start':{required: 'Insert time' },
            'country_to':{required: 'Insert arrival country' },
            'direction_to':{required: 'Insert arrival point' },
            'qta_passenger':{required: 'Insert passenger' },
            'qta_bags':{required: 'Insert luggage' },
            'first_name':{required: 'Insert name' },
            'second_name':{required: 'Insert surname' },
            'phone':{required: 'Insert phone' },
            'email':{required: 'Insert mail' },
            'message':{required: 'Insert note' },
        },

        errorPlacement: function(error, element) {

            var name = $(element).attr("name");

            if (name === "id_a") {

                $("#field_car .error_label").remove();

                $("#field_car").append( "<div class=\"error_label\" style=\"font-weight:bold; color:red; margin-top: 6px;\">Insert car </div>") ;

                $("#car-button").css("border","1px solid red");

            } else if (name === "country_from") {

                $("#field_depcountry .error_label").remove();

                $("#field_depcountry").append( "<div class=\"error_label\" style=\"font-weight:bold; color:red; margin-top: 6px;\">Insert departure country </div>") ;

                $("#depcountry-button").css("border","1px solid red");

            } else if (name === "direction_from") {

                $("#field_deppoint .error_label").remove();

                $("#field_deppoint").append( "<div class=\"error_label\" style=\"font-weight:bold; color:red; margin-top: 6px;\">Insert departure point </div>") ;

                $("#deppoint-button").css("border","1px solid red");

            } else if (name === "country_to") {

                $("#field_arrcountry .error_label").remove();

                $("#field_arrcountry").append( "<div class=\"error_label\" style=\"font-weight:bold; color:red; margin-top: 6px;\">Insert arrival country </div>") ;

                $("#arrcountry-button").css("border","1px solid red");

            } else if (name === "direction_to") {

                $("#field_arrpoint .error_label").remove();

                $("#field_arrpoint").append( "<div class=\"error_label\" style=\"font-weight:bold; color:red; margin-top: 6px;\">Insert arrival point </div>") ;

                $("#arrpoint-button").css("border","1px solid red");

            } else {

                error.insertAfter(element);

            }

        },

        success: function(label,element) {

            var name = $(element).attr("name");

            if (name === "id_a") {

                $("#field_car .error_label").remove();

                $("#car-button").css("border","1px solid #fff");

            } else if (name === "country_from") {

                $("#field_depcountry .error_label").remove();

                $("#depcountry-button").css("border","1px solid #fff");

            } else if (name === "direction_from") {

                $("#field_deppoint .error_label").remove();

                $("#deppoint-button").css("border","1px solid #fff");

            } else if (name === "country_to") {

                $("#field_arrcountry .error_label").remove();

                $("#arrcountry-button").css("border","1px solid #fff");

            } else if (name === "direction_to") {

                $("#field_arrpoint .error_label").remove();

                $("#arrpoint-button").css("border","1px solid #fff");

            } else {

            }
        },

        submitHandler: function (form) {
            //form.submit();  
        }
    });
});