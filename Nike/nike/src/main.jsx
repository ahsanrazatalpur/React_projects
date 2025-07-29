import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // ✅ Import for routing
import { CartProvider } from './components/CartContext';
import { ThemeProvider } from './components/ThemeContext'; // ✅ Import ThemeProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap with BrowserRouter first */}
      <CartProvider>
        <ThemeProvider> {/* ✅ Wrap with ThemeProvider */}
          <App />
        </ThemeProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
