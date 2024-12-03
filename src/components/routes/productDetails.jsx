import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails (){
  const { id: productId } = useParams();
  const navigate = useNavigate();

  // Programmatic navigation
  const handleSave = () => {
    // // Navigate to /products
    // this.props.history.push("/products")
    // navigate("/products"); // Si sólo se quiere realizar push al historial
    navigate("/products", { replace: true }); // Para reemplazar el historial
  };

  
    return (
      <div>
        <h1>Product Details - { productId }</h1>
        <button onClick={() => handleSave()}>Save</button>
      </div>
    );
  
}

export default ProductDetails;
