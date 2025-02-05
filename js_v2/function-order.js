$(function() {
	
	/* Order Form */
	$( "#date_from" ).datepicker();
	$( "#date_from" ).datepicker( "option", "showAnim", "slideDown" );
	$( "#date_from" ).datepicker( "option", "dateFormat", "yy-mm-dd" );
	$( "#date_from" ).val(''); //set Old Value
	$( "#time_start" ).timepicker(); 
	
	//postavim zvezdochky vozleobjazatelnih polei
	$('label.required').append('&nbsp;<span class="redstar">*</span>&nbsp;');
	
	//submit
	$("#orderForm a.btn").click(function(){
	    $("#orderForm").submit();
    });
	
	//validate
	$("#orderForm").validate({
	
		ignore: "hidden",
	
		rules: {
			id_a: {required: true},
			country_from: {required: true},
			direction_from: {required: true},
			fly_number: {minlength: 2, maxlength: 20},
			fly_from: {minlength: 2},
			fly_card_note: {minlength: 2},
			address_from: {},
			country_to: {required: true},
			direction_to: {required: true},
			address_to: {minlength: 2, maxlength: 250},
			date_from: {required: true, dpDate: true},
			time_start: {required: true, time: true},
			qta_passenger: {required: true, number: true, maxlength: 2},
			qta_bags: {required: true, number: true, maxlength: 2},
			first_name: {required: true, minlength: 2, maxlength: 50},
			second_name: {required: true, minlength: 2, maxlength: 50},
			phone: {isphone: true},
			email: {required: true, email: true},
			message: {minlength: 5, maxlength: 500},
		},
		messages: {
			id_a: {
				required:"Choose the car from the list"
			}, 
			country_from: {
				required:"Fill departure country"
			}, 
			direction_from: {
				required: "Insert point of departure"
			}, 
			fly_number: {
				minlength:"Fight number is too long 2",
			 	maxlength:"Flight number can not be so short 20"
			},
			fly_from: {
				minlength:"Departure country is too long 2"
			},
			fly_card_note: {
				minlength:"Name on plate is too long 2"
			},
			address_from: {},
			country_to: {
				required:"Insert Arrival country"
			},
			direction_to: {
				required: "Insert Arrival point"
			},
			address_to: {
				minlength:"Arrival address is too short 2",
				maxlength:"Arrival address is too long 250"
			},
			date_from: {
				required: "Departure date",
				dpDate: "Incorrect date format"
			},
			time_start: {
				required:"Departure time",
				time:"Incorrect time format. <br>Time format should be HH:MM<br> Ex. - 05:45"
			},
			qta_passenger: {
				required:"Specify number of passengers",
				number:"Incorrect format",
				maxlength:"Incorrect format 99"
			},
			qta_bags: {
				required:"Specify luggage q-ty",
				number:"Incorrect format",
				maxlength:"Incorrect format 99"
			},
			first_name: {
				required:"Insert your name client ",
				minlength:"Name can not be shorter than 1 char 2",
				maxlength:"Name can not be longer than 50 chars 50"
			},
			second_name: {
				required:"Insert your surname",
				minlength:"Surname can not be shorter than 1 char 2",
				maxlength:"Surname can not be longer than 50 chars 50"
			},
			phone: {
				isphone:"Phone num. has an incorrect format (ex: +39-380-1000000)"
			},
			email: {
				required:"E-mail required",
				email:"E-mail has an incorrect format"
			},
			message: {
				minlength:"Message text can not be less then 5",
				maxlength:"Message text can not be more then 500"
			}
		},
		
		// set this class to error-labels to indicate valid fields
		success: function(label) {
			// set &nbsp; as text for IE
			//label.html('&nbsp;<img src="/images/icons/accept.png" alt="ok!" title="ok!" />').addClass("checked");
			//$('span.error').addClass("hidemsg");
		},
		submitHandler: function (form) {
            form.submit();  
        }
	});


	// zagrygaem spiski gorodov
	$("#country_from, #country_to").change(function () {
         
		var id = $(this).attr("id");
		
		if(id == 'country_from'){
			var dest = 	'direction_from';
		}
		else {
		 	var dest = 	'direction_to';
		}
		 
		$("#" + dest).hide();
		$("#loading_" + dest).show(); // запускаем 
		//alert('http://' + location.host + '/ajax.html' + 'direction_from' + $("#"+obj).val());
		
		//var ajax_url = 'https://' + location.host + '/ajax.html';
		{/literal}
		var ajax_url = 'https://' + location.host + '/{if $ln <> $default_ln}{$ln}/{/if}ajax.html';
		{literal}
		alert(ajax_url);
		
		$.post(ajax_url, { action: 'direction_from', id: $(this).val() }, updateFild);
			
		function updateFild(data) {
			$('#' + dest).html(data);
			$("#" + dest).show();
			$("#loading_" + dest).hide(); // скрываем загрузку
			$('#orderForm').validate().element($('#' + dest)); //проверяем на валидность
			$('#orderForm').validate().element(this); //проверяем на валидность
		}
    });
	
	// pokazivaem dopolnitelnie polja dlja viezda zagranizy 
	$("#direction_from, #direction_to").change(function () {
         
		var type = $(this).attr("id");
		
		{/literal}
		var ajax_url = 'https://' + location.host + '/{if $ln <> $default_ln}{$ln}/{/if}ajax.html';
		{literal}
		
		$.post(ajax_url, { action: 'direction_type', id: $(this).val() }, showTypeFild);
		 
		$('#orderForm').validate().element(this); 
		 
		function showTypeFild(data) {
			
			//from
			if(type == 'direction_from'){
				if(data == 2){
					$('#city_from_filds').hide();
					$('#airport_from_filds').show();
				}
				else {
					$('#city_from_filds').show();
					$('#airport_from_filds').hide();
				}
			}
			//to
			else {
				if(data == 2){
					$('#city_to_filds').hide();
				}
				else {
					$('#city_to_filds').show();
				}
			}
		 }//function
    });
	
	
	$('#id_a').change(function() {
		//alert('B');
	  	$('#orderForm').validate().element(this);
	});
});