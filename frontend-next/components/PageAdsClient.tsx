"use client"

import { useFilterAndSortContext } from '../context/index';
import cl from '../styles/PageAds.module.css';
import CardsFilterForm from './CardsFilterForm';
import CardsSortForm from './CardsSortForm';
import CardList from './CardList';
import { ICard, IFilter, ISort, IStates } from '../types/types';
import { useState } from 'react';
import { EPriority, EStatus } from '../types/enums';
import { IGetAdsAnswer, ISearchParams } from '../types/server_types';
import { mapAdToCard, mapISearchParamsToStates } from '../server/dto_to_ui_map';
import { useRouter } from 'next/navigation';
import { makeISearchParamsFromStates, makeUrlWithParams } from '../server/makeUrlParams';

interface PageAdsClientProps {
    cards: ICard[],
    params: ISearchParams
    //filter: IFilter,
    //sort: ISort
}

function PageAdsClient({ cards, params }: PageAdsClientProps) {
   // console.log(cards)
    const router = useRouter()
    //const { filter, setFilter, sort, setSort, totalItems, setTotalItems } = useFilterAndSortContext()

    const states: IStates = mapISearchParamsToStates(params);

    //const [page, setPage] = useState(1)
    //const [limit, setLimit] = useState(10)

    // TODO: категории пока что скорее всего не работают
    function handleFilterChange(filter: IFilter) {
        //setFilter(filter);
        //console.log(filter);
        let params: ISearchParams = makeISearchParamsFromStates(filter, states.sort, states.page, states.limit);
        console.log(params);
        let url_with_params = makeUrlWithParams(params, '/')//'/ads')
        router.replace(url_with_params);
    }

    function handleSortChange(sort: ISort) {
        //setSort(sort);
        let params: ISearchParams = makeISearchParamsFromStates(states.filter, sort, states.page, states.limit);
        let url_with_params = makeUrlWithParams(params, '/')
        router.replace(url_with_params);
    }

    return (
        <div className={cl.card_list_layout}>
            <div className={cl.panel}>
                <CardsFilterForm filter={states.filter} changeFilter={handleFilterChange} />
                <CardsSortForm sortSettings={states.sort} changeSortSettings={handleSortChange} />
            </div>
            <CardList cards={cards} page={states.page} limit={states.limit} />
        </div>
    );
}

export default PageAdsClient;