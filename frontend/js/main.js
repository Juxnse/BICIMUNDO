document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
  const btnLogin = document.querySelector('.btn-login');
  const btnRegistro = document.querySelector('.btn-registro');
  const btnCerrarSesion = document.getElementById('cerrarSesion');

  const enCarrito = window.location.pathname.includes('carrito.html');

  if (usuario) {
    if (btnLogin) btnLogin.style.display = 'none';
    if (btnRegistro) btnRegistro.style.display = 'none';

    if (enCarrito && btnCerrarSesion) {
      btnCerrarSesion.style.display = 'none';
    } else if (btnCerrarSesion) {
      btnCerrarSesion.style.display = 'inline-block';
    }

    if (btnCerrarSesion) {
      btnCerrarSesion.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('usuarioActual');
        alert('Sesión cerrada correctamente 👋');

        // Detectar ubicación y redirigir correctamente
        if (window.location.pathname.includes('/pages/')) {
          window.location.href = '../index.html';
        } else {
          window.location.href = 'index.html';
        }
      });
    }
  } else {
    if (btnLogin) btnLogin.style.display = 'inline-block';
    if (btnRegistro) btnRegistro.style.display = 'inline-block';
    if (btnCerrarSesion) btnCerrarSesion.style.display = 'none';
  }

  const contadorCarrito = document.getElementById('contador-carrito');
  if (contadorCarrito) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    contadorCarrito.textContent = carrito.length;
  }
});
