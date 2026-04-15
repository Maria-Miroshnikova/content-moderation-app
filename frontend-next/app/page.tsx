import cl from '../styles/PageAds.module.css';
import CardsFilterForm from '../components/CardsFilterForm';
import CardsSortForm from '../components/CardsSortForm';
import CardList from '../components/CardList';
import { ICard, IFilter, ISort, IStates } from '../types/local_types';
import { EPriority, EStatus } from '../types/enums';
import { IAdPagination, IAdResponse, IGetAdsAnswer, ISearchParams } from '../types/server_types';
import { mapAdToCard, mapISearchParamsToStates } from '../utils/mapServerResponseOrUrlParamsToLocalInterfaces';
import { makeUrlSearchParamsForServer, makeUrlFromParamsCombo, reconstructSearchParamsFromUrl, makeUrlCurrentPageParams, makeUrlSearchParamsNoDefault } from '../utils/makeUrlParamsFromLocalInterfaces';
import PaginationBar from '../components/ui/PaginationBar';
import { ICurrentPageParamsFull } from './[id]/page';
import Form from '../components/ui/Form';
import { Box, Container, Grid } from '@mui/material';
import FilterAndSortForm from '../components/FilterAndSortForm';


async function AdsPage({ searchParams }: { searchParams: ISearchParams }) {

    const params: ISearchParams = await searchParams;
    reconstructSearchParamsFromUrl(params);

    const adsResponse: IAdResponse = await getAds(params)

    const states: IStates = mapISearchParamsToStates(params);

    return (
        <Box sx={{ background: "#f5f5f5", paddingBottom: 4 }}>
            <Container sx={{
                width: "80%",
                mx: "auto"
            }}>
                <Container sx={{ mb: 4, background: "#e3f2fd", padding: 4 }}>
                    <CardsFilterForm filter={states.filter} sortSettings={states.sort}/>
                </Container>
                <CardList cards={adsResponse.cards} page={states.page} limit={states.limit} totalItems={adsResponse.pagination.totalItems} params={params} />
                <PaginationBar totalPages={adsResponse.pagination.totalPages} totalItems={adsResponse.pagination.totalItems} page={states.page} />
            </Container>
        </Box>
    );
}

export default AdsPage;

async function getAds(params: ISearchParams) {
    const url = `http://localhost:3001/api/v1/ads`
    //console.log("params from reconstruct", params)
    const url_params: URLSearchParams = makeUrlSearchParamsForServer(params)
    const url_with_params: string = makeUrlFromParamsCombo(url_params.toString(), url)

    const response = await fetch(url_with_params, {
        next: {
            revalidate: 60
        },

    })

    if (!response.ok) throw new Error("Unable to fetch ads")

    const response_json: IGetAdsAnswer = await response.json()
    const cards: ICard[] = response_json.ads.map(mapAdToCard)
    const pagination: IAdPagination = response_json.pagination;
    const adsResponse: IAdResponse = {
        cards: cards,
        pagination: pagination
    }
    return adsResponse;
}