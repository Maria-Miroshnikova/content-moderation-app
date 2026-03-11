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