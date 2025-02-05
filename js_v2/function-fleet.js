$(function() {
	/* bookingForm */
	
	//submit
	$("#bookingForm a.btn").click(function(){
	    $(this).submit();
    });
	
	// From <> To revert
    $("#bookingForm img.revert").click(function(){
        var from_name = $("#bookingForm input[name='direction_from_name']").val();
        var to_name = $("#bookingForm input[name='direction_to_name']").val();
        var from = $("#bookingForm input[name='direction_from']").val();
        var to = $("#bookingForm input[name='direction_to']").val();
		
		$("#bookingForm input[name='direction_from_name']").val(to_name);
        $("#bookingForm input[name='direction_to_name']").val(from_name);
		$("#bookingForm input[name='direction_from']").val(to);
        $("#bookingForm input[name='direction_to']").val(from);
    });
	
	// Autocomplete
	$("#direction_from_name").autocomplete({
		source : function(request, response) {
			$.ajax({
				url : 'https://' + location.host + '/ajax.html',
				dataType : "json",
				method : 'post',
				data : {
					term : request.term,
					action : 'search_form_tarif',
					row_num : 1
				},
				success : function(data) {
					
					response($.map(data, function(item) {
						var code = item.split("|");
						
						return {
							label : code[0],
							value : code[0],
							data : item
						}
					}));
				}
			});
		},
		minLength: 2,//search after two characters
				
		select : function(event, ui) {
			var names = ui.item.data.split("|");
			$('#direction_from').val(names[1]);
			//
			$('.loading_from').hide();
		},
		search : function(event, ui) {
			$('.loading_from').show();
		},
		focus : function(event, ui) {
			$('.loading_from').hide();
		},
	});
	
	$("#direction_to_name").autocomplete({
		
		source : function(request, response) {
			$.ajax({
				url : 'https://' + location.host + '/ajax.html',
				dataType : "json",
				method : 'post',
				data : {
					term : request.term,
					action : 'search_form_tarif',
					row_num : 1
				},
				success : function(data) {
					response($.map(data, function(item) {
						var code = item.split("|");
						return {
							label : code[0],
							value : code[0],
							data : item
						}
					}));
				}
			});
		},
		minLength: 2,//search after two characters
				
		select : function(event, ui) {
			var names = ui.item.data.split("|");
			$('#direction_to').val(names[1]);
		},
		search : function(event, ui) {
			$('.loading_to').show();
		},
		focus : function(event, ui) {
			$('.loading_to').hide();
		},
	});
	
	// validate bookingForm
	$("#bookingForm").validate({
		//ignore: '',
	 	rules: {
			direction_from_name: {required: true},
			direction_from: {required: true},
			direction_to_name: {required: true},
			direction_to: {required: true},
		},
		messages: {
			direction_from_name: {
				required: "Select point of departure (city, airport ...)"
			},
			direction_from: {
				required:""
				
			},
			direction_to_name: {
				required:"Select destination point (city, airport ...)"
			}, 
			direction_to: {
				required:""
				
			}, 
		},
		
		success: function(label) {
			// set &nbsp; as text for IE
			//label.html('').addClass("checked");
			//$('span.error').addClass("hidemsg");
		},
		submitHandler: function (form) {
            form.submit();  
        }
	});
});