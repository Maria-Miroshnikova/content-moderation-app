import { ECategory, ESortDirection, STATUS_META } from "./enums";
import { FILTER_DEFAULT, ICard, LIMIT_DEFAULT, PAGE_DEFAULT, SORT_DEFAULT } from "./types";

export interface ISearchParams {
    category?: string,
    page?: string,
    minPrice?: number,
    maxPrice?: number,
    categoryId?: ECategory,
    search?: string,
    status?: string[],
    sortBy?: string,
    sortOrder?: string,
    limit?: string
}

export const SEARCHPARAMS_DEFAILT: ISearchParams = {
 //   category: FILTER_DEFAULT.category.toString(),
    page: PAGE_DEFAULT.toString(),
    minPrice: FILTER_DEFAULT.cost_min,
    maxPrice: FILTER_DEFAULT.cost_max,
 //   categoryId: FILTER_DEFAULT.category,
 //   search: FILTER_DEFAULT.search,
    status: Object.values(STATUS_META).map(meta => meta.server),
 //   sortOrder: ESortDirection.DOWN,
    limit: LIMIT_DEFAULT.toString()
}

/*
default settings:
limit
: 
"10"
maxPrice
: 
"10000000"
minPrice
: 
"0"
page
: 
"1"
status
: 
(4) ['pending', 'approved', 'rejected', 'draft']
*/

export interface IGetAdsAnswer {
    ads: IAd[],
    pagination: IAdPagination
}

export interface IAdCharacteristics {
    Состояние: string,
    Гарантия: string,
    Производитель: string,
    Модель: string,
    Цвет: string
}

export interface ISeller {
    id: number,
    name: string,
    rating: string // number inside string,
    totalAds: number,
    registeredAt: string//'2025-07-02T20:19:01.953Z'
}

export interface IModerationHistoryItem {
    id: number,
    moderatorId: number,
    moderatorName: string,
    action: string,
    reason: string,
    timestamp: string
}

export interface IAd {
    category: string,
    categoryId: number,
    characteristics: IAdCharacteristics
    createdAt: string // "2026-03-06T20:19:01.953Z"
    description: string,
    id: number, 
    images: string[],
    moderationHistory: IModerationHistoryItem[],
    price: number,
    priority: string,
    seller: ISeller,
    status: string,
    title: string,
    updatedAt: string
}

export interface IAdPagination {
    currentPage: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number
}

export interface IAdResponse {
    cards: ICard[],
    pagination: IAdPagination
}