import React from "react";

import cl from "./ui/Card.module.css"
import { CATEGORY_DEFAULT, FILTER_DEFAULT } from "../pages/AdsPage";

const CardsFilterForm = ({ filter, setFilter, categories }) => {

    const resetFilter = (e) => {
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
            <select placeholder="категория..."
                value={filter.category}
                onChange={e => setFilter({ ...filter, category: Number(e.target.value) })}
            >
                <option value={CATEGORY_DEFAULT}>Категория</option>
                {Object.entries(categories).map(([id, name]) => (<option key={id} value={id}>{name}</option>))}
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