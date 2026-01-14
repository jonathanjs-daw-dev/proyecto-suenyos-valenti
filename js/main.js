import { mostrarSesiones } from "./ui.js";
import { obtenerSesiones } from "./utils.js";

const btnVerSesiones = document.getElementById("btn-ver-sesiones");
btnVerSesiones.addEventListener("click", async () => {
  try {
    btnVerSesiones.disabled = true;
    btnVerSesiones.textContent = "Cargando...";
    const sesionesData = await obtenerSesiones();
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
