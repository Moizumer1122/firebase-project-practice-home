import React, { useState } from 'react';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth,firestore } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
// import reactLogo from './assets/react.svg'
import "../../src/App.css"
import { useNavigate } from 'react-router-dom';

const initalData ={email:"",password:""}

function Register() {
   const navigate = useNavigate();
const [state,setState]=useState(initalData);

const handleChange=(e)=>{
setState({...state,[e.target.name]:e.target.value})
}
const handleSubmit =  (e)=>{
  e.preventDefault();
  console.log(state);

createUserWithEmailAndPassword(auth, state.email, state.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    //..
   setDoc(doc(firestore, "users", user.uid), {
        email: state.email,
        uid: user.uid,
      });
      
      
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}
const handleLogin=()=>{
    navigate('/login')
}

  return (

 
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
            
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none" onClick={handleLogin}
          >
            Register user
          </button>
          Have an account ?
           <span className="text-indigo-600 cursor-pointer hover:underline"  onClick={handleLogin}  > Log in</span>
        </form>
      </div> 
     </div> 
  
  )
}

export default Register