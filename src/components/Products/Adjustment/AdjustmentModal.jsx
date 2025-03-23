import React, { useState, useEffect } from "react";
import { Input } from "../../Forms/Input-Component";
import { Select } from "../../Forms/Select-Componet";
import { Button } from "../../Buttons/Button";
import { productService } from '../../../services/ProductsService';
import { unitMeasureService } from "../../../services/UnitMeasureService";
import { adjustmentService } from "../../../services/AdjustmentService";

// Función para fecha local
const getLocalDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now - offset).toISOString().slice(0, 16);
};

// Estado inicial
const initialAjusteState = {
    idAdjustment: null,
    saleId: '',
    date: '',
    reason: "",
    responsible: "",
    comment: "",
};

const initialDetalleState = {
    detail_id: null,
    productId: "",
    quantity: "",
    type: "",
    unitPrice: "",
    status: 6,
    physicalCaptureUM: "",
    userPhysicalCapture: "",
    reason: "",
    isModified: false,
};

const AjustesModal = ({ isOpen, onClose, onSave, ajusteExistente }) => {
    const [ajuste, setAjuste] = useState(initialAjusteState);
    const [detalles, setDetalles] = useState([]);
    const [productos, setProductos] = useState([]);
    const [unitMeasures, setUnitMeasures] = useState([{ value: "", label: "Seleccione UM" }]);
    const [loading, setLoading] = useState(false);
    const [adjustmentId, setAdjustmentId] = useState(null);

    // Cargar datos principales cuando el modal se abre
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);

                const [umData, productsData] = await Promise.all([
                    unitMeasureService.getUnitMeasures(),
                    productService.getAllProductos()
                ]);

                setUnitMeasures([
                    { value: "", label: "Seleccione una unidad de medida" },
                    ...umData.map(um => ({ value: um.id_unidadM, label: um.nombre }))
                ]);

                setProductos([
                    { value: "", label: "Seleccione un producto" },
                    ...productsData.map(prod => ({ value: prod.id_producto, label: prod.descripcion }))
                ]);
            } catch (error) {
                console.error("Error cargando datos:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            loadInitialData();
        }
    }, [isOpen]);

    // Detectar apertura/cierre del modal y reiniciar estado
    useEffect(() => {
        if (!isOpen) {
            // Limpiar estado cuando se cierra el modal
            resetForm();
            setAdjustmentId(null);
        }
    }, [isOpen]);

    // Cargar datos de ajuste existente o inicializar con valores por defecto
    useEffect(() => {
        if (!isOpen) return;
        
        if (ajusteExistente && ajusteExistente.id_ajuste !== adjustmentId) {

            setAdjustmentId(ajusteExistente.id_ajuste);
            
            setAjuste({
                idAdjustment: ajusteExistente.id_ajuste,
                saleId: ajusteExistente.id_venta?.toString() ?? '',
                date: ajusteExistente.fecha_ajuste.slice(0, 16),
                reason: ajusteExistente.motivo || "",
                responsible: ajusteExistente.responsable || "",
                comment: ajusteExistente.comentario || "",
            });
            
            loadAdjustmentDetails(ajusteExistente.id_ajuste);
        } else if (!ajusteExistente) {
            // Si es un nuevo ajuste
            resetForm();
            setAjuste(prev => ({
                ...initialAjusteState,
                date: getLocalDateTime() // Establecer fecha por defecto para nuevos ajustes
            }));
        }
    }, [isOpen, ajusteExistente, adjustmentId]);

    const loadAdjustmentDetails = async (idAjustment) => {
        try {
            setLoading(true);
            const details = await adjustmentService.getDetailsByAdjustment(idAjustment);
            if (details && Array.isArray(details)) {
                setDetalles(details.map(d => ({
                    detail_id: d.id_detalle_ajuste,
                    productId: d.id_producto?.toString() || "",
                    quantity: d.cantidad?.toString() || "",
                    type: d.tipo_movimiento?.toString() || "",
                    unitPrice: d.precio_unitario?.toString() || "",
                    physicalCaptureUM: d.captura_fisica_UM?.toString() || "",
                    reason: d.motivo || "",
                    status: d.statusDA,
                    userPhysicalCapture: "Usuario Estatico",
                    isModified: false, // Inicialmente no modificado
                    isExisting: true // Marcar como existente
                })));
            } else {
                setDetalles([]);
            }
        } catch (error) {
            console.error("Error obteniendo detalles del ajuste:", error);
            setDetalles([]);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setAjuste(initialAjusteState);
        setDetalles([]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAjuste(prev => ({ ...prev, [name]: value }));
    };

    const handleDetailChange = (index, field, value) => {
        setDetalles(prev => prev.map((item, i) =>
            i === index 
                ? { 
                    ...item, 
                    [field]: value,
                    isModified: true 
                } 
                : item
        ));
    };

    const addDetalle = () => {
        // Genera un ID temporal negativo para nuevos detalles
        const tempId = -1 * (detalles.length + 1);
        
        setDetalles(prev => [
            ...prev, 
            { 
                ...initialDetalleState, 
                detail_id: tempId,
                isModified: true,
                isExisting: false // Marcar como nuevo
            }
        ]);
    };

    const removeDetalle = async (index, idDetalle) => {
        // Advertencia de borrado
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto del ajuste?");

        if (!confirmDelete) return; 
    
        try {
            if (idDetalle) {
                // Eliminación en BD
                await adjustmentService.deleteAdjustmentDetail(idDetalle);
            }
    
            // Eliminación del detalle en local
            setDetalles(prev => prev.filter((_, i) => i !== index));
        } catch (error) {
            alert("Ocurrió un error al eliminar el detalle. Por favor, inténtalo de nuevo.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (detalles.length === 0) {
            alert('Debe agregar al menos un detalle');
            return;
        }

        try {
            const transformData = (data) => Object.fromEntries(
                Object.entries(data).map(([k, v]) => [k, v === "" ? null : v])
            );

            const existingDetails = detalles
                .filter(d => d.isExisting && d.isModified)
                .map(d => ({
                    detail_id: d.id_detalle_ajuste, // ID original del detalle
                    ...transformData(d),
                    quantity: parseFloat(d.quantity),
                    unitPrice: parseFloat(d.unitPrice),
                    physicalCaptureUM: parseInt(d.physicalCaptureUM),
                    type: parseInt(d.type),
                    productId: parseInt(d.productId),
                }));

            const newDetails = detalles
                .filter(d => !d.isExisting)
                .map(d => ({
                    ...transformData(d),
                    quantity: parseFloat(d.quantity),
                    unitPrice: parseFloat(d.unitPrice),
                    physicalCaptureUM: parseInt(d.physicalCaptureUM),
                    type: parseInt(d.type),
                    productId: parseInt(d.productId),
                }));

            const payload = {
                ...transformData(ajuste),
                detalles: newDetails,
                detallesModificados: existingDetails
            };

            await onSave(payload);
            onClose();
        } catch (error) {
            console.error("Error guardando ajuste:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-light text-dark">
                        <h3 className="modal-title h5">
                            {ajusteExistente ? "Editar Ajuste" : "Nuevo Ajuste"}
                        </h3>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body container-fluid">
                        {loading ? (
                            <div className="text-center py-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                                <p className="mt-2">Cargando datos...</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <Input
                                            label="ID Venta"
                                            name="saleId"
                                            value={ajuste.saleId}
                                            onChange={handleChange}
                                            type="number"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <Input
                                            label="Fecha de Ajuste"
                                            name="date"
                                            value={ajuste.date}
                                            onChange={handleChange}
                                            type="datetime-local"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <Input
                                            label="Motivo"
                                            name="reason"
                                            value={ajuste.reason}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <Input
                                            label="Responsable"
                                            name="responsible"
                                            value={ajuste.responsible}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <Input
                                            label="Comentario"
                                            name="comment"
                                            value={ajuste.comment}
                                            onChange={handleChange}
                                            type="textarea"
                                            rows="3"
                                        />
                                    </div>
                                </div>

                                <div className="border-top pt-4">
                                    <h4 className="mb-4">Detalles del Ajuste</h4>

                                    {detalles.map((detalle, index) => (
                                        <div key={index} className="card mb-3">
                                            <div className="card-body">
                                                <div className="row g-3">
                                                    <div className="col-md-12 d-flex justify-content-between align-items-center">
                                                        <Select
                                                            label="Producto"
                                                            options={productos}
                                                            value={detalle.productId}
                                                            onChange={(e) =>
                                                                handleDetailChange(index, 'productId', e.target.value)
                                                            }
                                                            required
                                                        />
                                                        <div className="ms-2 mt-4">
                                                            {detalle.isExisting ? (
                                                                <span className="badge bg-info">ID: {detalle.detail_id}</span>
                                                            ) : (
                                                                <span className="badge bg-success">Nuevo</span>
                                                            )}
                                                            {detalle.isModified && (
                                                                <span className="badge bg-warning ms-1">Modificado</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Input
                                                            label="Cantidad"
                                                            value={detalle.quantity}
                                                            onChange={(e) =>
                                                                handleDetailChange(index, 'quantity', e.target.value)
                                                            }
                                                            type="number"
                                                            step="0.01"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Select
                                                            label="Tipo de Movimiento"
                                                            options={[
                                                                { value: "", label: "Seleccionar" },
                                                                { value: "1", label: "Entrada" },
                                                                { value: "2", label: "Salida" },
                                                            ]}
                                                            value={detalle.type}
                                                            onChange={(e) =>
                                                                handleDetailChange(index, 'type', e.target.value)
                                                            }
                                                            required
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Input
                                                            label="Precio Unitario"
                                                            value={detalle.unitPrice}
                                                            onChange={(e) =>
                                                                handleDetailChange(index, 'unitPrice', e.target.value)
                                                            }
                                                            type="number"
                                                            step="0.01"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Select
                                                            label="Captura Física UM"
                                                            id={`UM_prod_${index}`}
                                                            name={`UM_prod_${index}`}
                                                            options={unitMeasures}
                                                            value={detalle.physicalCaptureUM || ""}
                                                            required
                                                            onChange={(e) =>
                                                                handleDetailChange(index, 'physicalCaptureUM', e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Input
                                                            label="User Captura Fisica"
                                                            value={detalle.userPhysicalCapture}
                                                            onChange={(e) =>
                                                                handleDetailChange(index, 'userPhysicalCapture', e.target.value)
                                                            }
                                                            disabled
                                                            required
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Input
                                                            label="Razón"
                                                            value={detalle.reason}
                                                            onChange={(e) =>
                                                                handleDetailChange(index, 'reason', e.target.value)
                                                            }
                                                            type="text"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="col-12 text-end">
                                                        <Button
                                                            type="button"
                                                            onClick={() => removeDetalle(index, detalle.detail_id)}
                                                            variant="danger"
                                                            size="sm"
                                                        >
                                                            Eliminar
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="d-flex justify-content-end gap-2 mt-4">
                                        <Button
                                            type="button"
                                            onClick={addDetalle}
                                            variant="outline-primary"
                                        >
                                            Agregar Detalle
                                        </Button>

                                        <Button type="submit" variant="primary">
                                            {ajusteExistente ? "Actualizar Ajuste" : "Guardar Ajuste"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AjustesModal;