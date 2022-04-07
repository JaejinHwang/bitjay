import { useQuery } from "react-query";
import { fetchCoinHistoricalPrice } from "./api";
import ApexChart from "react-apexcharts"

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

const Chart = ({coinId}: IChartProps) => {
  const {isLoading, data} = useQuery<IHistorical[]>([coinId, "historicalPrice"], ()=>fetchCoinHistoricalPrice(coinId))
  console.log(data);
  return <div>{isLoading ? "Loading..." : (
  <ApexChart
    type="line"
    series={[
      {
        name: "Price",
        data: data?.map((price) => price.close) ?? [],
      },
    ]}
    options={{
      theme: {
        mode: "dark",
      },
      chart: {
        height: 500,
        width: 500,
        toolbar: {
          show: false,
        },
        background: "transparent",
      },
      grid: { show: false },
      stroke: {
        curve: "smooth",
        width: 4,
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false },
      },
    }}
/>)}</div>;
};

export default Chart;
