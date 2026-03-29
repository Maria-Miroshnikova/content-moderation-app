"use client"

import { createContext, FC, ReactNode, useContext, useState } from "react";
import { FILTER_DEFAULT, IFilter, ISort } from "../types/local_types";
import { ESort } from "../types/enums";

export interface IFilterAndSortContext {
    filter: IFilter,
    setFilter: React.Dispatch<React.SetStateAction<IFilter>>,
    sort: ISort,
    setSort: React.Dispatch<React.SetStateAction<ISort>>,
    idPage: number,
    setIdPage: React.Dispatch<React.SetStateAction<number>>,
    totalItems: number,
    setTotalItems: React.Dispatch<React.SetStateAction<number>>
}

const FilterAndSortContext = createContext<IFilterAndSortContext | undefined>(undefined);

interface FilterAndSortProviderProps {
    children: ReactNode
}

export const FilterAndSortProvider: FC<FilterAndSortProviderProps> = ({ children }) => {

    const [sort, setSort] = useState<ISort>({
        type: ESort.DEFAULT,
        sort_up: true
    })

    const [filter, setFilter] = useState<IFilter>(FILTER_DEFAULT)
    // idPage - хранит номер карточки в фильтрованном и сортированном списке, в форме от 1 до totalItems
    // его посылают на сервер в качестве page чтобы получить данный элемент через getAll(limit = 1, page = idPage)
    // за его корректное вычисление отвечает CardList, idPage = limit * (page - 1) + index + 1,
    // где page - выбранная страница из пагинации, index - индекс в массиве карточек
    // этим значением так же управляют кнопки (пред/след) на странице детального просмотра
    const [idPage, setIdPage] = useState<number>()
    const [totalItems, setTotalItems] = useState<number>()

    return (
        <FilterAndSortContext.Provider value={{ filter, setFilter, sort, setSort, idPage, setIdPage, totalItems, setTotalItems }}>
            {children}
        </FilterAndSortContext.Provider>
    );
};

export const useFilterAndSortContext = () => {
    const context = useContext(FilterAndSortContext)

    if (!context) {
        throw new Error("useFilterAndSort must be used inside FilterAndSortProvider")
    }

    return context
}