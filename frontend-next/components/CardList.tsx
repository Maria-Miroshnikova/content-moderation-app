import React from "react";
import CardMy from "./ui/CardMy";
import cl from "../styles/CardsList.module.css"
import { ICard } from "../types/local_types";
import { ISearchParams } from "../types/server_types";
import { Grid } from "@mui/material";

interface CardListProps {
    cards: ICard[],
    page: number,
    limit: number,
    totalItems: number,
    params: ISearchParams
}

const CardList = ({ cards, page, limit, totalItems, params }: CardListProps) => {
    //console.log(cards)
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {(cards.length === 0) && <p className="card_list_notfound">Объявления не найдены</p>}
            {(cards.length !== 0) && cards.map((card, index) =>
                <Grid key={card.id} size={{ xs: 2, sm: 3, md: 4 }}>
                    <CardMy card={card} id={index + 1 + limit * (page - 1)} totalItems={totalItems} params={params}></CardMy>
                </Grid>)}
        </Grid>
    )
}

export default CardList;