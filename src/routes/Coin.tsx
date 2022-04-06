import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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

interface StateInterface {
  name: string;
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const state = location.state as StateInterface;
  return <Container>
  <Title>{state?.name || "Loading"}</Title>
  {loading ? "...loading" : null}
</Container>;
};

export default Coin;
