import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './config'; 

const containerStyle = {
    margin: '20px',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
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
  
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };
  
  const tdStyle = {
    padding: '8px',
    borderBottom: '1px solid #ddd',
  };
  
  const thStyle = {
    padding: '10px',
    borderBottom: '2px solid #ddd',
    textAlign: 'left',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end', 
    gap: '5px', 
  };
const ContactList = ({ searchQuery, handleEdit }) => {
    const [contacts, setContacts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;  // Number of contacts per page

    // Fetch contacts for the current page
    const fetchContacts = async (page,searchQuery) => {
      try {
        let response;
        if (searchQuery && searchQuery.trim() !== '') {
            response = await axios.get(`${BASE_URL}/search?query=${searchQuery}`);
        }
        else{
             response = await axios.get(`${BASE_URL}?page=${page}&pageSize=${pageSize}`); 
        }
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    // Fetch contacts when the page or search query changes
    useEffect(() => {
      fetchContacts(currentPage, searchQuery);
    }, [currentPage, searchQuery]);
    // Handle next page navigation
    const handleNextPage = () => {
      if (contacts.length === pageSize) {
        setCurrentPage(currentPage + 1);
      }
    };
    // Handle previous page navigation
    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
    // Delete Contact
    const handleDelete = async (id) => {
        try {
          await axios.delete(BASE_URL + `/${id}`);
          fetchContacts(currentPage); // Refresh the contact list
        } catch (error) {
          console.error("There was an error deleting the contact!", error);
        }
      };
    
    return (
      <div style={containerStyle}>
        <h1>Contact List</h1>
        {/* Contact Table */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>First Name</th>
              <th style={thStyle}>Last Name</th>
              <th style={thStyle}>Phone Number</th>
              <th style={thStyle}>Address</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.contactId}>
                <td style={tdStyle}>{contact.firstName}</td>
                <td style={tdStyle}>{contact.lastName}</td>
                <td style={tdStyle}>{contact.phoneNumber}</td>
                <td style={tdStyle}>{contact.address}
                      {/* Container for buttons */}
                      <div style={buttonContainerStyle}>
                  <button
                    style={{ ...buttonStyle, backgroundColor: '#28a745' }}
                    onClick={() => handleEdit(contact)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
                    onClick={() => handleDelete(contact.contactId)}
                  >
                    Delete
                  </button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div>
          <button onClick={handlePreviousPage} disabled={currentPage === 1} style={buttonStyle}>
            Previous
          </button>
          <button onClick={handleNextPage} disabled={contacts.length < pageSize} style={buttonStyle}>
            Next
          </button>
        </div>
      </div>
    );
  };
  export default ContactList;