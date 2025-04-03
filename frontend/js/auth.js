// --------------------- REGISTRO ---------------------
document.addEventListener('DOMContentLoaded', () => {
  const formRegistro = document.querySelector('.registro-form');
  if (formRegistro && location.pathname.includes('registro.html')) {
    formRegistro.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value;
      const cedula = document.getElementById('cedula').value;
      const email = document.getElementById('email').value;
      const fechaNacimiento = document.getElementById('fecha_nacimiento').value;
      const password = document.getElementById('password').value;
      const password2 = document.getElementById('password2').value; // Repetir contraseña
      const rol = document.getElementById('rol').value;

      // Validación de que las contraseñas coinciden
      if (password !== password2) {
        alert('Las contraseñas no coinciden');
        return;
      }

      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

      // Validación para ver si ya existe un usuario con el mismo correo
      const existe = usuarios.find(user => user.email === email);
      if (existe) {
        alert('Este correo ya está registrado');
        return;
      }

      // Guardar el nuevo usuario
      usuarios.push({ nombre, cedula, email, fechaNacimiento, password, rol });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      alert('Usuario registrado exitosamente 🎉');
      window.location.href = 'login.html';
    });
  }

  // --------------------- LOGIN ---------------------
  const formLogin = document.querySelector('.registro-form');
  if (formLogin && location.pathname.includes('login.html')) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

      const usuario = usuarios.find(user => user.email === email && user.password === password);

      if (usuario) {
        localStorage.setItem('usuarioActual', JSON.stringify(usuario));
        alert(Bienvenido, $usuario.nombre);
        window.location.href = '../index.html';
      } else {
        alert('Correo o contraseña incorrectos');
      }
    });
  }
});