import React from "react";
import Card from "./ui/Card";
import cl from "./CardsList.module.css"


const CardList = ({cards}) => {
    return(
        <div className={cl.cards_list}>
            {(cards.length === 0) && <p className="card_list_notfound">Объявления не найдены</p>}
            {(cards.length !== 0) && cards.map(card => <Card props={card} key={card.id}></Card>)}
        </div>
    )
}

export default CardList;