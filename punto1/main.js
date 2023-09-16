
// detalles de un pokemon por nombre
async function getPokemonDetailsByName(nombrePokemon) {
  try {
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
    
    if (!response.ok) {
      throw new Error('No se pudo obtener la información');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los detalles del Pokémon:', error);
    throw error;
  }
}

const nombrePokemon = 'pikachu'; 

getPokemonDetailsByName(nombrePokemon)
  .then((dataPokemon) => {
    console.log(`Detalles del Pokémon ${nombrePokemon}:`, dataPokemon);
    
  });
  
  //habilidades de un pokemon

  async function getPokemonAbilities(nombrePokemon2) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon2}`);
      
      if (!response.ok) {
        throw new Error('No se pudo obtener la información de pokemn');
      }
      
      const data = await response.json();
      const abilities = data.abilities.map((abilityData) => abilityData.ability.name);
      return abilities;
    } catch (error) {
      console.error('Error al obtener las habilidade:', error);
      throw error;
    }
  }
  
  const nombrePokemon2 = 'charizard'; 
  
  getPokemonAbilities(nombrePokemon2)
    .then((abilities) => {
      console.log(`Habilidades de ${nombrePokemon2}:`, abilities);
    
    });
    

    //Tipo de pokemon

    async function getPokemonType(nombrePokemon3) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon3}`);
        
        if (!response.ok) {
          throw new Error('No se pudo obtener la información del Pokemon');
        }
        
        const data = await response.json();
        const types = data.types.map((typeData) => typeData.type.name);
        return types;
      } catch (error) {
        console.error('Error al obtener el tipo del pokmon:', error);
        throw error;
      }
    }
    
    const nombrePokemon3 = 'butterfree'; 
    
    getPokemonType(nombrePokemon3)
      .then((types) => {
        console.log(`Tipo(s) de ${nombrePokemon3}:`, types);
      });
      

      //primeros 50 pokemon de la lista

      async function primeros50Pokemon() {
        try {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
          
          if (!response.ok) {
            throw new Error('No se pudo obtener la lista de Pokemons');
          }
          
          const data = await response.json();
          const pokemonList = data.results.map((pokemon) => pokemon.name);
          
          return pokemonList;
        } catch (error) {
          console.error('Error al obtener la lista de pokmons:', error);
          throw error;
        }
      }
      primeros50Pokemon()
        .then((nombrePokemon4) => {
          console.log('Nombres de los primeros 50 Pokémon:', nombrePokemon4);
        });
        
        
        