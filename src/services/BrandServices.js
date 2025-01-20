import { fetchData } from "../utilities/fetchData";

export const brandsService = {
    getBrands: async () => {
        try {
            return await fetchData("/brands/", "GET");
        } catch (error) {
            throw new Error("Error al obtener las categorias: " + error.message);
        }
    }
}