import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { PERIOD_MONTH, PERIOD_TODAY, PERIOD_WEEK } from "../../pages/StatiscticsPage";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

const BarChart = ({ labels, values, period, label }) => {

    const getLabel = () => {
        if (period === PERIOD_TODAY)
            return "за сегодня"
        else if (period === PERIOD_WEEK)
            return "за неделю"
        else if (period === PERIOD_MONTH)
            return "за месяц"
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: `${label} (${getLabel()})`,
                data: values,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }
        ]
    };

    console.log("values: ", values)
    console.log("labels: ", labels)
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