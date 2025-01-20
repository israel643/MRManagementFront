import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../utilities/fetchData";
import ProductsForm from "./ProductsForm";

const Products = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        cat_prod: "",
        name_prod: "",
        marca: "",
        desc_prod: "",
        sku: "",
        precioV: "",
        UM_prod: "",
        activo: false,
        stockMin: "",
        stockMax: "",
        atributos: "{}",
    });

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const data = await fetchData(`/products/${id}`);

                const transformedData = {
                    cat_prod: data[0].id_categoria,
                    name_prod: data[0].nombre_producto,
                    marca: data[0].id_marca,
                    desc_prod: data[0].descripcion,
                    sku: data[0].sku,
                    precioV: data[0].precio_venta,
                    UM_prod: data[0].unidad_medida.toString(),
                    activo: data[0].activo === 1,
                    stockMin: data[0].stock_minimo,
                    stockMax: data[0].stock_maximo,
                    atributos: data[0].atributos_extra || "{}"
                };

                setFormData(transformedData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar los datos: {error}</p>;

    const handleSubmit = async (e) => {

        const payload = {
            id: parseInt(id),
            cat_prod: parseInt(formData.cat_prod),
            name_prod: formData.name_prod,
            desc_prod: formData.desc_prod,
            marca: parseInt(formData.marca),
            sku: formData.sku,
            precioV: parseFloat(formData.precioV),
            UM_prod: parseInt(formData.UM_prod),
            activo: formData.activo ? 1 : 0,
            stockMin: parseInt(formData.stockMin),
            stockMax: parseInt(formData.stockMax),
            atributos: JSON.stringify(formData.atributos || "{}"),
        };

        console.log("Payload enviado:", payload);

        try {
            const { data } = await fetchData(`/products/${id}`, "PUT", payload);

            console.log("Respuesta del servidor:", data);

            setSuccess(true); // Marca como éxito
            setError(null); // Limpia el error
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);

            setError(error.message); // Establece el mensaje de error
            setSuccess(false); // Asegúrate de desmarcar el éxito
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>{formData.name_prod}</h1>
            <ProductsForm
                formData={formData}
                onChange={setFormData}
                onSubmit={handleSubmit}
                loading={loading}
            />
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {success && <p style={{ color: "green" }}>Producto actualizado con éxito</p>}
        </div>
    );
};

export default Products;
