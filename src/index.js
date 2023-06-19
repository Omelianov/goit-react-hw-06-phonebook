import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import AppWithPersist from './components/App.jsx';
import store from './redux/store';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWithPersist />
    </Provider>
  </React.StrictMode>
);
