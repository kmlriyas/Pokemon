// /app/pokemon/[pokemonName]/page.jsx

import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
export default async function PokemonDetails({ params }) {
  const pokemonName = params.pokemonName;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const pokemon = await res.json();

  return (
    <div className="container mx-auto p-4 bg-grey">
      <nav className="text-sm mb-4">
        <Link
          href="/"
          className="flex flex-row items-center text-green text-lg"
        >
          <BsChevronLeft />
          Back
        </Link>
      </nav>

      <div className="card-wrapper bg-orange rounded-md">
        <div className="top-img bg-green2 rounded-t-md">
          <img
            src={pokemon.sprites.other.dream_world.front_default}
            alt={pokemonName}
            className="p-10"
          />
        </div>

        <div className="p-4">
          <p>
            <strong>Name:</strong> {pokemonName}
          </p>
          <p>
            <strong>Types:</strong>{" "}
            {pokemon.types.map((type) => type.type.name).join(", ")}
          </p>
          <p>
            <strong>Stats:</strong>
            {pokemon.stats.map((stat) => stat.stat.name).join(", ")}
          </p>
          <p>
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </p>
          <p>
            <strong>Some Moves:</strong>{" "}
            {pokemon.moves.map((move) => move.move.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
