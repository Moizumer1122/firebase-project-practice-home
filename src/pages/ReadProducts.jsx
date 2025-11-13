// import React, { useState, useEffect } from 'react';
// import { collection, getDocs } from "firebase/firestore";
// import { firestore } from '../config/firebase';

// export default function ReadProducts() {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Fetch documents from Firestore
//     const fetchDocuments = async () => {
//         try {
//             const usersArray = [];
//             const querySnapshot = await getDocs(collection(firestore, "users"));
//             querySnapshot.forEach((doc) => {
//                 let data = doc.data();
//                 data.id = doc.id; // Include the document ID
//                 usersArray.push(data);
//             });
//             setUsers(usersArray);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchDocuments();
//     }, []);

//     return (
//         <main>
//             <div className="py-5 w-100">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col">
//                             <h1 className="text-white text-center">Users</h1>
//                             <hr />
//                             {loading ? (
//                                 <div className="text-center">
//                                     <div className="spinner-border text-white"></div>
//                                 </div>
//                             ) : users.length > 0 ? (
//                                 <div className="table-responsive">
//                      <table className="table table-light table-striped">
//     <thead>
//         <tr>
//             <th scope="col">#</th>
//             <th scope="col">Name</th>
//             <th scope="col">Country</th>
//             <th scope="col">Age</th>
//         </tr>
//     </thead>
//     <tbody>
//         {users.map((user, i) => (
//             <tr key={user.id}>
//                 <th scope="row">{i + 1}</th>
//                 <td>{user.name}</td>
//                 <td>{user.country}</td>
//                 <td>{user.age}</td>
//             </tr>
//         ))}
//     </tbody>
// </table>

//                                 </div>
//                             ) : (
//                                 <p className="text-white text-center">No users found.</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// }

import React from 'react'
import { useEffect,useState } from 'react'
import { firestore } from '../config/firebase'
import { collection, getDocs,setDoc,doc,deleteDoc } from "firebase/firestore"
const ReadProducts = () => {
    const [user,setUser]=useState([]);
    const fetchDocuments=async () => {
        let array= []
        const querySnapshot = await getDocs(collection(firestore, "users"));
querySnapshot.forEach((doc) => {
    let data =doc.data();
    data.id = doc.id;
    array.push(data);
    setUser(array)
  // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
});
// video at 52:57
    }
    useEffect(() => {
    fetchDocuments()
    }, [])
    
    //delete 
    const handleDelete=async(user)=>{
        await deleteDoc(doc(firestore, "users",user.id));
        console.log(user.id);
        
        console.log("deleted");   
    }
    //update
        const handleUpdate=async(user)=>{
            
            
            
            await setDoc(doc(firestore, "users", user.id), {
                name: "moiz umer merge used",
                age: 20,
                country: "USA"
            },{ merge: true });
            console.log("updated");
            
    }
  return (
      <>
      {user.length>0 ?
  
  (
    <table>
        <thead>
            <tr>

<th>id</th>
<th>name</th>
<th>age</th>
<th>counthy</th>
 </tr>
 </thead>  
 <tbody>{
    user.map((user,i)=>{
return<tr key={i}>
<th>{i+1}</th>
<td>{user.name}</td>
<td>{user.age}</td>
<td>{user.country}</td>
<td>
      <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 active:bg-blue-700 transition" onClick={()=>handleUpdate(user)}>
    Update
  </button>
  <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 active:bg-red-700 transition" onClick={()=>handleDelete(user)}>
    Delete
  </button>
</td>

</tr>

    })
}</tbody>
    </table>
  ):(
<div className="flex items-center justify-center h-screen bg-white">
  <p className="text-gray-700 text-2xl font-semibold animate-pulse">
    Loading your data...
  </p>
</div>

  )
  
  
  
  
  
  
  
}
    
    
  
    
    
    </>
  )
}

export default ReadProducts

//  my question from hasnat bhai is that agr hm na user map mein pass krdea ha to hm usa dobara ku pass kr rhe ha 