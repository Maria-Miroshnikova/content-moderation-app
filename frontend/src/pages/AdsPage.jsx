
import { useEffect, useMemo, useState } from 'react';
import './AdsPage.css';
import PaginationBar from '../components/ui/PaginationBar';
import CardList from '../components/CardList';
import CardsSortForm from '../components/CardsSortForm';
import CardsFilterForm from '../components/CardsFilterForm';
import { useFetching } from '../hooks/useFetching';
import Service from '../API/Service';

export const STATUS_INPRROCESS = 0;
export const STATUS_ACCEPTED = 1;
export const STATUS_DECLINED = 2;
export const STATUS_DRAFT = 3;

export const PRIORITY_HIGH = 1;
export const PRIORITY_USUAL = 0;

export const CATEGORY_DEFAULT = -1;
export const CATEGORY_GIFT = 0;
export const CATEGORY_AUTO = 1;
export const CATEGORY_PETS = 2;
export const CATEGORY_HOBBY = 3;
export const CATEGORY_NAMES = [
    "Бесплатно",
    "Автомобили",
    "Домашние животные",
    "Хобби"
]

export const SORT_DEFAULT = -1;
export const SORT_DATE = 0;
export const SORT_COST = 1;
export const SORT_PRIORITY = 2;
export const SORT_NAMES = [
    "По дате",
    "По цене",
    "По приоритету"
]

export const FILTER_DEFAULT = {
    "search": "",
    "cost_min": 0,
    "cost_max": 10000000, // какой максимум? из-за этого могут быть поломки
    "category": -1,
    "status_inprocess": true,
    "status_accepted": true,
    "status_declined": true,
    "status_draft": true,
}

// а как сделать оптимальный массив?
//export const CATEGORIES = {}

export const STATUSES = [
    "pending", "approved", "rejected", "draft"
]

const AdsPage = () => {

    const [cards, setCards] = useState([])/*[
    { "id": 1, "title": "Give away", "cost": 100, "category": CATEGORY_GIFT, "date": 0, "status": STATUS_INPRROCESS, "priority": PRIORITY_HIGH },
    { "id": 2, "title": "Hello", "cost": 10, "category": CATEGORY_HOBBY, "date": 1, "status": STATUS_INPRROCESS, "priority": PRIORITY_USUAL },
    { "id": 3, "title": "World", "cost": 100, "category": CATEGORY_AUTO, "date": 2, "status": STATUS_ACCEPTED, "priority": PRIORITY_USUAL },
    { "id": 4, "title": "How about to call saul", "cost": 1000, "category": CATEGORY_AUTO, "date": 0, "status": STATUS_DECLINED, "priority": PRIORITY_HIGH },
    { "id": 5, "title": "Very long long long long long long title", "cost": 200, "category": CATEGORY_HOBBY, "date": 4, "status": STATUS_DECLINED, "priority": PRIORITY_USUAL }
  ])*/

    const [totalItems, setTotalItems] = useState()
    const [totalPages, setTotalPages] = useState()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const [filter, setFilter] = useState(FILTER_DEFAULT)

    const [categoriesDict, setCategoriesDict] = useState({})

    const [sort, setSort] = useState({
        "type": SORT_DEFAULT,
        "sort_up": true
    })

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
    /*
    const sortedCards = useMemo(() => {
      if (sort.type === SORT_COST) {
        if (sort.sort_up)
          return [...cards].sort((a, b) => a.cost - b.cost)
        else
          return [...cards].sort((a, b) => -a.cost + b.cost)
      }
      else if (sort.type === SORT_DATE) {
        if (sort.sort_up)
          return [...cards].sort((a, b) => a.date - b.date)
        else
          return [...cards].sort((a, b) => -a.date + b.date)
      }
      else if (sort.type === SORT_PRIORITY) {
        return [...cards].sort((a, b) => -a.priority + b.priority)
      }
  
      //console.log(sort.type)
      //console.log([...cards])
      return [...cards];
    }, [sort, cards])
  
    const filteredCards = useMemo(() => {
      let filterSearch = sortedCards.filter(card => card.title.toLowerCase().includes(filter.search));
      //console.log("after search filter ", filterSearch)
  
      let filterStatus = filterSearch;
      if (!filter.status_accepted)
        filterStatus = filterStatus.filter(card => card.status != STATUS_ACCEPTED);
      if (!filter.status_declined)
        filterStatus = filterStatus.filter(card => card.status != STATUS_DECLINED);
      if (!filter.status_inprocess)
        filterStatus = filterStatus.filter(card => card.status != STATUS_INPRROCESS);
  
      //console.log("after status filter ", filterStatus)
  
      let filterCost = filterStatus;
      filterCost = filterCost.filter(card => card.cost >= filter.cost_min)
      filterCost = filterCost.filter(card => card.cost <= filter.cost_max)
  
      //console.log("after cost filter ", filterCost)
  
      let filterCategory = filterCost;
      if (filter.category != CATEGORY_DEFAULT) {
        //console.log(typeof filterCategory[0].category)
        //console.log(typeof filter.category)
        filterCategory = filterCategory.filter(card => card.category === filter.category)
      }
  
      //console.log("after category filter ", filterCategory)
      return filterCategory;
    }, [filter, sortedCards])*/

    return (
        <div className="AdsPage">

            <div className="card_list_layout">
                <div className='panel'>
                    <CardsFilterForm filter={filter} setFilter={setFilter} categories={categoriesDict} />
                    <CardsSortForm sortSettings={sort} setSortSettings={setSort} />
                </div>

                {isCardsLoading && <p>LOADING . . .</p>}
                {error && <p>{error}</p>}
                {!isCardsLoading && !error && <CardList cards={cards} />}

                <PaginationBar totalPages={totalPages} totalItems={totalItems} page={page} setPage={setPage} />
            </div>
        </div>
    );
}

export default AdsPage;
