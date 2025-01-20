import { fetchData } from "../utilities/fetchData";

export const categoriesService = {
    getAllCategories: async () => {
        try {
            return await fetchData("/categories/", "GET");
        } catch (error) {
            throw new Error("Error al obtener las categorias: " + error.message);
        }
    }
}