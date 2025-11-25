import React from "react";

import { CATEGORY_AUTO, CATEGORY_DEFAULT, CATEGORY_GIFT, CATEGORY_HOBBY, CATEGORY_NAMES, CATEGORY_PETS, FILTER_DEFAULT } from "../App";

const CardsFilterForm = ({ filter, setFilter }) => {

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
                <option value={CATEGORY_GIFT}>{CATEGORY_NAMES[0]}</option>
                <option value={CATEGORY_AUTO}>{CATEGORY_NAMES[1]}</option>
                <option value={CATEGORY_PETS}>{CATEGORY_NAMES[2]}</option>
                <option value={CATEGORY_HOBBY}>{CATEGORY_NAMES[3]}</option>
            </select>

            <p>Диапазон цен:</p>
            <div>
                <input type='number'
                    placeholder='oт'
                    value={filter.cost_min}
                    defaultValue={0}
                    onChange={e => setFilter({ ...filter, cost_min: Number(e.target.value) })}
                />
                <input type='number'
                    placeholder='до'
                    value={filter.cost_max}
                    defaultValue={10000}
                    onChange={e => setFilter({ ...filter, cost_max: Number(e.target.value) })}
                />
            </div>

            <input placeholder='Искать в названии...'
                value={filter.search}
                onChange={e => setFilter({ ...filter, search: e.target.value })}
                type='text'
            />

            <button onClick={e => resetFilter(e)}>Сбросить фильтр</button>
        </div>
    )
}

export default CardsFilterForm;