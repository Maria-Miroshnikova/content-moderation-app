"use client"

import { useFilterAndSortContext } from '../context/index';
import cl from '../styles/PageAds.module.css';
import CardsFilterForm from './CardsFilterForm';
import CardsSortForm from './CardsSortForm';
import CardList from './CardList';
import { ICard, IFilter, ISort } from '../types/types';
import { useState } from 'react';
import { ECategory, EPriority, EStatus } from '../types/enums';
import { IGetAdsAnswer } from '../types/server_types';
import { mapAdToCard } from '../server/dto_to_ui_map';
import { useRouter } from 'next/navigation';

interface PageAdsClientProps {
    cards: ICard[]
}

function PageAdsClient({ cards }: PageAdsClientProps) {
    console.log(cards)
    const router = useRouter()
    const { filter, setFilter, sort, setSort, totalItems, setTotalItems } = useFilterAndSortContext()

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    function handleFilterChange(filter: IFilter) {
        //router.push(`/ads?category=${filter}`);
        setFilter(filter)
    }

    function handleSortChange(sort: ISort) {
        //router.push(`/ads?category=${filter}`);
        setSort(sort)
    }

    return (
        <div className={cl.card_list_layout}>
            <div className={cl.panel}>
                <CardsFilterForm filter={filter} changeFilter={handleFilterChange} />
                <CardsSortForm sortSettings={sort} changeSortSettings={handleSortChange} />
            </div>
            <CardList cards={cards} page={page} limit={limit} />
        </div>
    );
}

export default PageAdsClient;