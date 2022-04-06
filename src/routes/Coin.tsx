import { useParams } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const Coin = () => {
  const { coinId } = useParams();
  console.log("test");
  return <Title>Coin name: {coinId}</Title>;
};

export default Coin;
