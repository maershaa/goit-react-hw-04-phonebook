import React, { Component } from "react";
import ContactForm from "./ContactForm/ContactForm"; // Импортируем компонент формы для добавления контактов
import ContactList from  "./Contacts/ContactsList"; // Импортируем компонент списка контактов
import Filter from "./Filter/Filter";
import css from './App.module.css';


class App extends Component {
state = {
  contacts: [],
  filter: ''
}
  
  
componentDidMount() {
  // Метод componentDidMount вызывается после того, как компонент был добавлен в DOM.
  // Попытка получить данные из локального хранилища браузера.
  const stringifiedContacts = localStorage.getItem('contacts');
  // Если данные были найдены в локальном хранилище, попытаемся распарсить их.
  // Если данные не найдены (null), установим начальное значение из contactsData.
  const parsedContacts = JSON.parse(stringifiedContacts) || [];
  // Устанавливаем состояние компонента на основе данных из локального хранилища или начальных данных.
  this.setState({ contacts: parsedContacts });
}

  
componentDidUpdate(_, prevState) {
  // Метод componentDidUpdate вызывается после обновления компонента.
  // В данном случае, мы сравниваем предыдущие контакты (из prevState) с текущими контактами (из this.state).
  if (prevState.contacts !== this.state.contacts) {
    // Если предыдущие контакты не равны текущим контактам, это означает, что произошло изменение контактов.
    // Мы преобразуем массив контактов в формат JSON и сохраняем его в локальное хранилище браузера.
    const stringifiedContacts = JSON.stringify(this.state.contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }
}

  
addContact = newContact => {
  // Приводим имя нового контакта к нижнему регистру
  const normalizeName = newContact.name.toLowerCase();

  // Проверяем, существует ли контакт с таким же именем (нормализованным) среди текущих контактов
  const isDuplicate = this.state.contacts.some(
    contact => contact.name.toLowerCase() === normalizeName
  );

  // Если контакт уже существует, выводим сообщение и завершаем выполнение функции
  if (isDuplicate) {
    alert(`${newContact.name} уже есть в контактах`);
    return;
  }

  // Если контакт не является дубликатом, обновляем состояние, добавляя новый контакт в массив контактов
  this.setState(prevState => ({
    contacts: [...prevState.contacts, newContact],
  }));
};

// Метод для удаления контакта по его ID
deleteContact = (contactId) => {
  this.setState(prevState => ({
    // Обновляем состояние, фильтруя контакты и оставляя только те, у которых ID не совпадает с заданным contactId
    contacts: prevState.contacts.filter(contact => contact.id !== contactId),
  }));
};

    // Метод для получения отфильтрованного массива контактов
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };


  // Обработчик изменения значения фильтра
  handleFilterChange = (filter) => {
    this.setState({ filter });
    console.log(filter)
  }
  render() {

        const filteredContacts = this.getFilteredContacts(); // Получаем отфильтрованный массив контактов

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
         {/* Рендерим форму для добавления контактов и передаем метод addContact как обработчик */}
        
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handleFilterChange} />

      <ContactList
          contacts={filteredContacts} // Передаем отфильтрованный массив контактов
            onDeleteContact={this.deleteContact} 
        />
      </div>
    );
  }
}

export default App;

