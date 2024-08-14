import { api } from "./customAxios";
import { Category, Country } from "./MovieDetailServices";

export const getCategoryList = async (endpoint: string): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>(endpoint);
    const countries = response.data;
    return countries;
  } catch (error) {
    console.error("Failed to fetch countries", error);
    throw error;
  }
};
