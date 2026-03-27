"use client"

import { useFilterAndSortContext } from '../context/index';
import cl from '../styles/PageAds.module.css';
import CardsFilterForm from './CardsFilterForm';
import CardsSortForm from './CardsSortForm';
import CardList from './CardList';
import { ICard, IFilter, ISort, IStates, PAGE_DEFAULT } from '../types/types';
import { useState } from 'react';
import { EPriority, EStatus } from '../types/enums';
import { IAdPagination, IGetAdsAnswer, ISearchParams } from '../types/server_types';
import { mapAdToCard, mapISearchParamsToStates } from '../server/dto_to_ui_map';
import { useRouter } from 'next/navigation';
import { makeISearchParamsFromStates, makeUrlWithParams, makeUrlWithParamsNoDefault } from '../server/makeUrlParams';
import PaginationBar from './ui/PaginationBar';

interface PageAdsClientProps {
    cards: ICard[],
    params: ISearchParams,
    pagination: IAdPagination
}

function PageAdsClient({ cards, params, pagination }: PageAdsClientProps) {
    const states: IStates = mapISearchParamsToStates(params);

    return (
        <div className={cl.card_list_layout}>
            <div className={cl.panel}>
                <CardsFilterForm filter={states.filter}/>
                <CardsSortForm sortSettings={states.sort}/>
            </div>
            <CardList cards={cards} page={states.page} limit={states.limit} />
            <PaginationBar totalPages={pagination.totalPages} totalItems={pagination.totalItems} page={states.page}/>
        </div>
    );
}

export default PageAdsClient;