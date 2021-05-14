$(function () {

    $("#subscribe input,#subscribe emailSub").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM

            var subscribe = {
                email: $("input#emailSub").val(),
                data: ""

            };
            $.ajax({
                //url: "https://cyberoficina.herokuapp.com/subscribe/november",
                url: "http://localhost:8443/subscribe/november",
                headers: { 
                    'Content-Type': 'application/json' 
                },
                type: "POST",
                dataType: 'json',
                data: JSON.stringify(subscribe),
                cache: false,
                
                complete: function (xhr, textStatus) {
                    if(xhr.status ==200){
                    // Success message
                    $('#successSubscribe').html("<div style='position: absolute; width: 90%' class='mt-2 alert alert-success'>");
                    $('#successSubscribe > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#successSubscribe > .alert-success')
                            .append("<strong>Obrigado! Em breve você receberá nossas novidades. </strong>");
                    $('#successSubscribe > .alert-success')
                            .append('</div>');
                    $('#successSubscribe').delay(5000).fadeOut('slow');

                    //clear all fields
                    $('#subscribe').trigger("reset");
                    }else{

                        $('#successSubscribe').html("<div class='alert alert-danger'>");
                        $('#successSubscribe > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                        $('#successSubscribe > .alert-danger').append("<strong>Desculpe " + subscribe.email + ", aparentemente nossos servidores não estão respondendo. Por favor tente novamente mais tarde!");
                        $('#successSubscribe > .alert-danger').append('</div>');
                        //clear all fields
                        $('#subscribe').trigger("reset");

                    }
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#successSubscribe').focus(function () {
    $('#subscribe').html('');
});