

import React, { useState } from "react";
import { Package, DollarSign, BarChart2, Barcode, Trash2 } from "lucide-react";

const ProductList = ({ products, onSelectProduct,changeStatusProduct}) => {
  const [currentPage, setCurrentPage] = useState(1); 
  const productsPerPage = 12; 

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="w-100">
      <div className="row w-100 justify-content-start">
        {currentProducts.map((product, index) => (
          <div key={product.id_producto || index} className="col-12 col-sm-6 col-md-4 col-lg-3 my-3">
            
            <div className="card product-card position-relative">
              {/* Botón de eliminación */}
              <button
                className="btn btn-link position-absolute top-0 end-0 p-3 text-danger"
                onClick={() => changeStatusProduct(product)}
              >
                <Trash2 size={23} /> {/* Ícono de eliminación */}
              </button>

              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center rounded-circle product-icon mb-3">
                  <Package size={24} />
                </div>
                <h5 className="card-title mb-3">{product.nombre_producto}</h5>
                <div className="mb-3 flex-grow-1">
                  <div className="d-flex align-items-center mb-2">
                    <DollarSign size={18} className="text-muted me-2" />
                    <span className="fw-bold">Price:</span>
                    <span className="ms-auto">${parseFloat(product.precio_venta).toFixed(2)}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <BarChart2 size={18} className="text-muted me-2" />
                    <span className="fw-bold">Stock:</span>
                    <span className="ms-auto">{product.stock_minimo}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Barcode size={18} className="text-muted me-2" />
                    <span className="fw-bold">SKU:</span>
                    <span className="ms-auto">{product.sku}</span>
                  </div>
                </div>
                <button
                  onClick={() => onSelectProduct(product)}
                  className="btn btn-danger text-white w-100"
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                <button className="page-link">{index + 1}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductList;
