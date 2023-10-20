import React from 'react';
import styles from './ContactList.module.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const ContactList = ({ onDeleteContact }) => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });
  return (
    <ul className={styles['contacts-list']}>
      {filteredContacts.map(contact => {
        return (
          <li key={contact.id} className={styles['contact-item']}>
            <div className={styles['contact-details']}>
              {contact.name}: {contact.phone}
            </div>
            <button
              onClick={() => onDeleteContact(contact.id)}
              className={styles['delete-button']}
              type="button"
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
