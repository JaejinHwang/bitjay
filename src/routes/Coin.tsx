import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import Chart from "./Chart";
import Price from "./Price";

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

const DashBoard = styled.div`
  width: 100%;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(100px, auto));
  gap: 20px;
`;

const DashBoardItem = styled.div<{
  positive?: boolean;
  negative?: boolean;
}>`
  background-color: ${(props) => props.theme.cardColor};
  display: flex;
  padding: 20px;
  border-radius: 16px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 16px;
  span:first-child {
    font-size: 12px;
    font-weight: 400;
    color: ${(props) => props.theme.accentColor};
  }
  span:last-child {
    font-size: 18px;
    line-height: 27px;
    font-weight: 500;
    color: ${(props) =>
      props.positive
        ? props.theme.positiveColor
        : props.negative
        ? props.theme.negativeColor
        : props.theme.textColor};
  }
`;

const Description = styled.div`
  margin: 20px 0px;
  width: 100%;
`;

const Picker = styled.div`
  margin: 40px auto;
  max-width: 343px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 4px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.cardColor};
`;

const PickerItem = styled.div<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive ? props.theme.buttonColor : null};
  color: ${(props) => props.theme.textColor};
  border-radius: 8px;
  width: 100%;
  padding: 8px;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  a {
    display: block;
  }
`;

interface IState {
  name: string;
}

interface ICoinInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  // tags: object;
  // team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  // links: object;
  // links_extended: object;
  // whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface ICoinTickers {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  const location = useLocation();
  const { coinId } = useParams();
  const state = location.state as IState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const {isLoading: infoLoading, data: infoData} = useQuery<ICoinInfo>([coinId, "info"], ()=>fetchCoinInfo(coinId!));
  const {isLoading: tickersLoading, data: tickersData} = useQuery<ICoinTickers>([coinId, "tickers"], ()=>fetchCoinTickers(coinId!));
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Title>
        {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
      </Title>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <DashBoard>
            <DashBoardItem>
              <span>RANK</span>
              <span>{infoData?.rank}</span>
            </DashBoardItem>
            <DashBoardItem>
              <span>SYMBOL</span>
              <span>{infoData?.symbol}</span>
            </DashBoardItem>
            <DashBoardItem
              positive={infoData?.is_active === true}
              negative={infoData?.is_active !== true}
            >
              <span>STATUS</span>
              <span>{infoData?.is_active ? "ACTIVE" : "INACTIVE"}</span>
            </DashBoardItem>
            <DashBoardItem>
              <span>SINCE</span>
              <span>
                {infoData?.started_at ? (
                  <>
                    {infoData?.started_at?.split("-")[0]}.
                    {infoData?.started_at?.split("-")[1]}.
                  </>
                ) : (
                  "UKN"
                )}
              </span>
            </DashBoardItem>
          </DashBoard>
          <Description>
            <DashBoardItem>
              <span>DESCRIPTION</span>
              <span>
                {infoData?.description
                  ? infoData?.description
                  : "There is no description about this coin."}
              </span>
            </DashBoardItem>
          </Description>
          <DashBoard>
            <DashBoardItem>
              <span>TOTAL SUPPLY</span>
              <span>{tickersData?.total_supply}</span>
            </DashBoardItem>
            {/* <DashBoardItem>
              <span>MAX SUPPLY</span>
              <span>{tickersData?.max_supply}</span>
            </DashBoardItem> */}
            <DashBoardItem>
              <span>CIRCULATING</span>
              <span>{tickersData?.circulating_supply}</span>
            </DashBoardItem>
          </DashBoard>
          <Picker>
            <PickerItem isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </PickerItem>
            <PickerItem isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </PickerItem>
          </Picker>
          <Routes>
            <Route path="/price" element={<Price />} />
            <Route path="/chart" element={<Chart coinId={coinId!} />} />
          </Routes>
        </>
      )}
    </Container>
  );
};

export default Coin;
