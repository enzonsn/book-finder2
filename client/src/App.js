import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

import {ApolloProvider, InMemoryCache} from '@apollo/react-hooks';
import {ApolloClient, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const createLink = createHttpLink({uri: '/graphql'});

const authLink = setContext((_, {headers}) =>{
  const token = localStorage.getItem('id_token');
  return{
    headers: {
      ...headers, 
      authorization: token ? `Bearer ${token}` : ''
    }};
});

const client = new ApolloClient({
  link: authLink.concat(createLink),
  cache: new InMemoryCache()
});
 
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
