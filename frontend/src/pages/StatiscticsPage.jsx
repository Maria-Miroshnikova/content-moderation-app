import axios from "axios"
import { useFetching } from "../hooks/useFetching"
import cl from "./StatisticsPage.module.css"
import Service from "../API/Service"
import { useEffect, useState } from "react"

export const PERIOD = ["today", "week", "month", "custom"]
export const PERIOD_TODAY= 0;
export const PERIOD_WEEK = 1;
export const PERIOD_MONTH = 2;
export const PERIOD_CUSTOM = 3;

const StatisticsPage = () => {

    const [stats, setStats] = useState({
        "approvedPercentage": 0,
        "rejectedPercentage": 0,
        "averageReviewTime": 0,
        "totalReviewed": 0,
        "totalReviewedThisMonth": 0,
        "totalReviewedThisWeek": 0,
        "totalReviewedToday": 3,

    })

    const [period, setPeriod] = useState(PERIOD_MONTH)

    const [fetchStats, isLoadingStats, errorStats] = useFetching(async () => {
        const response = await Service.getStats(PERIOD[period], null, null);
        console.log(response.data)
        setStats(response.data)
    })

    useEffect(() => {
        fetchStats()
    }, [period])

    const getMinutes = (ms) => {
        let minutes = (ms / 1000) / 60;      // в минуты
        let roundedMinutes = Math.round(minutes * 10) / 10;
        return roundedMinutes
    }

    // totalMonth = 0, totalWeek = 0, totalToday = 3 - это КАК?
    return (
        <div className={cl.stats_page_layout}>
            <div className={cl.period_panel}>
                <p>Период: </p>
                <div className={cl.period_btns_container}>
                    <button className={
                        period === PERIOD_TODAY
                            ? [cl.btn_current, cl.btn].join(' ')
                            : cl.btn
                    }
                        onClick={() => { setPeriod(PERIOD_TODAY) }}
                    >Сегодня</button>
                    <button className={
                        period === PERIOD_WEEK
                            ? [cl.btn_current, cl.btn].join(' ')
                            : cl.btn
                    }
                        onClick={() => { setPeriod(PERIOD_WEEK) }}
                    >7д</button>
                    <button className={
                        period === PERIOD_MONTH
                            ? [cl.btn_current, cl.btn].join(' ')
                            : cl.btn
                    }
                        onClick={() => { setPeriod(PERIOD_MONTH) }}
                    >30д</button>
                </div>
            </div>
            

            <div className={cl.stats_layout}>
                <div className={cl.stats_container}>
                    <div className={cl.stats_panel}>
                        <p>Проверено</p>
                        <p>{period === PERIOD_TODAY
                        ? stats.totalReviewedToday
                        : (period === PERIOD_WEEK
                            ? stats.totalReviewedThisWeek
                            : stats.totalReviewedThisMonth
                        )}</p>
                    </div>
                    <div className={cl.stats_panel}>
                        <p>Одобрено</p>
                        <p>{Number(stats.approvedPercentage.toFixed(1))} %</p>
                    </div>
                </div>
                <div className={cl.stats_container}>
                    <div className={cl.stats_panel}>
                        <p>Отклонено</p>
                        <p>{Number(stats.rejectedPercentage.toFixed((1)))} %</p>
                    </div>
                    <div className={cl.stats_panel}>
                        <p>Ср. время</p>
                        <p>{getMinutes(stats.averageReviewTime)} мин</p>
                    </div>
                </div>
            </div>

            <div className={cl.graphic_container}>
                график активности
            </div>
            <div className={cl.graphic_container}>
                график решений
            </div>


        </div>
    )
}

export default StatisticsPage;