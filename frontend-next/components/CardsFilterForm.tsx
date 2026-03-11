import React, { FC } from "react";

import cl from "../styles/Card.module.css"
import { ECategoryId, FILTER_DEFAULT, ICategory, IFilter } from "../types/types";

interface CardsFilterFormProps {
    filter: IFilter;
    setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
//    categories: ;
}

const CardsFilterForm: FC<CardsFilterFormProps> = ({ filter, setFilter}) => {


    // TODO - самому их подкачивать
    const categories: ICategory[] = [
        {id: 1, name: "хобби"}, {id: 2, name: "авто"}
    ]

    const resetFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setFilter(FILTER_DEFAULT)
    }

    return (
        <div className="filter">
            <p>Фильтры поиска:</p>

            <p>Статус:</p>
            <div className='checkbox'>
                <input type="checkbox"
                    id="status_inprocess"
                    checked={filter.status_inprocess}
                    onChange={e => setFilter({ ...filter, status_inprocess: e.target.checked })}
                />
                <label htmlFor="status_inprocess">На модерации</label>
            </div>
            <div className='checkbox'>
                <input type="checkbox"
                    id="status_accepted"
                    checked={filter.status_accepted}
                    onChange={e => setFilter({ ...filter, status_accepted: e.target.checked })}
                />
                <label htmlFor="status_accepted">Одобрено</label>
            </div>
            <div className='checkbox'>
                <input type="checkbox"
                    id="status_declined"
                    checked={filter.status_declined}
                    onChange={e => setFilter({ ...filter, status_declined: e.target.checked })}
                />
                <label htmlFor="status_declined">Отклонено</label>
            </div>

            <p>Категория:</p>
            <select
                value={filter.category}
                onChange={e => setFilter({ ...filter, category: Number(e.target.value)}) }
            >
                <option value={ECategoryId.Default}>Категория...</option>
                {categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>

            <p>Диапазон цен:</p>
            <div>
                <input type='number'
                    placeholder='oт'
                    value={filter.cost_min}
                    onChange={e => setFilter({ ...filter, cost_min: Number(e.target.value) })}
                />
                <input type='number'
                    placeholder='до'
                    value={filter.cost_max}
                    onChange={e => setFilter({ ...filter, cost_max: Number(e.target.value) })}
                />
            </div>

            <input placeholder='Искать в названии...'
                value={filter.search}
                onChange={e => setFilter({ ...filter, search: e.target.value })}
                type='text'
            />

            <button className={cl.panel_btn} onClick={e => resetFilter(e)}>Сбросить фильтр</button>
        </div>
    )
}

export default CardsFilterForm;