import { Button, Card, Grid, Row, Text } from "@nextui-org/react";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Layout } from "../components/layouts";
import { pokeApi } from "../api";
import { AxiosInstance } from "axios";
import { Pokemon, PokemonListResponse, SmallPokemon } from "../interfaces";
import PokemonCard from "../components/pokemon/PokemonCard";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
 
  return (
    <Layout title="Listado de pokemon">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map(({id,name,img, url}) => (
         <PokemonCard key={id} pokemon={{id,name,img, url}}/>
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`,
  }));

  // for (let index = 0; index < data.results.length; index++) {
  //   const item = data.results[index];

  //   const { data: pokemon } = await pokeApi.get<Pokemon>(
  //     `/pokemon/${item.name}`
  //   );

  //   pokemons.push<any>([
  //     {
  //       ...item,
  //       id: pokemon.id,
  //       img: pokemon?.sprites?.other?.dream_world?.front_default,
  //     },
  //   ]);
  // }
  //'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg'
  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
