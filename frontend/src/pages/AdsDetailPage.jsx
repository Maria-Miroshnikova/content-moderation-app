import cl from "./AdsDetailPage.module.css"
import img_placeholder from "../img/img_placeholder.png"
import { useFetching } from "../hooks/useFetching"
import Service from "../API/Service";
import { useContext, useEffect, useState } from "react";
import ModerationHistoryPanel from "../components/ModerationHistoryPanel";
import GalleryPanel from "../components/GalleryPanel";
import DescriptionPanel from "../components/DescriptionPanel";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FilterAndSortContext } from "../context";

const AdsDetailPage = () => {

    const navigate = useNavigate();

    const [adsData, setAdsData] = useState({})

    const params = useParams()

    const { filter, sort, idPage, setIdPage, totalItems } = useContext(FilterAndSortContext)

    const [fetchHistory, isLoadingHistory, errorHistory] = useFetching(async (id) => {
        const response = await Service.getAdsById(id)
        //console.log(response.data)
        setAdsData(response.data)
    })

    // загрузка данных карточки
    useEffect(() => {
        fetchHistory(params.id)
        //console.log("total items from context: ", totalItems)
        //console.log("idPage after open: ", idPage)
    }, [params.id])

    const [idLeft, setIdLeft] = useState(-1)
    const [idRight, setIdRight] = useState(-1)

    // загрузка карточек по бокам для возможности листать влево-вправо
    const [fetchSideCards, isLoadingSideCards, errorSideCards] = useFetching(async () => {
        if (idPage < totalItems) {
            let i = idPage + 1;
            const response = await Service.getAll(1, i, filter, sort)
            console.log("right el: ", response.data.pagination)
            setIdRight(response.data.ads[0].id)
        }
        else
            setIdRight(-1)

        if (idPage > 1) {
            let i = idPage - 1;
            const response = await Service.getAll(1, i, filter, sort)
            console.log("left el: ", response.data.pagination.page)
            setIdLeft(response.data.ads[0].id)
        }
        else
            setIdLeft(-1)
    })

    // загрузка карточек по бокам для возможности листать влево-вправо
    useEffect(() => {
    //    console.log("totalItems: ", totalItems)
        console.log("id-page: ", idPage)
        fetchSideCards()
    }, [params.id])

    const handeClickLeft = (e) => {
        e.preventDefault();
        let i = idPage - 1;
        setIdPage(i);
        navigate(`/item/${idLeft}`)
    }

    const handleClickRight = (e) => {
        e.preventDefault();
        let i = idPage + 1;
        setIdPage(i);
        navigate(`/item/${idRight}`)
    }

    return (
        <div className={cl.AdsDetailsPage_layout}>
            <div className={cl.gallery_and_history_layout}>
                <GalleryPanel images={adsData.images} className={cl.gallery} />
                <ModerationHistoryPanel history={adsData.moderationHistory} className={cl.history} />
            </div>
            <div className={cl.description}>
                <DescriptionPanel data={adsData} />
            </div>
            <div className={cl.buttons_panel}>
                <button>Одобрить</button>
                <button>Отклонить</button>
                <button>Доработка</button>
            </div>
            <div className={cl.navigation_panel}>
                <Link to="/list">К списку</Link>
                <div>
                    {(idLeft !== -1) &&
                        <Link to={`/item/${idLeft}`} onClick={(e) => handeClickLeft(e)}>Пред |</Link>}
                    {(idRight !== -1) &&
                        <Link to={`/item/${idRight}`} onClick={(e) => handleClickRight(e)}>След</Link>}
                </div>
            </div>
        </div>
    )
}

export default AdsDetailPage;