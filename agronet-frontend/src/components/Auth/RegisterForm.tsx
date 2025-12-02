import React,{SyntheticEvent, useState} from "react";
import { NavLink, Navigate } from "react-router";
import axios from "axios";


const SignUpForm: React.FC = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e:SyntheticEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/v1/register/', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirm: passwordConfirm
    }
  )
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/signin" />;
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
              <NavLink to="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
                <img src="/images/commodity-white.png" width={80} height={80} alt="Logo" />
              </NavLink>
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-2xl shadow-lg mt-4">
        <h2 className="text-2xl font-bold text-center text-white">Start for free</h2>
        <div className="space-y-4">
          <form onSubmit={submit} className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={e => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={e => setLastName(e.target.value)} 
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={e => setPassword(e.target.value)} 
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={e => setPasswordConfirm(e.target.value)} 
            />
            <button className="w-full p-3 font-bold text-gray-900 bg-white rounded-lg hover:bg-gray-200 cursor-pointer">
              Sign up
            </button>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-3 text-gray-400">or continue with</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
            <button className="flex items-center justify-center w-full p-3 space-x-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer">
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
              <span>Sign up</span>
            </button>
            <button className="flex items-center justify-center w-full p-3 space-x-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/600px-2023_Facebook_icon.svg.png?20231011122028" alt="Facebook" className="w-5 h-5" />
              <span>Sign up</span>
            </button>
          </form>
        </div>
        <p className="mt-4 text-xs text-center text-gray-400">
          By signing up, you agree to our <a href="#" className="text-white hover:underline">Terms</a>, <a href="#" className="text-white hover:underline">Data Policy</a>, and <a href="#" className="text-white hover:underline">Cookies</a> Policy.
        </p>
        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account? <NavLink to="/signin">Log in</NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
