import React from "react";
import { Plus } from "lucide-react";
import { useDispatch} from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { addSavecourseItem } from "../../../redux/slices/saveCourseSlice";

interface TutorCardProps {
  name: string;
  role: string;
  imageUrl: string;
  course: any;
}



const TutorCard: React.FC<TutorCardProps> = ({ name, role, imageUrl, course }) => {

  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCourse = () => {
    dispatch(addSavecourseItem({course}));
    console.log("gooo on!");
  }

  return (
    <div className="flex mt-4 mb-4 max-w-2xl items-center p-4 bg-white shadow-md rounded-lg">
      <img
        src={imageUrl}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
      <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer" onClick={handleAddToCourse}>
        <p>Save Course</p>
        <Plus className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default TutorCard;
