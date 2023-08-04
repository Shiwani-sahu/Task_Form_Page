import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LocalStoragePage = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('userData')) || [];
    setUserData(localData);
  }, []);

  const handleDelete = (id) => {
    // Show confirmation toast
    const confirmDeletion = window.confirm("Are you sure you want to delete this record?");
    if (confirmDeletion) {
      // Delete data from local storage and update the state
      console.log(id);
      const updatedLocalData = userData.filter((user) => user.id !== id);
      localStorage.setItem('userData', JSON.stringify(updatedLocalData));
      setUserData(updatedLocalData);

      // Show success notification
      toast.success('User deleted successfully!', { autoClose: 2000 });
    }
  };

  return (
    <div className="firebase-page">
      <h2 className="page-heading">Local storage Data</h2>
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
                <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
                <button onClick={() => {
                  navigate(`/edit/${user.id}`)
                }}>Edit</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default LocalStoragePage;
