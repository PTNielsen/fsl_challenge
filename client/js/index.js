import React           from 'react';
import { render }      from 'react-dom';
import { createStore } from 'redux';
import { Provider }    from 'react-redux';

import App from '../containers/App.jsx';
import wizardReducer from '../reducers/wizardReducer';

const store = createStore(wizardReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

store.subscribe( () => {
  console.log('Store updated: ', store.getState());
});
