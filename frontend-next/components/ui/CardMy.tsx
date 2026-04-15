"use client"

import React, { useContext } from "react";
import cl from "../../styles/Card.module.css"
import { ICard, IFilter, ISort } from "../../types/local_types";
import { EPriority, EStatus, PRIORITY_META, STATUS_META } from "../../types/enums";
import Link from "next/link";
import { ICurrentPageParams, ISearchParams } from "../../types/server_types";
import { makeUrlCurrentPageParams, makeUrlSearchParamsNoDefault, makeUrlFromParamsCombo, reconstructSearchParamsFromUrl } from "../../utils/makeUrlParamsFromLocalInterfaces";
import { ICurrentPageParamsFull } from "../../app/[id]/page";
import { Box, Card, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import LinkButton from "./LinkButton";
import { format } from "node:path";



interface CardProps {
    card: ICard,
    id: number // это не id карточки, это ее номер в общей очереди с текущими фильтрами и сортировкой
    totalItems: number // всего карточек в очереди с текущими фильтрами и сортировкой,
    params: ISearchParams
}

const CardMy = ({ card, id, totalItems, params }: CardProps) => {

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

    function getDate(date: string) {
        const formatted = new Date(date).toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
        return formatted;
    }

    function getPrice(price: number) {
        const formatted = price.toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 0,
        });
        return formatted;
    }

    function getStatusColor(status: EStatus): string {
        switch (status) {
            case EStatus.INPROCESS: return "info"
            case EStatus.ACCEPTED: return "success"
            case EStatus.DECLINED: return "error"
            case EStatus.DRAFT: return "warning"
        }
    }

    function getPriorityColor(priority: EPriority): string {
        switch (priority) {
            case EPriority.HIGH: return "warning"
            case EPriority.USUAL: return "info"
        }
    }

    // TODO: next умеет лучше отрисовывать картинки!!!
    return (
        <Card sx={{ display: 'flex', flexDirection: "column"}}>
            <CardMedia
                component={"img"}
                image={card.img}
                sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover'
                }}
            />
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box sx={{ mb: 2, display: 'flex', flexDirection: "column", gap: 1}}>
                    <Typography
                        component={Link}
                        href={getCurrentCardUrl()}
                        variant="h6"
                        sx={{
                            cursor: 'pointer',
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: '0.2s',
                            '&:hover': {
                                color: 'red'
                            }
                        }}
                    >
                        {card.title}
                    </Typography>
                    <Chip label={card.categoryName} variant="outlined" sx={{ alignSelf: 'flex-start' }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{getPrice(card.cost)}</Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1}}>
                    <Typography color="info">{getDate(card.date)}</Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: 'wrap', }}>
                        <Chip label={STATUS_META[card.status].title} color={getStatusColor(card.status)} />
                        <Chip label={PRIORITY_META[card.priority].title} variant="outlined" color={getPriorityColor(card.priority)} />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CardMy;