import { fetchData } from "../utilities/fetchData";

export const adjustmentService = {

    getAdjustmentLastPeriod: async () => {
        try {
            return await fetchData("/adjustment/", "GET");
        } catch (error) {
            throw new Error("Error al obtener los ajustes: " + error.message);
        }
    },

    addNewAdjustment: async (payload) => {
        try {
            return await fetchData("/adjustment/", "POST", payload );
        } catch (error) {
            throw new Error("Error al insertar el ajuste: " + error.message);
        }
    },

    editAdjustment: async (idAdjustment, payload) => {
        try {
            return await fetchData(`/adjustment/${idAdjustment}`, "PUT", payload);
        } catch (error) {
            throw new Error("Error al editar ajuste: " + error.message);
        }
    },

    deleteAdjustment: async (idAdjustment) => {
        try {
            return await fetchData(`/adjustment/${idAdjustment}`, "DELETE");
        } catch (error) {
            throw new Error("Error al eliminar ajuste: " + error.message);
        }
    },

    // DETALLES

    addDetailsAdjustment: async (idAdjustment, payload) => {
        try {
            return await fetchData(`/adjustment/${idAdjustment}/details`, "POST", payload);
        } catch (error) {
            throw new Error("Error al agregar producto: " + error.message);
        }
    },

    getDetailsByAdjustment: async (idAdjustment) => {
        try {
            return await fetchData(`/adjustment/${idAdjustment}/details`, "GET");
        } catch (error) {
            throw new Error("Error al recuperar los productos: " + error.message);
        }
    },

    editDetailAdjustment: async (idAdjustment, detail_id , payload) => {
        try {
            return await fetchData(`/adjustment/${idAdjustment}/details/${detail_id}`, "PUT", payload);
        } catch (error) {
            throw new Error("Error al editar producto: " + error.message);
        }
    },

    deleteAdjustmentDetail: async (idDetail) => {
        try {
            return await fetchData(`/adjustment/details/${idDetail}`, "DELETE");
        } catch (error) {
            throw new Error("Error al eliminar producto: " + error.message);
        }
    },
}