import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { ChartDataType } from "../../types/CommonTypes";
ChartJS.register(Title, Tooltip, ArcElement, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      onClick: () => null,
    },
  },
};

interface GenderChartProps {
  data: ChartDataType;
}

export default function GenderChart({ data }: GenderChartProps) {
  return <Pie data={data} options={options} />;
}
