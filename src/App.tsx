import styled from 'styled-components';
import Board from './components/Board';
import NewBoardBar from './components/NewBoardBar';

const Container = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
`

function App() {
  return (
    <Container>
      <NewBoardBar/>
      <Board/>
    </Container>
  );
}

export default App;
