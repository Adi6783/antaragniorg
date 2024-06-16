// src/components/ContactForm.js
import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const ContactForm = ({ contact, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setMobile(contact.mobile);
      setEmail(contact.email);
      setImage(contact.image);
    } else {
      setName('');
      setMobile('');
      setEmail('');
      setImage('');
    }
  }, [contact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (contact) {
        // Update existing contact
        const contactRef = doc(db, 'contacts', contact.id);
        await updateDoc(contactRef, { name, mobile, email, image });
      } else {
        // Add new contact
        await addDoc(collection(db, 'contacts'), { name, mobile, email, image });
      }
      onSave();
    } catch (error) {
      console.error('Error updating document: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {contact ? 'Update' : 'Add'} Contact
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      {loading && <p>Loading...</p>}
    </form>
  );
};

export default ContactForm;
