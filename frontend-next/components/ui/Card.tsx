import React, { useContext } from "react";
import cl from "../../styles/Card.module.css"
import { ICard, IFilter, ISort } from "../../types/local_types";
import { PRIORITY_META, STATUS_META } from "../../types/enums";
import Link from "next/link";
import { ICurrentPageParams, ISearchParams } from "../../types/server_types";
import { makeUrlCurrentPageParams, makeUrlSearchParamsNoDefault, makeUrlFromParamsCombo, reconstructSearchParamsFromUrl } from "../../utils/makeUrlParamsFromLocalInterfaces";
import { ICurrentPageParamsFull } from "../../app/[id]/page";



interface CardProps {
    card: ICard,
    id: number // это не id карточки, это ее номер в общей очереди с текущими фильтрами и сортировкой
    totalItems: number // всего карточек в очереди с текущими фильтрами и сортировкой,
    params: ISearchParams
}

const Card = ({ card, id, totalItems, params }: CardProps) => {

    const paramsCurrentAd: ICurrentPageParamsFull = {
        ...params,
        totalItems: totalItems,
        listId: id
    }

    function getCurrentCardUrl() {
        const url_params_currend_ad: URLSearchParams = makeUrlCurrentPageParams(paramsCurrentAd);
        const url_params_search: URLSearchParams = makeUrlSearchParamsNoDefault(paramsCurrentAd);
        const current_card_url: string = makeUrlFromParamsCombo([url_params_search.toString(), url_params_currend_ad.toString()], `/${card.id}`)
        return current_card_url
    }

    // TODO: next умеет лучше отрисовывать картинки!!!
    return (
        <div className={cl.card}>
            <img src={card.img} />
            <div className={cl.description}>
                <p>{card.title}</p>
                <p>{card.cost}</p>
                <p>{card.categoryName}</p>
            </div>
            <div className={cl.description}>
                <p>{card.date}</p>
                <p>{STATUS_META[card.status].title}</p>
                <p>{PRIORITY_META[card.priority].title}</p>
                <Link
                    href={getCurrentCardUrl()}
                >
                    <button
                        className={cl.panel_btn}>посмотреть</button>
                </Link>
            </div>
        </div>
    )
}

export default Card;