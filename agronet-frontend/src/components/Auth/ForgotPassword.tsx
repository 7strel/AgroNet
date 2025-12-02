import { useState } from "react";
import { X } from "lucide-react";
import { NavLink } from "react-router";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log("Password reset link sent to", email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 direction-vertical"> 
        <NavLink to="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
            <img src="/images/commodity-white.png" width={80} height={80} alt="Logo" />
        </NavLink>
    <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-2xl shadow-lg mt-4">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-96 text-white relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={20} className="cursor-pointer"/>
        </button>
        <h2 className="text-lg font-semibold mb-4">Password reset</h2>
        <p className="text-sm text-gray-400 mb-4">
          Enter the email address you used to sign up to AgroNet. We will send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-white hover:text-black text-white font-semibold py-3 rounded-md mt-4 cursor-pointer"
          >
            Send password reset email
          </button>
        </form>
        
      </div>
    </div>
    </div>
  );
};

export default PasswordReset;