
import { useMemo, useState } from 'react';
import './App.css';
import Card from './components/ui/Card';
import CardsFilterForm from './components/CardsFilterForm';
import CardsSortForm from './components/CardsSortForm';

export const STATUS_INPRROCESS = 0;
export const STATUS_ACCEPTED = 1;
export const STATUS_DECLINED = 2;

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
export const SORT_STATUS = 2;
export const SORT_NAMES = [
  "По дате",
  "По цене",
  "По статусу"
]

export const FILTER_DEFAULT = {
  "search": "",
  "cost_min": 0,
  "cost_max": 10000,
  "category": -1,
  "status_inprocess": true,
  "status_accepted": true,
  "status_declined": true,
}

function App() {

  const [cards, setCards] = useState([
    { "id": 1, "title": "Give away", "cost": 100, "category": CATEGORY_GIFT, "date": "", "status": STATUS_INPRROCESS, "priority": PRIORITY_HIGH },
    { "id": 2, "title": "Hello", "cost": 10, "category": CATEGORY_HOBBY, "date": "", "status": STATUS_INPRROCESS, "priority": PRIORITY_USUAL },
    { "id": 3, "title": "World", "cost": 100, "category": CATEGORY_AUTO, "date": "", "status": STATUS_ACCEPTED, "priority": PRIORITY_USUAL },
    { "id": 4, "title": "How about to call saul", "cost": 1000, "category": CATEGORY_AUTO, "date": "", "status": STATUS_DECLINED, "priority": PRIORITY_HIGH },
    { "id": 5, "title": "Very long long long long long long title", "cost": 200, "category": CATEGORY_HOBBY, "date": "", "status": STATUS_DECLINED, "priority": PRIORITY_USUAL }
  ])

  const [filter, setFilter] = useState(FILTER_DEFAULT)

  const [sort, setSort] = useState({
    "type": SORT_DEFAULT,
    "sort_up": 1
  })

  const filteredCards = useMemo(() => {
    let filterSearch = cards.filter(card => card.title.toLowerCase().includes(filter.search));
    
    let filterStatus = filterSearch;
    if (!filter.status_accepted)
      filterStatus = filterStatus.filter(card => card.status != STATUS_ACCEPTED);
    if (!filter.status_declined)
      filterStatus = filterStatus.filter(card => card.status != STATUS_DECLINED);
    if (!filter.status_inprocess)
      filterStatus = filterStatus.filter(card => card.status != STATUS_INPRROCESS);

    let filterCost = filterStatus;
    filterCost = filterCost.filter(card => card.cost >= filter.cost_min)
    filterCost = filterCost.filter(card => card.cost <= filter.cost_max)

    let filterCategory = filterCost;
    if (filter.category != CATEGORY_DEFAULT) {
      //console.log(typeof filterCategory[0].category)
      //console.log(typeof filter.category)
      filterCategory = filterCategory.filter(card => card.category === filter.category)
    }

    return filterCategory;
  }, [filter, cards])

  return (
    <div className="App">

      <div className="card_list">
        <div className='panel'>
          <CardsFilterForm filter={filter} setFilter={setFilter}/>
          <CardsSortForm sortSettings={sort} setSortSettings={setSort}/>
        </div>
        {filteredCards.map(card => <Card props={card} key={card.id}></Card>)}
      </div>
    </div>
  );
}

export default App;
