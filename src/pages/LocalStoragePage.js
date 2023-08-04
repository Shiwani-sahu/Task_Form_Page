import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LocalStoragePage = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('userData')) || [];
    setUserData(localData);
  }, []);

  const handleDelete = (id) => {
    // Delete data from local storage and update the state
    console.log(id);
    const updatedLocalData = userData.filter((user) => user.id!== id);
    localStorage.setItem('userData', JSON.stringify(updatedLocalData));
    setUserData(updatedLocalData);
  };

  return (
    <div className="list-container">
      <h2>Local Storage Data</h2>
      <ul>
        {userData.map((user,i) => (
          <li key={i}>
            <strong>Name:</strong> {user.name}<br />
            <strong>Phone Number:</strong> {user.phoneNumber}<br />
            <strong>Date of Birth:</strong> {user.dob}<br />
            <strong>Email:</strong> {user.email}<br />
            {user.profilePicture && (
              <div>
                <strong>Profile Picture:</strong><br />
                <img src={user.profilePicture} alt="Profile" width="150" />
              </div>
            )}
            <div>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
              <Link to={`/edit/${user.id}`}>Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocalStoragePage;
