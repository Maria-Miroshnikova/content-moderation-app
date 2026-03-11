import React from "react";
import Card from "./ui/Card";
import cl from "../styles/CardsList.module.css"
import { ICard } from "../types/types";

interface CardListProps {
    cards: ICard[],
    page: number,
    limit: number
}

const CardList = ({cards, page, limit}: CardListProps) => {
    return(
        <div className={cl.cards_list}>
            {(cards.length === 0) && <p className="card_list_notfound">Объявления не найдены</p>}
            {(cards.length !== 0) && cards.map((card, index) => <Card card={card} key={card.id} id={index + 1 + limit * (page - 1)}></Card>)}
        </div>
    )
}

export default CardList;