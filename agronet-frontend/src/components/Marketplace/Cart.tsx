// import React, {useEffect, useState} from "react";
// import { Card } from "@mui/material";
// import { Trash, ChevronDown, Minus, Plus } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/store";
// import { fetchCart, deleteCartItem } from "../../redux/slices/cartSlice";
// // import products from "../../Dummy-data/productdata";
// import { selectCartItems, selectCartLoading, selectCartError } from "../../redux/selectors/cartSelector";
// import { calculateTotal } from "../../redux/slices/cartSlice";


// export let cartTotal = 0; 



// const ShoppingCart: React.FC = () => {
//   const [quantity, setQuantity] = useState(1);
//   const dispatch = useDispatch<AppDispatch>();
//   const products = useSelector(selectCartItems);
//   const isLoading = useSelector(selectCartLoading);
//   const error = useSelector(selectCartError);


//   useEffect(()=>{
//     dispatch(fetchCart());
//   },[dispatch])

//   console.log(products);

//   if (isLoading) {
//       return <p className="text-center text-white-500">Loading products...</p>;
//   }

//   if (error) {
//       return <p className="text-center text-red-500">Error: {error}</p>;
//   }

//   cartTotal = calculateTotal(products);

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h2 className="text-lg font-semibold mb-2">Shopping cart</h2>
//       <p className="text-gray-500 mb-4">You have {products.length} items in your cart</p>
//       <div className="space-y-4">
//         {products.map((item) => (
//           <Card  className="flex items-center p-4 rounded-lg shadow-md border">
//             <img
//               src={item.item.images}
//               alt={item.item.name}
//               className="w-16 h-16 rounded-md object-cover mr-4"
//             />
//             <div className="flex-1">
//               <h3 className="font-semibold">{item.item.name}</h3>
//               <p className="text-sm text-gray-500">{item.item.description}</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               {/* <span className="flex items-center border px-2 py-1 rounded-md">
//                 1 <ChevronDown size={16} className="ml-1" />
//               </span> */}
//                 <button 
//                   className="p-1 rounded-full bg-gray-200" 
//                   onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                 >
//                   <Minus size={16} className="cursor-pointer"/>
//                 </button>
//                 <span className="text-lg font-semibold text-black">{quantity}</span>
//                 <button 
//                   className="p-1 rounded-full bg-gray-200" 
//                   onClick={() => setQuantity(q => q + 1)}
//                 >
//                   <Plus size={16} className="cursor-pointer"/>
//                 </button>
//               <span className="font-semibold">ZMW{item.item.price}</span>
//               <button className="text-red-500 hover:text-red-700 cursor-pointer"
//                 onClick={() => dispatch(deleteCartItem(item.id))}
//               >
//                 <Trash size={20} />
//               </button>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShoppingCart;



import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { Trash, ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchCart, deleteCartItem } from "../../redux/slices/cartSlice";
import {
  selectCartItems,
  selectCartLoading,
  selectCartError,
} from "../../redux/selectors/cartSelector";
import { calculateTotal } from "../../redux/slices/cartSlice";

export let cartTotal = 0;
export let order_items: { product: number; quantity: number; price: number }[] = [];
    

const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectCartItems);
  const isLoading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);

  // Local quantity state
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    const initialQuantities: { [key: string]: number } = {};
    products.forEach((item) => {
      initialQuantities[item.id] = quantities[item.id] || 1;
    });
    setQuantities(initialQuantities);
  }, [products]);

  const increment = (id: number) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrement = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 1),
    }));
  };

  if (isLoading) {
    return <p className="text-center text-white-500">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  cartTotal = calculateTotal(products);
  order_items = products.map((item) => ({
    product: item.item.id,
    quantity: quantities[item.id] || 1,
    price: item.item.price * (quantities[item.id] || 1),
  }));


  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-2">Shopping cart</h2>
      <p className="text-gray-500 mb-4">
        You have {products.length} items in your cart
      </p>
      <div className="space-y-4">
        {products.map((item) => (
          <Card
            key={item.id}
            className="flex items-center p-4 rounded-lg shadow-md border"
          >
            <img
              src={item.item.images}
              alt={item.item.name}
              className="w-16 h-16 rounded-md object-cover mr-4"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.item.name}</h3>
              <p className="text-sm text-gray-500">{item.item.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Quantity Control */}
              <div className="flex items-center border px-2 py-1 rounded-md space-x-2">
                <button
                  onClick={() => decrement(item.id)}
                  className="px-2 text-lg font-bold cursor-pointer"
                >
                  −
                </button>
                <span className="flex items-center">
                  {quantities[item.id] || 1}
                  <ChevronDown size={16} className="ml-1" />
                </span>
                <button
                  onClick={() => increment(item.id)}
                  className="px-2 text-lg font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <span className="font-semibold">
                ZMW{item.item.price * (quantities[item.id] || 1)}
              </span>

              <button
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() => dispatch(deleteCartItem(item.id))}
              >
                <Trash size={20} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
