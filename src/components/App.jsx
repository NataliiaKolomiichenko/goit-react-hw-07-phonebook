import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { selectContacts, selectLoading, selectError } from 'redux/selectors';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import css from './App.module.css'

const App = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  return <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>      
      <ContactForm />
      <h2 className={css.title}>Contacts</h2>
      <Filter />
    
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>{error}</p>}
      {!isLoading && items?.length > 0 && !error && <ContactList />}
    </div>
}

export default App