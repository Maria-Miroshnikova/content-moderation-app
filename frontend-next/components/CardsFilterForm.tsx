import React, { FC } from "react";

import cl from "../styles/Card.module.css"
import { FILTER_DEFAULT, ICategory, IFilter } from "../types/types";
import { CATEGORY_META } from "../types/enums";

interface CardsFilterFormProps {
    filter: IFilter;
    //setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
    changeFilter: (filter: IFilter) => void,
//    categories: ;
}

const CardsFilterForm: FC<CardsFilterFormProps> = ({ filter, changeFilter}) => {

    //console.log("cardsFORM, filter: ", filter)

    const resetFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        changeFilter(FILTER_DEFAULT)
    }

    return (
        <div className="filter">
            <p>Фильтры поиска:</p>

            <p>Статус:</p>
            <div className='checkbox'>
                <input type="checkbox"
                    id="status_inprocess"
                    checked={filter.status_inprocess}
                    onChange={e => changeFilter({ ...filter, status_inprocess: e.target.checked })}
                />
                <label htmlFor="status_inprocess">На модерации</label>
            </div>
            <div className='checkbox'>
                <input type="checkbox"
                    id="status_accepted"
                    checked={filter.status_accepted}
                    onChange={e => changeFilter({ ...filter, status_accepted: e.target.checked })}
                />
                <label htmlFor="status_accepted">Одобрено</label>
            </div>
            <div className='checkbox'>
                <input type="checkbox"
                    id="status_declined"
                    checked={filter.status_declined}
                    onChange={e => changeFilter({ ...filter, status_declined: e.target.checked })}
                />
                <label htmlFor="status_declined">Отклонено</label>
            </div>

            <p>Категория:</p>
            <select
                value={filter.category}
                onChange={e => changeFilter({ ...filter, category: Number(e.target.value)}) }
            >
                {Object.entries(CATEGORY_META).map(([id, title]) => (<option key={id} value={id}>{title}</option>))}
            </select>

            <p>Диапазон цен:</p>
            <div>
                <input type='number'
                    placeholder='oт'
                    value={filter.cost_min}
                    onChange={e => changeFilter({ ...filter, cost_min: Number(e.target.value) })}
                />
                <input type='number'
                    placeholder='до'
                    value={filter.cost_max}
                    onChange={e => changeFilter({ ...filter, cost_max: Number(e.target.value) })}
                />
            </div>

            <input placeholder='Искать в названии...'
                value={filter.search}
                onChange={e => changeFilter({ ...filter, search: e.target.value })}
                type='text'
            />

            <button className={cl.panel_btn} onClick={e => resetFilter(e)}>Сбросить фильтр</button>
        </div>
    )
}

export default CardsFilterForm;