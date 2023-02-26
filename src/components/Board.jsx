import React from 'react';
import {ReactComponent as WhitePieceIcon} from "../assets/img/white-piece.svg";
import {ReactComponent as BlackPieceIcon} from "../assets/img/black-piece.svg";
import {ReactComponent as WhiteKingIcon} from "../assets/img/white-king.svg";
import {ReactComponent as BlackKingIcon} from "../assets/img/black-king.svg";
import './Board.scss'
import {useDispatch, useSelector} from "react-redux";
import {SET_FEN} from "../redux/actions/board";

const Board = () => {
  const fenArr = (useSelector((state) => state.board.fen)).split('')
  const LIMIT = 8;
  const board = new Array(LIMIT).fill(0).map((_, i) => new Array(LIMIT).fill(0).map((_, j) => i * LIMIT + j));
  const dispatch = useDispatch();

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
    ev.dataTransfer.setData("text", ev.target.id);
  }

  const drop = (ev, ind) => {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let figure = fenArr[data];
    if (fenArr[ind] === '.' && fenArr[data]) {
      let copyFenArr = [...fenArr]
      copyFenArr[data] = '.'
      copyFenArr[ind] = figure
      dispatch({
        type: SET_FEN,
        payload: [...copyFenArr].join(''),
      })
    }
  }

  const handleOnChange = (event) => {
    dispatch({
      type: SET_FEN,
      payload: event.target.value,
    })
  }

  return (
    <section className='board container'>

      <div className='board__input'>
        <input
          value={fenArr.join('')}
          maxLength={LIMIT * LIMIT}
          onChange={(event) => handleOnChange(event)}
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
                    draggable={Boolean(fenArr[cellId]?.match('[wWbB]'))}
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