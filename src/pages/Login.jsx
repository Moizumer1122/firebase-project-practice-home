import React, { useState,useEffect } from 'react';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut,updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "../config/firebase";
// import reactLogo from './assets/react.svg'
import "../../src/App.css"
import { useNavigate } from 'react-router-dom';
import Register from './Register';

const initalData ={email:"",password:""}

function Login() {
  const navigate = useNavigate();
  const [user,setUser]=useState({})
const [state,setState]=useState(initalData);
useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // const uid = user.uid;

    setUser(user)
    // ...
  } else {
   setUser(null)
    // User is signed out
    // ...
  }
});
},[])


const handleChange=(e)=>{
setState({...state,[e.target.name]:e.target.value})
}
const handleSubmit =(e)=>{
  e.preventDefault();
  console.log(state);

signInWithEmailAndPassword(auth, state.email, state.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
  // ✅ Show current user

const handleRegister=()=>{  
    navigate('/register')
}
    const handleLogout = async () => {
    
    signOut(auth)
    .then(()=>{
      console.log("logged out successfully");
    })
.catch((error)=>{
  console.log(error);
  
})
  }

  const handleShowUser = () => {

const user = auth.currentUser
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;

  
}

     else {
      console.log("⚠️ No user is signed in.");
    }
  }

const handleUpdateProfile = async () => {
  const user = auth.currentUser;

  if (!user) {
    console.log("⚠️ No user signed in.");
    return;
  }

  try {
    await updateProfile(user, {
      displayName:"david"
     
    });
    console.log("✅ Profile updated successfully!");
    // Update local state so UI reflects the change
    setUser({ ...user, displayName: "david" });
  } catch (error) {
    console.log("❌ Error updating profile:", error.message);
  }
};

console.log(user);
const handleEmailSent =()=>{
  if(user){

    
sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    // ...
      console.log("email sent")
  }); 
  }
;
  
}


  return (
<div className="min-h-screen flex justify-center items-center bg-gray-50">
  {user ? (
    <div className="bg-white p-8 rounded-lg shadow-lg w-200">
      {/* <img src={user.photoURL} className=''/> */}
      <h2 className="text-3xl font-bold text-center mb-6 text-black-600">email:{user.email}</h2>
      <h2 className="text-3xl font-bold text-center mb-6 text-black-600">Uid:{user.uid}</h2>
          <button
      onClick={ handleLogout}
      className="w-full py-2 px-4 mt-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none transition duration-300"
    >
      Logout
    </button>
        <button
          onClick={handleShowUser}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Show Current User
        </button>

        <button
          onClick={handleUpdateProfile}
          className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Update Profile
        </button>
<button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition" onClick={handleEmailSent}>
  ✅ Email Sent
</button>

 </div>
  ) : (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
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
          className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none transition duration-300"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <span className="text-indigo-600 cursor-pointer hover:underline" onClick={handleRegister}>Sign up</span>
          </p>
        </div>
      </form>
    </div>
  )}
</div>

  )
}

export default Login
