"use client"

import React, { FC } from "react";
import { ISort, PAGE_DEFAULT } from "../types/local_types";
import { ESort, SORT_META } from "../types/enums";
import { useRouter, useSearchParams } from "next/navigation";
import { ISearchParams } from "../types/server_types";
import { parseSearchParams } from "../utils/mapServerResponseOrUrlParamsToLocalInterfaces";
import { makeUrlFromParamsCombo, makeUrlSearchParamsNoDefault, setSortParams } from "../utils/makeUrlParamsFromLocalInterfaces";
import { Container, MenuItem, Select, Typography } from "@mui/material";

interface CardsSortFormProps {
    sortSettings: ISort
}

const CardsSortForm: FC<CardsSortFormProps> = ({ sortSettings }) => {

    const router = useRouter()
    const searchParams = useSearchParams()

    function handleSortChange(sort: ISort) {
        console.log("новая сорта: ", sort)
        //console.log("search парамсы : ", searchParams)
        let params: ISearchParams = parseSearchParams(searchParams);
        console.log("сорт парамсы из url ПЕРЕД обновой: ", params)
        setSortParams(params, sort);
        params.page = PAGE_DEFAULT.toString();
        let url_params: URLSearchParams = makeUrlSearchParamsNoDefault(params)
        let url_with_params = makeUrlFromParamsCombo(url_params.toString(), '/')
        console.log("новая url: ", url_with_params)
        router.replace(url_with_params);
    }

    return (
        <Container>
            <Typography variant="h6">Сортировка:</Typography>
            <div className="sort">
                <Select label="Сортировать по..."
                    value={sortSettings.type}
                    onChange={e => handleSortChange({ ...sortSettings, type: Number(e.target.value) })}
                    size="small"
                >
                    {Object.entries(SORT_META).map(([id, meta]) =>
                        <MenuItem key={id} value={id}>
                            {Number(id) === ESort.DEFAULT ? <em>{meta.title}</em> : meta.title}
                        </MenuItem>)}
                </Select>

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
        </Container>
    )
}

export default CardsSortForm;