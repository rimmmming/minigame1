import React from 'react';
import styled from 'styled-components'

const Button = styled.button`
  position:relative;
  display:inline-block;
  width:100px;
  height:150px;
  margin:10px;
  line-height:150px;
  text-align:center;
  border:1px solid #000;
  border-radius:5px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  &.active{
    transform: rotateY(180deg)
  }
`;
const Card = styled.span`
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  backface-visibility: hidden;
  ${(props) => (props.front ? 'background-color:green' : '')}
  ${(props) => (props.back ? 'transform: rotateY(180deg);' : '')}
`;

function CardItem({item, index, onHandleClick}) {
  const activeClass = (item.active === true) ? 'active': '';
  function onClick(item){
    if(item.active === true) return;
    onHandleClick(index)
  }
    return (
        <>
            <Button className={activeClass} onClick={()=>{onClick(item)}}>
                <Card front></Card>
                <Card back>{item.value}</Card>
            </Button>
        </>
    );
}

export default CardItem;