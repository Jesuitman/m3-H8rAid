import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0ProviderWithNavigate, domain, clientId } from './Main/Main.js';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter> 
      <Auth0ProviderWithNavigate
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: "https://m3-h8r-aid.vercel.app/"
        }}
      >
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();