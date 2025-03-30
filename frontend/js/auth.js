// --------------------- REGISTRO ---------------------
document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.querySelector('.registro-form');
    if (formRegistro && location.pathname.includes('registro.html')) {
      formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rol = document.getElementById('rol').value;
  
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
        const existe = usuarios.find(user => user.email === email);
        if (existe) {
          alert('Este correo ya está registrado');
          return;
        }
  
        usuarios.push({ nombre, email, password, rol });
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
          alert(`Bienvenido, ${usuario.nombre}`);
          window.location.href = '../index.html';
        } else {
          alert('Correo o contraseña incorrectos');
        }
      });
    }
  });
  