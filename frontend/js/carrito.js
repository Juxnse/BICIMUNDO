document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('lista-carrito');
  const total = document.getElementById('total-carrito');
  const accesoDenegado = document.getElementById('acceso-denegado');
  const carritoContent = document.getElementById('carrito-content');

  // Detectar la ruta correcta para las imágenes
  const imageBasePath = window.location.pathname.includes('/pages/') ? '../img/' : 'img/';

  const usuario = JSON.parse(localStorage.getItem('usuarioActual'));

  if (!usuario) {
    const btnLogin = document.querySelector('.btn-login');
    const btnRegistro = document.querySelector('.btn-registro');

    if (btnLogin) btnLogin.style.display = 'none';
    if (btnRegistro) btnRegistro.style.display = 'none';

    accesoDenegado.style.display = 'block';
    carritoContent.style.display = 'none';
    total.innerHTML = "";
    return;
  }

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="mensaje-vacio">Tu carrito está vacío 🛒</p>';
    total.innerHTML = '';
    return;
  }

  let totalCompra = 0;

  carrito.forEach((item, index) => {
    totalCompra += item.precio;

    const card = document.createElement('div');
    card.classList.add('carrito-item');

    card.innerHTML = `
      <img src="${imageBasePath + item.imagen}" alt="${item.nombre}">
      <h4>${item.nombre}</h4>
      <p>$${item.precio.toLocaleString()}</p>
      <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;

    contenedor.appendChild(card);
  });

  total.innerHTML = `
    <div class="resumen">
      <p>Total: <strong>$${totalCompra.toLocaleString()}</strong></p>
      <button class="btn-finalizar">Finalizar compra</button>
    </div>
  `;
});

function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  location.reload();
}
