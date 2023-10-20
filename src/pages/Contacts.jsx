import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContacts,
  deleteContacts,
  fetchContacts,
  updateFilter,
} from '../redux/contactsSlice';

// import { nanoid } from 'nanoid';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';

const Contacts = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contacts.filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (name, number) => {
    dispatch(addContacts({ name, number }));
  };

  const onDeleteContact = id => {
    dispatch(deleteContacts(id));
  };

  const onFilterChange = e => {
    dispatch(updateFilter(e.target.value));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <div>
        <p>Find post</p>
        <input onChange={onFilterChange} value={filter} type="text" />
      </div>
      <h2>Contacts</h2>
      <ContactList onDeleteContact={onDeleteContact} />
    </div>
  );
};

export default Contacts;
