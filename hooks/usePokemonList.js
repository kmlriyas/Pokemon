import { useEffect, useState } from "react";

export default function usePokemonList(selectedType, searchTerm) {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        // Fetch the list of Pokémon
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=18"
        );
        const data = await response.json();

        // Fetch details for each Pokémon to get the sprite and other details
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url); // Fetch detailed data for each Pokémon
            return await res.json();
          })
        );

        // Filter based on type and search term
        const filteredPokemons = pokemonDetails.filter((pokemon) => {
          const matchesType = selectedType
            ? pokemon.types.some((type) => type.type.name === selectedType)
            : true;

          const matchesSearchTerm = searchTerm
            ? pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            : true;

          return matchesType && matchesSearchTerm;
        });

        setPokemons(filteredPokemons);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    }

    fetchPokemons();
  }, [selectedType, searchTerm]);

  return pokemons;
}
