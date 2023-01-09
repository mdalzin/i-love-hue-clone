import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useRef, useState } from 'react';

const Container = styled.div`
  height: 70px;
  display: flex;
  justify-content: center;
  gap: 30px;
`

const NewButton = styled(Button)`
  height: 68%;
`

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`

const DimensionInput = styled(TextField)`
  width: 65px;
  text-align: left;
`

const X = styled.h2`
  margin: 10px;
  user-select: none;
`

export default function NewGameBar({newGame}: {newGame: (rows: number, cols: number) => void}) {

  const rows = useRef('8');
  const cols = useRef('10');

  const [errorRows, setErrorRows] = useState(false);
  const [errorCols, setErrorCols] = useState(false);

  function validateAndSet() {
    
    const rowsIsValid = isValid(rows.current);
    const colsIsValid = isValid(cols.current);

    setErrorRows(!rowsIsValid);
    setErrorCols(!colsIsValid);

    if (rowsIsValid && colsIsValid) newGame(parseInt(rows.current), parseInt(cols.current));
  }

  function isValid(input: string): boolean {
    const inputNum = parseFloat(input);
    if (isNaN(inputNum)) return false;
    if (!Number.isInteger(inputNum)) return false;
    if (inputNum < 1) return false;
    if (inputNum > 100) return false;
    return true;
  }
  
  return (
    <Container>
      <InputContainer>
        <DimensionInput defaultValue={rows.current} variant='filled' size='small' label='Rows'
          error={errorRows} onChange={e => {rows.current = e.target.value}}/>
        <X>x</X>
        <DimensionInput defaultValue={cols.current} variant='filled' size='small' label='Cols'
          error={errorCols} onChange={e => {cols.current = e.target.value}}/>
      </InputContainer>
      <NewButton variant='contained' onClick={validateAndSet}>
        New Game
      </NewButton>
    </Container>
  )
}