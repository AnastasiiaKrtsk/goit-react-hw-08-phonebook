import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContacts,
  deleteContact,
  fetchContacts,
  updateFilter,
} from '../redux/contactsSlice';

// import { nanoid } from 'nanoid';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (name, phone) => {
    dispatch(addContacts({ name, phone }));
  };

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const onFilterChange = e => {
    dispatch(updateFilter(e.target.value));
  };

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <div>
        <p>Find post</p>
        <input onChange={onFilterChange} value={filter} type="text" />
      </div>
      <h2>Contacts</h2>
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
};

export default Contacts;
