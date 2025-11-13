// // import React, { useState, useEffect } from 'react';
// // import { collection, getDocs } from "firebase/firestore";
// // import { firestore } from '../config/firebase';

// // export default function ReadProducts() {
// //     const [users, setUsers] = useState([]);
// //     const [loading, setLoading] = useState(true);

// //     // Fetch documents from Firestore
// //     const fetchDocuments = async () => {
// //         try {
// //             const usersArray = [];
// //             const querySnapshot = await getDocs(collection(firestore, "users"));
// //             querySnapshot.forEach((doc) => {
// //                 let data = doc.data();
// //                 data.id = doc.id; // Include the document ID
// //                 usersArray.push(data);
// //             });
// //             setUsers(usersArray);
// //         } catch (error) {
// //             console.error("Error fetching users:", error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchDocuments();
// //     }, []);

// //     return (
// //         <main>
// //             <div className="py-5 w-100">
// //                 <div className="container">
// //                     <div className="row">
// //                         <div className="col">
// //                             <h1 className="text-white text-center">Users</h1>
// //                             <hr />
// //                             {loading ? (
// //                                 <div className="text-center">
// //                                     <div className="spinner-border text-white"></div>
// //                                 </div>
// //                             ) : users.length > 0 ? (
// //                                 <div className="table-responsive">
// //                      <table className="table table-light table-striped">
// //     <thead>
// //         <tr>
// //             <th scope="col">#</th>
// //             <th scope="col">Name</th>
// //             <th scope="col">Country</th>
// //             <th scope="col">Age</th>
// //         </tr>
// //     </thead>
// //     <tbody>
// //         {users.map((user, i) => (
// //             <tr key={user.id}>
// //                 <th scope="row">{i + 1}</th>
// //                 <td>{user.name}</td>
// //                 <td>{user.country}</td>
// //                 <td>{user.age}</td>
// //             </tr>
// //         ))}
// //     </tbody>
// // </table>

// //                                 </div>
// //                             ) : (
// //                                 <p className="text-white text-center">No users found.</p>
// //                             )}
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </main>
// //     );
// // }

// import React from 'react'
// import { useEffect,useState } from 'react'
// import { firestore } from '../config/firebase'
// import { collection, getDocs,setDoc,doc,deleteDoc } from "firebase/firestore"
// const ReadProducts = () => {
//     const [users, setUsers] = useState([]); // rename state to "users" for clarity

//     const fetchDocuments = async () => {
//         let array = []
//         const querySnapshot = await getDocs(collection(firestore, "users"));
//         querySnapshot.forEach((doc) => {
//             let data = doc.data();
//             data.id = doc.id;
//             array.push(data);
//           });
//           setUsers(array)
//         }

//     useEffect(() => {
//         fetchDocuments()
//     }, [])

//     // delete
//     const handleDelete = async (user) => {
//         await deleteDoc(doc(firestore, "users", user.id));
//         // console.log(user.id);
//         console.log("deleted");
//         // let userDelete = users.filter((user)=>{
//         //    return user.id !== userDelete.id;
//         //   }
//           setUsers(users.filter(item=> item.id !== user.id ))
//           // setUsers(userDelete)

//     }

//     // update
//     const handleUpdate = async (user) => {

// let newData = {...user,country:'bangladesh'}

//         // update Firestore
//         await setDoc(doc(firestore, "users", user.id), newData, { merge: true });
//         console.log("updated");
// let newUser = users.map((u)=>{
// if (u.id===newData.id) {
//   return newData
// } else {
//   return user
// }
// })
// setUsers(newUser)
//     }


//   const openUpdateModal = (user) => {
//     setSelectedUser(user);
//     setShowModal(true);
//   };

//   return (
//       <>
//       {users.length>0 ?
  
//   (
//     <table>
//         <thead>
//             <tr>

// <th>id</th>
// <th>name</th>
// <th>age</th>
// <th>counthy</th>
//  </tr>
//  </thead>  
//  <tbody>{
//     users.map((user,i)=>{
// return<tr key={i}>
// <th>{i+1}</th>
// <td>{user.name}</td>
// <td>{user.age}</td>
// <td>{user.country}</td>
// <td>
//       <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 active:bg-blue-700 transition" onClick={()=>handleUpdate(user)}>
//     Update
//   </button>
//   <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 active:bg-red-700 transition" onClick={()=>handleDelete(user)}>
//     Delete
//   </button>
// </td>

// </tr>

//     })
// }</tbody>
//     </table>
//   ):(
// <div className="flex items-center justify-center h-screen bg-white">
//   <p className="text-gray-700 text-2xl font-semibold animate-pulse">
//     Loading your data...
//   </p>
// </div>

//   )
  
  
  
  
  
  
  
// }
    
    
  
    
    
//     </>
//   )
// }

// export default ReadProducts

// //  my question from hasnat bhai is that agr hm na user map mein pass krdea ha to hm usa dobara ku pass kr rhe ha 


import React, { useEffect, useState } from 'react';
import { firestore } from '../config/firebase';
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";

const ReadProducts = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // for modal
  const [showModal, setShowModal] = useState(false);

  const fetchDocuments = async () => {
    try {
      const array = [];
      const querySnapshot = await getDocs(collection(firestore, "users"));
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        array.push(data);
      });
      setUsers(array);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (user) => {
    await deleteDoc(doc(firestore, "users", user.id));
    setUsers(users.filter(item => item.id !== user.id));
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    await setDoc(doc(firestore, "users", selectedUser.id), selectedUser, { merge: true });

    setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
    setShowModal(false);
  };

  return (
    <div className="p-5">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-gray-700 animate-pulse">Loading your data...</div>
        </div>
      ) : users.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Country</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{i + 1}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.age}</td>
                <td className="border px-4 py-2">{user.country}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    onClick={() => openUpdateModal(user)}
                  >
                    Update
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-700">No users found.</p>
      )}

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 relative">
            <h2 className="text-xl font-bold mb-4">Update User</h2>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                className="border w-full p-2 rounded mt-1"
                value={selectedUser.name}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              />
            </label>
            <label className="block mb-2">
              Age:
              <input
                type="number"
                className="border w-full p-2 rounded mt-1"
                value={selectedUser.age}
                onChange={(e) => setSelectedUser({ ...selectedUser, age: e.target.value })}
              />
            </label>
            <label className="block mb-4">
              Country:
              <input
                type="text"
                className="border w-full p-2 rounded mt-1"
                value={selectedUser.country}
                onChange={(e) => setSelectedUser({ ...selectedUser, country: e.target.value })}
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadProducts;
