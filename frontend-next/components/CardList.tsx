import React from "react";
import Card from "./ui/Card";
import cl from "../styles/CardsList.module.css"
import { ICard } from "../types/local_types";
import { ISearchParams } from "../types/server_types";

interface CardListProps {
    cards: ICard[],
    page: number,
    limit: number,
    totalItems: number,
    params: ISearchParams
}

const CardList = ({cards, page, limit, totalItems, params}: CardListProps) => {
    //console.log(cards)
    return(
        <div className={cl.cards_list}>
            {(cards.length === 0) && <p className="card_list_notfound">Объявления не найдены</p>}
            {(cards.length !== 0) && cards.map((card, index) => <Card card={card} key={card.id} id={index + 1 + limit * (page - 1)} totalItems={totalItems} params={params}></Card>)}
        </div>
    )
}

export default CardList;