import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from 'components/ContactForm/ContactForm.module.css';
import PropTypes from 'prop-types'; // npm install --save prop-types

const ContactForm = ({ onSubmit }) => {
  // Используем useState для управления состоянием полей name и number
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // Создаем уникальный идентификатор для элемента input
  const loginInputId = nanoid();

  // Обработчик изменения значений полей input
  const handleChange = evt => {
    const { name, value } = evt.target;

    // Проверяем имя поля и обновляем соответствующее состояние
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  // Обработчик отправки формы
  const handleSubmit = evt => {
    evt.preventDefault();

    // Создаем объект контакта с уникальным идентификатором
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    // Вызываем переданный метод onSubmit, чтобы добавить контакт
    onSubmit(contact);

    // Сбрасываем значения полей после добавления контакта
    reset();
  };

  // Функция для сброса значений полей в исходное состояние
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label htmlFor={loginInputId} className={css.formLabel}>
        Name
        <input
          type="text"
          name="name"
          pattern={
            "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          }
          title="Name may contain only letters, apostrophe, dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
          id={loginInputId}
          className={css.inputText}
        />
      </label>

      <label htmlFor={loginInputId} className={css.formLabel}>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +"
          required
          value={number}
          onChange={handleChange}
          id={loginInputId}
          className={css.inputText}
        />
      </label>

      <button type="submit" className={css.addButton}>
        Add contact
      </button>
    </form>
  );
};

// Указываем propTypes для name и number, чтобы определить их тип
ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};

export default ContactForm;
