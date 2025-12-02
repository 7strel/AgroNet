import React from "react";
import products from "../../Dummy-data/productdata";


const LatestProduct: React.FC = () => {
    return (
      <div className="max-w-md mx-auto bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Last Products</h2>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              className="flex bg-white rounded-lg shadow-md p-4 items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="ml-4">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default LatestProduct;