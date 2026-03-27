import cl from '../styles/PageAds.module.css';
import CardsFilterForm from '../components/CardsFilterForm';
import CardsSortForm from '../components/CardsSortForm';
import CardList from '../components/CardList';
import { ICard, IFilter, ISort } from '../types/types';
import { EPriority, EStatus } from '../types/enums';
import { IAdPagination, IAdResponse, IGetAdsAnswer, ISearchParams } from '../types/server_types';
import { mapAdToCard } from '../server/dto_to_ui_map';
import { makeUrlWithParams, reconstructSearchParamsFromUrl } from '../server/makeUrlParams';
import PageAdsClient from '../components/PageAdsClient';

async function AdsPage({ searchParams }: { searchParams: ISearchParams }) {

    const params: ISearchParams = await searchParams;
    reconstructSearchParamsFromUrl(params);

    const adsResponse: IAdResponse = await getAds(params)

    return (
        <div className={cl.AdsPage}>
            <PageAdsClient cards={adsResponse.cards} params={params} pagination={adsResponse.pagination} />
        </div>
    );
}

export default AdsPage;

async function getAds(params: ISearchParams) {
    const url = `http://localhost:3001/api/v1/ads`
    const url_with_params = makeUrlWithParams(params, url)

    const response = await fetch(url_with_params, {
        next: {
            revalidate: 60
        },

    })

    if (!response.ok) throw new Error("Unable to fetch ads")

    const response_json: IGetAdsAnswer = await response.json()
    //console.log(response_json)
    const cards: ICard[] = response_json.ads.map(mapAdToCard)
    const pagination: IAdPagination = response_json.pagination;
    const adsResponse : IAdResponse = {
        cards: cards,
        pagination: pagination
    }
    return adsResponse;
}