import React, {useEffect} from "react";
import { Card } from "@mui/material";
import { Trash, ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchWishlist} from "../../redux/slices/wishlistSlice";
// import products from "../../Dummy-data/productdata";
import { selectWishlistItems, selectWishlistLoading, selectWishlistError } from "../../redux/selectors/wishlistSelector";




const WishList: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectWishlistItems);
  const isLoading = useSelector(selectWishlistLoading);
  const error = useSelector(selectWishlistError);


  useEffect(()=>{
    dispatch(fetchWishlist());
  },[dispatch])

  console.log(products);

  if (isLoading) {
      return <p className="text-center text-white-500">Loading products...</p>;
  }

  if (error) {
      return <p className="text-center text-red-500">Error: {error}</p>;
  }


  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-2">WishList</h2>
      <p className="text-gray-500 mb-4">You have items in your wishlist</p>
      <div className="space-y-4">
        {products.map((item) => (
          <Card  className="flex items-center p-4 rounded-lg shadow-md border">
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
              <span className="flex items-center border px-2 py-1 rounded-md">
                1 <ChevronDown size={16} className="ml-1" />
              </span>
              <span className="font-semibold">${item.item.price}</span>
              <button className="text-red-500 hover:text-red-700 cursor-pointer"
                // onClick={() => dispatch(deleteCartItem(item.id))}
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

export default WishList;
