'use client';

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { selectProductsList, selectProductsLoading, selectProductsError } from "../../redux/selectors/productsSelectors"; 
import ProductCard from "./Product";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from 'react-redux'
import { selectSelectedCategoryId  } from "../../redux/slices/selectedCategorySlice";


const ProductList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); 
    const products = useSelector(selectProductsList); // Get products from Redux state
    const selectedCategoryId = useSelector(selectSelectedCategoryId);
    const isLoading = useSelector(selectProductsLoading); // Check if loading
    const error = useSelector(selectProductsError); // Check for errors


        // **Fetch products when component mounts**
    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);

    console.log(products);

    if (isLoading) {
        return <p className="text-center text-white-500">Loading products...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

  // Filter products by selected category
  // Filter products by category ID
  const filteredProducts = selectedCategoryId
    ? products.filter(product => product.category[0] === selectedCategoryId)
    : products;

  console.log(filteredProducts)

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredProducts.map((product) => (
            <ProductCard
                  key={product.id}
                  id={product.id} // Use a unique ID if available
                  name={product.name}
                  description={product.description}
                  stock={product.stock}
                  price={product.price}
                  images={product.images}
                  category={product.category}
            />
        ))}
      </div>
    );
};

export default ProductList;

  