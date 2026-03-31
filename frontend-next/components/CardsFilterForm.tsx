"use client"

import React, { FC, useEffect, useState } from "react";

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

    console.log("filter on start: ", filter)
    const router = useRouter()
    const searchParams = useSearchParams()

    // параметры, поиск которых нужно вызывать отложенно
    const [localSearch, setLocalSearch] = useState<string>(filter.search);
    const [localCostMin, setLocalCostMin] = useState<number>(filter.cost_min);
    const [localCostMax, setLocalCostMax] = useState<number>(filter.cost_max);

    // TODO: заменить отложенный поиск на поиск по кнопке?
    useEffect(() => {
        const timeout = setTimeout(() => {
            handleFilterChange({ ...filter, search: localSearch, cost_max: localCostMax, cost_min: localCostMin });
        }, 300);

        return () => clearTimeout(timeout);
    }, [localSearch, localCostMax, localCostMin]);

    useEffect(() => {
        setLocalSearch(filter.search);
        setLocalCostMin(filter.cost_min);
        setLocalCostMax(filter.cost_max);
    }, [filter.search, filter.cost_min, filter.cost_max]);

    const resetFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleFilterChange(FILTER_DEFAULT)
    }

    function handleFilterChange(filter: IFilter) {
        console.log("filter when change: ", filter)
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
                    value={localCostMin}
                    onChange={e => setLocalCostMin(Number(e.target.value))}
                />
                <input type='number'
                    placeholder='до'
                    value={localCostMax}
                    onChange={e => setLocalCostMax(Number(e.target.value))}
                />
            </div>

            <input placeholder='Искать в названии...'
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                type='text'
            />

            <button className={cl.panel_btn} onClick={e => resetFilter(e)}>Сбросить фильтр</button>
        </div>
    )
}

export default CardsFilterForm;