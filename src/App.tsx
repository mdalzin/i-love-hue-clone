import { useState } from 'react';
import styled from 'styled-components';
import Board from './components/Board';
import NewGameBar from './components/NewGameBar';

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

  const [gameIndex, setGameIndex] = useState(0);
  const [[rows, cols], setDimensions] = useState([8, 10]);

  function newGame(rows: number, cols: number) {
    setGameIndex(prev => prev + 1);
    setDimensions([rows, cols]);
  }

  return (
    <Container>
      <NewGameBar newGame={newGame}/>
      <Board gameIndex={gameIndex} rows={rows} cols={cols}/>
    </Container>
  );
}

export default App;
