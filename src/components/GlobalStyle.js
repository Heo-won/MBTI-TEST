//글로벌스타일 사용방법
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 @font-face {
    font-family: 'Shilla_Gothic-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/Shilla_Gothic-Bold.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
  body {
    font-family: 'Shilla_Gothic-Bold', "Arial", sans-serif;
    padding-top: 1em;
    white-space: pre-wrap;
  }
  ul, ol {
    list-style: none;
    padding-left: 0px;
  }
`;
export default GlobalStyle;
