
import Link from 'next/link';
import cl from '../../styles/StatisticsPage.module.css';
import { EPeriod, PERIOD_META, PERMISSIONS_META } from '../../types/enums';
import { getDefaultStatisticsPageParams, IModeratorInfoResponse, IStatisticsPageParams, IStatisticsResponse } from '../../types/server_types';
import { makeStatisticsPageParamsDefault, makeURLSearchParamsFromPageSearchParams } from '../../utils/makeUrlParamsFromLocalInterfaces';

/*export const PERIOD = ["today", "week", "month", "custom"]
export const PERIOD_TODAY = 0;
export const PERIOD_WEEK = 1;
export const PERIOD_MONTH = 2;
export const PERIOD_CUSTOM = 3;*/
//export const PERIOD_TOTAL = 4;

/*const DEFAULT_ACTIVITY_ITEM = {
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
*/

interface StatisticsPageProps {
    searchParams: IStatisticsPageParams
}

async function StatisticsPage({ searchParams }: StatisticsPageProps) {
    const params = await searchParams;
    makeStatisticsPageParamsDefault(params);
   // console.log("get params: ", params)
    const url_params: URLSearchParams = makeURLSearchParamsFromPageSearchParams(params);

    const moderInfo: IModeratorInfoResponse = await getModeratorInfo();
    const statsInfo: IStatisticsResponse = await getStatisticsInfo(params.period);

    function getUrlForPeriodButtons(period: EPeriod) {
        if (period == getDefaultStatisticsPageParams().period) {
            //console.log("url with default period: ", params, params.toString())
            const newParams = new URLSearchParams(url_params.toString());
            newParams.delete('period');
            return newParams.toString();
        }

        const newParams = new URLSearchParams(url_params.toString());
        newParams.set('period', period.toString());
        return newParams.toString();
    }

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

    return (
        <div className={cl.stats_page_layout}>

            <div className={cl.moder_panel}>
                <p><b>Данные модератора</b></p>
                <div style={{ display: "flex", gap: "20px" }}>
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
                        <p>{(moderInfo.permissions.map(p => PERMISSIONS_META[p])).join(", ")}</p>
                    </div>
                </div>
            </div>

            <div className={cl.period_panel}>
                <p>Период: </p>
                <div className={cl.period_btns_container}>
                    <Link href={`/stats?${getUrlForPeriodButtons(EPeriod.TODAY)}`} className={
                        params.period === EPeriod.TODAY
                            ? [cl.btn_current, cl.btn].join(' ')
                            : cl.btn
                    }>
                        {PERIOD_META[EPeriod.TODAY].title}
                    </Link>
                    <Link href={`/stats?${getUrlForPeriodButtons(EPeriod.WEEK)}`} className={
                        params.period === EPeriod.WEEK
                            ? [cl.btn_current, cl.btn].join(' ')
                            : cl.btn
                    }
                    >{PERIOD_META[EPeriod.WEEK].title}
                    </Link>
                    <Link href={`/stats?${getUrlForPeriodButtons(EPeriod.MONTH)}`} className={
                        params.period === EPeriod.MONTH
                            ? [cl.btn_current, cl.btn].join(' ')
                            : cl.btn
                    }
                    >{PERIOD_META[EPeriod.MONTH].title}
                    </Link>

                </div>
            </div>

            <div className={cl.stats_layout}>
                <div className={cl.stats_container}>
                    <div className={cl.stats_panel}>
                        <p>Проверено</p>
                        <p>{params.period === EPeriod.TODAY
                            ? statsInfo.totalReviewedToday
                            : (params.period === EPeriod.WEEK
                                ? statsInfo.totalReviewedThisWeek
                                : (params.period === EPeriod.MONTH
                                    ? statsInfo.totalReviewedThisMonth
                                    : statsInfo.totalReviewedThisMonth
                                ))}</p>
                    </div>
                    <div className={cl.stats_panel}>
                        <p>Одобрено</p>
                        <p>{Number(statsInfo.approvedPercentage.toFixed(1))} %</p>
                    </div>
                </div>
                <div className={cl.stats_container}>
                    <div className={cl.stats_panel}>
                        <p>Отклонено</p>
                        <p>{Number(statsInfo.rejectedPercentage.toFixed((1)))} %</p>
                    </div>
                    <div className={cl.stats_panel}>
                        <p>Ср. время</p>
                        <p>{getMinutes(statsInfo.averageReviewTime)}</p>
                    </div>
                </div>
            </div>


        </div >
    );
}

export default StatisticsPage;

async function getModeratorInfo() {
    const url = `http://localhost:3001/api/v1/moderators/me`

    const response = await fetch(url, {
        next: {
            revalidate: 60
        },

    })

    if (!response.ok) throw new Error("Unable to fetch moderator info")

    const response_json: IModeratorInfoResponse = await response.json()
    //    console.log(response_json)

    return response_json;
}

async function getStatisticsInfo(period: EPeriod) {
    const url = `http://localhost:3001/api/v1/stats/summary`
    //console.log("period: ", PERIOD_META[period].server)
    const response = await fetch(`${url}?${PERIOD_META[period].server}`, {
        next: {
            revalidate: 60
        },

    })

    if (!response.ok) throw new Error("Unable to fetch statistics info")

    const response_json: IStatisticsResponse = await response.json()
    console.log(response_json)

    return response_json;
}



/*

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


    // totalMonth = 0, totalWeek = 0, totalToday = 3 - это КАК? Вопрос к API
    return (
        <div className={cl.stats_page_layout}>
            
            
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


*/