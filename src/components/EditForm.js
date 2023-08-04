import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../firebaseConfig';

const EditForm = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data for the specific user from local storage or database
    // Here, we'll first check local storage and then Firebase
    const localData = JSON.parse(localStorage.getItem('userData')) || [];
    const userToEditLocal = localData.find((user) => user.id === id);
    if (userToEditLocal) {
      setUser(userToEditLocal);
    } else {
      // Fetch user data from Firebase if not found in local storage
      const fetchUser = async () => {
        try {
          const snapshot = await database.ref(`users/${id}`).once('value');
          const userData = snapshot.val();
          if (userData) {
            setUser(userData);
          }
        } catch (error) {
          console.error('Error fetching user data from Firebase:', error);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleChange = (fieldName, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: value,
    }));
  };

  const handleSave = () => {
    // Update data for the specific user in local storage or Firebase
    // Here, we'll check if the user exists in local storage and then update accordingly
    const localData = JSON.parse(localStorage.getItem('userData')) || [];
    const updatedLocalData = localData.map((userData) =>
      userData.id === user.id ? user : userData
    );
    localStorage.setItem('userData', JSON.stringify(updatedLocalData));

    // Update data in Firebase
    database.ref(`users/${id}`).update(user);
    console.log('Updated user:', user);

    // Navigate back to the LocalStoragePage after editing the user
    navigate('/local-storage');
  };

  return (
    <div>
      <h2>Edit Form</h2>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={user?.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={user?.phoneNumber || ''} onChange={(e) => handleChange('phoneNumber', e.target.value)} />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input type="date" name="dob" value={user?.dob || ''} onChange={(e) => handleChange('dob', e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={user?.email || ''} onChange={(e) => handleChange('email', e.target.value)} />
      </div>
      <div>
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default EditForm;
