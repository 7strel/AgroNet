import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks/hooks";
import { addCartItem } from "../../redux/slices/cartSlice";
import { addWishlistItem } from "../../redux/slices/wishlistSlice";
import PaymentCard from "./PaymentCard";

// interface ProductProps {
//   title: string;
//   //author: string;
//   originalPrice: number;
//   discountedPrice: number;
//   stock: number;
//   imageUrl: string;
// }

// export interface Product {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   stock: number;
//   images: string;
//   category: number[];
// }

const ProductDetails: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [cartAdded, setCartAdded] = useState(false);
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>(); 
  // const navigate = useNavigate();

  const product = useAppSelector((state) => state.products.selectedProduct)

  if (!product) return <p>No product selected.</p>

  const handleAddToCart = () => {
    dispatch(addCartItem({ product, quantity }));
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000); // Reset after 2 seconds
  };

  const handleAddToWishlist = () => {
    // Dispatch wishlist logic 
    dispatch(addWishlistItem({ product}));
    setWishlistAdded(true);
    setTimeout(() => setWishlistAdded(false), 2000); // Reset after 2 seconds
  };

  // const handleAddToCart = () => {
  //   dispatch(addCartItem({ product, quantity }));
  // };

const totalOriginalPrice = product.price * 1.2 * quantity;
const totalDiscountedPrice = product.price * quantity;


  return (
    <>
    <div className="flex flex-col md:flex-row bg-white p-6 shadow-lg rounded-lg">
      <div className="md:w-1/3">
        <img src={product.images} alt={product.name} width={300} height={400} className="rounded" />
      </div>
      <div className="md:w-2/3 p-6">
        <h2 className="text-2xl font-bold text-black">{product.name}</h2>
        {/* <p className="text-gray-600">{author}</p> */}
        <div className="flex items-center mt-2">
          <span className="text-gray-400 line-through text-lg">ZMW {totalOriginalPrice.toFixed(2)}</span>
          <span className="text-red-600 text-2xl font-bold ml-2">ZMW {totalDiscountedPrice.toFixed(2)}</span>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500">{product.stock} item{product.stock > 1 ? "s" : ""} left</p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{ width: `${Math.min(product.stock, 100)}%` }}
            ></div>
          </div>
        </div>
        <p className="mt-4 text-gray-700">Alice and Her Purple Diary is an American classic romance story series...</p>
        <div className="mt-4 flex items-center">
          <button
            className="px-3 py-1 border rounded-l bg-gray-200 cursor-pointer"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="w-12 text-center border text-black"
          />
          <button
            className="px-3 py-1 border rounded-r bg-gray-200 cursor-pointer"
            onClick={() => setQuantity(Math.min(5, quantity + 1))}
          >
            +
          </button>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer" onClick={() => setShowPaymentModal(true)}>Buy Now</button>
          <button className="border px-4 py-2 rounded text-black cursor-pointer" onClick={handleAddToCart}>{cartAdded ? "✓ Added to Cart" : "Add to Cart"}</button>
          <button className="border px-4 py-2 rounded text-black cursor-pointer" onClick={handleAddToWishlist}>{wishlistAdded ? "✓ Added to Wishlist" : "Add to Wishlist"}</button>
        </div>
      </div>
    </div>

      {/* Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-2 right-2 text-black bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition cursor-pointer"
            >
              ✕
            </button>
            <PaymentCard totalPrice={totalDiscountedPrice}/>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
