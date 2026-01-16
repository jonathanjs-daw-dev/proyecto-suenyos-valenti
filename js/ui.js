import {
  añadirAlCarrito,
  eliminarDelCarrito,
  obtenerCarrito,
} from "./carrito.js";
import { actualizarInfoCarrito } from "./utils.js";

export const mostrarSesiones = (sesiones) => {
  //limpieza
  const contenedor = document.getElementById("main-content");
  contenedor.innerHTML = "";

  // Obtenemos el carrito actual para saber qué cantidades mostrar
  const carrito = obtenerCarrito();

  //iteramos sobre los elementos de las sesiones
  sesiones.forEach((sesion) => {
    const infoLevel =
      sesion.nivel === "Principiante"
        ? "green"
        : sesion.nivel === "Intermedio"
        ? "orange"
        : "red";

    // Buscamos si esta sesión está en el carrito
    const sesionEnCarrito = carrito.find((item) => item.id === sesion.id);
    const cantidadEnCarrito = sesionEnCarrito ? sesionEnCarrito.cantidad : 0;

    //creacion de elementos
    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h3");
    title.innerHTML = sesion.nombre;

    const description = document.createElement("p");
    description.innerHTML = `<strong>Descripción:</strong> ${sesion.descripcion}.`;

    const price = document.createElement("p");
    price.innerHTML = `<strong>Precio:</strong> ${sesion.precio} €.`;

    const duration = document.createElement("p");
    duration.innerHTML = `<strong>Duración:</strong> ${sesion.duracion}.`;

    const level = document.createElement("p");
    level.classList.add("level-text");
    level.innerHTML = `<strong>Nivel:</strong> <span class='info-level' style="background-color: ${infoLevel}"></span> ${sesion.nivel}.`;

    const enCarrito = document.createElement("p");
    enCarrito.classList.add("en-carrito");
    enCarrito.innerHTML = `<strong>En carrito:</strong> ${cantidadEnCarrito}`;

    const addToCart = document.createElement("button");
    addToCart.dataset.id = sesion.id;
    addToCart.classList.add("session-btn", "add-btn");
    addToCart.innerHTML = `Añadir al Carrito`;
    addToCart.addEventListener("click", () => {
      añadirAlCarrito(sesion);
      actualizarInfoCarrito();
      mostrarSesiones(sesiones); // Re-renderizamos para actualizar cantidades
    });

    const removeFromCart = document.createElement("button");
    removeFromCart.dataset.id = sesion.id;
    removeFromCart.classList.add("session-btn", "remove-btn");
    removeFromCart.innerHTML = "Eliminar del Carrito";
    removeFromCart.addEventListener("click", () => {
      eliminarDelCarrito(sesion.id);
      actualizarInfoCarrito();
      mostrarSesiones(sesiones); // Re-renderizamos para actualizar cantidades
    });
    // solo se muestra el boton eliminar si hay sesiones en el carrito
    if (cantidadEnCarrito === 0) {
      removeFromCart.style.display = "none";
    }

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(duration);
    card.appendChild(level);
    card.appendChild(enCarrito);
    card.appendChild(addToCart);
    card.appendChild(removeFromCart);
    contenedor.appendChild(card);
  });
};
