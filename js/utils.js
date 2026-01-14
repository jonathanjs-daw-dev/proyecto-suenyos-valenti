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
