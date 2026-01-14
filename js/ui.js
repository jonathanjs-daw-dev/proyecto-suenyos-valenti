export const mostrarSesiones = (sesiones) => {
  //limpieza
  const contenedor = document.getElementById("main-content");
  contenedor.innerHTML = "";
  //iteramos sobre los elementos de las sesiones
  sesiones.forEach((sesion) => {
    console.log(sesion);
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
    level.innerHTML = `<strong>Nivel:</strong> ${sesion.nivel}.`;

    const addToCart = document.createElement("button");
    addToCart.dataset.id = sesion.id;
    addToCart.classList.add("session-btn");
    addToCart.innerHTML = `Añadir al carro`;

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(duration);
    card.appendChild(level);
    card.appendChild(addToCart);
    contenedor.appendChild(card);
  });
};
