import React  from 'react'

function Square(props) {
    let className;
    (props.value === 'X') ? className ="square x " : className= "square o ";
    if (props.isBackground) {
        className += "background"
    }
  return (
      <button className={className} onClick={props.onClick} >
          {props.value}
      </button>
  );
}
export default Square