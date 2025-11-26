import axios from "axios"
import { CATEGORIES, CATEGORY_DEFAULT, PRIORITY_HIGH, PRIORITY_USUAL, STATUS_ACCEPTED, STATUS_DECLINED, STATUS_DRAFT, STATUS_INPRROCESS, STATUSES } from "../App";

export default class Service {

    static getFormattedCards(data) {
        //console.log(data)
        //console.log(data.ads[0])
        const formattedData = data.ads.map(card => ({
            id: card.id,
            title: card.title,
            cost: Number(card.price),
            priority: card.priority === "normal" ? PRIORITY_USUAL : PRIORITY_HIGH,
            status: card.status === "pending" ? STATUS_INPRROCESS : (card.status === "approved" ? STATUS_ACCEPTED : (card.status === "rejected" ? STATUS_DECLINED : STATUS_DRAFT)),
            date: card.createdAt,
            category: card.categoryId,
            categoryName: card.category,
            img: card.images[0] ?? null
        }));
        //console.log(formattedData)
        return formattedData;
    }

    static async getCategories(page = 1, limit) {
        const response = await axios.get('http://localhost:3001/api/v1/ads', {
            params: {
                limit: limit,
                page: page
            }
        })

        const categories = {};
        response.data.ads.forEach(ad => {
            categories[ad.categoryId] = ad.category;
        });

        //console.log("total items: ", limit, " ", categories)
        return categories
    }

    static async getAll(limit = 10, page = 1, filter, sort) {
        const params = {
            limit: limit,
            page: page,
            minPrice: filter.cost_min,
            maxPrice: filter.cost_max,
        }
        //console.log("min: ", filter.cost_min, " max: ", filter.cost_max)

        if (filter.category != CATEGORY_DEFAULT)
            params.categoryId = filter.category

        if (filter.search != "")
            params.search = filter.search

        const statuses = []
        if (filter.status_inprocess)
            statuses.push(STATUSES[STATUS_INPRROCESS])
        if (filter.status_accepted)
            statuses.push(STATUSES[STATUS_ACCEPTED])
        if (filter.status_declined)
            statuses.push(STATUSES[STATUS_DECLINED])
        //if (filter.status_draft)
        statuses.push(STATUSES[STATUS_DRAFT])

        params.status = statuses
        console.log("status: ", statuses)

        const response = await axios.get('http://localhost:3001/api/v1/ads', {
            params: params
        });
        console.log(response.data)
        //return response.data.map((p) => ({id: p.id, title: p.title, content: p.body}))
        return response
    }

}