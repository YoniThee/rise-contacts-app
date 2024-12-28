import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactList from './ContactsList';
import { BASE_URL } from './config'; 

const inputStyle = {
  marginBottom: '10px',
  padding: '8px',
  width: '200px',
  borderRadius: '4px',
  border: '1px solid #ddd',
};
const buttonStyle = {
  padding: '10px 15px',
  marginBottom: '10px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
};
const containerStyle = {
  margin: '20px',
  padding: '20px',
  backgroundColor: '#f4f4f9',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    contactId: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  });
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };
  const handleEdit = (contact) => {
    setFormData({
      contactId: contact.contactId,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber: contact.phoneNumber,
      address: contact.address,
    });
  };    
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create or Update Contact
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { contactId, firstName, lastName, phoneNumber, address } = formData;
    const contact = { firstName, lastName, phoneNumber, address };

    try {
      if (contactId) {
        // Update existing contact
        await axios.put(BASE_URL + `/${contactId}`, contact);
      } else {
        // Create new contact
        await axios.post(BASE_URL, contact);
      }
      setFormData({
        contactId: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
      });
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'Something went wrong!'));
    }
  };


  return (
    <div style={containerStyle}>
      <h1>Contacts</h1>
      {/* Search Box */}
      <input
        style={inputStyle}
        type="text"
        placeholder="Search Contacts"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {/* Contact Form */}
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <input
          style={inputStyle}
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <input
          style={inputStyle}
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <input
          style={inputStyle}
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <button style={buttonStyle} type="submit">
          {formData.contactId ? 'Update Contact' : 'Add Contact'}
        </button>
      </form>

      {/* Contacts List */}
      <ContactList 
        searchQuery={searchQuery}
        handleEdit={handleEdit} // Pass handleEdit function to ContactList
      /> 

    </div>
  );
};

export default App;