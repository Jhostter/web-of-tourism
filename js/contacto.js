$(document).ready(function() {
    $("#testimonial-slider").owlCarousel({
        items: 1,
        itemsDesktop: [1000, 1],
        itemsDesktopSmall: [979, 1],
        itemsTablet: [768, 1],
        pagination: true,
        navigation: true,
        navigationText: ["", ""],
        slideSpeed: 1000,
        autoPlay: true
    });
});

document.getElementById("btn_guardar").addEventListener("click", () => {

            let nombre = document.getElementById("inputName-contact").value;
            let email = document.getElementById("inputEmail-contact").value;
            let asunto = document.getElementById("inputAsunto-contact").value;
            let mensaje = document.getElementById("inputMensaje").value;
            let formdata = new FormData();


            if ((nombre == "&nbsp;" || nombre == "") ||
                (asunto == "&nbsp;" || asunto == "") ||
                (mensaje == "&nbsp;" || mensaje == "")) {
                alert("ERROR. No se permiten campos vacios");
                event.preventDefault();
            } else {

                const vue = new Vue({
                    el: '#app',
                    data() {
                        return {
                            from_name: '',
                            from_email: '',
                            message: '',
                            subject: '',
                        }
                    },
                    methods: {
                        enviar() {
                            let data = {
                                from_name: this.from_name,
                                from_email: this.from_email,
                                message: this.message,
                                subject: this.subject,
                            };

                            emailjs.send("gmail", "fom-contacto", data)
                                .then(function(response) {
                                    if (response.text === 'OK') {
                                        alert('El correo se ha enviado de forma exitosa');
                                    }
                                    console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
                                }, function(err) {
                                    alert('Ocurrió un problema al enviar el correo');
                                    console.log("FAILED. error=", err);
                                });
                        }
                    }
                });
            }
        });

        // (function(){
        //                 emailjs.init("jhostter");
        //              })();