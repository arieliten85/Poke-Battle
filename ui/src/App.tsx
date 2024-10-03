import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";

import { PokemonResponse } from "./interfaces/pokemon";
import { fetchPokemon } from "./api/pokemonService";
import { fetchStartBattle } from "./api/battleService";
import PokemonCard from "./components/PokemonCard";
import {
  ButtonStartBattleProps,
  WinnerIsProps,
} from "./interfaces/BattleTypes";

export default function App() {
  const [pokemonData, setPokemonData] = useState<PokemonResponse[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<number | null>(null);
  const [battleStarted, setBattleStarted] = useState(false);
  const [winner, setWinner] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadPokemonData = async () => {
      try {
        const data = await fetchPokemon();

        setPokemonData(data);
      } catch (error) {
        console.error(
          "ailed to load Pokémon data. Please try again later.",
          error
        );
      }
    };

    loadPokemonData();
  }, []);

  const handleSelectPokemon = (id: number) => {
    if (!battleStarted) {
      setSelectedPokemon(id);
    }
  };

  const handleStartBattle = async () => {
    setBattleStarted(true);

    // Filtrar Pokémon excepto el seleccionado
    const availablePokemon = pokemonData.filter(
      (pokemon) => pokemon.id !== selectedPokemon
    );

    // Comprobar si hay Pokémon disponibles
    if (availablePokemon.length === 0) {
      console.warn("No hay Pokémon disponibles para pelear.");
      setBattleStarted(false);
      return;
    }

    // Selección de Pokémon oponente aleatorio
    const randomOpponent =
      availablePokemon[Math.floor(Math.random() * availablePokemon.length)];
    setOpponentPokemon(randomOpponent.id);

    try {
      const battleResult = await fetchStartBattle({
        pokemon1Id: selectedPokemon,
        pokemon2Id: randomOpponent.id,
      });

      setWinner(battleResult.winner.name);
    } catch (error) {
      console.error("Error al iniciar la batalla:", error);
    } finally {
      setBattleStarted(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5" }}>
      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
          p: 4,
          minHeight: "100vh",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={6}
        >
          <Typography variant="h3">Battle of Pokemon</Typography>
        </Box>

        <Typography variant="h5" mb={4}>
          Select your pokemon
        </Typography>

        <Grid container spacing={2} mb={6} justifyContent="space-between">
          {pokemonData.map((pokemon) => (
            <Grid item xs={6} sm={5} md={2.4} key={pokemon.id}>
              <Card
                onClick={() => handleSelectPokemon(pokemon.id)}
                sx={{
                  padding: 0,
                  cursor: "pointer",
                  opacity: selectedPokemon === pokemon.id ? 1 : 0.6,
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s",
                  },
                  borderRadius: "10px",
                  pointerEvents:
                    battleStarted || selectedPokemon !== null ? "none" : "auto",
                  boxShadow: selectedPokemon === pokemon.id ? 3 : 1,
                }}
              >
                <CardContent sx={{ padding: 2 }}>
                  <img
                    src={pokemon.imageUrl}
                    alt={pokemon.name}
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />
                  <Typography sx={{ fontWeight: 600 }} variant="body1">
                    {pokemon.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {winner && <WinnerIs winner={winner} />}

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "column", md: "row" }}
          justifyContent={{
            xs: "center",
            sm: opponentPokemon ? "space-between" : "flex-start",
          }}
          alignItems={{ xs: "center", sm: "center" }}
          sx={{
            borderRadius: "8px",
            position: "relative",
            gap: { xs: 2, sm: 0 },
          }}
        >
          {selectedPokemon !== null && (
            <PokemonCard
              pokemonData={pokemonData}
              selectedPokemon={selectedPokemon}
            />
          )}

          {selectedPokemon !== null && !battleStarted && (
            <ButtonStartBattle handleStartBattle={handleStartBattle} />
          )}

          {opponentPokemon !== null && (
            <PokemonCard
              pokemonData={pokemonData}
              opponentPokemon={opponentPokemon}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

const ButtonStartBattle = ({ handleStartBattle }: ButtonStartBattleProps) => {
  return (
    <Box
      sx={{
        margin: 6,
      }}
    >
      <Button
        variant="contained"
        color="success"
        onClick={handleStartBattle} // Aquí ya se usa correctamente
        sx={{
          fontSize: "15px",
          p: 1,
          px: 3.2,
          textTransform: "none",
        }}
      >
        Start Battle
      </Button>
    </Box>
  );
};

const WinnerIs = ({ winner }: WinnerIsProps) => {
  return (
    <Box
      sx={{
        mb: 6,
        backgroundColor: "#e4f9fe;",
        borderRadius: "5px",
        border: "2px solid black",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "12px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          pl: 2,
        }}
      >
        {winner} wins!
      </Typography>
    </Box>
  );
};
