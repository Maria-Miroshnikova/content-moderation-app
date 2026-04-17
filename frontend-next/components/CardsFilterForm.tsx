"use client"

import React, { FC, useEffect, useState } from "react";

import cl from "../styles/Card.module.css"
import { FILTER_DEFAULT, ICategory, IFilter, ISort, PAGE_DEFAULT, SORT_DEFAULT } from "../types/local_types";
import { CATEGORY_META, ECategory, ESort, SORT_META } from "../types/enums";
import { useRouter, useSearchParams } from "next/navigation";
import { ISearchParams } from "../types/server_types";
import { parseSearchParams } from "../utils/mapServerResponseOrUrlParamsToLocalInterfaces";
import { makeUrlFromParamsCombo, makeUrlSearchParamsNoDefault, setFilterParams, setSortParams } from "../utils/makeUrlParamsFromLocalInterfaces";
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, MenuItem, RadioGroup, Select, TextField, Typography } from "@mui/material";

interface CardsFilterFormProps {
    filter: IFilter;
    sortSettings: ISort;
}

const CardsFilterForm: FC<CardsFilterFormProps> = ({ filter, sortSettings }) => {

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

    const resetSortAndFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleChangeBoth(FILTER_DEFAULT, SORT_DEFAULT);
    }

    function handleChangeBoth(filter: IFilter, sort: ISort) {
        let params: ISearchParams = parseSearchParams(searchParams);
        setFilterParams(params, filter);
        setSortParams(params, sort);
        params.page = PAGE_DEFAULT.toString();
        let url_params: URLSearchParams = makeUrlSearchParamsNoDefault(params)
        let url_with_params = makeUrlFromParamsCombo(url_params.toString(), '/')
        console.log("новая url: ", url_with_params)
        router.replace(url_with_params);

    }

    function handleFilterChange(filter: IFilter) {
        let params: ISearchParams = parseSearchParams(searchParams);
        setFilterParams(params, filter);
        params.page = PAGE_DEFAULT.toString();
        let url_params: URLSearchParams = makeUrlSearchParamsNoDefault(params)
        let url_with_params = makeUrlFromParamsCombo(url_params.toString(), '/')
        router.replace(url_with_params);
    }

    function handleSortChange(sort: ISort) {
        console.log("новая сорта: ", sort)
        //console.log("search парамсы : ", searchParams)
        let params: ISearchParams = parseSearchParams(searchParams);
        //console.log("сорт парамсы из url ПЕРЕД обновой: ", params)
        setSortParams(params, sort);
        params.page = PAGE_DEFAULT.toString();
        let url_params: URLSearchParams = makeUrlSearchParamsNoDefault(params)
        let url_with_params = makeUrlFromParamsCombo(url_params.toString(), '/')
        //console.log("новая url: ", url_with_params)
        router.replace(url_with_params);
    }

    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h5">Фильтры поиска</Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2,  alignItems: "center", }}>
                <Typography variant="h6">Статус</Typography>
                <FormControlLabel
                    control={<Checkbox
                        checked={filter.status_inprocess}
                        id="status_inprocess"
                        onChange={e => handleFilterChange({ ...filter, status_inprocess: e.target.checked })}
                    />}
                    label={"На модерации"}
                />
                <FormControlLabel
                    control={<Checkbox
                        checked={filter.status_accepted}
                        id="status_accepted"
                        onChange={e => handleFilterChange({ ...filter, status_accepted: e.target.checked })}
                    />}
                    label={"Одобрено"}
                />
                <FormControlLabel
                    control={<Checkbox
                        checked={filter.status_declined}
                        id="status_declined"
                        onChange={e => handleFilterChange({ ...filter, status_declined: e.target.checked })}
                    />}
                    label={"Отклонено"}
                />
            </Box>

            <Box sx={{ display: "flex", gap: 8 }}>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1}}>
                    <Typography variant="h6" sx={{ mb: 1 }}>Категория</Typography>
                    <Select
                        value={filter.category}
                        onChange={e => handleFilterChange({ ...filter, category: Number(e.target.value) })}
                        size="small"
                        fullWidth
                    >
                        {Object.entries(CATEGORY_META).map(([id, title]) =>
                        (<MenuItem key={id} value={id}>
                            {Number(id) === ECategory.DEFAULT ? <em>{title}</em> : title}
                        </MenuItem>))}
                    </Select>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>Диапазон цен</Typography>
                    <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
                        <TextField label='oт'
                            type='number'
                            value={localCostMin}
                            onChange={e => setLocalCostMin(Number(e.target.value))}
                            size="small"
                            fullWidth
                        />
                        <TextField label='до'
                            type='number'
                            value={localCostMax}
                            onChange={e => setLocalCostMax(Number(e.target.value))}
                            size="small"
                            fullWidth
                        />
                    </Box>
                </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
                <TextField label='Искать в названии...'
                    value={localSearch}
                    onChange={e => setLocalSearch(e.target.value)}
                    type='search'
                    fullWidth
                    size="small"
                />
            </Box>

            <Typography variant="h6" sx={{ mb: 1 }}>Сортировка:</Typography>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Select
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
                    <FormControl>
                        <FormControlLabel
                            control={<Checkbox
                                checked={sortSettings.sort_up}
                                id="sort_up"
                                onChange={e => handleSortChange({ ...sortSettings, sort_up: e.target.checked })}
                            />}
                            label={"По возрастанию"}
                        />
                    </FormControl>

                )}
                <Box sx={{display: "flex", justifyContent: "right", alignItems: "center", gap: 2, flexGrow: 1 }}>
                    <Button variant="outlined" onClick={(e) => resetSortAndFilter(e)}>Сбросить фильтр</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default CardsFilterForm;