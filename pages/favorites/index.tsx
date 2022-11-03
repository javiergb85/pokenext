import {
  Button,
  Card,
  Container,
  Grid,
  Row,
  Text,
  Image,
} from "@nextui-org/react";
import { GetStaticProps, NextPage } from "next";
import { SmallPokemon } from "../../interfaces";

import { Layout } from "../../components/layouts";
import NoFavorites from "../../components/ui/NoFavorites";
import React, { useEffect, useState } from "react";
import { localFavorites } from "../../utils";
import FavoritesPokemons from "../../components/pokemon/FavoritePokemons";
 

interface Props {
  pokemons: SmallPokemon[];
}

const FavoritesPage: NextPage<Props> = () => {
  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Listado de pokemon">
      {!favoritesPokemons.length ? (
        <NoFavorites />
      ) : (
        <FavoritesPokemons pokemons={favoritesPokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
