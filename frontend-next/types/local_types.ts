import { ECategory, EPriority, ESort, EStatus } from "./enums"

export interface IFilter {
    search: string,
    cost_min: number,
    cost_max: number,
    category: number,
    status_inprocess: boolean,
    status_accepted: boolean,
    status_declined: boolean,
    status_draft: boolean
}

export const FILTER_DEFAULT: IFilter = {
    search: "",
    cost_min: 0,
    cost_max: 10000000, // какой максимум? из-за этого могут быть поломки
    category: -1,
    status_inprocess: true,
    status_accepted: true,
    status_declined: true,
    status_draft: true,
}

export interface ISort {
    type: ESort,
    sort_up: boolean
}

export interface ICategory {
    id: number,
    name: string
}

export interface ICard {
    id: number,
    title: string,
    cost: number,
    priority: EPriority,
    status: EStatus,
    date: string,
    category: ECategory,
    categoryName: string, // TODO: нужно ли?
    img: string | null
}

export const SORT_DEFAULT: ISort = {
    type: ESort.DEFAULT,
    sort_up: false
}

export const LIMIT_DEFAULT: number = 12;
export const PAGE_DEFAULT: number = 1;


export interface IStates {
    filter: IFilter,
    sort: ISort,
    page: number,
    limit: number
}

export const STATES_DEFAULT: IStates = {
    filter: FILTER_DEFAULT,
    sort: SORT_DEFAULT,
    page: PAGE_DEFAULT,
    limit: LIMIT_DEFAULT
}

