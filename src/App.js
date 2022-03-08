import './App.css';
import styled from 'styled-components'
import Data from './Data';
import { useEffect, useState } from 'react';
import CardItem from './component/CardItem';

const Wrapper = styled.div`
  position:relative;
`;
const Container = styled.div`
  width:480px;
  margin:15px auto 0;
`;
const Dimmed = styled.div`
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%
`;
const Title = styled.p`
  padding:15px 0 5px;
  text-align:center
`;
const Complete = styled.div`
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  display:flex;
  flex-flow:column;
  justify-content : center;
  align-items:center;
  background-color:rgba(0,0,0,0.5)
`;
const Text = styled.p`
  text-align:center;
  color:#fff;
  font-size:40px;
  font-weight:bold;
`;
const Button = styled.button`
  margin-top:10px;
  padding:5px;
`;

function cardShuffle(data) {
  return data.sort(() => Math.random() - 0.5)
}
let cardList = JSON.parse(JSON.stringify(cardShuffle(Data)))

let activeCardNumber = 0;
let firstCardIndex, secondCardIndex;
let firstCardValue, secondCardValue;

function App() {
  const [gameReady, setGameReady] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [secCount, setSecCount] = useState(5);
  const [cards, setCards] = useState(cardList);
  const [disable, setDisable] = useState(false)
  const [completeCount, setCompleteCount] = useState(0)

  // 시작 버튼
  const onStart = () => {
    cardSetting(true)
    setGameReady(true)
    setTimeout(()=>{
      cardSetting(false);
      setGameStart(true)
    }, 5000)
  }
  
  // 게임 재시작 상태 초기화
  const onRestart = () =>{
    setGameReady(false);
    setGameStart(false);
    setSecCount(5);
    setCompleteCount(0);
    cardSetting(false)
  }

  const onHandleClick = (index) => {
    activeCardNumber++;
    cardList[index].active = true;

    if(activeCardNumber === 1){
      firstCardIndex = cardList[index];
      firstCardValue = cardList[index].value;
    }else if(activeCardNumber === 2){
      secondCardIndex = cardList[index];
      secondCardValue = cardList[index].value;
      if(firstCardValue === secondCardValue){
        firstCardIndex.complete = true;
        secondCardIndex.complete = true;
        activeCardNumber = 0;
        setCompleteCount(completeCount + 1)
      } else{
        setTimeout(() => {
          firstCardIndex.active = false;
          secondCardIndex.active = false;
          setDisable(false);
        }, 1000);
        setDisable(true);
        activeCardNumber = 0;
      }
      firstCardValue = null;
      secondCardValue = null;
    }
    setCards([...cardList]);
  }

  function cardSetting(boolean){
    cardList = cardList.map((item)=>{
      return {...item, active:boolean}
    });
    setCards(cardList);
  }

  // 게임 시작전 5초 카운팅
  function countDown(){
    if(secCount === 0) return;
    const countDownTimer = setTimeout(() => {
      setSecCount(secCount - 1)
    }, 1000)
    return () => {
      clearTimeout(countDownTimer)
    };
  }
  useEffect(()=>{
    gameReady && countDown();
  }, [secCount, gameReady])

  useEffect(()=>{
    cardList = cardList.map((item)=>{
      return {...item}
    });
    setCards(cardShuffle(cardList));
  }, [gameReady])

  return (
    <div className="App">
      <h1>카드 맞추기 게임</h1>
      <Wrapper>
        <Button onClick={onStart} disabled={gameReady && 'disable'}>게임 시작</Button>
        {
          !gameReady ? <Title>시작 버튼을 누르면 게임이 시작됩니다.</Title>
          : 
          !gameStart ? <Title>{`${secCount}초 후에 시작합니다.`}</Title> 
          : 
          <Title>start!!</Title>
        }
        <Container>
          {
            cards.map( (item, index) => {
              return(
                <CardItem key={`cardItem_${index}`} item={item} index={index} onHandleClick={onHandleClick}/>
              )
            })
          }
        </Container>
        {disable && <Dimmed></Dimmed>}
      </Wrapper>
      {(cards.length / 2) === completeCount && 
        <Complete>
          <Text>승!!</Text>
          <Button onClick={onRestart}>다시 시작</Button>
        </Complete>
      }
    </div>
  );
}

export default App;
