// import './App.css';
import styled from 'styled-components';
import GlobalStyle from './components/GlobalStyle';
import Start from './components/Start';
import { useSelector } from 'react-redux';
import Mbti from './components/Mbti';

const Main = styled.main`
  text-align: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 500px;
  padding: 0 35px;
  margin: auto;
`;

function App() {
  const page = useSelector((state) => state.mbti.page);
  return (
    <>
      <GlobalStyle />
      <Main>{page === 0 ? <Start /> : <Mbti />}</Main>
    </>
  );
}

export default App;
