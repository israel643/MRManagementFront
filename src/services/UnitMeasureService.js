import { fetchData } from "../utilities/fetchData";

export const unitMeasureService = {
    getUnitMeasures: async () => {
        try {
            return await fetchData("/um/", "GET");
        } catch (error) {
            throw new Error("Error al obtener las categorias: " + error.message);
        }
    }
}