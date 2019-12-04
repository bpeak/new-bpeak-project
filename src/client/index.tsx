import React from 'react';
import ReactDOM from 'react-dom';
import App from '../shared/App';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'store';
import { Provider } from 'react-redux';

const { store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// persistor.subscribe(() => {
//   /* Hydrate React components when persistor has synced with redux store */
//   const { bootstrapped } = persistor.getState();

//   if (bootstrapped) {
//     ReactDOM.hydrate(<Main />, document.getElementById('root'));
//   }
// });
