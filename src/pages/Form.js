import React, { useState } from 'react';
import { database } from '../firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Form = () => {
  // State variables to store form data
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a unique ID for the form submission
    const id = Date.now().toString();

    // Convert profile picture to data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const profilePictureDataURL = reader.result;

      const formData = {
        id, // Add the generated ID to the form data
        name,
        phoneNumber,
        dob,
        profilePicture: profilePictureDataURL,
        email,
      };

      // Save data to local storage
      const localData = JSON.parse(localStorage.getItem('userData')) || [];
      localData.push(formData);
      localStorage.setItem('userData', JSON.stringify(localData));

      // Save data to Firebase
      database.ref('users').child(id).set(formData);

      // Clear the form after submission
      setName('');
      setPhoneNumber('');
      setDob('');
      setProfilePicture(null);
      setEmail('');

      // Show a success toast notification
      toast.success('Submitted Successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });
    };

    // Read the selected profile picture as data URL
    if (profilePicture) {
      reader.readAsDataURL(profilePicture);
    }
  };

  return (
    <div className="form-container">
      <h1>Form Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Profile Picture:</label>
          <input type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Form;
