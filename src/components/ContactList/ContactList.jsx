import React from 'react';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={styles['contacts-list']}>
      {contacts.map(contact => {
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
