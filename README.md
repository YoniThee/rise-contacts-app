# Rise Contact App UI

## Overview
This is a React-based front-end application for managing contacts. It allows users to create, edit, delete, and search contacts. The app interacts with a backend API to perform CRUD (Create, Read, Update, Delete) operations.

### Installation
To set up the project locally, follow the steps below:

### Prerequisites
Ensure you have the following installed:

* Node.js (version 12 or higher)
* npm (Node package manager)

And most important - **clone this repo https://github.com/YoniThee/Rise_ContactsApp.git for running the backend server that managing all this app.** (follow the readme file of the repo for better use)

### Steps
**1.** Clone the repository:
```
git clone https://github.com/your-username/contacts-ui.git
```
**2.** Navigate to the project folder:
```
cd contacts-ui
```
**3.** Install the dependencies:
```
npm install
```
**4.** Set the base URL for your backend API in the config.js file:
```
export const BASE_URL = 'http://localhost:5000/contacts'; // Replace with the correct backend API URL
```
**5.** Start the development server:
```
npm start
```
This will run the app at http://localhost:3000 by default.


## Usage
Once the app is running:
The screen is look like this
![image](https://github.com/user-attachments/assets/2add5857-ed2c-4e1c-890d-8d6b014e5c7d)

**1. Creating a New Contact:**

* Fill out the form with the contact’s first name, last name, phone number, and address.
* Click the "Add Contact" button to create a new contact.

**2. Editing an Existing Contact:**

* Click the "Edit" button next to a contact in the contact list.
* The contact’s details will appear in the form. Make your changes and click "Update Contact".

**3. Deleting a Contact:**

* Click the "Delete" button next to a contact you want to remove.
* The contact will be removed from the list.

**4. Searching Contacts:**

* Enter a search term (e.g., first name, last name, phone number) in the search box.
* The contact list will filter to show only the contacts that match the search query.
**Pagination:**

* The contact list is paginated. Use the "Previous" and "Next" buttons to navigate between pages of contacts.

