import Service from "../API/Service";
import { useFetching } from "./useFetching";


export function useCards(filter, sort) {
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState();

    const [fetchCards, isCardsLoading, error] = useFetching(async (limit, page, filter, sort) => {
        const response = await Service.getAll(limit, page, filter, sort)
        const form = Service.getFormattedCards(response.data)
        setCards(form)
        //console.log(form)
        setTotalItems(response.data.pagination.totalItems)
        setTotalPages(response.data.pagination.totalPages)
        //console.log("total pages: ", response.data.pagination.totalPages)
    })

    useEffect(() => {
        setPage(1);
    }, [filter, sort]);

    useEffect(() => {
        fetchCards(limit, page, filter, sort) //(limit, page)
        //console.log("sort changed: ", sort)
    }, [filter, sort, page, limit])


    return {
        cards,
        page,
        setPage,
        setLimit,
        totalPages,
        totalItems,
        isCardsLoading,
        error,
    };
}