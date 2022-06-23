import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/';
import RenderContacts from './RenderContacts/';
import Section from './Section/';
import Filter from './Filter';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  const formSubmitHandler = (name, number) => {
    const normalizedName = name.toLowerCase();

    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      alert(` ${name} is already in contacts`);
      return;
    }

    const contact = {
      name,
      id: nanoid(),
      number,
    };
    setContacts(prevState => [...prevState, contact]);
  };

  const changeFilter = evnt => {
    setFilter(evnt.currentTarget.value);
  };

  const deleteContact = ID => {
    setContacts(contacts.filter(item => item.id !== ID));
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log('CLG', JSON.parse(window.localStorage.getItem('contacts')));
  }, [contacts]);

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <Section>
      <Form onSubmit={formSubmitHandler} />
      {contacts.length > 0 ? (
        <Filter value={filter} onChange={changeFilter} />
      ) : (
        ''
      )}
      {contacts.length > 0 ? (
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
