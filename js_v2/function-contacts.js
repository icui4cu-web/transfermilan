$(function() {
	/* Contact Form */
    $("#contactForm a.btn").click(function(){
        $("#contactForm").submit();
    });
	$('label.required').append('&nbsp;<span class="redstar">*</span>&nbsp;');
    $("#contactForm").validate({
        ignore: "hidden",
        rules: {
			username: {required: true},
			email: {required: true, email: true},
			message: {required: true, minlength: 5, maxlength: 500},
			security_code: {required: true}
		},
        messages: {
			username: {
				required: "@@{$ff_mm_enter_username}"
			},
			email: {
				required: "E-mail required",
				email: "E-mail has an incorrect format"
			},
			message: {
				required: "Text messages are not filled",
				minlength: "Message text can not be less then 5",
				maxlength: "Message text can not be more then 500"
			},
			security_code: {
				required: "Secure code not inserted",
			}
        },
        submitHandler: function (form) {
            form.submit();  
        }
    });
});