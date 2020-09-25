const fetchPomenon = () => {
   const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

   const pokemonPromises = [];

   for (let i =1; i <= 893; i++) {
       pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()));
    }

    Promise.all(pokemonPromises)
    .then(pokemons => { 
        const listPokemons = pokemons.reduce( (accumulator, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name);

            accumulator += `<li class="card  front ${types[0]}">
                            <img class="card-img" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/> 
                            <h2 class="card-title"><small>Nº${pokemon.id} -</small> ${pokemon.name}<h2>
                            <p class="card-subtitle ${types[0]}">${types.join(" | ")}</p>
                            </li>
                            <li class="card  back ${types[0]}">
                            <img class="card-img" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/> 
                            <h2 class="card-title"><small>Nº${pokemon.id} Verso -</small> ${pokemon.name}<h2>
                            <p class="card-subtitle ${types[0]}">${types.join(" | ")}</p>
                            </li>`
            return accumulator
            
        }, '')

        const ul = document.querySelector(`[data-js="pokedex"]`);
        const ulBack = document.querySelector(`[data-js="pokedexD"]`);

        ul.innerHTML = listPokemons;
        ulBack.innerHTML = listPokemons;
    })

    console.log(pokemonPromises)
}

fetchPomenon();

/*
function pokeDetalhes() {
    const pokeInfo = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

    const detalhes = [];
    
    for (let i = 1; i<= 893; i++) {
        detalhes.push(fetch(pokeInfo(i)).then(response => response.json()));
    }

    Promise.all(detalhes)
    .then(habilidades)

}

pokeDetalhes();
*/