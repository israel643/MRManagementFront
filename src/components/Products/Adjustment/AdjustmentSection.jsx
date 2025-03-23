//SERVICIOS
// import  SmartTable  from '../Adjustment/SmartTable';
import React, { useState, useEffect } from 'react';
import Header from '../../Header/header';

import SmartTable from '@/components/smart-table/smart-table'
import { Plus } from 'lucide-react';
import AjustesModal from './AdjustmentModal';
import { adjustmentService } from '../../../services/AdjustmentService';

const AdjustmentSection = () => {

    const [showModal, setShowModal] = useState(false);
    const [adjustments, setAdjustments] = useState([]);
    const [selectedAjuste, setSelectedAjuste] = useState(null);
    const [loading, setLoading] = useState(false);

    // Función para manejar la edición
    const handleEdit = (ajuste) => {
        setSelectedAjuste(ajuste);
        setShowModal(true);
    };

    // Función para manejar la eliminación con confirmación y notificación
    const handleDelete = async (ajuste) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el ajuste #${ajuste.id_ajuste}?`);

        if (!confirmDelete) return;

        try {
            await adjustmentService.deleteAdjustment(ajuste.id_ajuste);
            loadAdjustments();
        } catch (error) {
            alert("Ocurrió un error al eliminar el ajuste.");
        }
    };


    useEffect(() => {
        loadAdjustments();
    }, []);

    async function loadAdjustments() {
        try {
            setLoading(true);
            const data = await adjustmentService.getAdjustmentLastPeriod();
            setAdjustments(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (nuevoAjuste) => {
        try {
            // Función para agregar detalles
            const addDetails = async (adjustmentId, detalles) => {
                for (const detalle of detalles) {
                    await adjustmentService.addDetailsAdjustment(adjustmentId, detalle);
                }
            };
    
            // EDICION
            if (nuevoAjuste.idAdjustment) {

                //Actualizar el ajuste principal
                await adjustmentService.editAdjustment(nuevoAjuste.idAdjustment, nuevoAjuste);
    
                //Detalles modificados y nuevos
                const newDetalles = nuevoAjuste.detalles;
                const editedDetails = nuevoAjuste.detallesModificados;
    
                // Actualizar detalles existentes
                for (const detalle of editedDetails) {
                    await adjustmentService.editDetailAdjustment(nuevoAjuste.idAdjustment, detalle.detail_id, detalle);
                }
    
                // Agregar nuevos detalles
                if (newDetalles?.length > 0) {
                    await addDetails(nuevoAjuste.idAdjustment, newDetalles);
                }
    
                loadAdjustments();
                
            } 
            else {
                //CREACIÓN
                const ajuste = await adjustmentService.addNewAdjustment(nuevoAjuste);
                const idNewAdjustment = ajuste[0].adjustmentID;
    
                await addDetails(idNewAdjustment, nuevoAjuste.detalles);
                
                loadAdjustments();
            }
        } catch (error) {
            console.error("Error guardando ajuste:", error);
        }
    };

    return (

        <div>
            <Header
                title="Ajustes de inventario"
                subtitle="Gestión los ajustes y movimientos de tu inventario."
            />
            <div className='container-fluid px-5 py-3'>
                <div className="row justify-content-end">
                    <div className="col-3 d-flex justify-content-end">
                        <button onClick={() => {
                            setSelectedAjuste(null); 
                            setShowModal(true);
                        }}>
                            <Plus className='me-2' size={20} />
                            Nuevo Ajuste
                        </button>
                    </div>
                    <div>
                        <AjustesModal
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            onSave={handleSave}
                            ajusteExistente={selectedAjuste}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 my-4">
                        <SmartTable
                            data={adjustments}
                            actions={[
                                {
                                    label: "Editar", 
                                    icon: "edit",
                                    handler: (item) => handleEdit(item),
                                },
                                {
                                    label: "Eliminar", 
                                    icon: "delete",
                                    handler: (item) => handleDelete(item),
                                },
                            ]}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdjustmentSection;