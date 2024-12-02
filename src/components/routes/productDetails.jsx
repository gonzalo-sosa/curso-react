import React, { Component } from "react";
import { useParams } from "react-router-dom";

function ProductDetails (){
  const { id: productId } = useParams();
  
  const handleSave = () => {
    // Navigate to /products
  };

  
    return (
      <div>
        <h1>Product Details - { productId }</h1>
        <button onClick={() => handleSave()}>Save</button>
      </div>
    );
  
}

export default ProductDetails;
