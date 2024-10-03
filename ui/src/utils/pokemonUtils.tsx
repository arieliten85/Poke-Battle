import { Box, LinearProgress, Typography } from "@mui/material";
import { PokemonResponse } from "../interfaces/pokemon";

export const renderPokemonStats = (pokemon: PokemonResponse) => {
  const stats = {
    HP: pokemon.hp * 10,
    Attack: pokemon.attack * 10,
    Defense: pokemon.defense * 10,
    Speed: pokemon.speed * 10,
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ borderBottom: "#e0e0e0 solid 2px" }} variant="h6">
        {pokemon.name}
      </Typography>
      {Object.entries(stats).map(([stat, value]) => (
        <Box key={stat} sx={{ mb: 1 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography sx={{ fontWeight: 600 }} variant="body1">
              {stat}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={value}
            sx={{
              height: 10,
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#75fc4d",
              },
              backgroundColor: "#e0e0e0",
            }}
          />
        </Box>
      ))}
    </Box>
  );
};
