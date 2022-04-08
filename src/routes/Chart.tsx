import { useQuery } from "react-query";
import { fetchCoinHistoricalPrice } from "./api";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isCandleAtom, isDarkAtom } from "../atoms";

const ChartContainer = styled.div``;

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
    font-size: 16px;
    font-weight: 500;
  }
`;

const DashBoardFunction = styled.span`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const DashBoardFunctionButton = styled.div`
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  font-size: 24px;
`;

interface IChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = ({ coinId }: IChartProps) => {
  const isCandle = useRecoilValue(isCandleAtom);
  const isCandleSetter = useSetRecoilState(isCandleAtom);
  const candleToggleFunction = () => isCandleSetter((prev) => !prev);
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    [coinId, "historicalPrice"],
    () => fetchCoinHistoricalPrice(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <DashBoardItem>
          <DashBoardFunction>
            <div>{isCandle ? "CANDLE CHART" : "LINE CHART"}</div>
            <DashBoardFunctionButton onClick={candleToggleFunction}>
              {isCandle ? (
                <i className="ri-stock-line"></i>
              ) : (
                <i className="ri-line-chart-line"></i>
              )}
            </DashBoardFunctionButton>
          </DashBoardFunction>
          {isCandle ? (
            <ReactApexChart
              // style={{
              //   borderRadius: 16,
              //   backgroundColor: "rgba(118, 118, 128, 0.24)",
              //   padding: "30px",
              // }}
              width={400}
              type="candlestick"
              series={[
                {
                  data:
                    data?.map((item) => {
                      return {
                        x: item!.time_close,
                        y: [
                          Number(item.open),
                          Number(item.high),
                          Number(item.low),
                          Number(item.close),
                        ],
                      };
                    }) ?? [],
                },
              ]}
              options={{
                theme: {
                  mode: isDark ? "dark" : "light",
                },
                stroke: {
                  show: true,
                  width: 3,
                },
                fill: {
                  type: "solid",
                },
                plotOptions: {
                  candlestick: {
                    colors: {
                      upward: "#00b894",
                      downward: "#ff7675",
                    },
                  },
                },
              }}
            />
          ) : (
            <ReactApexChart
              // style={{
              //   borderRadius: 16,
              //   backgroundColor: "rgba(118, 118, 128, 0.24)",
              //   padding: "30px",
              // }}
              width={400}
              type="line"
              series={[
                {
                  name: "Price",
                  data: data?.map((price) => price.close) ?? [],
                },
              ]}
              options={{
                fill: {
                  type: "gradient",
                  gradient: {
                    gradientToColors: ["#fbc7d4"],
                    type: "diagonal2",
                    stops: [0, 100],
                  },
                },
                colors: ["#9796f0"],
                theme: {
                  mode: isDark ? "dark" : "light",
                },
                chart: {
                  parentHeightOffset: 0,
                  fontFamily: "Poppins, sans-serif",
                  height: "auto",
                  toolbar: {
                    show: false,
                  },
                  background: "transparent",
                },
                grid: { show: false },
                stroke: {
                  curve: "smooth",
                  width: 5,
                },
                yaxis: {
                  show: false,
                },
                xaxis: {
                  type: "datetime",
                  axisBorder: { show: false },
                  axisTicks: { show: false },
                  labels: { show: false },
                  categories: data?.map((price) => price.time_close),
                },
                tooltip: {
                  y: {
                    formatter: (value) => `$${value.toFixed(2)}`,
                  },
                },
              }}
            />
          )}
        </DashBoardItem>
      )}
    </div>
  );
};

export default Chart;
