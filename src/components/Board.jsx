import React, {useState} from 'react';
import {ReactComponent as WhitePieceIcon} from "../assets/img/white-piece.svg";
import {ReactComponent as BlackPieceIcon} from "../assets/img/black-piece.svg";
import {ReactComponent as WhiteKingIcon} from "../assets/img/white-king.svg";
import {ReactComponent as BlackKingIcon} from "../assets/img/black-king.svg";
import './Board.scss'

const Board = () => {
  const fen = ".w.w.w....w......W.b.W.............B..........b....b....b......."
  const [fenArr, setFenArr] = useState(fen.split(''))
  const LIMIT = 8;
  const board = new Array(LIMIT).fill(0).map((_, i) => new Array(LIMIT).fill(0).map((_, j) => i * LIMIT + j));
  // const [onDrag, setOnDrag] = useState(false)

  const renderSwitch = (param) => {
    switch (param) {
      case 'w':
        return <WhitePieceIcon/>
      case 'W':
        return <WhiteKingIcon/>
      case 'b':
        return <BlackPieceIcon/>
      case 'B':
        return <BlackKingIcon/>
      default:
        return
    }
  }

  const drag = (ev) => {
    // setOnDrag(true)
    ev.dataTransfer.setData("text", ev.target.id);
  }

  const drop = (ev, ind) => {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let figure = fenArr[data]
    if (fenArr[ind] === '.') {
      let copyFenArr = [...fenArr]
      copyFenArr[data] = '.'
      copyFenArr[ind] = figure
      setFenArr([...copyFenArr])
    }
    // setOnDrag(false)
  }

  return (
    <section className='board container'>

      <div className='board__input'>
        <input
          value={fenArr.join('')}
          maxLength={LIMIT * LIMIT}
          onChange={(e) => setFenArr(e.target.value.split(''))}
        />
      </div>

      <div className='board__table'>
        {
          board.map((row, index) => (
            <div className='board__row' key={row[index]}>
              {row.map(cellId =>
                <div
                  className={`board__cell ${cellId + 1 > fenArr.length ? 'error' : ''}`}
                  key={cellId}
                  onDrop={(event) => drop(event, cellId)}
                  onDragOver={(event) => event.preventDefault()}
                >
                  <div
                    className='board__piece'
                    id={cellId}
                    data-number={Math.round((cellId + 1) / 2)}
                    draggable={fenArr[cellId] !== '.'}
                    onDragStart={(event) => drag(event)}
                  >
                    {renderSwitch(fenArr[cellId])}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </section>
  );
};

export default Board;