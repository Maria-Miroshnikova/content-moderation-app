import { ECategory, EStatus, STATUS_META } from "../types/enums";
import { ISearchParams } from "../types/server_types"
import { IFilter, ISort } from "../types/types";

export function makeUrlWithParams(params: ISearchParams, url: string) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, String(value))
        }
    })
    const url_with_params = `${url}?${searchParams.toString()}`;
    return url_with_params;
}

const sort_enum = ['createdAt', 'price', 'priority'];
const sort_dir = ['asc', 'desc'];

function setFilterParams(params, filter: IFilter) {
    if (filter.category != ECategory.DEFAULT)
        params.categoryId = filter.category

    if (filter.search != "")
        params.search = filter.search

    const statuses = []
    if (filter.status_inprocess)
        statuses.push(STATUS_META[EStatus.INPROCESS].server)
    if (filter.status_accepted)
        statuses.push(STATUS_META[EStatus.ACCEPTED].server)
    if (filter.status_declined)
        statuses.push(STATUS_META[EStatus.DECLINED].server)
    // TODO: почему тут нету if?
    statuses.push(STATUS_META[EStatus.DRAFT].server)

    params.status = statuses
    //console.log("status: ", statuses)
}

function setSortParams(params, sort) {
    if (sort.type === SORT_COST) {
        params.sortBy = this.sort_enum[1]
        if (sort.sort_up === true)
            params.sortOrder = this.sort_dir[0]
        else
            params.sortOrder = this.sort_dir[1]
    }
    else if (sort.type === SORT_DATE) {
        params.sortBy = this.sort_enum[0]
        if (sort.sort_up === true)
            params.sortOrder = this.sort_dir[0]
        else
            params.sortOrder = this.sort_dir[1]
    }
    else if (sort.type === SORT_PRIORITY)
        params.sortBy = this.sort_enum[2]
    //console.log("params after setSort: ", params)
}

export function makeISearchParamsFromStates(filter: IFilter, sort: ISort, page: number, limit: number) {


}