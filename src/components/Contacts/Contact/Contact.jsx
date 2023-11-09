import React from 'react';
import css from 'components/Contacts/Contacts.module.css';

const Contact = ({ id, name, number, onDeleteContact }) => {
  return (
    <li key={id} className={css.item}>
      {/* Отображаем имя и номер контакта */}
      {name}: {number}
      {/* Кнопка "Удалить" с вызовом функцию onDeleteContact с contact.id в качестве аргумента при клике на кнопку */}
      <button onClick={() => onDeleteContact(id)} className={css.deleteButton}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
