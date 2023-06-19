import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from '../redux/contactsSlice';
import { setFilter } from '../redux/filterSlice';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import AddForm from './AddForm/AddForm';
import css from './App.module.css';
import { persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    persistor.flush();
  }, []);

  const addContactHandler = newContact => {
    const findContact = contacts.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase());
  
    if (findContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
  
    dispatch(addContact(newContact));
  };

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const renderContacts = () => {
    if (!Array.isArray(contacts)) {
      return [];
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  };

  const deleteContactHandler = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <AddForm addContact={addContactHandler} />
      <h2 className={css.contacts}>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactList contactList={renderContacts()} deleteContact={deleteContactHandler} />
    </div>
  );
};

const AppWithPersist = () => (
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
);

export default AppWithPersist;
