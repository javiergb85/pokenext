import { Card, Grid, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React,{FC}from 'react'
import { SmallPokemon } from '../../interfaces'
import FavoriteCardPokemon from './FavoriteCardPokemon'

interface Props {
  pokemons:number[]
}

 const FavoritesPokemons:FC<Props> =({pokemons}) => {
    

  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
    {pokemons.map((id) => (
      <FavoriteCardPokemon pokemonId={id} key={id} />
    ))}
  </Grid.Container>
  )
}


export default FavoritesPokemons