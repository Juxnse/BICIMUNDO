document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
  const btnLogin = document.querySelector('.btn-login');
  const btnRegistro = document.querySelector('.btn-registro');
  const btnCerrarSesion = document.getElementById('cerrarSesion');

  // Ruta actual (sin extensión ni carpeta)
  const enCarrito = window.location.pathname.includes('carrito.html');

  // Si hay usuario logueado
  if (usuario) {
    if (btnLogin) btnLogin.style.display = 'none'; // Ocultar Ingresar
    if (btnRegistro) btnRegistro.style.display = 'none'; // Ocultar Registrarse

    // Mostrar cerrar sesión solo si NO estamos en la página de carrito
    if (enCarrito && btnCerrarSesion) {
      btnCerrarSesion.style.display = 'none'; // Ocultar cerrar sesión en carrito
    } else if (btnCerrarSesion) {
      btnCerrarSesion.style.display = 'inline-block'; // Mostrar cerrar sesión en otras páginas
    }

    // Evento para cerrar sesión
    if (btnCerrarSesion) {
      btnCerrarSesion.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('usuarioActual');
        alert('Sesión cerrada correctamente');
        window.location.href = 'index.html'; // Redirigir al inicio después de cerrar sesión
      });
    }
  } else {
    // Si no hay usuario logueado, mostrar botones de "Ingresar" y "Registrarse"
    if (btnLogin) btnLogin.style.display = 'inline-block';
    if (btnRegistro) btnRegistro.style.display = 'inline-block';
    if (btnCerrarSesion) btnCerrarSesion.style.display = 'none'; // Ocultar "Cerrar sesión"
  }

  // Actualizar el contador del carrito
  const contadorCarrito = document.getElementById('contador-carrito');
  if (contadorCarrito) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    contadorCarrito.textContent = carrito.length;
  }
});
