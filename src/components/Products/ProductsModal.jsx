import React, { useState, useEffect } from "react";
import { Input } from "../Forms/Input-Component";
import { Select } from "../Forms/Select-Componet";
import { Button } from "../Buttons/Button";
import { InputCheckboxOrRadio } from "../Forms/RadioOrCheckbox-Component";
import { categoriesService } from "../../services/CategoriesService";
import { brandsService } from "../../services/BrandServices";
import { unitMeasureService } from "../../services/UnitMeasureService";

const ProductModal = ({ product, isOpen, onClose, onSave }) => {
    const [editedProduct, setEditedProduct] = useState({
        id: null,
        cat_prod: "",
        name_prod: "",
        desc_prod: "",
        sku: "",
        precioV: "",
        UM_prod: "",
        marca: "",
        activo: false,
        stockMin: "",
        stockMax: "",
        atributos: "",
    });

    const [categories, setCategories] = useState([
        { value: "", label: "Seleccione una categoria" }
    ]);
    const [brands, setBrands] = useState([
        { value: "", label: "Seleccione una marca" }
    ]);
    const [unitMeasures, setUnitMeasures] = useState([
        { value: "", label: "Seleccione una unidad de medida" }
    ]);
    
    const [uniqueId, setUniqueId] = useState("");

    // Cargar datos de las APIs
    useEffect(() => {
        const loadData = async () => {
            try {
                // Cargar categorías
                const categoriesData = await categoriesService.getAllCategories();
                setCategories([
                    { value: "", label: "Seleccione una categoria" },
                    ...categoriesData.map(cat => ({
                        value: cat.id_categoria,
                        label: cat.nombre_categoria
                    }))
                ]);

                // Cargar marcas
                const brandsData = await brandsService.getBrands();
                setBrands([
                    { value: "", label: "Seleccione una marca" },
                    ...brandsData.map(brand => ({
                        value: brand.id_marca,
                        label: brand.nombre_marca
                    }))
                ]);

                // Cargar unidades de medida
                const umData = await unitMeasureService.getUnitMeasures();
                setUnitMeasures([
                    { value: "", label: "Seleccione una unidad de medida" },
                    ...umData.map(um => ({
                        value: um.id_unidadM,
                        label: um.nombre
                    }))
                ]);
            } catch (err) {
                console.error("Error al cargar datos:", err);
            }
        };

        if (isOpen) {
            loadData();
        }
    }, [isOpen]);

    useEffect(() => {
        setEditedProduct({
            id: product?.id_producto ?? null,
            cat_prod: product?.categoria ?? "",
            name_prod: product?.nombre_producto ?? "",
            desc_prod: product?.descripcion ?? "",
            sku: product?.sku ?? "",
            precioV: product?.precio_venta ?? "",
            UM_prod: product?.unidad_medida ?? "",
            marca: product?.marca ?? "",
            activo: product?.activo ?? false,
            stockMin: product?.stock_minimo ?? "",
            stockMax: product?.stock_maximo ?? "",
            atributos: JSON.stringify(product?.atributos || "{}"),
        });

        // Generar un identificador único si no existe
        if (!product?.sku) {
            setUniqueId(Date.now().toString().slice(-6)); // Últimos 6 dígitos del timestamp
        } else {
            const parts = product.sku.split("-");
            setUniqueId(parts[3] || Date.now().toString().slice(-6)); // Recuperar el ID del SKU existente
        }
    }, [product]);

    // Función para generar SKU dinámico
    const generateSKU = (editedProduct, uniqueId) => {
        // Obtener el label de la categoría (a partir del valor numérico) y cortar a 3 letras
        const categoryLabel = categoryOptions
            .find((opt) => opt.value === Number(editedProduct.cat_prod))?.label || "XXX";
        const categoryPart = categoryLabel.replace(/\s+/g, "").toUpperCase().substring(0, 3);

        // Obtener el label de la marca (a partir del valor numérico) y cortar a 3 letras
        const brandLabel = brandOptions
            .find((opt) => opt.value === Number(editedProduct.marca))?.label || "XXX";
        const brandPart = brandLabel.replace(/\s+/g, "").toUpperCase().substring(0, 3);

        // Tomar el nombre del producto, eliminar espacios y cortar a 5 caracteres
        const namePart = editedProduct.name_prod
            .replace(/\s+/g, "") // Quitar espacios
            .toUpperCase()
            .substring(0, 5);

        // Construir el SKU con el identificador único
        return `${categoryPart}-${brandPart}-${namePart}-${uniqueId}`;
    };


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedProduct = {
            ...editedProduct,
            [name]: type === "checkbox" ? checked : value,
        };

        // Actualizar el SKU dinámicamente
        updatedProduct.sku = generateSKU(updatedProduct, uniqueId);

        setEditedProduct(updatedProduct);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedProduct = {
            ...editedProduct,
            precioV: parseFloat(editedProduct.precioV) || 0,
            stockMin: parseInt(editedProduct.stockMin) || 0,
            stockMax: parseInt(editedProduct.stockMax) || 0,
            marca: parseInt(editedProduct.marca) || 0,
            cat_prod: parseInt(editedProduct.cat_prod) || 0,
            UM_prod: parseInt(editedProduct.UM_prod) || 0,
        };
        onSave(formattedProduct);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{product ? "Edita Producto" : "Crear nuevo Producto"}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex flex-column justify-content-center">
                                <Input
                                    label="Nombre producto"
                                    id="name_prod"
                                    name="name_prod"
                                    value={editedProduct.name_prod}
                                    type="text"
                                    placeholder="Ejemplo: Embrague"
                                    required
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Descripción"
                                    id="desc_prod"
                                    name="desc_prod"
                                    value={editedProduct.desc_prod}
                                    placeholder="Color, forma, etc."
                                    type="text"
                                    required
                                    onChange={handleChange}
                                />
                                <Input
                                    label="SKU"
                                    id="sku"
                                    name="sku"
                                    value={editedProduct.sku}
                                    placeholder="XXX-XXX-XXXXX"
                                    type="text"
                                    readOnly
                                />
                                <Select
                                    label="Marca"
                                    id="marca"
                                    name="marca"
                                    options={brands}
                                    value={editedProduct.marca}
                                    required
                                    onChange={handleChange}
                                />
                                <Select
                                    label="Categoría"
                                    id="cat_prod"
                                    name="cat_prod"
                                    options={categories}
                                    value={editedProduct.cat_prod}
                                    required
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Precio de Venta"
                                    id="precioV"
                                    name="precioV"
                                    value={editedProduct.precioV}
                                    type="text"
                                    placeholder="Ejemplo: 100.00"
                                    required
                                    onChange={handleChange}
                                />
                                <Select
                                    label="Unidad de Medida"
                                    id="UM_prod"
                                    name="UM_prod"
                                    options={unitMeasures}
                                    value={editedProduct.UM_prod || ""}
                                    required
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Stock mínimo"
                                    id="stockMin"
                                    name="stockMin"
                                    value={editedProduct.stockMin}
                                    type="text"
                                    placeholder="0"
                                    required
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Stock máximo"
                                    id="stockMax"
                                    name="stockMax"
                                    value={editedProduct.stockMax}
                                    type="text"
                                    placeholder="0"
                                    required
                                    onChange={handleChange}
                                />
                                <InputCheckboxOrRadio
                                    type="checkbox"
                                    label="Producto activo"
                                    checked={editedProduct.activo || true}
                                    name="activo"
                                    id="activo"
                                    onChange={handleChange}
                                />
                                <Button type="submit">Guardar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
