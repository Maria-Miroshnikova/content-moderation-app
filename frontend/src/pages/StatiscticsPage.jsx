import axios from "axios"
import { useFetching } from "../hooks/useFetching"
import cl from "./StatisticsPage.module.css"
import Service from "../API/Service"
import { useEffect, useState } from "react"
import BarChart from "../components/ui/BarChart"
import PieChart from "../components/ui/PieChart"

export const PERIOD = ["today", "week", "month", "custom"]
export const PERIOD_TODAY = 0;
export const PERIOD_WEEK = 1;
export const PERIOD_MONTH = 2;
export const PERIOD_CUSTOM = 3;
//export const PERIOD_TOTAL = 4;

const DEFAULT_ACTIVITY_ITEM = {
    "date": 0,
    "approved": 0,
    "rejected": 0,
    "requestChanges": 0
}

const DEFAULT_DECISION = {
    "approved": 0,
    "rejected": 0,
    "requestChanges": 0
}

const DEFAULT_MODERINFO = {
    "name": "",
    "email": "",
    "role": "",
    "permissions": ""
}

const PERSMISSION = ['approve_ads', 'reject_ads', 'request_changes', 'view_stats']

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

    const [moderInfo, setModerInfo] = useState(DEFAULT_MODERINFO)

    const [graphic, setGraphic] = useState([])

    const [period, setPeriod] = useState(PERIOD_MONTH)

    const [decisions, setDecision] = useState(DEFAULT_DECISION)

    const [categories, setCategories] = useState({})

    const [fetchModer, isLoadingModer, errorModer] = useFetching(async () => {
        const response = await Service.getModerator();
       // console.log("moder: ", response.data)
        setModerInfo(response.data)
    })

    const [fetchStats, isLoadingStats, errorStats] = useFetching(async () => {
        const response = await Service.getStats(PERIOD[period], null, null);
       // console.log("stats: ", response.data)
        setStats(response.data)
    })

    const [fetchActivity, isLoadingActivity, errorActivity] = useFetching(async () => {
        const response = await Service.getActivityGraphic(PERIOD[period], null, null);
        setGraphic(response.data)
       // console.log("activity: ", response.data)
    })

    const [fetchDecisions, isLoadingDecisions, errorDecisions] = useFetching(async () => {
        const response = await Service.getDecisionGraphic(PERIOD[period], null, null);
        setDecision(response.data)
     //   console.log("decision: ", response.data)
    })

    const [fetchCategories, isLoadingCategories, errorCategories] = useFetching(async () => {
        const response = await Service.getCategoryGraphic(PERIOD[period], null, null);
        setCategories(response.data)
       // console.log("categories: ", response.data)
    })

    useEffect(() => {
        fetchModer()
    }, [])

    useEffect(() => {
        fetchStats()
        fetchActivity()
        fetchDecisions()
        fetchCategories()
    }, [period])

    const getMinutes = (ms) => {
        if (!ms || ms < 0) return "0 мин 0.0 сек";

        const totalSeconds = ms / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = +((totalSeconds % 60).toFixed(1)); // 1 знак после запятой

        return `${minutes} мин ${seconds} сек`;
    };

    const getFormatDateDM = (dateStr) => {
        const d = new Date(dateStr);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        return `${day}.${month}`;
    };

    const getPermisson = (permission) => {
        const result = []
        if (permission.includes(PERSMISSION[0]))
            result.push("Одобр.")
        if (permission.includes(PERSMISSION[1]))
            result.push("Отклон.")
        if (permission.includes(PERSMISSION[2]))
            result.push("Возврат")
        return result.join(" ")
    }

    // totalMonth = 0, totalWeek = 0, totalToday = 3 - это КАК? Вопрос к API
    return (
        <div className={cl.stats_page_layout}>

            <div className={cl.moder_panel}>
                <p><b>Данные модератора</b></p>
                <div style={{ display: "flex", gap:"20px"}}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <p>Имя:</p>
                        <p>Почта:</p>
                        <p>Должность:</p>
                        <p>Доступные действия:</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <p>{moderInfo.name}</p>
                        <p>{moderInfo.email}</p>
                        <p>{moderInfo.role}</p>
                        <p>{getPermisson(moderInfo.permissions)}</p>
                    </div>
                </div>
            </div>

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
                                : (period === PERIOD_MONTH
                                    ? stats.totalReviewedThisMonth
                                    : stats.totalReviewedThisMonthd
                                ))}</p>
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
                        <p>{getMinutes(stats.averageReviewTime)}</p>
                    </div>
                </div>
            </div>

            <div className={cl.graphic_container}>
                <BarChart
                    labels={graphic.map((g) => getFormatDateDM(g.date))}
                    values={graphic.map((g) => (g.rejected + g.approved + g.requestChanges))}
                    period={period}
                    label={"Количество обработанных объявлений"}
                />
            </div>
            <div className={cl.graphic_container}>
                <PieChart
                    approved={decisions.approved}
                    rejected={decisions.rejected}
                    requestChanges={decisions.requestChanges}
                />
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <p>Одобрено: {Number(decisions.approved.toFixed(1))}%</p>
                    <p>Отклонено: {Number(decisions.rejected.toFixed(1))}%</p>
                    <p>Возвращено: {Number(decisions.requestChanges.toFixed(1))}%</p>
                </div>
            </div>

            <div className={cl.graphic_container}>
                <BarChart
                    labels={Object.entries(categories).map((i) => i[0])}
                    values={Object.entries(categories).map((i) => i[1])}
                    period={period}
                    label={"Количество обработанных объявлений в категории"}
                />
            </div>


        </div >
    )
}

export default StatisticsPage;