window.onscroll = function(ev) {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        
    }
};
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
             const stats = pokemon.stats.map(statsInfo => statsInfo.base_stat);

            accumulator +=     `<div class="pokedex" >
                                    <div class="card ${types[0]} front">
                                        <img class="card-img" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/> 
                                        <h2 class="card-title"><small>Nº${pokemon.id} -</small> ${pokemon.name}<h2>
                                        <p class="card-subtitle ${types[0]}">${types.join(" | ")}</p>
                                    </div>
                                    <div class="card ${types[0]} back">
                                        <h2 class="card-title"><small>ID: ${pokemon.id}</small></br> ${pokemon.name}<h2>
                                        <p class="stats">HP:</p> 
                                        <div class="valores">
                                            <p style="width:${stats[0]}px">${stats[0]}</p>
                                        </div>
                                        <p class="stats">Ataque:</p>
                                        <div class="valores">
                                            <p style="width:${stats[1]}px">${stats[1]}</p>
                                        </div> 
                                        <p class="stats">Defesa:</p> 
                                        <div class="valores">
                                            <p style="width:${stats[2]}px">${stats[2]}</p>
                                        </div>
                                        <p class="stats">Esp-ataque:</p><div class="valores">
                                        <p style="width:${stats[3]}px">${stats[3]}</p>
                                        </div>
                                        <p class="stats">Esp-defesa:</p> 
                                        <div class="valores">
                                            <p style="width:${stats[4]}px">${stats[4]}</p>
                                        </div>
                                        <p class="stats">Velocidade:</p>
                                        <div class="valores">
                                            <p style="width:${stats[5]}px">${stats[5]}</p>
                                        </div>     
                                    </div>
                                </div>`
            return accumulator
            
        }, '')

        const ul = document.querySelector(`[data-js="pokedex"]`);

        ul.innerHTML = listPokemons;

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