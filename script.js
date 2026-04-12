
// ELEMENTOS
const form = document.querySelector("form");
const modal = document.getElementById("modal");
const cerrarBtn = document.getElementById("cerrar-modal");
const aceptarBtn = document.getElementById("aceptar-modal");

const toggle = document.getElementById("menu-toggle");
const drawer = document.getElementById("drawer");
const drawerClose = document.getElementById("drawer-close");

const nav = document.querySelector("header nav");
const drawerMenu = document.getElementById("drawer-menu");

let ultimoFoco = null;


// DRAWER (MENÚ)

toggle.addEventListener("click", () => {
    ultimoFoco = document.activeElement;

    drawerMenu.innerHTML = "";
    const navClone = nav.cloneNode(true);

navClone.style.display = "block";
    drawerMenu.appendChild(navClone);

    drawer.hidden = false;
    toggle.setAttribute("aria-expanded", "true");

    drawerClose.focus();

    document.addEventListener("keydown", manejarTecladoDrawer);
});

function cerrarDrawer() {
    drawer.hidden = true;
    toggle.setAttribute("aria-expanded", "false");

    document.removeEventListener("keydown", manejarTecladoDrawer);

    if (ultimoFoco) ultimoFoco.focus();
}

// cerrar
drawerClose.addEventListener("click", cerrarDrawer);

// click fuera
drawer.addEventListener("click", (e) => {
    if (e.target === drawer) cerrarDrawer();
});

// teclado drawer
function manejarTecladoDrawer(e) {

    if (e.key === "Escape") {
        cerrarDrawer();
        return;
    }

    if (e.key === "Tab") {

        const focusables = drawer.querySelectorAll(
            'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }
}

// MODAL 
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email");

    if (!email.validity.valid) {
        email.setAttribute("aria-invalid", "true");
        email.focus();
        return;
    }

    ultimoFoco = document.activeElement;

    modal.hidden = false;

    cerrarBtn.focus();

    document.addEventListener("keydown", manejarTecladoModal);
});

function cerrarModal() {
    modal.hidden = true;

    document.removeEventListener("keydown", manejarTecladoModal);

    if (ultimoFoco) ultimoFoco.focus();
}

cerrarBtn.addEventListener("click", cerrarModal);
aceptarBtn.addEventListener("click", cerrarModal);

function manejarTecladoModal(e) {

    if (e.key === "Escape") {
        cerrarModal();
        return;
    }

    if (e.key === "Tab") {

        const focusables = modal.querySelectorAll(
            'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }
}