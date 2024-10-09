"use client";

import { useState } from "react";
import usePokemonTypes from "../hooks/usePokemonTypes";
import usePokemonList from "../hooks/usePokemonList";
import Link from "next/link";
import { BsArrowRight, BsSearch } from "react-icons/bs"; // Import search and arrow icons
import Image from "next/image";
export default function Home() {
  const { types, error, loading } = usePokemonTypes(); // Using the updated usePokemonTypes hook
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const pokemons = usePokemonList(selectedType, searchTerm);

  // Handle loading state
  if (loading) {
    return <p className="text-center text-xl">Loading Pokémon types...</p>;
  }

  // Handle error state
  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4 bg-grey">
      {/* Search Form */}
      <div className="mb-6">
        {/* Dropdown - Block level */}
        <div className="mb-4 w-2/5">
          <select
            className="block w-full border p-3 rounded-md shadow-sm"
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input with Icon and Button Group */}
        <div className="relative flex items-center w-3/5">
          {/* Search Icon inside input */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <BsSearch className="text-gray-400" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            className="block w-full border p-3 pl-10 pr-16 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Pokémon by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Search Button */}
          <button
            onClick={() => console.log("Searching for:", searchTerm)}
            className="absolute right-0 top-0 bottom-0 bg-dark-blue text-white px-4 rounded-r-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      {/* Pokémon List - Grid with 3 cards per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            className="border bg-light-grey hover:shadow-lg cursor-pointer rounded-md"
          >
            <div className="top-img bg-white p-10 rounded-t-md">
              {pokemon.sprites && pokemon.sprites.front_default ? (
                <img
                  src={pokemon.sprites.other.dream_world.front_default}
                  alt={pokemon.name}
                  className="w-24 h-24 m-auto"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center mb-4">
                  <span>No Image</span>
                </div>
              )}
            </div>

            <div className="card-body  px-4 py-6">
              <h3 className="text-lg font-semibold capitalize text-dark-blue mb-10">
                {pokemon.name}
              </h3>

              {/* Link to Details with Right Arrow */}
              <Link
                href={`/pokemon/${pokemon.name}`}
                className="text-xs flex items-center text-blue-400 hover:text-blue-700"
              >
                <span className="mr-2 ">Details</span>
                <BsArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
