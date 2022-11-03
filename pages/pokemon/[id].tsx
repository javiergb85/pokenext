import React, { useEffect, useState } from "react";
import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon, Sprites } from "../../interfaces";
import { localFavorites } from "../../utils";
import confetti from "canvas-confetti";
import PokemonDetail from "../../components/pokemon/PokemonDetail";
import getPokemonInfo from "../../utils/getPokemonInfo";

interface Props {
  id: number;
  name: string;
  sprites: Sprites;
}

export const PokemonPage: NextPage<Props> = (pokemon) => {
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
  const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`);
  // const { data } = await  // your fetch function here

  return {
    paths: pokemon151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id)

  return {
    props: pokemon,
  };
};

export default PokemonPage;
