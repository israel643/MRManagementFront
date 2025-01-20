import React, { useState, useEffect } from 'react';
import { Package, ChevronLeft, Search, Barcode, Plus } from 'lucide-react';
import ProductList from './ProductsList';
import ProductModal from './ProductsModal';
import '../../assets/css/products/ProductsSection.css';
import Header from "../../components/Header/header";
import CategoryFilter from './CategoryFilter';
//SERVICIOS
import { productService } from '../../services/ProductsService';
import { categoriesService } from '../../services/CategoriesService';

const ProductSection = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // Estado para las categorías
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Carga de categorías desde la API
    async function loadCategories() {
        try {
            const categoriesData = await categoriesService.getAllCategories();
            setCategories(['All', ...categoriesData]); // Guardamos el array completo con id_categoria y nombre_categoria
        } catch (err) {
            console.error("Error al cargar categorías:", err);
        }
    }
    

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                setLoading(true);
                const data = await productService.getAllProductos();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        cargarProductos();
        loadCategories();
    }, []);

    //Filtro de productos por categoría y búsqueda
    const filteredProducts = products.filter(product => {
        console.log(selectedCategory)
        if (selectedCategory === 'All') return true; // Mostrar todos si está seleccionado "All"
        const selectedCategoryObj = categories.find(cat => cat.nombre_categoria === selectedCategory); // Buscar por nombre
        return selectedCategoryObj && product.categoria === selectedCategoryObj.id_categoria; // Comparar por ID
    });

    const handleSave = async (product) => {
        console.log(product);
        try {
            setLoading(true);
            const data = product.id
                ? await productService.updateProduct(product.id, product) // Actualizar producto
                : await productService.createProduct(product); // Crear producto nuevo

            console.log(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setIsModalOpen(false);
            setSelectedProduct(null);
        }
    };


    const handleCreate = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const changeStatus = (product) => {
        const status = false; //product.activo;

        console.log(`Producto ${status ? 'Borrado' : 'Activado'}: `, product)
    }

    const handleScan = () => {
        setIsScanning(true);
        // Simulamos un escaneo después de 3 segundos
        setTimeout(() => {
            setSearchTerm('345678'); // Simulamos que se escaneó el código de barras de Product C
            setIsScanning(false);
        }, 3000);
    };

    return (

        <div>
            <Header
                title="Productos"
                subtitle="Gestión de Productos y revisión de existencia."
            />

            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex">
                            <div className="position-relative me-2">
                                <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="form-control ps-5"
                                />
                            </div>
                            <button className="btn btn-outline-secondary me-2" onClick={handleScan}>
                                <Barcode size={20} />
                            </button>
                            <button className="btn btn-danger text-white" onClick={handleCreate}>
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-center">
                            {isScanning ? (
                                <div className="barcode-scanner my-2">
                                    <p>Scanning... (simulated)</p>
                                </div>
                            ) : (
                                <ProductList
                                    products={filteredProducts}
                                    onSelectProduct={handleEdit}
                                    changeStatusProduct={changeStatus}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <ProductModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedProduct(null);
                    }}
                    onSave={handleSave}
                    categories={categories.filter(cat => cat !== 'All')}
                />
            </div>
        </div>
    );
};

export default ProductSection;