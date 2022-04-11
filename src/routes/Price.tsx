import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "./api";

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

const DashBoardGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface IPriceProps {
  coinId: string;
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

const Price = ({ coinId }: IPriceProps) => {
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<ICoinTickers>(
      [coinId, "tickers"],
      () => fetchCoinTickers(coinId!),
      { refetchInterval: 1000 }
    );
  const isLoading = tickersLoading;
  const percentage24h = tickersData?.quotes.USD.percent_change_24h;
  const percentage7d = tickersData?.quotes.USD.percent_change_7d;
  const percentage30d = tickersData?.quotes.USD.percent_change_30d;
  const beta = tickersData?.beta_value;
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <DashBoardGrid>
          <DashBoard>
            <DashBoardItem>
              <span>LAST PRICE</span>
              <span>${tickersData?.quotes.USD.price.toFixed(2)}</span>
            </DashBoardItem>
            <DashBoardItem>
              <span>HIGHEST PRICE</span>
              <span>${tickersData?.quotes.USD.ath_price.toFixed(2)}</span>
            </DashBoardItem>
          </DashBoard>
          <DashBoard>
            <DashBoardItem
              positive={percentage24h! >= 0}
              negative={percentage24h! < 0}
            >
              <span>DAILY CHG</span>
              <span>{percentage24h}%</span>
            </DashBoardItem>
            <DashBoardItem
              positive={percentage7d! >= 0}
              negative={percentage7d! < 0}
            >
              <span>WEEKLY CHG</span>
              <span>{percentage7d}%</span>
            </DashBoardItem>
            <DashBoardItem
              positive={percentage30d! >= 0}
              negative={percentage30d! < 0}
            >
              <span>MONTHLY CHG</span>
              <span>{percentage30d}%</span>
            </DashBoardItem>
          </DashBoard>
          <DashBoard>
            <DashBoardItem>
              <span>MARKET CAP</span>
              <span>${tickersData?.quotes.USD.market_cap}</span>
            </DashBoardItem>
            <DashBoardItem
              positive={1.25 >= beta! && beta! >= 0.75}
              negative={1.25 < beta! || beta! < 0.75}
            >
              <span>BETA VALUE</span>
              <span>{beta}</span>
            </DashBoardItem>
          </DashBoard>
        </DashBoardGrid>
      )}
    </>
  );
};

export default Price;
