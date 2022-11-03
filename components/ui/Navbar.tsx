import { Container, Spacer, useTheme } from "@nextui-org/react";
import { Text, Link, Row } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0x 20px",
        backgroundColor: theme?.colors.gray100.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="icono de la app"
        width={70}
        height={70}
      />
      <NextLink href="/" passHref>
      <Row justify="center" align="flex-end">
          <Text color="white" h2>
            P
          </Text>
          <Text style={{marginBottom:15}} color="white" h3>
            okemon
          </Text>
    
       </Row>
      </NextLink>
     
      <Spacer css={{ flex: 1 }} />
      <Link href="/favorites">
      <Text style={{marginRight:20}} color="white" h3>
        favoritos
      </Text>
      </Link>
    </div>
  );
};
