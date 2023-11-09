import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './Contacts/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]); // Состояние для хранения контактов
  const [filter, setFilter] = useState(''); // Состояние для хранения значения фильтрации

  // !!!Совет ментора но я что-то делаю не так
  // const [contacts, setContacts] = useState(() => {
  //   const stringifiedContacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(stringifiedContacts) || [];
  // });

  // Загрузка данных из localStorage при монтировании компонента
  useEffect(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) || [];
    setContacts(parsedContacts);
  }, []);

  // Сохранение данных в localStorage при изменении контактов
  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  // Функция для добавления нового контакта
  const addContact = newContact => {
    // Проверка на дубликат контакта
    const normalizeName = newContact.name.toLowerCase();
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === normalizeName
    );

    if (isDuplicate) {
      alert(`${newContact.name} уже есть в контактах`);
      return;
    }

    // Обновление состояния, добавляя новый контакт
    setContacts(prevContacts => [...prevContacts, newContact]); // Используем функциональное обновление вместо:
    //   this.setState(prevState => ({
    //     contacts: [...prevState.contacts, newContact],
    //   }));
    // };
  };

  // Функция для удаления контакта по его ID
  const deleteContact = contactId => {
    // Обновление состояния, фильтруя контакты и удаляя контакт с заданным ID
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };
  // Вместо этого
  // const deleteContact = contactId => {
  // setState(prevState => ({
  // contacts: prevState.contacts.filter(
  //   contact => contact.id !== contactId
  // ),}));
  // };

  // Функция для фильтрации контактов
  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  // Обработчик изменения значения фильтра
  const handleFilterChange = newFilterValue => {
    // Обновление состояния фильтра
    setFilter(newFilterValue);
  };

  // Получение отфильтрованного массива контактов
  // const filteredContacts = getFilteredContacts();

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />{' '}
      {/* Рендеринг формы для добавления контакта и передача метода addContact как обработчика */}
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={getFilteredContacts()} // Передача отфильтрованного массива контактов
        onDeleteContact={contactId => deleteContact(contactId)} // Передача функции для удаления контакта с аргументом
      />
    </div>
  );
};

export default App;
