// Ruta dinámica para las imágenes según si estás en /pages/ o en la raíz
const imageBasePath = window.location.pathname.includes('/pages/') ? '../img/' : 'img/';
const basePath = window.location.pathname.includes('/pages/') ? '' : 'pages/';

// Solo nombre de imagen, sin ruta
const bicicletas = [
  {
    id: 1,
    nombre: 'Urban Ride X',
    descripcion: 'Bicicleta híbrida perfecta para trayectos urbanos y rutas de mediana distancia.',
    precio: 750000,
    imagen: 'bicicleta-roja-hibrida.jpg'
  },
  {
    id: 2,
    nombre: 'Mountain Pro 500',
    descripcion: 'Ideal para la aventura en montaña, con suspensión reforzada y frenos hidráulicos.',
    precio: 1200000,
    imagen: 'mountain-pro-500.jpg'
  },
  {
    id: 3,
    nombre: 'Speedster 900',
    descripcion: 'Diseñada para alta velocidad en carretera, con cuadro ligero y componentes aerodinámicos.',
    precio: 950000,
    imagen: 'speedster-900-pro.jpg'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenedor-bicicletas');
  if (contenedor) {
    bicicletas.forEach(bici => {
      const card = document.createElement('div');
      card.classList.add('producto');

      card.innerHTML = `
        <a href="${basePath}detalles.html?id=${bici.id}" class="producto-link">
          <img src="${imageBasePath + bici.imagen}" alt="${bici.nombre}">
          <h4>${bici.nombre}</h4>
          <p>$${bici.precio.toLocaleString()}</p>
        </a>
        <button class="btn-agregar" onclick="agregarAlCarrito(${bici.id})">Agregar al carrito</button>
      `;
      contenedor.appendChild(card);
    });
  }

  const imgProducto = document.getElementById('imagen-producto');
  if (imgProducto) {
    const params = new URLSearchParams(window.location.search);
    const idProducto = parseInt(params.get('id'));
    const biciSeleccionada = bicicletas.find(bici => bici.id === idProducto);

    if (biciSeleccionada) {
      imgProducto.src = imageBasePath + biciSeleccionada.imagen;
      imgProducto.alt = biciSeleccionada.nombre;
      document.getElementById('nombre-producto').textContent = biciSeleccionada.nombre;
      document.getElementById('descripcion-producto').textContent = biciSeleccionada.descripcion;
      document.getElementById('precio-producto').textContent = '$' + biciSeleccionada.precio.toLocaleString();

      const btnAgregarCarrito = document.getElementById('btn-agregar-carrito');
      btnAgregarCarrito.addEventListener('click', () => {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(biciSeleccionada);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`Bicicleta ${biciSeleccionada.nombre} agregada al carrito`);
        actualizarContadorCarrito();
      });
    }
  }

  window.agregarAlCarrito = function (id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const bicicleta = bicicletas.find(bici => bici.id === id);
    if (bicicleta) {
      carrito.push(bicicleta);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      alert(`Bicicleta ${bicicleta.nombre} agregada al carrito`);
      actualizarContadorCarrito();
    }
  };

  function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById('contador-carrito');
    if (contadorCarrito) {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      contadorCarrito.textContent = carrito.length;
    }
  }

  actualizarContadorCarrito();
});
