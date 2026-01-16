// Clave para identificar nuestro carrito en localStorage. asi evitamos escribirlo manualmente cada vez
// y evitar errores por escribirlo mal en algun sitio.
const STORAGE_KEY = "suenos-valenti-carrito";

export const obtenerCarrito = () => {
  //ver el localStorage para obtener los datos, si no hay obtiene []
  const carritoJSON = localStorage.getItem(STORAGE_KEY);
  if (!carritoJSON) {
    return [];
  }
  return JSON.parse(carritoJSON);
};

const guardarCarrito = (carrito) => {
  // guarda el carrito en localStorage, recibe un array y lo almacena parseandolo antes.
  const carritoJSON = JSON.stringify(carrito);
  localStorage.setItem(STORAGE_KEY, carritoJSON);
};

export const añadirAlCarrito = (sesion) => {
  // añade sesiones al carrito de 1 en 1
  const carrito = obtenerCarrito();
  const sesionExistente = carrito.find((item) => item.id === sesion.id);

  if (sesionExistente) {
    sesionExistente.cantidad += 1;
  } else {
    // No existe: la añadimos con cantidad inicial de 1
    carrito.push({
      ...sesion, // Copiamos todos los datos de la sesión
      cantidad: 1, // Añadimos la propiedad cantidad
    });
  }

  guardarCarrito(carrito);
  console.log(`${sesion.nombre}: Sesión añadida al carrito`);
};

export function eliminarDelCarrito(id) {
  // elimina la cantidad de 1 en 1 de la sesion en el carrito
  // si la cantidad es 0 se elimina la sesion del carrito.
  const carrito = obtenerCarrito();
  const sesion = carrito.find((item) => item.id === id);
  sesion.cantidad -= 1;

  let carritoActualizado;
  if (sesion.cantidad <= 0) {
    // cantidad es 0: eliminamos la sesión completamente
    carritoActualizado = carrito.filter((item) => item.id !== id);
    console.log(`${sesion.nombre}: Sesión eliminada del carrito`);
  } else {
    // cantidad es positiva: mantenemos el carrito.
    carritoActualizado = carrito;
    console.log(
      `${sesion.nombre}: Cantidad reducida. Quedan ${sesion.cantidad} en el carrito`
    );
  }

  guardarCarrito(carritoActualizado);
}

export function vaciarCarrito() {
  // eliminamos todo del carrito reemplazando el conenido por un []
  guardarCarrito([]);
  console.log("Carrito vaciado.");
}

export function calcularTotal() {
  // calcula el precio total de todas las sesiones en el carro usando reduce() para sumar precio * cantidad de cada sesión
  const carrito = obtenerCarrito();
  const total = carrito.reduce((acumulador, item) => {
    return acumulador + item.precio * item.cantidad;
  }, 0); // 0 es el valor inicial del acumulador

  return total;
}

export function obtenerCantidadTotal() {
  // calcula la cantidad total de sesiones en el carro, usamos reduce() para sumar las cantidades
  const carrito = obtenerCarrito();
  const cantidadTotal = carrito.reduce((acumulador, item) => {
    return acumulador + item.cantidad;
  }, 0);

  return cantidadTotal;
}
