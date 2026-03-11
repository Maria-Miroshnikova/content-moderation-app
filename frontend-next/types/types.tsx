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

export enum ESortId {
    SORT_DEFAULT = -1,
    SORT_DATE = 0,
    SORT_COST = 1,
    SORT_PRIORITY = 2
}

export enum ESortName {
    SORT_DEFAULT = "",
    SORT_DATE = "По дате",
    SORT_COST = "По цене",
    SORT_PRIORITY = "По приоритету"
}

export interface ISort {
    type: ESortId,
    sort_up: boolean
}

export interface ICategory {
    id: number,
    name: string
}

// не знаю, нужно ли это!
export enum ECategoryId {
    Default = -1,
    Gift = 0,
    Auto = 1,
    Pets = 2,
    Hobby = 3
}
export enum ECategoryName {
    Default = "",
    Gift = "Бесплатно",
    Auto = "Автомобили",
    Pets = "Домашние животные",
    Hobby = "Хобби"
}
