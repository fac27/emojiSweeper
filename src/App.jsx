import './styles.css'
import Tile from './components/Tile';
import Board from './components/Board';

const App = () => {
  return (
    <>
      <p>
        Emoji Sweeper<span>&#x1F4a3;</span>
      </p>
      <div>
        <Board />
      <Tile state={{isBomb: true}} />
      <Tile state={{isBomb: false}} />
      </div>
    </>
  );
};

export default App;

/*
<p>Bomb &#x1F4a3;</p>
<p>Smiley &#128512;</p>
<p>Flag &#x1F6a9;</p>
<p>Skull &#x1F480;</p>
<p>Dead smiley &#x1f635</p>
<p>Explosion &#x1F4a5;</p>
*/
