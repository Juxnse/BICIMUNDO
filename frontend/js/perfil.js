document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
  const infoUsuario = document.getElementById('info-usuario');
  const carritoUsuario = document.getElementById('carrito-usuario');
  const form = document.getElementById('form-edicion');
  const btnEditar = document.getElementById('btn-editar');

  const inputNombre = document.getElementById('nombre');
  const inputEmail = document.getElementById('email');
  const inputNuevaPass = document.getElementById('nuevaPassword');
  const inputConfirmarPass = document.getElementById('confirmarPassword');
  const inputDireccion = document.getElementById('direccion');
  const inputTelefono = document.getElementById('telefono');

  // Mostrar información básica
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

  // Mostrar productos en el carrito
  const imageBasePath = window.location.pathname.includes('/pages/') ? '../img/' : 'img/';
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    carritoUsuario.innerHTML = '<p style="color: gray;">Tu carrito está vacío.</p>';
  } else {
    carrito.forEach(producto => {
      const card = document.createElement('div');
      card.classList.add('producto');
      card.innerHTML = `
        <img src="${imageBasePath + producto.imagen}" alt="${producto.nombre}">
        <h4>${producto.nombre}</h4>
        <p>$${producto.precio.toLocaleString()}</p>
      `;
      carritoUsuario.appendChild(card);
    });
  }

  // Mostrar formulario
  btnEditar.addEventListener('click', () => {
    form.style.display = form.style.display === 'none' ? 'flex' : 'none';

    inputNombre.value = usuario.nombre || '';
    inputEmail.value = usuario.email || '';
    inputDireccion.value = usuario.direccion || '';
    inputTelefono.value = usuario.telefono || '';
    inputNuevaPass.value = '';
    inputConfirmarPass.value = '';
  });

  // Guardar cambios
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (inputNuevaPass.value && inputNuevaPass.value !== inputConfirmarPass.value) {
      alert('⚠️ Las contraseñas no coinciden');
      return;
    }

    usuario.nombre = inputNombre.value.trim();
    usuario.email = inputEmail.value.trim();
    usuario.direccion = inputDireccion.value.trim();
    usuario.telefono = inputTelefono.value.trim();

    if (inputNuevaPass.value.trim() !== '') {
      usuario.password = inputNuevaPass.value.trim();
    }

    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    alert('✅ Perfil actualizado correctamente');

    mostrarInfoUsuario();
    form.style.display = 'none';
  });
});
