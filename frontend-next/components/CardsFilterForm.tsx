"use client"

import React, { FC, useEffect, useState } from "react";

import cl from "../styles/Card.module.css"
import { FILTER_DEFAULT, ICategory, IFilter, PAGE_DEFAULT } from "../types/local_types";
import { CATEGORY_META, ECategory } from "../types/enums";
import { useRouter, useSearchParams } from "next/navigation";
import { ISearchParams } from "../types/server_types";
import { parseSearchParams } from "../utils/mapServerResponseOrUrlParamsToLocalInterfaces";
import { makeUrlFromParamsCombo, makeUrlSearchParamsNoDefault, setFilterParams } from "../utils/makeUrlParamsFromLocalInterfaces";
import { Button, Checkbox, Container, FormControl, FormControlLabel, MenuItem, RadioGroup, Select, TextField, Typography } from "@mui/material";

interface CardsFilterFormProps {
    filter: IFilter;
}

const CardsFilterForm: FC<CardsFilterFormProps> = ({ filter }) => {

    //console.log("filter on start: ", filter)
    const router = useRouter()
    const searchParams = useSearchParams()

    // параметры, поиск которых нужно вызывать отложенно
    const [localSearch, setLocalSearch] = useState<string>(filter.search);
    const [localCostMin, setLocalCostMin] = useState<number>(filter.cost_min);
    const [localCostMax, setLocalCostMax] = useState<number>(filter.cost_max);

    useEffect(() => {
        setLocalSearch(filter.search);
        setLocalCostMin(filter.cost_min);
        setLocalCostMax(filter.cost_max);
    }, [filter.search, filter.cost_min, filter.cost_max]);

    // TODO: заменить отложенный поиск на поиск по кнопке?
    useEffect(() => {
        const timeout = setTimeout(() => {
            handleFilterChange({ ...filter, search: localSearch, cost_max: localCostMax, cost_min: localCostMin });
        }, 300);

        return () => clearTimeout(timeout);
    }, [localSearch, localCostMax, localCostMin]);

    const resetFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleFilterChange(FILTER_DEFAULT)
    }

    function handleFilterChange(filter: IFilter) {
        let params: ISearchParams = parseSearchParams(searchParams);
        setFilterParams(params, filter);
        params.page = PAGE_DEFAULT.toString();
        let url_params: URLSearchParams = makeUrlSearchParamsNoDefault(params)
        let url_with_params = makeUrlFromParamsCombo(url_params.toString(), '/')
        router.replace(url_with_params);
    }

    return (
        <Container>
            <Typography variant="h5">Фильтры поиска</Typography>

            <Typography variant="h6">Статус</Typography>
            <FormControl>
                <FormControlLabel
                    control={<Checkbox
                        checked={filter.status_inprocess}
                        id="status_inprocess"
                        onChange={e => handleFilterChange({ ...filter, status_inprocess: e.target.checked })}
                    />}
                    label={"На модерации"}
                />
            </FormControl>
            <FormControl>
                <FormControlLabel
                    control={<Checkbox
                        checked={filter.status_accepted}
                        id="status_accepted"
                        onChange={e => handleFilterChange({ ...filter, status_accepted: e.target.checked })}
                    />}
                    label={"Одобрено"}
                />
            </FormControl>
            <FormControl>
                <FormControlLabel
                    control={<Checkbox
                        checked={filter.status_declined}
                        id="status_declined"
                        onChange={e => handleFilterChange({ ...filter, status_declined: e.target.checked })}
                    />}
                    label={"Отклонено"}
                />
            </FormControl>

            <Typography variant="h6">Категория:</Typography>
            <Select
                value={filter.category}
                onChange={e => handleFilterChange({ ...filter, category: Number(e.target.value) })}
                size="small"
            >
                {Object.entries(CATEGORY_META).map(([id, title]) =>
                (<MenuItem key={id} value={id}>
                    {Number(id) === ECategory.DEFAULT ? <em>{title}</em> : title}
                </MenuItem>))}
            </Select>

            <Typography variant="h6">Диапазон цен:</Typography>
            <div>
                <TextField label='oт'
                    type='number'
                    value={localCostMin}
                    onChange={e => setLocalCostMin(Number(e.target.value))}
                    size="small"
                />
                <TextField label='до'
                    type='number'
                    value={localCostMax}
                    onChange={e => setLocalCostMax(Number(e.target.value))}
                    size="small"
                />
            </div>

            <TextField label='Искать в названии...'
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                type='search'
                fullWidth
                size="small"
            />

            <Button sx={{}} variant="outlined" className={cl.panel_btn} onClick={e => resetFilter(e)}>Сбросить фильтр</Button>
        </Container>
    )
}

export default CardsFilterForm;