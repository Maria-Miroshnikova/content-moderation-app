"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface PieChartProps {
    approved: number,
    rejected: number,
    requestChanges: number
}

const PieChart = ({ approved, rejected, requestChanges }: PieChartProps) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
            type: "pie",      // или "doughnut"
            data: {
                labels: ["Одобрено", "Отклонено", "Запрошены изменения"],
                datasets: [
                    {
                        data: [approved, rejected, requestChanges],
                        backgroundColor: [
                            "rgba(75, 192, 192, 0.7)",
                            "rgba(255, 99, 132, 0.7)",
                            "rgba(255, 206, 86, 0.7)"
                        ]
                    }
                ]
            }
        });

        return () => chartRef.current?.destroy();
    }, [approved, rejected, requestChanges]);

    return <canvas ref={canvasRef}  style={{ width: "100%", height: "100%" }} />;
};

export default PieChart;