"use client"

import React, { FC, useEffect, useMemo } from "react";
import cl from "../../styles/PaginationBar.module.css"
import { useRouter, useSearchParams } from "next/navigation";
import { parseSearchParams } from "../../utils/mapServerResponseOrUrlParamsToLocalInterfaces";
import { ISearchParams } from "../../types/server_types";
import { makeUrlFromParamsCombo, makeUrlSearchParamsNoDefault } from "../../utils/makeUrlParamsFromLocalInterfaces";
import { Box, Pagination, Typography } from "@mui/material";

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

    function handlePageChange(event: React.ChangeEvent<unknown>, i: number) {
        let params: ISearchParams = parseSearchParams(searchParams);
        params.page = i.toString();
        let url_params: URLSearchParams = makeUrlSearchParamsNoDefault(params)
        let url_with_params = makeUrlFromParamsCombo(url_params.toString(), '/')
        router.replace(url_with_params);
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 8, gap: 0.5, paddingBottom: 6  }}>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} size="large"/>
            <Typography variant="body2">Всего объявлений {totalItems}</Typography>
        </Box>
    )
}

export default PaginationBar;