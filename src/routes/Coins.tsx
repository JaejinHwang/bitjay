import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {fetchAllCoins} from "./api";

const Container = styled.div`
  width: 100%;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0px auto;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 500;
  margin: 74px 0px;
  width: 100%;
  text-align: left;
  color: ${(props) => props.theme.textColor};
`;

const CoinList = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  width: 100%;
  border-radius: 24px;
  a {
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
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
      filter: grayscale(0%);
    }
  }
`;

const Img = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const {isLoading, data} = useQuery<ICoins[]>("allCoins", fetchAllCoins);
  return (
    <Container>
      <Title>Coins</Title>
      {isLoading ? (
        "Loading..."
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((item) => (
            <Coin key={item.id}>
              <Link to={`/${item.id}/chart`} state={{ name: item.name }}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${item.id}.png`}
                  alt={item.id}
                />
                {item.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
};

export default Coins;
