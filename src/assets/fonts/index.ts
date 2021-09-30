import { createGlobalStyle } from 'styled-components';
import Rubik400Woff from './rubik-400.woff';
import Rubik400Woff2 from './rubik-400.woff2';
import Rubik500Woff from './rubik-500.woff';
import Rubik500Woff2 from './rubik-500.woff2';

export default createGlobalStyle`
  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    src: local(''),
          url(${Rubik400Woff2}) format('woff2'),
          url(${Rubik400Woff}) format('woff');
  }

  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    src: local(''),
          url(${Rubik500Woff2}) format('woff2'),
          url(${Rubik500Woff}) format('woff');
  }
`;
