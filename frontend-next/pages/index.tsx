import { useFilterAndSortContext } from '../context/index';
import cl from '../styles/PageAds.module.css';
import CardsFilterForm from '../components/CardsFilterForm';
import CardsSortForm from '../components/CardsSortForm';
import CardList from '../components/CardList';
import { ICard } from '../types/types';
import { useState } from 'react';
import { ECategory, EPriority, EStatus } from '../types/enums';



/*import { useContext, useEffect, useMemo, useState } from 'react';
import './AdsPage.css';
import PaginationBar from '../components/ui/PaginationBar';
import CardList from '../components/CardList';
import CardsSortForm from '../components/CardsSortForm';
import CardsFilterForm from '../components/CardsFilterForm';
import { useFetching } from '../hooks/useFetching';
import Service from '../API/Service';
import { FilterAndSortContext } from '../context';

export const STATUS_INPRROCESS = 0;
export const STATUS_ACCEPTED = 1;
export const STATUS_DECLINED = 2;
export const STATUS_DRAFT = 3;

export const PRIORITY_HIGH = 1;
export const PRIORITY_USUAL = 0;


export const SORT_DEFAULT = -1;
export const SORT_DATE = 0;
export const SORT_COST = 1;
export const SORT_PRIORITY = 2;
export const SORT_NAMES = [
    "По дате",
    "По цене",
    "По приоритету"
]

// а как сделать оптимальный массив?
//export const CATEGORIES = {}

export const STATUSES = [
    "pending", "approved", "rejected", "draft"
]*/

const AdsPage = () => {

    /* const [cards, setCards] = useState([])
 
     const [totalPages, setTotalPages] = useState()
     const [page, setPage] = useState(1)
     const [limit, setLimit] = useState(10)
 
     const { filter, setFilter, sort, setSort, totalItems, setTotalItems } = useContext(FilterAndSortContext)
 
     const [categoriesDict, setCategoriesDict] = useState({})
 
     const [fetchCards, isCardsLoading, error] = useFetching(async (limit, page, filter, sort) => {
         const response = await Service.getAll(limit, page, filter, sort)
         const form = Service.getFormattedCards(response.data)
         setCards(form)
         //console.log(form)
         setTotalItems(response.data.pagination.totalItems)
         setTotalPages(response.data.pagination.totalPages)
         //console.log("total pages: ", response.data.pagination.totalPages)
     })
 
     const [fetchCategories, isCatigoriesLoading, errorCategories] = useFetching(async (limit, page) => {
         const categories = await Service.getCategories(page, limit)
         setCategoriesDict(categories)
     })
 
     useEffect(() => {
         setPage(1);
     }, [filter, sort]);
 
     useEffect(() => {
         fetchCards(limit, page, filter, sort) //(limit, page)
         //console.log("sort changed: ", sort)
     }, [filter, sort, page, limit])
 
     useEffect(() => {
         if ((totalItems === undefined) || (filter !== FILTER_DEFAULT)) {
 
         }
         else
             fetchCategories(totalItems, 1)
     }, [totalItems])
 */

    /*
    
    <div className='panel'>
                        <CardsFilterForm filter={filter} setFilter={setFilter} categories={categoriesDict} />
                        <CardsSortForm sortSettings={sort} setSortSettings={setSort} />
                    </div>
    
                    {isCardsLoading && <p>LOADING . . .</p>}
                    {error && <p>{error}</p>}
                    {!isCardsLoading && !error && <CardList cards={cards} page={page} limit={limit} />}
    
                    <PaginationBar totalPages={totalPages} totalItems={totalItems} page={page} setPage={setPage} />
    */

    const [cards, setCards] = useState<ICard[]>([
        {
            id: 1,
            title: "kklklklk",
            cost: 100,
            priority: EPriority.HIGH,
            status: EStatus.ACCEPTED,
            date: "10.10.1000",
            category: ECategory.AUTO,
            categoryName: "Авто", // TODO: нужно ли?
            img: null
        },
        {
            id: 2,
            title: "fps sd;fje e",
            cost: 450,
            priority: EPriority.USUAL,
            status: EStatus.DECLINED,
            date: "52.41.1000",
            category: ECategory.HOBBY,
            categoryName: "Хобби", // TODO: нужно ли?
            img: null
        },
        {
            id: 3,
            title: "aaa sasa asassas",
            cost: 25,
            priority: EPriority.HIGH,
            status: EStatus.DRAFT,
            date: "1000.100.1000",
            category: ECategory.AUTO,
            categoryName: "Авто", // TODO: нужно ли?
            img: null
        },
    ])

    const { filter, setFilter, sort, setSort, totalItems, setTotalItems } = useFilterAndSortContext()

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    return (
        <div className={cl.AdsPage}>
            <div className={cl.card_list_layout}>
                <div className={cl.panel}>
                    <CardsFilterForm filter={filter} setFilter={setFilter} />
                    <CardsSortForm sortSettings={sort} setSortSettings={setSort} />
                </div>
                <CardList cards={cards} page={page} limit={limit} />
            </div>
        </div>
    );
}

export default AdsPage;
