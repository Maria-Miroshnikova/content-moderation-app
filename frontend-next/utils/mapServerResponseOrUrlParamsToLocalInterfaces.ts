import { ReadonlyURLSearchParams } from "next/navigation";
import { ECategory, EPriority, ESort, ESortDirection, EStatus, PRIORITY_BY_SERVER_TITLE, SORT_META, STATUS_BY_SERVER_TITLE, STATUS_META } from "../types/enums";
import { getDefaultSearchParams, IAd, ICurrentPageParams, ISearchParams, SEARCHPARAMS_DEFAILT } from "../types/server_types";
import { FILTER_DEFAULT, ICard, IFilter, ISort, IStates, LIMIT_DEFAULT, PAGE_DEFAULT, SORT_DEFAULT, STATES_DEFAULT } from "../types/local_types";
import { reconstructSearchParamsFromUrl } from "./makeUrlParamsFromLocalInterfaces";

export function mapAdToCard(ad: IAd): ICard {
    return {
        id: ad.id,
        title: ad.title,
        cost: ad.price,
        priority: PRIORITY_BY_SERVER_TITLE[ad.priority] as EPriority,
        status: STATUS_BY_SERVER_TITLE[ad.status] as EStatus,
        date: ad.createdAt,
        category: ad.categoryId, //as ECategory, TODO
        categoryName: ad.category,
        img: ad.images?.[0] ?? null
    };
}

export function mapISearchParamsToStates(params: ISearchParams) {

    //console.log(params)
    let filter: IFilter = {
        search: params.search ?? FILTER_DEFAULT.search,
        cost_min: Number(params.minPrice ?? FILTER_DEFAULT.cost_min),
        cost_max: Number(params.maxPrice ?? FILTER_DEFAULT.cost_max),
        category: Number(params.categoryId ?? FILTER_DEFAULT.category),
        status_inprocess: params.status ? params.status.includes(STATUS_META[EStatus.INPROCESS].server) : FILTER_DEFAULT.status_inprocess,
        status_accepted: params.status ? params.status.includes(STATUS_META[EStatus.ACCEPTED].server) : FILTER_DEFAULT.status_accepted,
        status_declined: params.status ? params.status.includes(STATUS_META[EStatus.DECLINED].server) : FILTER_DEFAULT.status_declined,
        status_draft: params.status ? params.status.includes(STATUS_META[EStatus.DRAFT].server) : FILTER_DEFAULT.status_draft,
    }

    //console.log(params)

    let sort: ISort = {
        type: params.sortBy ? (params.sortBy.includes(SORT_META[ESort.COST].server) ? ESort.COST :
            (params.sortBy.includes(SORT_META[ESort.DATE].server) ? ESort.DATE :
                (params.sortBy.includes(SORT_META[ESort.PRIORITY].server) ? ESort.PRIORITY :
                    ESort.DEFAULT))) : SORT_DEFAULT.type,
        sort_up: params.sortOrder ? params.sortOrder.includes(ESortDirection.UP) : SORT_DEFAULT.sort_up
    }

    let limit: number = Number(params.limit ?? LIMIT_DEFAULT);
    let page: number = Number(params.page ?? PAGE_DEFAULT);

    let states: IStates = {
        filter: filter,
        sort: sort,
        limit: limit,
        page: page
    }
   // console.log(states)
    return states;
}

export function parseSearchParams(sp: ReadonlyURLSearchParams | URLSearchParams): ISearchParams {
    const params = getDefaultSearchParams();

    //console.log("parsing url: ", params)
    if (sp.has('page')) {
        params.page = sp.get('page')!
    }

    if (sp.has('limit')) {
        params.limit = sp.get('limit')!
    }

    if (sp.has('minPrice')) {
        params.minPrice = Number(sp.get('minPrice'))
    }

    if (sp.has('maxPrice')) {
        params.maxPrice = Number(sp.get('maxPrice'))
    }

    if (sp.has('categoryId')) {
        params.categoryId = Number(sp.get('categoryId')) as ECategory
    }

    if (sp.has('search')) {
        params.search = sp.get('search')!
    }
    //console.log("result url: ", params)

    const status = sp.getAll('status')
    if (status.length > 0) {
        params.status = status;
        reconstructSearchParamsFromUrl(params);
    }

    if (sp.has('sortBy')) {
        params.sortBy = sp.get('sortBy')!
    }

    if (sp.has('sortOrder')) {
        params.sortOrder = sp.get('sortOrder')!
    }

    //console.log("parsed url: ", params);

    return params
}

export function parseCurrentPageParams(sp: ReadonlyURLSearchParams | URLSearchParams): ICurrentPageParams {
    const params = getDefaultSearchParams();

    //console.log("parsing url: ", params)
    if (sp.has('modalView')) {
        params.page = sp.get('modalView')!
    }

    if (sp.has('totalItems')) {
        params.limit = sp.get('totalItems')!
    }

    if (sp.has('action')) {
        params.minPrice = Number(sp.get('action'))
    }

    if (sp.has('listId')) {
        params.maxPrice = Number(sp.get('listId'))
    }
    return params
}