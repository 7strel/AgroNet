import { useState } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../../redux/store";
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { setSelectedProduct } from "../../redux/slices/productsSlice";
import { Product } from "../../redux/slices/productsSlice";
import { addCartItem } from "../../redux/slices/cartSlice";
import { addWishlistItem } from "../../redux/slices/wishlistSlice";


// // Define Product type
// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   stock: number;
//   price: number;
//   images: string;
//   category: number[]
// }

interface ProductCardProps extends Product {

}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, stock, price, images, category }) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
    const [cartAdded, setCartAdded] = useState(false);
  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate();

  // let heartClass = 


  const product = { id, name, description, stock, price, images, category };


  const handleViewDetails = () => {
    dispatch(setSelectedProduct(product))
    navigate(`/product/${id}`)
  }

  // const addToWishlist =  () => {
  //   if(redColor === false){
  //     setWishClassName("absolute top-2 right-2 text-red-500 cursor-pointer");
  //     setRedColor(true);
    
  //   }else{
  //     setWishClassName("absolute top-2 right-2 text-gray-500 cursor-pointer");
  //     setRedColor(false);
      
  //   }
  // }
  const addToWishlist = () => {
    setIsWishlisted(prev => !prev);
    dispatch(addWishlistItem({ product}));
  };

const handleAddToCart = () => {
    dispatch(addCartItem({ product, quantity }));
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
};

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg w-80">
      <div className="relative">
        <img src={images} alt={name} className="w-full h-40 object-cover rounded-lg cursor-pointer" onClick={handleViewDetails}/>
        <Heart onClick={addToWishlist} className={`absolute top-2 right-2 cursor-pointer ${isWishlisted ? "text-red-500" : "text-gray-500"}`}  />
      </div>
      <h3 className="font-bold text-lg text-black mt-2">{name}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xl font-semibold text-black">ZMW{price}</span>
        <div className="flex items-center space-x-2">
          <button 
            className="p-1 rounded-full bg-gray-200" 
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
          >
            <Minus size={16} className="cursor-pointer"/>
          </button>
          <span className="text-lg font-semibold text-black">{quantity}</span>
          <button 
            className="p-1 rounded-full bg-gray-200" 
            onClick={() => setQuantity(q => q + 1)}
          >
            <Plus size={16} className="cursor-pointer"/>
          </button>
        </div>
      </div>
      <button onClick={handleViewDetails} className="w-full mt-3 py-2 bg-gray-100 rounded-lg text-gray-700 font-semibold cursor-pointer">
        
          More details
      
      </button>
      <button onClick={handleAddToCart} className="w-full mt-2 py-2 flex items-center justify-center bg-teal-600 text-white rounded-lg font-semibold cursor-pointer">
        <ShoppingCart size={20} className="mr-2" /> {cartAdded ? "✓ Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
