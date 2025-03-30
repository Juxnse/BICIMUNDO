document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('lista-carrito');
  const total = document.getElementById('total-carrito');
  const accesoDenegado = document.getElementById('acceso-denegado');
  const carritoContent = document.getElementById('carrito-content');

  // Verificamos si hay un usuario autenticado
  const usuario = JSON.parse(localStorage.getItem('usuarioActual'));

  // SI NO hay sesión, mostramos mensaje de acceso denegado
  if (!usuario) {
    // Ocultar botones del header (Ingresar y Registrarse)
    const btnLogin = document.querySelector('.btn-login');
    const btnRegistro = document.querySelector('.btn-registro');

    if (btnLogin) btnLogin.style.display = 'none';
    if (btnRegistro) btnRegistro.style.display = 'none';

    // Mostrar mensaje de acceso denegado
    accesoDenegado.style.display = 'block';
    carritoContent.style.display = 'none';
    total.innerHTML = ""; // Ocultar total si no hay carrito
    return; // Detenemos la ejecución aquí
  }

  // SI HAY sesión, mostramos el contenido del carrito
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="mensaje-vacio">Tu carrito está vacío 🛒</p>';
    total.innerHTML = ''; // No mostrar total si no hay productos en el carrito
    return;
  }

  let totalCompra = 0;

  // Agregar productos al carrito
  carrito.forEach((item, index) => {
    totalCompra += item.precio;

    const card = document.createElement('div');
    card.classList.add('producto');

    card.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">
      <h4>${item.nombre}</h4>
      <p>$${item.precio.toLocaleString()}</p>
      <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;

    contenedor.appendChild(card);
  });

  // Mostrar total
  total.innerHTML = `
    <div class="resumen">
      <p>Total: <strong>$${totalCompra.toLocaleString()}</strong></p>
      <button class="btn-comprar">Finalizar compra</button>
    </div>
  `;
});

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  location.reload(); // Recargar para actualizar el carrito
}
