import styled from "styled-components";

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  font-size: 100px;
  user-select: none;
  text-align: center;
`

export default function WinOverlay() {
  return (
    <Overlay>
      YOU WIN!
    </Overlay>
  )
}