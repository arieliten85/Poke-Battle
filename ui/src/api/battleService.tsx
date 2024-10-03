import { axiosInstance } from "./axiosInstance";

interface StartBattleRequest {
  pokemon1Id: number | null;
  pokemon2Id: number | null;
}

const BASE_URL = "/api/battle";

export const fetchStartBattle = async ({
  pokemon1Id,
  pokemon2Id,
}: StartBattleRequest) => {
  try {
    const response = await axiosInstance.post(BASE_URL, {
      pokemon1Id,
      pokemon2Id,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
