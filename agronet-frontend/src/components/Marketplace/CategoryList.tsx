import React, {useEffect} from "react";
import { ChevronRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategoriesList, selectCategoriesLoading, selectCategoriesError } from "../../redux/selectors/categorySelector";
import { AppDispatch } from "../../redux/store";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { setSelectedCategory, selectSelectedCategoryId } from "../../redux/slices/selectedCategorySlice";

// const categories = [
//   "Fresh Produce",
//   "Grains & Cereals",
//   "Dairy Products",
//   "Livestock & Poultry",
//   "Seed & Saplings",
//   "Fertilizers & Pesticides",
//   "Farming Equipment",
//   "Organic Products",
//   "Irrigation Systems" // Note: "Varius" might be a typo of "Various"
// ];

const CategoriesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategoriesList);
  // const selectedCategory = useSelector(selectSelectedCategory);
  const selectedCategoryId = useSelector(selectSelectedCategoryId);
  const isLoading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);

  useEffect(()=>{
    dispatch(fetchCategories())
  },[dispatch]);

  console.log(categories);

  if(isLoading){
    <p className="text-center text-white-500">Categories Loading...</p>
  }

  if(error){
    <p className="text-center text-red-500">Error: {error}</p>
  }

  const handleCategoryClick = (categoryId: number) => {
    dispatch(setSelectedCategory(categoryId)); // Store category ID instead of name
    console.log(categoryId);
    selectedCategoryId === categoryId;
  };


  return (
    <div className="border rounded-lg w-64 bg-gray shadow-sm">
      <h2 className="text-lg font-semibold p-3 border-b">Categories</h2>
      <ul>
          <li
            className="flex justify-between items-center p-3 border-b last:border-none hover:bg-teal-600 cursor-pointer"
            onClick={() => handleCategoryClick(0)}
          >
            <span>All</span>
            <ChevronRight size={18} />
          </li>
        {categories.map((category, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-3 border-b last:border-none hover:bg-teal-600 cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            <span>{category.title}</span>
            <ChevronRight size={18} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
