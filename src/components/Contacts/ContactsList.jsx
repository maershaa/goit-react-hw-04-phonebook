import React from "react";
import css from 'components/Contacts/Contacts.module.css';

export const ContactsList = ({ contacts, onDeleteContact }) => {

    return (
<div className={css.contactsContainer}>
  <ul className={css.contactsList}>
    {contacts.map(contact => (
        <li key={contact.id} className={css.item}>
          {/* Отображаем имя и номер контакта */}
          {contact.name}: {contact.number}

          {/* Кнопка "Удалить" с вызовом функцию onDeleteContact с contact.id в качестве аргумента при клике на кнопку */}
          <button onClick={() => onDeleteContact(contact.id)}  className={css.deleteButton}>
            Delete
          </button>
        </li>
      ))}
  </ul>
</div>
    );
}



export default ContactsList;
