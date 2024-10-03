import { axiosInstance } from "./axiosInstance";

const BASE_URL = "/api/pokemon";

export const fetchPokemon = async () => {
  try {
    const response = await axiosInstance.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    throw error;
  }
};
