import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './app.module.css';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }

  formSubmitHandler = data => {
    const id = nanoid();
    const { name, number } = data;

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { name, number, id }],
    }));
  };
  handleChangeFilter = e => {
    const { value } = e.currentTarget;
    this.setState({
      filter: value,
    });
  };
  filterContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  doubleContact = name => {
    const { contacts } = this.state;
    return contacts.find(contact => contact.name.toLowerCase() === name);
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <Form
          onSubmit={this.formSubmitHandler}
          doubleContact={this.doubleContact}
        />
        <h2>Contacts</h2>
        <Filter onChange={this.handleChangeFilter} filter={filter} />
        <ContactList
          contacts={this.filterContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
