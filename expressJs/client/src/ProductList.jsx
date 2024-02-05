import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("/products");
    setProducts(res.data);
  };

  const handleClick = async (id) => {
    const res = await axios.delete(`/products/${id}`);
    console.log(res.data);
    if (res.data._id) {
      products.filter((p) => p._id !== res.data._id);
    }
  };

  useEffect(() => {
    getProducts();
  });

  return (
    <>
      {products.map((product, index) => (
        <Product {...product} key={index} handleClick={handleClick}></Product>
      ))}
    </>
  );
};

export default ProductList;
