import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Info from "./components/Info";
import Spinner from "./components/Spinner";
import backgroundImg from './img/imagen-criptos.png'

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media(min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto auto;
  }
`;

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const App = () => {
  const [coins, setCoins] = useState({})
  const [info, setInfo] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(Object.keys(coins).length !== 0){
      const getCrypto = async ()=> {
        setLoading(true)
        setInfo({})
        const {coin, crypto} = coins
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`
        let result = await fetch(url)
        result = await result.json()
        setInfo(result.DISPLAY[crypto][coin])
        setLoading(false)
      }
      getCrypto()
    }
  },[coins])

  return (
    <Container>
      <Image src={backgroundImg} alt="Criptomonedas"/>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Form
          setCoins={setCoins}
        />
        {loading && <Spinner/>}
        {info.PRICE && (<Info info={info}/>)}
      </div>
    </Container>
  );
};

export default App;
