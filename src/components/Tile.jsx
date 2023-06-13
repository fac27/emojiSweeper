import { useState } from "react";

export default function Tile({state}) {
    const [tileState, setTileState] = useState(state);

    const handleClick = (event) => {
        ;
    }

    const handleRightClick = (event) => {
        event.preventDefault();
        setTileState({isBomb: !tileState.isBomb});
    }
    
    return (
        <div className="tile" onClick={handleClick} onContextMenu={handleRightClick}>
            {tileState.contents == 'bomb' ? '💣' : ''}
        </div>
    )
}


/*
<p>Bomb &#x1F4a3;</p>
<p>Smiley &#128512;</p>
<p>Flag &#x1F6a9;</p>
<p>Skull &#x1F480;</p>
<p>Dead smiley &#x1f635</p>
<p>Explosion &#x1F4a5;</p>
*/