"use client";

import { Paper, Typography } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";

interface ChartCardProps {
    xAxisValues?: string[],
    seriesValues?: number[],
    yLabel?: string,
    title: string,
    color?: string,
    isPie?: boolean,
    pieLables?: string[],
    pieData?: {
        id: number,
        value: number,
        label: string
    }[]
}

const ChartCard = ({ xAxisValues, seriesValues, yLabel, title, color, isPie, pieData, pieLables }: ChartCardProps) => {
    return (
        <Paper>
            <Typography variant='h6' align='center' sx={{ paddingTop: 2 }}>{title}</Typography>
            {isPie ?
                <PieChart
                    series={[
                        {
                            data: pieData
                        },
                    ]}
                    height={200}
                    width={300}
                    sx={{padding: 4}}
                />
                :
                <BarChart
                    series={[{ data: seriesValues, label: yLabel, color: color }]}
                    xAxis={[{ data: xAxisValues }]}
                    height={200}
                    width={600}
                    borderRadius={10}
                    sx={{ mr: 3}}
                />
            }
        </Paper>
    )
}

export default ChartCard;