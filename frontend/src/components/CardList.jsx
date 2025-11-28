import React from "react";
import Card from "./ui/Card";
import cl from "./CardsList.module.css"


const CardList = ({cards, page, limit}) => {
    return(
        <div className={cl.cards_list}>
            {(cards.length === 0) && <p className="card_list_notfound">Объявления не найдены</p>}
            {(cards.length !== 0) && cards.map((card, index) => <Card props={card} key={card.id} id={index + 1 + limit * (page - 1)}></Card>)}
        </div>
    )
}

export default CardList;