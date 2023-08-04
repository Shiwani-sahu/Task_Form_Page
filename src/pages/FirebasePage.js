// // FirebasePage.js

// import React, { useState, useEffect } from 'react';
// import { database } from '../firebaseConfig';

// const FirebasePage = () => {
//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     // Fetch data from Firebase on component mount
//     const fetchData = async () => {
//       try {
//         const response = await database.ref('users').once('value');
//         const data = response.val();
//         if (data) {
//           // Convert the data object into an array of users
//           const usersArray = Object.keys(data).map((key) => ({
//             id: key,
//             ...data[key],
//           }));
//           setUserData(usersArray);
//         }
//       } catch (error) {
//         console.error('Error fetching data from Firebase:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="firebase-page">
//       <h2>Firebase Data</h2>
//       <ul>
//         {userData.map((user) => (
//           <div key={user.id} className="user-card">
//             <strong>Name:</strong> {user.name}<br />
//             <strong>Phone Number:</strong> {user.phoneNumber}<br />
//             <strong>Date of Birth:</strong> {user.dob}<br />
//             <strong>Email:</strong> {user.email}<br />
//             {user.profilePicture && (
//               <div>
//                 <strong>Profile Picture:</strong><br />
//                 <img src={user.profilePicture} alt="Profile" width="150" className="profile-picture"/>
//               </div>
//             )}
            
//           </div>
          
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FirebasePage;
 
import React, { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { Link } from 'react-router-dom';

const FirebasePage = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase on component mount
    const fetchData = async () => {
      try {
        const response = await database.ref('users').once('value');
        const data = response.val();
        if (data) {
          // Convert the data object into an array of users
          const usersArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setUserData(usersArray);
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Remove the user data from Firebase by ID
       if (window.confirm("Are you sure wanted to delete this record?")) 
      await database.ref('users').child(id).remove();
      // Update the state to remove the deleted user
      setUserData((prevUserData) => prevUserData.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user from Firebase:', error);
    }
  };

  return (
    <div className="firebase-page">
      <h2>Firebase Data</h2>
      <ul>
        {userData.map((user) => (
          <div key={user.id} className="user-card">
            <strong>Name:</strong> {user.name}<br />
            <strong>Phone Number:</strong> {user.phoneNumber}<br />
            <strong>Date of Birth:</strong> {user.dob}<br />
            <strong>Email:</strong> {user.email}<br />
            {user.profilePicture && (
              <div>
                <strong>Profile Picture:</strong><br />
                <img src={user.profilePicture} alt="Profile" width="150" className="profile-picture"/>
              </div>
            )}
            <div>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
              <Link to={`/edit/${user.id}`}>Edit</Link>
              
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FirebasePage;
