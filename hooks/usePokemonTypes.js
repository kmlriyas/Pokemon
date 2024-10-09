import { useState, useEffect } from "react";

// Custom hook to fetch and return Pokémon types
const usePokemonTypes = () => {
  const [types, setTypes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/type");
        const data = await response.json();
        setTypes(data.results);
      } catch (err) {
        setError("Failed to fetch Pokémon types.");
        console.error("Error fetching types:", err);
      } finally {
        setLoading(false);
      }
    };

    // Ensure this function is called only once on component mount
    fetchTypes();
  }, []); // Empty array ensures it runs only once

  return { types, error, loading };
};

export default usePokemonTypes;
