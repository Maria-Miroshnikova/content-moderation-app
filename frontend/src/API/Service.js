import axios from "axios"
import { CATEGORIES, CATEGORY_DEFAULT, PRIORITY_HIGH, PRIORITY_USUAL, SORT_COST, SORT_DATE, SORT_PRIORITY, STATUS_ACCEPTED, STATUS_DECLINED, STATUS_DRAFT, STATUS_INPRROCESS, STATUSES } from "../pages/AdsPage";

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

    static sort_enum = ['createdAt', 'price', 'priority'];
    static sort_dir = ['asc', 'desc'];

    static setFilterParams(params, filter) {
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
        //console.log("status: ", statuses)
    }

    static setSortParams(params, sort) {
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

    static async getAllNoFilter(limit = 10, page = 1) {
        const response = await axios.get('http://localhost:3001/api/v1/ads')
        //console.log("ответ ", response)
        return response;
    }

    static async getAll(limit = 10, page = 1, filter, sort) {
        const params = {
            limit: limit,
            page: page,
            minPrice: filter.cost_min,
            maxPrice: filter.cost_max,
        }
        //console.log("min: ", filter.cost_min, " max: ", filter.cost_max)

        this.setFilterParams(params, filter)
        this.setSortParams(params, sort)
        //console.log("params after settings: ", params)

        const response = await axios.get('http://localhost:3001/api/v1/ads', {
            params: params
        });
        //console.log(response.data)
        //return response.data.map((p) => ({id: p.id, title: p.title, content: p.body}))
        return response
    }

    static async getAdsById(id) {
        const response = await axios.get(`http://localhost:3001/api/v1/ads/${id}`, {
            params: {
                id: id
            }
        });

        //console.log("moder history BEFORE format: ", response.data.moderationHistory)

        let moderationHistory = response.data.moderationHistory.map((h) => {
            if (h.action === "approved")
                return { ...h, status: STATUS_ACCEPTED }
            else if (h.action === "pending")
                return { ...h, status: STATUS_INPRROCESS }
            else if ((h.action === "draft") || (h.action === "requestChanges"))
                return { ...h, status: STATUS_DRAFT }
            else
                return { ...h, status: STATUS_DECLINED }
        })
        //console.log("formatted moder history: ", moderationHistory)
        let formatted = { ...response.data, moderationHistory: moderationHistory }
        //console.log("formatted resp: ", formatted)
        return formatted
        // characteristics - таблица
        // description
        // images
        // moderation history
        // seller
        // update at - ?

        // moderation history - массив элементов следующего вида:
        // action: "appoved"
        // comment: ""
        // id: 1
        // moderatorId: 1
        // moderatorName: "Name"
        // reason: null
        // timestamp: "..."
    }

    // а обработка ошибки?
    static async postApproveById(id) {
        const response = await axios.post(`http://localhost:3001/api/v1/ads/${id}/approve`, {
            params: {
                id: id
            }
        });

        return response
    }

    static async postRejectedById(id, comment, reason) {
        const response = await axios.post(`http://localhost:3001/api/v1/ads/${id}/reject`, {
            params: {
                id: id
            },
            reason: reason,
            comment: comment
        });
        //console.log("REJECT request")

        return response
    }

    static async postDraftById(id, comment, reason) {
        const response = await axios.post(`http://localhost:3001/api/v1/ads/${id}/request-changes`, {
            params: {
                id: id
            },
            reason: reason,
            comment: comment
        });
        //console.log("DRAFT request")

        return response
    }

    // все переменные - строками, первая - из массива PERIOD, даты - даты в виде строки
    static async getStats(period, startDate, endDate) {
        const response = await axios.get(`http://localhost:3001/api/v1//stats/summary`, {
            params: {
                priod: period
            }
        });
        //console.log("DRAFT request")

        return response
    }
}