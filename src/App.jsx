// src/App.js
import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const App = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [refreshList, setRefreshList] = useState(false);

  const handleSave = () => {
    setSelectedContact(null);
    setRefreshList((prev) => !prev); // Toggle refresh state
  };

  const handleCancel = () => {
    setSelectedContact(null);
  };

  return (
    <div>
      <h1>Contact List</h1>
      <ContactForm
        contact={selectedContact}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <ContactList key={refreshList} onEdit={setSelectedContact} refresh={refreshList} />
    </div>
  );
};

export default App;
