
import Link from 'next/link';
import cl from '../../styles/StatisticsPage.module.css';
import { EPeriod, PERIOD_META, PERMISSIONS_META } from '../../types/enums';
import { getDefaultStatisticsPageParams, IActivityItemStats, ICategoriesStats, IDecisionStats, IModeratorInfoResponse, IStatisticsPageParams, IStatisticsResponse } from '../../types/server_types';
import { makeStatisticsPageParamsDefault, makeURLSearchParamsFromPageSearchParams } from '../../utils/makeUrlParamsFromLocalInterfaces';
import PieChart from '../../components/ui/PieChart';
import { Box, Chip, Container, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import LinkTab from '../../components/ui/LinkTab';

import ChartCard from '../../components/ui/ChardCard';

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
        <Container sx={{ background: "white", display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 4, paddingBottom: 6 }}>
            <Paper sx={{ padding: 4, display: "flex", flexDirection: "column", gap: 2 }} variant='outlined'>
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
                        <Box sx={{ display: "flex", gap: 1 }}>
                            {(moderInfo.permissions.map((p, id) =>
                                <Chip key={id} label={PERMISSIONS_META[p]} variant='outlined' color="info" sx={{ background: "white" }} />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Paper>

            <Container sx={{ mb: 2 }}>
                <Tabs value={params.period}>
                    <LinkTab label={PERIOD_META[EPeriod.TODAY].title} path={`/stats?${getUrlForPeriodButtons(EPeriod.TODAY)}`} />
                    <LinkTab label={PERIOD_META[EPeriod.WEEK].title} path={`/stats?${getUrlForPeriodButtons(EPeriod.WEEK)}`} />
                    <LinkTab label={PERIOD_META[EPeriod.MONTH].title} path={`/stats?${getUrlForPeriodButtons(EPeriod.MONTH)}`} />
                </Tabs>
            </Container>

            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 6, sm: 12, md: 12 }}>
                <Grid size={6} sx={{padding: 4}}>
                    <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 6, sm: 12, md: 12 }}>
                        <Grid size={6}>
                            <Paper sx={{ padding: 4, height: "100%" }}>
                                <Typography variant='body1' color='info' align='center'>Проверено</Typography>
                                <Typography variant='body1' color='info' align='center'>{params.period === EPeriod.TODAY
                                    ? statsInfo.totalReviewedToday
                                    : (params.period === EPeriod.WEEK
                                        ? statsInfo.totalReviewedThisWeek
                                        : (params.period === EPeriod.MONTH
                                            ? statsInfo.totalReviewedThisMonth
                                            : statsInfo.totalReviewedThisMonth
                                        ))}</Typography>
                            </Paper>
                        </Grid>
                        <Grid size={6}>
                            <Paper sx={{ padding: 4, height: "100%" }}>
                                <Typography variant='body1' color='info' align='center'>Одобрено</Typography>
                                <Typography variant='body1' color='info' align='center'>{Number(statsInfo.approvedPercentage.toFixed(1))} %</Typography>
                            </Paper>
                        </Grid>
                        <Grid size={6}>
                            <Paper sx={{ padding: 4, height: "100%" }}>
                                <Typography variant='body1' color='info' align='center'>Отклонено</Typography>
                                <Typography variant='body1' color='info' align='center'>{Number(statsInfo.rejectedPercentage.toFixed((1)))} %</Typography>
                            </Paper>
                        </Grid>
                        <Grid size={6}>
                            <Paper sx={{ padding: 4, height: "100%" }}>
                                <Typography variant='body1' color='info' align='center'>Ср. время</Typography>
                                <Typography variant='body1' color='info' align='center'>{getMinutes(statsInfo.averageReviewTime)}</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid size={6}>
                    <ChartCard
                        xAxisValues={activityInfo.map((g) => getFormatDateDM(g.date))}
                        seriesValues={activityInfo.map((g) => (g.rejected + g.approved + g.requestChanges))}
                        yLabel='обработано объявлений за день'
                        title={`Активность ${PERIOD_META[params.period].title}`}
                        color={'#90caf9'}
                    />
                </Grid>
                <Grid size={6}>
                    <ChartCard
                        isPie={true}
                        title={'Принятые решения'}
                        pieData={
                            [
                                { id: 0, value: decisionInfo.approved, label: "одобрено" },
                                { id: 1, value: decisionInfo.rejected, label: "отклонено" },
                                { id: 2, value: decisionInfo.requestChanges, label: "возвращено" }
                            ]
                        }
                    />
                </Grid>
                <Grid size={6}>
                    <ChartCard
                        xAxisValues={Object.entries(categoriesInfo).map((i) => i[0])}
                        seriesValues={Object.entries(categoriesInfo).map((i) => i[1])}
                        yLabel='обработано объявлений в категории'
                        title={'Активность по категориям'}
                    />
                </Grid>
            </Grid>

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