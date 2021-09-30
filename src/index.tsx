import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import App from './App';
import GlobalFonts from 'src/assets/fonts';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Rubik', sans-serif;
  }

  html, body {
    height: 100%;
  }

  #root {
    height: 100%;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Normalize />
      <GlobalFonts />
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
