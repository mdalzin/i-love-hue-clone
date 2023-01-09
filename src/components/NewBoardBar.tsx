import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
  text-align: center;
  color: white;
`

const X = styled.h2`
  margin: 10px;
  user-select: none;
`

export default function NewBoardBar() {
  return (
    <Container>
      <InputContainer>
        <DimensionInput variant='filled' size='small' label='Rows'/>
        <X>x</X>
        <DimensionInput variant='filled' size='small' label='Cols'/>
      </InputContainer>
      <NewButton variant='contained'>
        New Game
      </NewButton>
    </Container>
  )
}