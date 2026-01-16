import { obtenerCantidadTotal, calcularTotal } from "./carrito.js";

const retraso = (tiempoDeEspera) =>
  new Promise((resolve) => setTimeout(resolve, tiempoDeEspera));

export const obtenerSesiones = async () => {
  try {
    const respuesta = await fetch("../data/sesiones.json");
    if (!respuesta.ok) throw new Error("Error al obtener los datos");

    // simulacion de un retraso de 3seg al obtener los datos de las sesiones.
    await retraso(1000);

    const datos = await respuesta.json();

    return datos;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

export const actualizarInfoCarrito = () => {
  // actualiza la info del carrito en el header del html
  // muestra: cantidad total de las sesiones, el precio total y muestra u oculta el boton de vaciar carro
  // Obtenemos los datos del carrito

  const cantidad = obtenerCantidadTotal();
  const total = calcularTotal();

  // Actualizamos los elementos del DOM
  const cantidadElement = document.getElementById("quantity-cart");
  const totalElement = document.getElementById("total-cart");
  const btnVaciar = document.getElementById("empty-cart-btn");

  cantidadElement.textContent = cantidad;
  totalElement.textContent = total.toFixed(2);
  if (btnVaciar) {
    if (cantidad > 0) {
      btnVaciar.style.display = "inline-block";
    } else {
      btnVaciar.style.display = "none";
    }
  }
};
