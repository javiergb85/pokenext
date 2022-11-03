import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

const getPokemonInfo = async (nameOrId: string) => {
  const { data: pokemon } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

  return {
    name: pokemon.name,
    sprites: pokemon.sprites,
    id: pokemon.id,
  };
};

export default getPokemonInfo;
