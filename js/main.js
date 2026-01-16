import { mostrarSesiones } from "./ui.js";
import { obtenerSesiones, actualizarInfoCarrito } from "./utils.js";
import { vaciarCarrito } from "./carrito.js";

// Variable global para almacenar las sesiones cargadas
let sesionesGlobales = null;

const btnVerSesiones = document.getElementById("btn-ver-sesiones");
btnVerSesiones.addEventListener("click", async () => {
  try {
    btnVerSesiones.disabled = true;
    btnVerSesiones.textContent = "Cargando...";
    const sesionesData = await obtenerSesiones();

    // Guardamos las sesiones en la variable global
    sesionesGlobales = sesionesData;

    mostrarSesiones(sesionesData);
    console.log("Datos de las sesiones::", sesionesData);
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  } finally {
    btnVerSesiones.disabled = false;
    btnVerSesiones.textContent = "Ver Sesiones";
  }
});

const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");
btnVaciarCarrito.addEventListener("click", () => {
  // pedimos confirmacion al usuario usando confirm
  const confirmacion = confirm("¿Estás seguro de que quieres vaciar el carrito?");

  if (confirmacion) {
    vaciarCarrito();
    actualizarInfoCarrito();
    if (sesionesGlobales) {                                                                                                                     
      mostrarSesiones(sesionesGlobales);                                                                                                        
    }
    console.log("Carrito vaciado correctamente");
  }
});

// Inicialización: Actualizar info del carrito al cargar la página
actualizarInfoCarrito();
