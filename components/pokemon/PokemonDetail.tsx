import { Card, Grid, Row, Text,Image, Button, Container } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { Pokemon, Sprites } from "../../interfaces";

interface Props {
  pokemon: {
    id: number;
    name: string;
    sprites: Sprites;
  }
  onToggleFavorite: ()=> void
  isInFavorites: boolean
}

const PokemonDetail: FC<Props> = ({ pokemon, onToggleFavorite,isInFavorites }) => {
 

  return (
    <Grid.Container css={{ marginTop: "5px" }} gap={2}>
      <Grid xs={12} sm={4}>
        <Card isHoverable css={{ padding: "30px" }}>
          <Card.Body>
            <Card.Image
              width="200%"
              height={200}
              alt={pokemon.name}
              src={
                pokemon?.sprites?.other?.dream_world?.front_default ||
                "/no-image.png"
              }
            />
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={12} sm={8}>
        <Card>
          <Card.Header
            css={{ display: "flex", justifyContent: "space-between" }}
          >
            <Text h1 transform="capitalize">
              {pokemon.name}
            </Text>
            <Button
              onPress={onToggleFavorite}
              color="gradient"
              ghost={!isInFavorites ? true : false}
            >
              {" "}
              {isInFavorites ? " En Favoritos" : "Guardar en favoritos"}
            </Button>
          </Card.Header>
          <Card.Body>
            <Text size={30}>Sprites:</Text>
            <Container direction="row" display="flex" gap={0}>
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.back_default}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.front_shiny}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.back_shiny}
                alt={pokemon.name}
                width={100}
                height={100}
              />
            </Container>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default PokemonDetail;
