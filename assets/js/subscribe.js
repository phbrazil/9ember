$(function () {

    $("#subscribe input,#subscribe emailSub").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var email = $("input#emailSub").val();

            $.ajax({
                url: "https://www.cyberoficina.com.br/subscribe",
                //url: "http://localhost:8080/CyberOficina/subscribe",
                type: "POST",
                data: {
                    email: email
                },
                cache: false,
                success: function () {
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
                },
                error: function () {
                    // Fail message
                    $('#successSubscribe').html("<div class='alert alert-danger'>");
                    $('#successSubscribe > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#successSubscribe > .alert-danger').append("<strong>Desculpe " + email + ", aparentemente nossos servidores não estão respondendo. Por favor tente novamente mais tarde!");
                    $('#successSubscribe > .alert-danger').append('</div>');
                    //clear all fields
                    $('#subscribe').trigger("reset");
                },
            })
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