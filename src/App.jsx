import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from './components/Form';
import RenderContacts from './components/RenderContacts';
import Section from './components/Section';
import Filter from './components/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteOneContact, addFilter } from './redux/store';

const App = () => {
  // const [contacts, setContacts] = useState(
  //   () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  // );
  // const [filter, setFilter] = useState('');

  const dispatch = useDispatch();

  const contactsRedux = useSelector(state => state.contacts.items);
  const filterRedux = useSelector(state => state.contacts.filter);
  console.log('Items - ', contactsRedux, 'Filter -', filterRedux);

  const formSubmitHandler = (name, number) => {
    const normalizedName = name.toLowerCase();

    if (
      contactsRedux.find(
        contact => contact.name.toLowerCase() === normalizedName
      )
    ) {
      alert(` ${name} is already in contacts`);
      return;
    }

    const contact = {
      name,
      id: nanoid(),
      number,
    };
    dispatch(addContact(contact));
  };

  const changeFilter = evnt => {
    dispatch(addFilter(evnt.currentTarget.value));
  };

  const deleteContact = ID => {
    dispatch(deleteOneContact(ID));
  };

  // useEffect(() => {
  //   window.localStorage.setItem('contacts', JSON.stringify(contacts));
  //   // console.log('CLG', JSON.parse(window.localStorage.getItem('contacts')));
  // }, [contacts]);

  const normalizedFilter = filterRedux.toLowerCase();
  const filteredContacts = contactsRedux.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <Section>
      <Form onSubmit={formSubmitHandler} />
      {contactsRedux.length > 0 ? (
        <Filter value={filterRedux} onChange={changeFilter} />
      ) : (
        ''
      )}
      {contactsRedux.length > 0 ? (
        <RenderContacts
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      ) : (
        'There are no contacts at this moment'
      )}
    </Section>
  );
};

export default App;
