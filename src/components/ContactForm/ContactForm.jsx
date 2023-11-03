import React, { Component } from "react";
import { nanoid } from 'nanoid';
import css from 'components/ContactForm/ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  loginInputId = nanoid();

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (evt) => {
  evt.preventDefault();
  const { name, number } = this.state;
  const contact = {
    id: nanoid(),
    name,
    number,
  };
  this.props.onSubmit(contact);
  this.reset();
  
  };

  
  
  reset() {
    this.setState({ ...INITIAL_STATE });
  }

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <label htmlFor={this.loginInputId} className={css.formLabel}>
          Name
          <input
            type="text"
            name="name"
            pattern={"^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"}
            title="Name may contain only letters, apostrophe, dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleChange}
            id={this.loginInputId}
            className={css.inputText}
          />
        </label>

        <label htmlFor={this.loginInputId} className={css.formLabel}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +"
            required
            value={number}
            onChange={this.handleChange}
            id={this.loginInputId}
            className={css.inputText}
          />
        </label>

        <button type="submit" className={css.addButton}>Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
