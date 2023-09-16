async function getPokemonDetails(pokemonName4) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName4}`);
      
      if (!response.ok) {
        throw new Error('No se pudo obtener la informacin');
      }
      
      const data = await response.json();
      const pokemonDetails = {
        name: data.name,
        type: data.types.map((typeData) => typeData.type.name),
      };
      
      return pokemonDetails;
    } catch (error) {
      console.error('Error al obtener los detalles:', error);
      throw error;
    }
  }
  
  async function getPokemonEvolutionChain(pokemonName4) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName4}`);
      
      if (!response.ok) {
        throw new Error('No se pudo obtener la información de la especie');
      }
      
      const data = await response.json();
      const evolutionURL = data.evolution_chain.url;
      
      const evolutionResponse = await fetch(evolutionURL);
      
      if (!evolutionResponse.ok) {
        throw new Error('No se pudo obtener las evoluioones del pokemon');
      }
      
      const evolutionData = await evolutionResponse.json();
      const evolutionChain = [];
      
      function extractEvolutions(evolutionDetails) {
        const evolution = {
          name: evolutionDetails.species.name,
          type: [],
        };
        if (evolutionDetails.species.url) {
          evolution.type = ['desconocido']; 
        }
        evolutionChain.push(evolution);
        if (evolutionDetails.evolves_to && evolutionDetails.evolves_to.length > 0) {
          evolutionDetails.evolves_to.forEach((evo) => extractEvolutions(evo));
        }
      }
      
      extractEvolutions(evolutionData.chain);
      
      return evolutionChain;
    } catch (error) {
      console.error('No se pudo obtener las evoluioones del pokemon', error);
      throw error;
    }
  }
  
  async function getPokemonAndEvolutionDetails(pokemonName4) {
    try {
      const [pokemonDetails, evolutionChain] = await Promise.all([
        getPokemonDetails(pokemonName4),
        getPokemonEvolutionChain(pokemonName4),
      ]);
      
      return { pokemonDetails, evolutionChain };
    } catch (error) {
      console.error('Error al obtener detalles del pokemon y su evolucion:', error);
      throw error;
    }
  }
  
  const pokemonName4 = 'charmander'; 
  
  getPokemonAndEvolutionDetails(pokemonName4)
    .then(({ pokemonDetails, evolutionChain }) => {
      console.log(`Detalles del Pokémon ${pokemonName4}:`, pokemonDetails);
      console.log(`Evoluciones de ${pokemonName4}:`, evolutionChain);
      
    });
    