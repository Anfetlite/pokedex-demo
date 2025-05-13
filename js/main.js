const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
// guardamos la url basica en una variable
let URL = "https://pokeapi.co/api/v2/pokemon/";

// recorremos la direccion basica con un for con el numero de cada listaPokemon, traemos de la api con fetch

for (let i = 1; i <= 1025; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
}
// creamos la estructura html
function mostrarPokemon(poke) {
  // creamos un array con los tipos
  let tipos = poke.types.map(
    (type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`
  );
  // usamos join para que los tipos queden en un texto
  tipos = tipos.join("");

  let pokeId = poke.id.toString();

  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  // creamo dinamicamente la etiqueta de apertura del primer div y le asignamos la clase pokemon
  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
  listaPokemon.append(div);
}

botonesHeader.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          if (botonId === "ver-todos") {
            mostrarPokemon(data);
          } else {
            const tipos = data.types.map((type) => type.type.name);
            if (tipos.some((tipo) => tipo.includes(botonId))) {
              mostrarPokemon(data);
            }
          }
        });
    }
  })
);

/*
          <!-- ------------------------------------Inicio Pokemon------------------------------------------>
          <div class="pokemon">
            <p class="pokemon-id-back">#025</p>
            <div class="pokemon-imagen">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/34.png"
                alt="Pikachu"
              />
            </div>

            <div class="pokemon-info">
              <div class="nombre-contenedor">
                <p class="pokemon-id">#034</p>
                <h2 class="pokemon-nombre">Nidoking</h2>
              </div>

              <div class="pokemon-tipos">
                <p class="poison tipo">Veneno</p>
                <p class="ground tipo">tierra</p>
              </div>

              <div class="pokemon-stats">
                <p class="stat">1.4m</p>
                <p class="stat">62kg</p>
              </div>
            </div>
          </div>
          <!-- ------------------------------------Fin Pokemon--------------------------------------------->
*/
