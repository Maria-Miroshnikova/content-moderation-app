import cl from "./AdsDetailPage.module.css"
import img_placeholder from "../img/img_placeholder.png"
import { useFetching } from "../hooks/useFetching"
import Service from "../API/Service";
import { useEffect, useState } from "react";
import ModerationHistoryPanel from "../components/ModerationHistoryPanel";
import GalleryPanel from "../components/GalleryPanel";
import DescriptionPanel from "../components/DescriptionPanel";

const AdsDetailPage = () => {

    const [adsData, setAdsData] = useState({})

    const id = 13;
    const [fetchHistory, isLoadingHistory, errorHistory] = useFetching(async (id) => {
        const response = await Service.getAdsById(id)
        console.log(response.data)
        setAdsData(response.data)
    },)

    useEffect(() => {
        fetchHistory(id)
    }, [id])


    return (
        <div className={cl.AdsDetailsPage_layout}>
            <div className={cl.gallery_and_history_layout}>
                <GalleryPanel images={adsData.images} className={cl.gallery}/>
                <ModerationHistoryPanel history={adsData.moderationHistory} className={cl.history}/>
            </div>
            <div className={cl.description}>
                <DescriptionPanel data={adsData}/>
            </div>
            <div className={cl.buttons_panel}>
                <button>Одобрить</button>
                <button>Отклонить</button>
                <button>Доработка</button>
            </div>
            <div className={cl.navigation_panel}>
                <a>К списку</a>
                <a>Пред | След</a>
            </div>
        </div>
    )
}

export default AdsDetailPage;