import { EPriority, EStatus, PRIORITY_BY_SERVER_TITLE, STATUS_BY_SERVER_TITLE } from "../types/enums";
import { IAd } from "../types/server_types";
import { ICard } from "../types/types";

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