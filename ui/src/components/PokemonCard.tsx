import { Card, CardContent } from "@mui/material";
import { PokemonResponse } from "../interfaces/pokemon";
import { renderPokemonStats } from "../utils/pokemonUtils";

interface PropsResponse {
  pokemonData: PokemonResponse[];
  opponentPokemon?: number;
  selectedPokemon?: number;
}

const PokemonCard = ({
  pokemonData,
  opponentPokemon,
  selectedPokemon,
}: PropsResponse) => {
  const activePokemonId = opponentPokemon || selectedPokemon;
  return (
    <Card
      sx={{
        minWidth: "330px",
        height: "100%",
        borderRadius: "10px",
        marginBottom: { xs: 2, sm: 0 },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <img
          src={pokemonData.find((p) => p.id === activePokemonId)?.imageUrl}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "contain",
            marginBottom: "16px",
          }}
        />
        {renderPokemonStats(pokemonData.find((p) => p.id === activePokemonId)!)}
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
