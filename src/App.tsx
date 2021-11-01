import React from 'react';
import RootNavigator from './navigation'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import store, { persistor } from 'src/state/store';
import { Toast } from 'src/components';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <GlobalStyles />
          <Toast />
          <RootNavigator />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

const GlobalStyles = createGlobalStyle`
  ${normalize}

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

export default App;
