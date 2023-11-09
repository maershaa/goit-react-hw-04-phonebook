import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './Contacts/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css';

const App = () => {
  // Задаємо стан для фільтрації контактів
  const [filter, setFilter] = useState('');

  // Використовуємо функцію для ініціалізації початкового стану контактів з localStorage
  const [contacts, setContacts] = useState(() => {
    // Отримуємо рядкове представлення контактів з localStorage
    const stringifiedContacts = localStorage.getItem('contacts');
    // Розпаковуємо рядок у масив об'єктів контактів або створюємо порожній масив, якщо дані відсутні
    const parsedContacts = JSON.parse(stringifiedContacts) || [];
    // Повертаємо дані для ініціалізації стану
    return parsedContacts;
  });

  // Використовуємо ефект для збереження контактів в localStorage при їх зміні
  useEffect(() => {
    // Перетворюємо масив контактів у рядкове представлення
    const stringifiedContacts = JSON.stringify(contacts);
    // Зберігаємо рядок контактів в localStorage
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
