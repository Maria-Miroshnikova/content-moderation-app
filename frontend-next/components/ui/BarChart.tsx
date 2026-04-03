"use client"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { EPeriod, PERIOD_META } from "../../types/enums";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

interface BarChartProps {
    labels: string[],
    values: number[],
    period: EPeriod,
    label: string
}

const BarChart = ({ labels, values, period, label }: BarChartProps) => {

    const data = {
        labels: labels,
        datasets: [
            {
                label: `${label} (${PERIOD_META[period].title})`,
                data: values,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }
        ]
    };

   // console.log("values: ", values)
   // console.log("labels: ", labels)
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,   // никаких дробей
                    stepSize: 1
                }
            }
        }
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;