"use client"

import React, { FC, useEffect, useMemo } from "react";
import cl from "../../styles/PaginationBar.module.css"
import { useRouter, useSearchParams } from "next/navigation";
import { parseSearchParams } from "../../utils/mapServerResponseOrUrlParamsToLocalInterfaces";
import { ISearchParams } from "../../types/server_types";
import { makeUrlFromParamsCombo, makeUrlSearchParamsNoDefault } from "../../utils/makeUrlParamsFromLocalInterfaces";

interface PaginationBarProps {
    totalPages: number,
    totalItems: number,
    page: number
}

const PaginationBar = ({ totalPages, totalItems, page }: PaginationBarProps) => {

    const router = useRouter()
    const searchParams = useSearchParams()


    const pageArray = useMemo(() => {
        let arr = []
        for (let i = 0; i < totalPages; ++i) {
            arr.push(i + 1)
        }
        return arr
    }, [totalPages])

    function handlePageChange(i: number) {
        let params: ISearchParams = parseSearchParams(searchParams);
        params.page = i.toString();
        let url_params: URLSearchParams = makeUrlSearchParamsNoDefault(params)
        let url_with_params = makeUrlFromParamsCombo(url_params.toString(), '/')
        router.replace(url_with_params);
    }

    return (
        <div className={cl.pagination_layout}>
            <div className={cl.paginationBar}>
                {pageArray.map((i) => {
                    return <button key={i}
                        className={
                            i === page
                                ? [cl.pagination_btn_current, cl.pagination_btn].join(' ')
                                : cl.pagination_btn
                        }
                        onClick={(e) => { handlePageChange(i) }}
                    >{i}</button>
                })}
            </div>
            <p className={cl.cards_count_p}>Всего объявлений {totalItems}</p>
        </div>
    )
}

export default PaginationBar;