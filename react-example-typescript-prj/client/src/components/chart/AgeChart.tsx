import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { ChartDataType } from "../../types/CommonTypes";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface AgeChartProps {
  data: ChartDataType;
}

export default function AgeChart({ data }: AgeChartProps) {
  return (
    <Bar
      data={data}
      options={{
        responsive: false,
        plugins: {
          legend: { onClick: () => null, display: false },
        },
        scales: {
          y: {
            min: 0,
            max: 100,
          },
        },
        maintainAspectRatio: false,
      }}
      height={"320px"}
      width={"400px"}
    />
  );
}
