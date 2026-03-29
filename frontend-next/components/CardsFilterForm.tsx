"use client"

import React, { FC } from "react";

import cl from "../styles/Card.module.css"
import { FILTER_DEFAULT, ICategory, IFilter, PAGE_DEFAULT } from "../types/local_types";
import { CATEGORY_META } from "../types/enums";
import { useRouter, useSearchParams } from "next/navigation";
import { ISearchParams } from "../types/server_types";
import { parseSearchParams } from "../utils/mapServerResponseOrUrlParamsToLocalInterfaces";
import { makeUrlWithParamsNoDefault, setFilterParams } from "../utils/makeUrlParamsFromLocalInterfaces";

interface CardsFilterFormProps {
    filter: IFilter;
}

const CardsFilterForm: FC<CardsFilterFormProps> = ({ filter }) => {

    const router = useRouter()
    const searchParams = useSearchParams()

    const resetFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleFilterChange(FILTER_DEFAULT)
    }

    function handleFilterChange(filter: IFilter) {
        let params: ISearchParams = parseSearchParams(searchParams);
        setFilterParams(params, filter);
        params.page = PAGE_DEFAULT.toString();
        let url_with_params = makeUrlWithParamsNoDefault(params, '/')
        router.replace(url_with_params);
    }

    return (
        <div className="filter">
            <p>Фильтры поиска:</p>

            <p>Статус:</p>
            <div className='checkbox'>
                <input type="checkbox"
                    id="status_inprocess"
                    checked={filter.status_inprocess}
                    onChange={e => handleFilterChange({ ...filter, status_inprocess: e.target.checked })}
                />
                <label htmlFor="status_inprocess">На модерации</label>
            </div>
            <div className='checkbox'>
                <input type="checkbox"
                    id="status_accepted"
                    checked={filter.status_accepted}
                    onChange={e => handleFilterChange({ ...filter, status_accepted: e.target.checked })}
                />
                <label htmlFor="status_accepted">Одобрено</label>
            </div>
            <div className='checkbox'>
                <input type="checkbox"
                    id="status_declined"
                    checked={filter.status_declined}
                    onChange={e => handleFilterChange({ ...filter, status_declined: e.target.checked })}
                />
                <label htmlFor="status_declined">Отклонено</label>
            </div>

            <p>Категория:</p>
            <select
                value={filter.category}
                onChange={e => handleFilterChange({ ...filter, category: Number(e.target.value) })}
            >
                {Object.entries(CATEGORY_META).map(([id, title]) => (<option key={id} value={id}>{title}</option>))}
            </select>

            <p>Диапазон цен:</p>
            <div>
                <input type='number'
                    placeholder='oт'
                    value={filter.cost_min}
                    onChange={e => handleFilterChange({ ...filter, cost_min: Number(e.target.value) })}
                />
                <input type='number'
                    placeholder='до'
                    value={filter.cost_max}
                    onChange={e => handleFilterChange({ ...filter, cost_max: Number(e.target.value) })}
                />
            </div>

            <input placeholder='Искать в названии...'
                value={filter.search}
                onChange={e => handleFilterChange({ ...filter, search: e.target.value })}
                type='text'
            />

            <button className={cl.panel_btn} onClick={e => resetFilter(e)}>Сбросить фильтр</button>
        </div>
    )
}

export default CardsFilterForm;