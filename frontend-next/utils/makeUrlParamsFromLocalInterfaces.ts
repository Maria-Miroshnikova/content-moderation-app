import { ECategory, ESort, ESortDirection, EStatus, SORT_META, STATUS_META } from "../types/enums";
import { ICurrentPageParams, ISearchParams, SEARCHPARAMS_DEFAILT } from "../types/server_types"
import { IFilter, ISort } from "../types/local_types";
import { ICurrentPageParamsFull } from "../app/[id]/page";

/*export function makeUrlSearchParamsForServer(params: ISearchParams) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
                value.forEach(v => searchParams.append(key, String(v)))
            } else {
                searchParams.append(key, String(value))
            }
        }
    })
    return searchParams
}*/

export function makeUrlSearchParamsForServer(params: ISearchParams) {
    const searchParams = new URLSearchParams()
    keys.forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
            if (Array.isArray(params[key])) {
                params[key].forEach(v => searchParams.append(key, String(v)))
            } else {
                searchParams.append(key, String(params[key]))
            }
        }
    })
    return searchParams
}

/*export function makeUrlWithParamsNoDefault(params: ISearchParams, url: string) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {

            if (Array.isArray(value)) {
                //value.forEach(v => searchParams.append(key, String(v)))
                const diff = SEARCHPARAMS_DEFAILT.status.filter(x => !value.includes(x));
                diff.forEach(v => searchParams.append(key, String(v)));
            } else {
                if (key in SEARCHPARAMS_DEFAILT) {
                    if (value != SEARCHPARAMS_DEFAILT[key])
                        searchParams.append(key, String(value))
                }
                else
                    searchParams.append(key, String(value))
            }
        }
    })

    //console.log(searchParams)
    const url_with_params = `${url}?${searchParams.toString()}`;
   // console.log(url_with_params)
    return url_with_params;
}*/

// TODO: как сделать ее универсальной????
/*
export function makeUrlSearchParamsNoDefault___old(params: ISearchParams) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {

            if (Array.isArray(value)) {
                //value.forEach(v => searchParams.append(key, String(v)))
                const diff = SEARCHPARAMS_DEFAILT.status.filter(x => !value.includes(x));
                diff.forEach(v => searchParams.append(key, String(v)));
            } else {
                if (key in SEARCHPARAMS_DEFAILT) {
                    if (value != SEARCHPARAMS_DEFAILT[key])
                        searchParams.append(key, String(value))
                }
                else
                    searchParams.append(key, String(value))
            }
        }
    })

    return searchParams;
}*/

const keys: string[] = ['page',
        'limit',
        'search',
        'status',
        'sortBy',
        'sortOrder',
        'categoryId',
        'maxPrice',
        'minPrice']

// эта функция ожидает, что status в params сейчас такой же как в фильтре, а не сокращенный
export function makeUrlSearchParamsNoDefault(params: ISearchParams) {
    const searchParams = new URLSearchParams()

    keys.forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
            if (Array.isArray(params[key])) {
                const diff = SEARCHPARAMS_DEFAILT.status.filter(x => !params[key].includes(x));
                diff.forEach(v => searchParams.append(key, String(v)));
            } else {
                if (key in SEARCHPARAMS_DEFAILT) {
                    if (params[key] != SEARCHPARAMS_DEFAILT[key])
                        searchParams.append(key, String(params[key]))
                }
                else
                    searchParams.append(key, String(params[key]))
            }
        }
    })

    return searchParams;
}

export function makeUrlCurrentPageParams(params: ICurrentPageParams) {
    const searchParams = new URLSearchParams()
 //   console.log("make current params: ", params)

    if (params.action) {
        searchParams.append("action", params.action)
    }
    if (params.modalView) {
        searchParams.append("modalView", params.modalView.toString())
    }
    searchParams.append("listId", params.listId.toString())
    searchParams.append("totalItems", params.totalItems.toString())

    return searchParams;
}

export function makeUrlFromParamsCombo(params: string | string[], url: string) {
    if (Array.isArray(params)) {
        const url_with_params = `${url}?${params.join("&")}`;
        return url_with_params;
    }
    else {
        const url_with_params = `${url}?${params}`;
        return url_with_params;
    }
}

// эта функция переводит status в противоложное состояние: сокращенное <-> как в фильтре
export function reconstructSearchParamsFromUrl(params: ISearchParams) {
    if (!params.status)
        return;

    const diff = SEARCHPARAMS_DEFAILT.status.filter(x => !params.status.includes(x));
    params.status = diff;
}

export function setFilterParams(params: ISearchParams, filter: IFilter) {
    if (filter.category != ECategory.DEFAULT)
        params.categoryId = filter.category
    else
        delete params.categoryId;

    //if (filter.search != "")
    params.search = filter.search

    const statuses: string[] = []
    if (filter.status_inprocess)
        statuses.push(STATUS_META[EStatus.INPROCESS].server)
    if (filter.status_accepted)
        statuses.push(STATUS_META[EStatus.ACCEPTED].server)
    if (filter.status_declined)
        statuses.push(STATUS_META[EStatus.DECLINED].server)
    // TODO: почему тут нету if? UPD: наверное потому что нет и селекта под этот вариант, так что он всегда должен показываться
    statuses.push(STATUS_META[EStatus.DRAFT].server)

    params.status = statuses
    //console.log("status: ", statuses)

    params.maxPrice = filter.cost_max;
    params.minPrice = filter.cost_min;
}


export function setSortParams(params: ISearchParams, sort: ISort) {
    if (sort.type === ESort.COST) {
        params.sortBy = SORT_META[sort.type].server
        if (sort.sort_up === true)
            params.sortOrder = ESortDirection.UP
        else
            params.sortOrder = ESortDirection.DOWN
    }
    else if (sort.type === ESort.DATE) {
        params.sortBy = SORT_META[sort.type].server
        if (sort.sort_up === true)
            params.sortOrder = ESortDirection.UP
        else
            params.sortOrder = ESortDirection.DOWN
    }
    else if (sort.type === ESort.PRIORITY) {
        params.sortBy = SORT_META[sort.type].server;
        delete params.sortOrder;
        // params.sortOrder = ESortDirection.DOWN
    }
    //console.log("params after setSort: ", params)
}

export function makeISearchParamsFromStates(filter: IFilter, sort: ISort, page: number, limit: number) {
    const params: ISearchParams = {};
    setSortParams(params, sort);
    setFilterParams(params, filter);
    params.page = page.toString();
    params.limit = limit.toString();
    return params;
}

export function getCurrentCardUrl(search: ICurrentPageParamsFull, card_id: number | string) {
    //console.log("params before parsing: ", search)
    const url_params_currend_ad: URLSearchParams = makeUrlCurrentPageParams(search);
    const url_params_search: URLSearchParams = makeUrlSearchParamsNoDefault(search);
    // console.log("card to current - params SEARCH for url: ", url_params_search.toString(), "CURR for url: ", url_params_currend_ad.toString())
    const current_card_url: string = makeUrlFromParamsCombo([url_params_search.toString(), url_params_currend_ad.toString()], `/${card_id}`)
    return current_card_url
}