import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice'
import { getContacts, getFilter } from 'redux/selectors';
import { ContactItem } from '../ContactItem/ContactItem';
import css from './ContactList.module.css'


export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const deleteContactHandler = (itemKey) => {
    dispatch(deleteContact(itemKey))
  };
  const contactSearch = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.trim().toLowerCase())
    );



  return (
    <ul className={css.list}>
      {contactSearch.map(a => {
        return (
          <li key={a.id}>
            <ContactItem
              name={a.name}
              number={String(a.number)}
              itemKey={a.id}
              deleteContactHandler={deleteContactHandler}
            />
          </li>
        );
      })}
    </ul>
  );
};


