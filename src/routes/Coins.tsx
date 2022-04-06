import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  max-width: 480px;
  margin: 40px auto;
`;

const Title = styled.div`
  font-size: 48px;
  font-weight: 500;
  color: ${props => props.theme.accentColor};
`;

const CoinList = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Coin = styled.li`
background-color: ${props => props.theme.textColor};
color: ${props => props.theme.bgColor};
width: 100%;
border-radius: 24px;
a{
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  transition: color 0.2s ease-in;
  transition: filter 0.2s ease-in;
  font-size: 16px;
  font-weight: medium;
  filter: grayscale(100%);
}
&:hover{
  a{
    color: ${props => props.theme.accentColor};
    filter: grayscale(0%);
  }
}
`;

const Img = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

interface CoinInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

const Coins = () => {
  const [data, setData] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setData(json.slice(0, 100));
      setLoading(false);
    })();
  },[])
  return <Container>
    <Title>Coins</Title>
    {loading ? "...loading" : (<CoinList>
      {data.map((item, index) => 
      <Coin key={item.id}>
        <Link to={`/${item.symbol}`} state={{name: item.name}}>
          {index+1}.
          <Img src={`https://cryptocurrencyliveprices.com/img/${item.id}.png`} alt={item.id} />
          {item.name} &rarr;
        </Link>
      </Coin>)}
    </CoinList>)}
  </Container>;
};

export default Coins;
