import { fetchData } from "../utilities/fetchData";

export const productService = {
    getAllProductos: async () => {
        try {
            return await fetchData("/products/", "GET");
        } catch (error) {
            throw new Error("Error al obtener los productos: " + error.message);
        }
    },

    getProductById: async (id) => {
        try {
            return await fetchData(`/products/${id}`, "GET");
        } catch (error) {
            throw new Error("Error al obtener el producto: " + error.message);
        }
    },

    createProduct: async (payload) => {
        try {
            return await fetchData("/products/", "POST", payload);
        } catch (error) {
            throw new Error("Error al crear el producto: " + error.message);
        }
    },

    updateProduct: async (id, payload) => {
        try {
            return await fetchData(`/products/${id}`, "PUT", payload);
        } catch (error) {
            throw new Error("Error al actualizar el producto: " + error.message);
        }
    },

    deleteProduct: async (id) => {
        try {
            return await fetchData(`/products/${id}`, "DELETE");
        } catch (error) {
            throw new Error("Error al eliminar el producto: " + error.message);
        }
    }
};