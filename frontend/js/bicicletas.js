// Lista de bicicletas fuera de la función DOMContentLoaded
const bicicletas = [
  {
    id: 1,
    nombre: 'Urban Ride X',
    precio: 750000,
    imagen: '../img/bicicleta-roja-hibrida.jpg' // ← imagen nueva
  },
  {
    id: 2,
    nombre: 'Mountain Pro 500',
    precio: 1200000,
    imagen: '../img/mountain-pro-500.jpg'
  },
  {
    id: 3,
    nombre: 'Speedster 900',
    precio: 950000,
    imagen: '../img/speedster-900-pro.jpg'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenedor-bicicletas');

  // Crear los productos dinámicamente
  bicicletas.forEach(bici => {
    const card = document.createElement('div');
    card.classList.add('producto');
    card.innerHTML = `
      <img src="${bici.imagen}" alt="${bici.nombre}">
      <h4>${bici.nombre}</h4>
      <p>$${bici.precio.toLocaleString()}</p>
      <button class="btn-agregar" onclick="agregarAlCarrito(${bici.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });
});

// Agregar bicicleta al carrito
function agregarAlCarrito(id) {
  console.log('Bicicleta ID:', id); // Verifica si el ID es correcto

  // Obtener carrito de localStorage o crear uno nuevo
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Buscar la bicicleta en el array de bicicletas
  const bicicleta = bicicletas.find(bici => bici.id === id);

  // Si la bicicleta está en el array, agregarla al carrito
  if (bicicleta) {
    carrito.push(bicicleta);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`Bicicleta ${bicicleta.nombre} agregada al carrito`);

    // Actualizar el contador del carrito
    actualizarContadorCarrito();
  }
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
  const contadorCarrito = document.getElementById('contador-carrito');
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  contadorCarrito.textContent = carrito.length;
}
