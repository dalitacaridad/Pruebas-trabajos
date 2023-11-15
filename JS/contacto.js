const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const mensaje = document.getElementById("mensaje");
const modal = document.getElementById("agradecimientoModal");
const closeModal = document.getElementById("closeModal");

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    if (formularioValido()) {

        modal.style.display = "block";
    }
});

function formularioValido() {
    let valid = true;


    if (nombre.value.trim() === "") {
        valid = false;
    }

    if (email.value.trim() === "" || !isValidEmail(email.value)) {
        valid = false;
    }


    if (mensaje.value.trim() === "") {
        valid = false;
    }

    return valid;
}

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}


function centerModal() {
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
}

closeModal.addEventListener("click", function () {
    modal.style.display = "none";
    window.location.href = "./index.html";
});

const btn = document.getElementById('button');

document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_ud4j8s5';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Enviar mensaje';
                alert('Mensaje enviado correctamente');
            }, (err) => {
                btn.value = 'Enviar mensaje';
                alert(JSON.stringify(err));
            });
    });