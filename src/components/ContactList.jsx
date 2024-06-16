// src/components/ContactList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const ContactList = ({ onEdit, refresh }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'contacts'));
        setContacts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error('Error fetching documents: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [refresh]);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'contacts', id));
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        contacts.map((contact) => (
          <div key={contact.id}>
            <img src={contact.image} alt={contact.name} width="50" height="50" />
            <p>{contact.name}</p>
            <p>{contact.mobile}</p>
            <p>{contact.email}</p>
            <button onClick={() => onEdit(contact)}>Edit</button>
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ContactList;
