"use client"

import React, { FC } from "react";
import { ISort, PAGE_DEFAULT } from "../types/local_types";
import { ESort, SORT_META } from "../types/enums";
import { useRouter, useSearchParams } from "next/navigation";
import { ISearchParams } from "../types/server_types";
import { parseSearchParams } from "../utils/mapServerResponseOrUrlParamsToLocalInterfaces";
import { makeUrlFromParamsCombo, makeUrlSearchParamsNoDefault, setSortParams } from "../utils/makeUrlParamsFromLocalInterfaces";

interface CardsSortFormProps {
    sortSettings: ISort
}

const CardsSortForm: FC<CardsSortFormProps> = ({ sortSettings }) => {

    const router = useRouter()
    const searchParams = useSearchParams()

    function handleSortChange(sort: ISort) {
        let params: ISearchParams = parseSearchParams(searchParams);
        setSortParams(params, sort);
        params.page = PAGE_DEFAULT.toString();
        let url_params: URLSearchParams = makeUrlSearchParamsNoDefault(params)
        let url_with_params = makeUrlFromParamsCombo(url_params.toString(), '/')
        router.replace(url_with_params);
    }

    return (
        <div>
            <p>Сортировка:</p>
            <div className="sort">
                <select
                    value={sortSettings.type}
                    onChange={e => handleSortChange({ ...sortSettings, type: Number(e.target.value) })}
                >
                    {Object.entries(SORT_META).map(([id, meta]) => <option key={id} value={id}>{meta.title}</option>)}
                </select>

                {[ESort.DATE, ESort.COST].includes(sortSettings.type) && (
                    <div className='checkbox'>
                        <input type="checkbox"
                            id="sort_up"
                            checked={sortSettings.sort_up}
                            onChange={e => handleSortChange({ ...sortSettings, sort_up: e.target.checked })}
                        />
                        <label htmlFor="sort_up">По возрастанию</label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CardsSortForm;