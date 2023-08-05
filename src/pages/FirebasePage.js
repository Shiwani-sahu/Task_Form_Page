import React, { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FirebasePage = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

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
      // Show confirmation toast
      const confirmDeletion = window.confirm("Are you sure you want to delete this record?");
      if (confirmDeletion) {
        // Remove the user data from Firebase by ID
        await database.ref('users').child(id).remove();
        // Update the state to remove the deleted user
        setUserData((prevUserData) => prevUserData.filter((user) => user.id !== id));

        // Show success notification
        toast.success('User deleted successfully!', { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error deleting user from Firebase:', error);

      // Show error notification
      toast.error('Failed to delete user!', { autoClose: 2000 });
    }
  };

  return (
    <div className="firebase-page">
      <h2 className="page-heading">Firebase Data</h2>
      <ul className="profile-cards">
        {userData.map((user) => (
          <li key={user.id} className="profile-card">
            {user.profilePicture && (
              <div className="profile-picture-container">
                <img src={user.profilePicture} alt="Profile" className="profile-picture" />
              </div>
            )}
            <div className="user-details">
              <strong>Name:</strong> {user.name}<br />
              <strong>Phone Number:</strong> {user.phoneNumber}<br />
              <strong>Date of Birth:</strong> {user.dob}<br />
              <strong>Email:</strong> {user.email}<br />
               <div className="action-buttons">
                <button className="edit-btn" onClick={() => {
                navigate(`/edit/${user.id}`)
                }
                }>Edit </button>
                <button className="delete-button" onClick={() => handleDelete(user.id) }>Delete</button>

              </div>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default FirebasePage;
