import './index.css';
import Board from './components/Board';
import BoardHeader from './components/BoardHeader';
import styled from 'styled-components';

export default function App() {
  return (
    <Container>
      <p>
        Emoji Sweeper<span>&#x1F4a3;</span>
      </p>
      <div>
        <BoardHeader />
        <Board />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/*
<p>Bomb &#x1F4a3;</p>
<p>Smiley &#128512;</p>
<p>Flag &#x1F6a9;</p>
<p>Skull &#x1F480;</p>
<p>Dead smiley &#x1f635</p>
<p>Explosion &#x1F4a5;</p>
*/
