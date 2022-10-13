import React from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import App from './components/App';

const rootElement = document.getElementById("root");
const cRoot = createRoot(rootElement);
// const hRoot = hydrateRoot(rootElement);

const reactApp = () => (
    <BrowserRouter>
      <App />
    </BrowserRouter>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, reactApp());
} else {
  cRoot.render(reactApp());
}