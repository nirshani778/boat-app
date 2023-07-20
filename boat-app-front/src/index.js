import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import { NewBoatViewProvider } from './contexts/add-new-boat-view.contexts';
import { store } from './store/store';

import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NewBoatViewProvider>
          <App />
        </NewBoatViewProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
