// Usuarios de demo (hardcodeados, sin backend).
// role: 'admin' puede entrar al Panel Concesionario y modificar el inventario.
// Los cambios que haga cada usuario en "Mis datos" se guardan en el navegador (ver AuthProvider).
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    name: 'Administrador',
    email: 'admin@sebring.com.ar',
    phone: '11 4000-0001',
    document: '',
    city: 'Vicente López',
    role: 'admin',
  },
  {
    id: 2,
    username: 'user',
    password: 'user',
    name: 'Usuario Demo',
    email: 'user@example.com',
    phone: '11 5000-0002',
    document: '',
    city: 'CABA',
    role: 'user',
  },
]

export default users
