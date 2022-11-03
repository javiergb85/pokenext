import React, { useEffect, useState } from "react";
import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon, PokemonListResponse, SmallPokemon, Sprites } from "../../interfaces";
import { localFavorites } from "../../utils";
import confetti from "canvas-confetti";
import PokemonDetail from "../../components/pokemon/PokemonDetail";
import getPokemonInfo from "../../utils/getPokemonInfo";

interface Props {
  id: number;
  name: string;
  sprites: Sprites;
}

export const PokemonByNamePage: NextPage<Props> = (pokemon) => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id));

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0.1,
      },
    });
  };

  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
    console.log("isInFavorites", isInFavorites);
  }, [isInFavorites, pokemon.id]);

  return (
    <Layout title={pokemon.name}>
     <PokemonDetail pokemon={pokemon} onToggleFavorite={onToggleFavorite} isInFavorites={isInFavorites}/>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data: pokemon } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`);
   
  const pokemon151 = pokemon.results.map<string>((item, index) => item.name);

 
  return {
    paths: pokemon151.map((name:string) => ({
      params: { name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
 
  const pokemon = await getPokemonInfo(name)

  return {
    props: pokemon,
  };
};

export default PokemonByNamePage;
