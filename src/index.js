import React from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import App from './components/App';

const rootElement = document.getElementById("root");
const cRoot = createRoot(rootElement);
const hRoot = hydrateRoot(rootElement);

const reactApp = () => (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  hRoot.render(reactApp());
} else {
  cRoot.render(reactApp());
}