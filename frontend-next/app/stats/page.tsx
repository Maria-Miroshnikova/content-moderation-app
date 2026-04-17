
import Link from 'next/link';
import cl from '../../styles/StatisticsPage.module.css';
import { EPeriod, PERIOD_META, PERMISSIONS_META } from '../../types/enums';
import { getDefaultStatisticsPageParams, IActivityItemStats, IActivityResponse, ICategoriesStats, IDecisionStats, IModeratorInfoResponse, IStatisticsPageParams, IStatisticsResponse } from '../../types/server_types';
import { makeStatisticsPageParamsDefault, makeURLSearchParamsFromPageSearchParams } from '../../utils/makeUrlParamsFromLocalInterfaces';
import BarChart from '../../components/ui/BarChart';
import PieChart from '../../components/ui/PieChart';
import { Box, Chip, Container, Paper, Tab, Tabs, Typography } from '@mui/material';
import LinkTab from '../../components/ui/LinkTab';

interface StatisticsPageProps {
    searchParams: IStatisticsPageParams
}

async function StatisticsPage({ searchParams }: StatisticsPageProps) {
    const params = await searchParams;
    makeStatisticsPageParamsDefault(params);
    const url_params: URLSearchParams = makeURLSearchParamsFromPageSearchParams(params);

    const moderInfo: IModeratorInfoResponse = await getModeratorInfo();
    const statsInfo: IStatisticsResponse = await getStatisticsInfo(params.period);
    const activityInfo: IActivityItemStats[] = await getActivityInfo(params.period);

    const decisionInfo: IDecisionStats = await getDecisionsInfo(params.period);
    const categoriesInfo: ICategoriesStats = await getCategoriesInfo(params.period);

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
        <Container sx={{background: "white", display:'flex', flexDirection: 'column', gap: 2, paddingTop: 4, paddingBottom: 6}}>
            <Paper sx={{padding: 4, display: "flex", flexDirection: "column", gap: 2}} variant='outlined'>
                <Typography variant='h5'>Данные модератора</Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Typography variant='body1' color="info">Имя</Typography>
                        <Typography variant='body1' color="info">Почта</Typography>
                        <Typography variant='body1' color="info">Должность</Typography>
                        <Typography variant='body1' color="info">Доступные действия</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Typography variant='body1'>{moderInfo.name}</Typography>
                        <Typography variant='body1'>{moderInfo.email}</Typography>
                        <Typography variant='body1'>{moderInfo.role}</Typography>
                        <Box sx={{display: "flex", gap: 1}}>
                            {(moderInfo.permissions.map((p, id) =>
                                <Chip key={id} label={PERMISSIONS_META[p]} variant='outlined' color="info" sx={{background: "white"}}/>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Paper>

            <Container sx={{mb: 2}}>
                <Tabs value={params.period}>
                    <LinkTab label={PERIOD_META[EPeriod.TODAY].title} path={`/stats?${getUrlForPeriodButtons(EPeriod.TODAY)}`} />
                    <LinkTab label={PERIOD_META[EPeriod.WEEK].title} path={`/stats?${getUrlForPeriodButtons(EPeriod.WEEK)}`} />
                    <LinkTab label={PERIOD_META[EPeriod.MONTH].title} path={`/stats?${getUrlForPeriodButtons(EPeriod.MONTH)}`} />
                </Tabs>
            </Container>

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

            <div className={cl.graphic_container}>
                <BarChart
                    labels={activityInfo.map((g) => getFormatDateDM(g.date))}
                    values={activityInfo.map((g) => (g.rejected + g.approved + g.requestChanges))}
                    period={params.period}
                    label={"Количество обработанных объявлений"}
                />
            </div>

            <div className={cl.graphic_container}>
                <PieChart
                    approved={decisionInfo.approved}
                    rejected={decisionInfo.rejected}
                    requestChanges={decisionInfo.requestChanges}
                />
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <p>Одобрено: {Number(decisionInfo.approved.toFixed(1))}%</p>
                    <p>Отклонено: {Number(decisionInfo.rejected.toFixed(1))}%</p>
                    <p>Возвращено: {Number(decisionInfo.requestChanges.toFixed(1))}%</p>
                </div>
            </div>

            <div className={cl.graphic_container}>
                <BarChart
                    labels={Object.entries(categoriesInfo).map((i) => i[0])}
                    values={Object.entries(categoriesInfo).map((i) => i[1])}
                    period={params.period}
                    label={"Количество обработанных объявлений в категории"}
                />
            </div>

        </Container >
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
    return response_json;
}

async function getStatisticsInfo(period: EPeriod) {
    const url = `http://localhost:3001/api/v1/stats/summary`
    const response = await fetch(`${url}?${PERIOD_META[period].server}`, {
        next: {
            revalidate: 60
        },

    })
    if (!response.ok) throw new Error("Unable to fetch statistics info")
    const response_json: IStatisticsResponse = await response.json()
    return response_json;
}

async function getActivityInfo(period: EPeriod) {
    const url = `http://localhost:3001/api/v1/stats/chart/activity`
    //console.log("period: ", PERIOD_META[period].server)
    const response = await fetch(`${url}?${PERIOD_META[period].server}`, {
        next: {
            revalidate: 60
        },

    })
    if (!response.ok) throw new Error("Unable to fetch activity info")
    const response_json: IActivityItemStats[] = await response.json()
    return response_json;
}

async function getDecisionsInfo(period: EPeriod) {
    const url = `http://localhost:3001/api/v1/stats/chart/decisions`
    //console.log("period: ", PERIOD_META[period].server)
    const response = await fetch(`${url}?${PERIOD_META[period].server}`, {
        next: {
            revalidate: 60
        },

    })
    if (!response.ok) throw new Error("Unable to fetch decisions info")
    const response_json: IDecisionStats = await response.json()
    return response_json;
}

async function getCategoriesInfo(period: EPeriod) {
    const url = `http://localhost:3001/api/v1/stats/chart/categories`
    const response = await fetch(`${url}?${PERIOD_META[period].server}`, {
        next: {
            revalidate: 60
        },

    })
    if (!response.ok) throw new Error("Unable to fetch categories info")
    const response_json: ICategoriesStats = await response.json()
    return response_json;
}