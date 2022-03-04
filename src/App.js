import './App.css';
import styled from 'styled-components'

const Container = styled.div`
  margin-top:15px;
`;
const Button = styled.button`
  position:relative;
  display:inline-block;
  width:100px;
  height:150px;
  margin:0 10px;
  line-height:150px;
  text-align:center;
  border:1px solid #000;
  border-radius:5px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  ${(props) => (props.active ? 'transform: rotateY(180deg)' : '')}
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

function App() {
  const initialCard = [1,2,3,4];
  const gameCard = [...initialCard, ...initialCard];
  function shuffle(arr){
    arr.sort(() => Math.random() - 0.5)
  }

  shuffle(gameCard)
  console.log(gameCard)

  const handleClick = () => {
    
  }
  return (
    <div className="App">
      <h1>카드 맞추기 게임</h1>
      <button type="button">시작!!</button>
      <Container>
        <Button onClick={handleClick}>
          <Card front></Card>
          <Card back>1</Card>
        </Button>
        <Button>
          <Card front></Card>
          <Card back>2</Card>
        </Button>
        <Button>
          <Card front></Card>
          <Card back>3</Card>
        </Button>
        <Button>
          <Card front></Card>
          <Card back>4</Card>
        </Button>
      </Container>
    </div>
  );
}

export default App;
