import React from "react";
import { TextField, Avatar } from "@mui/material";
import { CheckCircle, Person } from "@mui/icons-material";

const EditProfile: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      
      <div className="flex justify-end">
        <Avatar className="w-8 h-8 bg-gray-600">
          <Person className="text-teal-600 text-sm" />
        </Avatar>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <TextField label="First Name" fullWidth />
        <TextField label="Last Name"  fullWidth />
      </div>
      
      <div className="mt-4 relative">
        <TextField label="Email"  fullWidth />
        <CheckCircle className="absolute right-2 top-10 text-teal-600" />
      </div>
    
      
      {/* <div className="mt-4">
        <TextField label="Contact Number"  fullWidth />
      </div> */}
      
      
      <div className="mt-4 relative">
        <TextField label="Password" type="password" fullWidth />
        <CheckCircle className="absolute right-2 top-10 text-teal-600" />
      </div>
      
      <div className="flex justify-between mt-6">
            <button
              className="mt-2 bg-black text-white px-12 py-2 rounded-lg cursor-pointer ml-4"
          
            >Cancel</button>
            <button
              className="mt-2 bg-black text-white px-12 py-2 rounded-lg cursor-pointer ml-4"
          
            >Save</button>
      </div>
    </div>
  );
};

export default EditProfile;
