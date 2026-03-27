"use client"

import React, { FC, useEffect, useMemo } from "react";
import cl from "../../styles/PaginationBar.module.css"

interface PaginationBarProps {
    totalPages: number,
    totalItems: number,
    page: number,
    setPage: (i: number) => void
}

const PaginationBar = ({ totalPages, totalItems, page, setPage}: PaginationBarProps) => {

    const pageArray = useMemo(() => {
        //console.log("create array for totalPages: ", totalPages)
        let arr = []
        for (let i = 0; i < totalPages; ++i) {
            arr.push(i + 1)
        }
        //console.log(arr)
        return arr
    }, [totalPages])

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
                        onClick={(e) => { setPage(i) }}
                    >{i}</button>
                })}
            </div>
            <p className={cl.cards_count_p}>Всего объявлений {totalItems}</p>
        </div>
    )
}

export default PaginationBar;