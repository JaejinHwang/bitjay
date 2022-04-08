import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";
import { fetchAllCoins } from "./api";

const Background = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin-bottom: 74px;
`;

const Title = styled.div`
  font-size: 40px;
  line-height: 50px;
  font-weight: 500;
  margin: 74px 0px;
  width: 350px;
  text-align: left;
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
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  width: 100%;
  border-radius: 24px;
  a {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    transition: color 0.2s ease-in;
    transition: filter 0.2s ease-in;
    font-size: 16px;
    font-weight: 400;
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

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DarkModeButton = styled.div`
  width: 50px;
  font-size: 20px;
  height: 50px;
  background: ${(props) => props.theme.cardColor};
  border: 1px solid ${(props) => props.theme.subTextColor};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  const isDarkAtomSetter = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const modeToggleFuction = () => isDarkAtomSetter((prev) => !prev);
  const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchAllCoins);
  return (
    <Background>
      <Container>
        <Helmet>
          <title>{isLoading ? "Loading..." : "BitJay"}</title>
        </Helmet>
        <Header>
          <Title>Coins</Title>
          <DarkModeButton onClick={modeToggleFuction}>
            {isDark ? (
              <i className="ri-moon-fill ri-1x"></i>
            ) : (
              <i className="ri-sun-fill ri-1x"></i>
            )}
          </DarkModeButton>
        </Header>
        {isLoading ? (
          "Loading..."
        ) : (
          <CoinList>
            {data?.slice(0, 100).map((item) => (
              <Coin key={item.id}>
                <Link to={`/${item.id}/price`} state={{ name: item.name }}>
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${item.id}.png`}
                    alt={item.id}
                  />
                  {item.name}
                </Link>
              </Coin>
            ))}
          </CoinList>
        )}
      </Container>
    </Background>
  );
};

export default Coins;
