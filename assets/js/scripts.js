// Init AOS
AOS.init({
    once: true,
    offset: 50,
    duration: 800
});

// Set Current Year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Isotope Filtering (Vanilla / jQuery hybrid)
var $grid;
$(window).on('load', function () {
    $grid = $('.grid-menu').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    $('.filter-button-group').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });

        $('.filter-button-group button').removeClass('active btn-primary text-white');
        $(this).addClass('active btn-primary text-white');
    });
});

// Form Logic
function toggleDireccion() {
    var tipo = document.getElementById('orderTipo').value;
    var divDir = document.getElementById('divDireccion');
    var inputDir = document.getElementById('orderDir');

    if (tipo === 'recoger') {
        divDir.style.display = 'none';
        inputDir.removeAttribute('required');
    } else {
        divDir.style.display = 'block';
        inputDir.setAttribute('required', 'required');
    }
}

function pedirDirecto(producto) {
    var textarea = document.getElementById('orderDetalles');
    textarea.value = (textarea.value ? textarea.value + ", " : "") + "1x " + producto;

    // Scroll animado a reservas
    document.querySelector('#reservas').scrollIntoView({
        behavior: 'smooth'
    });

    // Highlight text area
    textarea.classList.add('border-primary');
    setTimeout(() => textarea.classList.remove('border-primary'), 1000);
}

function prepararPedido(e) {
    e.preventDefault();
    var btn = document.getElementById('btnSubmit');
    btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
    btn.setAttribute('disabled', 'disabled');

    var nombre = document.getElementById('orderNombre').value;
    var tel = document.getElementById('orderTel').value;
    var tipo = document.getElementById('orderTipo').value;
    var direccion = document.getElementById('orderDir').value;
    var detalles = document.getElementById('orderDetalles').value;

    var mensajeWA = `Hola El Pike! ✌️%0A%0ASoy *${nombre}*, quiero hacer un pedido para *${tipo}*.*%0A`;
    if (tipo === "domicilio") mensajeWA += `%0A📍 Dirección: ${direccion}`;
    mensajeWA += `%0A📱 Celular: ${tel}%0A`;
    if (detalles) mensajeWA += `%0A🌶️ Mi pedido: ${detalles}%0A`;

    setTimeout(function () {
        btn.innerHTML = '¡Redirigiendo a WhatsApp!';
        btn.classList.replace('btn-custom-primary', 'btn-success');

        // Redirection
        window.open('https://wa.me/57000000000?text=' + mensajeWA, '_blank');

        // Reset form
        setTimeout(() => {
            document.getElementById('orderForm').reset();
            toggleDireccion();
            btn.removeAttribute('disabled');
            btn.innerHTML = 'Continuar a WhatsApp <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style="width:20px; filter:brightness(0) invert(1);">';
            btn.classList.replace('btn-success', 'btn-custom-primary');
        }, 3000);
    }, 1000);
}
