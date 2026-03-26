import { EPriority, ESort, ESortDirection, EStatus, PRIORITY_BY_SERVER_TITLE, SORT_META, STATUS_BY_SERVER_TITLE, STATUS_META } from "../types/enums";
import { IAd, ISearchParams } from "../types/server_types";
import { FILTER_DEFAULT, ICard, IFilter, ISort, IStates, SORT_DEFAULT, STATES_DEFAULT } from "../types/types";

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

    let states: IStates = STATES_DEFAULT;

    //console.log(params)
    let filter: IFilter = {
        search: params.search ?? FILTER_DEFAULT.search,
        cost_min: Number(params.minPrice ?? FILTER_DEFAULT.cost_min),
        cost_max: Number(params.maxPrice ?? FILTER_DEFAULT.cost_max),
        category: Number(params.categoryId ?? FILTER_DEFAULT.category),
        status_inprocess: params.status ? params.status.includes(STATUS_META[EStatus.INPROCESS].server) : FILTER_DEFAULT.status_inprocess,
        status_accepted: params.status ? params.status.includes(STATUS_META[EStatus.ACCEPTED].server) : FILTER_DEFAULT.status_accepted,
        status_declined:  params.status ? params.status.includes(STATUS_META[EStatus.DECLINED].server) : FILTER_DEFAULT.status_declined,
        status_draft:  params.status ? params.status.includes(STATUS_META[EStatus.DRAFT].server) : FILTER_DEFAULT.status_draft,
    }

    //console.log(params)

    let sort: ISort = {
        type: params.sortBy ? (params.sortBy.includes(SORT_META[ESort.COST].server) ? ESort.COST :
            (params.sortBy.includes(SORT_META[ESort.DATE].server) ? ESort.DATE :
                (params.sortBy.includes(SORT_META[ESort.PRIORITY].server) ? ESort.PRIORITY :
                    ESort.DEFAULT))) : SORT_DEFAULT.type,
        sort_up: params.sortOrder ? params.sortOrder.includes(ESortDirection.UP) : SORT_DEFAULT.sort_up
    }

    let limit: number = Number(params.limit ?? 10);
    let page: number = Number(params.page ?? 1);

    states.filter = filter;
    states.sort = sort;
    states.limit = limit;
    states.page = page;

    return states;
}