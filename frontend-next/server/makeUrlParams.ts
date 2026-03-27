import { ECategory, ESort, ESortDirection, EStatus, SORT_META, STATUS_META } from "../types/enums";
import { ISearchParams, SEARCHPARAMS_DEFAILT } from "../types/server_types"
import { IFilter, ISort } from "../types/types";

export function makeUrlWithParams(params: ISearchParams, url: string) {
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

    //console.log(searchParams)
    const url_with_params = `${url}?${searchParams.toString()}`;
   // console.log(url_with_params)
    return url_with_params;
}

export function makeUrlWithParamsNoDefault(params: ISearchParams, url: string) {
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
}

export function reconstructSearchParamsFromUrl(params: ISearchParams) {
    if (!params.status)
        return;

    const diff = SEARCHPARAMS_DEFAILT.status.filter(x => !params.status.includes(x));
    params.status = diff;
}

export function setFilterParams(params: ISearchParams, filter: IFilter) {
    if (filter.category != ECategory.DEFAULT)
        params.categoryId = filter.category

    if (filter.search != "")
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