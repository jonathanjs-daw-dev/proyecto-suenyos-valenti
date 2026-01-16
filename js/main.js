import { mostrarSesiones } from "./ui.js";
import {
  obtenerSesiones,
  actualizarInfoCarrito,
  filtrarSesiones,
} from "./utils.js";
import { vaciarCarrito } from "./carrito.js";

// Variables globales para mantener el estado de la aplicación
let sesionesGlobales = null;
let textoBusquedaActual = "";
let nivelFiltroActual = "Todos";

function aplicarFiltros() {
  // aplica los filtros y re-renderiza las sesiones
  // Filtramos con los valores actuales de búsqueda y nivel
  const sesionesFiltradas = filtrarSesiones(
    sesionesGlobales,
    textoBusquedaActual,
    nivelFiltroActual
  );

  // Mostramos las sesiones filtradas
  mostrarSesiones(sesionesFiltradas);

  console.log("Filtros aplicados:", {
    búsqueda: textoBusquedaActual || "(vacío)",
    nivel: nivelFiltroActual,
    resultados: sesionesFiltradas.length,
  });
}

const btnVerSesiones = document.getElementById("fetch-sessions-btn");
btnVerSesiones.addEventListener("click", async () => {
  try {
    btnVerSesiones.disabled = true;
    btnVerSesiones.textContent = "Cargando...";
    const sesionesData = await obtenerSesiones();

    // Guardamos las sesiones en la variable global
    sesionesGlobales = sesionesData;

    // Reseteamos los filtros al cargar sesiones
    textoBusquedaActual = "";
    nivelFiltroActual = "Todos";

    // Limpiamos visualmente el input de búsqueda
    const inputBuscar = document.getElementById("search-input");
    if (inputBuscar) {
      inputBuscar.value = "";
    }

    // Reseteamos el select de niveles
    const selectNivel = document.getElementById("levels");
    if (selectNivel) {
      selectNivel.value = "Todos";
    }

    // Mostramos los controles de búsqueda y filtros
    document.getElementById("search-controls").style.display = "flex";

    // Mostramos todas las sesiones (sin filtros)
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

const btnVaciarCarrito = document.getElementById("empty-cart-btn");
btnVaciarCarrito.addEventListener("click", () => {
  // pedimos confirmacion al usuario usando confirm
  const confirmacion = confirm(
    "¿Estás seguro de que quieres vaciar el carrito?"
  );

  if (confirmacion) {
    vaciarCarrito();
    actualizarInfoCarrito();

    // Re-aplicamos filtros para mantener la vista actual
    aplicarFiltros();

    console.log("Carrito vaciado correctamente");
  }
});

// Event: Input de búsqueda
const inputBuscar = document.getElementById('search-input');
inputBuscar.addEventListener('input', (evento) => {
  // Actualizamos el estado con el valor del input
  textoBusquedaActual = evento.target.value;
  aplicarFiltros();
});

// Event: Select de filtro por nivel
const selectNivel = document.getElementById('levels');
selectNivel.addEventListener('change', (evento) => {
  // Actualizamos el nivel seleccionado desde el value del select
  nivelFiltroActual = evento.target.value;
  aplicarFiltros();
});

// evento para limpiar filtros
const btnLimpiarFiltros = document.getElementById('clear-filters-btn');
btnLimpiarFiltros.addEventListener('click', () => {
  // reseteamos las variables de estado
  textoBusquedaActual = '';
  nivelFiltroActual = 'Todos';

  // limpiamos input y selector
  inputBuscar.value = '';
  selectNivel.value = 'Todos';

  aplicarFiltros();
});

// Inicialización: Actualizar info del carrito al cargar la página
actualizarInfoCarrito();
