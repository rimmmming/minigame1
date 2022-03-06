import './App.css';
import styled from 'styled-components'
import Data from './Data';
import { useEffect, useState } from 'react';
import CardItem from './component/CardItem';

const Container = styled.div`
  width:480px;
  margin:15px auto 0;
`;
function App() {
  const [realData, setRealDate] = useState(Data);
  const [cards, setCards] = useState([...realData, ...realData]);

  useEffect(() => {
    function shuffle(arr){
      arr.sort(() => Math.random() - 0.5)
    }
    shuffle(cards)
  }, [])

  const onHandleClick = (item) => {
    console.log(item)
  }
  return (
    <div className="App">
      <h1>카드 맞추기 게임</h1>
      <Container>
        {
          cards.map( (item, i) => (
            <CardItem key={i} item={item} idx={i} onHandleClick={onHandleClick}/>
          ))
        }
      </Container>
    </div>
  );
}

export default App;
