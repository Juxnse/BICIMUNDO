document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    const infoUsuario = document.getElementById('info-usuario');
    const carritoUsuario = document.getElementById('carrito-usuario');
    const form = document.getElementById('form-edicion');
    const btnEditar = document.getElementById('btn-editar');
  
    const inputDireccion = document.getElementById('direccion');
    const inputTelefono = document.getElementById('telefono');
    const inputDocumento = document.getElementById('documento');
  
    // Mostrar información básica del usuario
    if (!usuario) {
      infoUsuario.innerHTML = '<p>Debes iniciar sesión para ver tu perfil.</p>';
      return;
    }
  
    function mostrarInfoUsuario() {
      infoUsuario.innerHTML = `
        <p><strong>Nombre:</strong> ${usuario.nombre}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Rol:</strong> ${usuario.rol}</p>
        ${usuario.direccion ? `<p><strong>Dirección:</strong> ${usuario.direccion}</p>` : ''}
        ${usuario.telefono ? `<p><strong>Teléfono:</strong> ${usuario.telefono}</p>` : ''}
        ${usuario.documento ? `<p><strong>Documento:</strong> ${usuario.documento}</p>` : ''}
      `;
    }
  
    mostrarInfoUsuario();
  
    // Mostrar productos del carrito
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    if (carrito.length === 0) {
      carritoUsuario.innerHTML = '<p style="color: gray;">Tu carrito está vacío.</p>';
    } else {
      carrito.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('producto');
        card.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h4>${producto.nombre}</h4>
          <p>$${producto.precio.toLocaleString()}</p>
        `;
        carritoUsuario.appendChild(card);
      });
    }
  
    // Mostrar formulario al hacer clic
    btnEditar.addEventListener('click', () => {
      form.style.display = form.style.display === 'none' ? 'flex' : 'none';
  
      // Cargar valores actuales si existen
      inputDireccion.value = usuario.direccion || '';
      inputTelefono.value = usuario.telefono || '';
      inputDocumento.value = usuario.documento || '';
    });
  
    // Guardar cambios en el usuario
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      usuario.direccion = inputDireccion.value.trim();
      usuario.telefono = inputTelefono.value.trim();
      usuario.documento = inputDocumento.value.trim();
  
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));
      alert('Perfil actualizado correctamente ✅');
  
      mostrarInfoUsuario();
      form.style.display = 'none';
    });
  });
  