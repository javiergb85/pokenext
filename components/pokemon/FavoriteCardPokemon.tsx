import { Card, Grid, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { SmallPokemon } from "../../interfaces";

interface Props {
  pokemonId: number;
}

const FavoriteCardPokemon: FC<Props> = ({ pokemonId }) => {
   const router = useRouter()

  const onClick =()=>{
      router.push(`/pokemon/${pokemonId}`)
  }

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={pokemonId}>
      <Card isHoverable isPressable css={{ padding: 10 }} onPress={onClick}>
        <Card.Image
          width={"100%"}
          height={140}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
        />
      </Card>
    </Grid>
  );
};

export default FavoriteCardPokemon;
