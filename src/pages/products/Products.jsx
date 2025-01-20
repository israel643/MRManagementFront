import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../utilities/fetchData";

const Products = () => {
    const { id } = useParams(); // Obtener ID del producto desde la URL.
    const [formData, setFormData] = useState({
        cat_prod: "",
        name_prod: "",
        desc_prod: "",
        sku: "",
        precioV: "",
        UM_prod: "",
        activo: false,
        stockMin: "",
        stockMax: "",
        atributos: "",
    });

    const [loading, setLoading] = useState(false); // Estado de carga
    const [success, setSuccess] = useState(false); // Estado de éxito
    const [error, setError] = useState(null); // Estado de error

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            const { data } = await fetchData(
                `/products/${id}`,
                "PUT",
                payload
            );
            console.log("Respuesta del servidor:", data);
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
        }
    };
    
    return (
        <div>
            <h1>Actualizar Producto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Categoría:</label>
                    <input
                        type="text"
                        name="cat_prod"
                        value={formData.cat_prod}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name_prod"
                        value={formData.name_prod}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        name="desc_prod"
                        value={formData.desc_prod}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Marca:</label>
                    <textarea
                        name="marca"
                        value={formData.marca}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>SKU:</label>
                    <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="precioV"
                        value={formData.precioV}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Unidad de Medida:</label>
                    <input
                        type="text"
                        name="UM_prod"
                        value={formData.UM_prod}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Activo:</label>
                    <input
                        type="checkbox"
                        name="activo"
                        checked={formData.activo}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Stock Mínimo:</label>
                    <input
                        type="number"
                        name="stockMin"
                        value={formData.stockMin}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Stock Máximo:</label>
                    <input
                        type="number"
                        name="stockMax"
                        value={formData.stockMax}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Atributos:</label>
                    <input
                        type="text"
                        name="atributos"
                        value={formData.atributos}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Actualizando..." : "Actualizar Producto"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {success && (
                <p style={{ color: "green" }}>Producto actualizado con éxito</p>
            )}
        </div>
    );
};

export default Products;

















/*
import React, { useState } from "react";
import { useCustomFetch } from "../../hooks/useCustomFetch";
import { fetchData } from "..";
import { useParams } from "react-router-dom";

const Products = () => {
  const { id } = useParams(); // Obtenemos el ID desde la URL
  const [formData, setFormData] = useState({
    cat_prod: "",
    name_prod: "",
    desc_prod: "",
    marca: "",
    sku: "",
    precioV: "",
    UM_prod: "",
    activo: false,
    stockMin: "",
    stockMax: "",
    atributos: "",
  });

  const [trigger, setTrigger] = useState(false); // Cambia para disparar el hook

  const { data, error, loading } = useCustomFetch(
    () =>
      fetchData(`http://localhost:3000/api/products/${id}`, "PUT", {
        id_prod: parseInt(id), // ID del producto desde la URL
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
        atributos: JSON.parse(formData.atributos || "{}"), // Convertimos a JSON válido
      }),
    [trigger] // Cambia cuando se envía el formulario
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrigger(!trigger); // Cambia para disparar el hook
  };

  return (
    <div>
      <h1>Actualizar Producto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            name="cat_prod"
            value={formData.cat_prod}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name_prod"
            value={formData.name_prod}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="desc_prod"
            value={formData.desc_prod}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Marca:</label>
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>SKU:</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="precioV"
            value={formData.precioV}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Unidad de Medida:</label>
          <input
            type="text"
            name="UM_prod"
            value={formData.UM_prod}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Activo:</label>
          <input
            type="checkbox"
            name="activo"
            checked={formData.activo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Stock Mínimo:</label>
          <input
            type="number"
            name="stockMin"
            value={formData.stockMin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Stock Máximo:</label>
          <input
            type="number"
            name="stockMax"
            value={formData.stockMax}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Atributos:</label>
          <input
            type="text"
            name="atributos"
            value={formData.atributos}
            onChange={handleChange}
            placeholder='Ejemplo: {"key": "value"}'
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar Producto"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {data && <p style={{ color: "green" }}>Producto actualizado con éxito</p>}
    </div>
  );
};

export default Products;
*/