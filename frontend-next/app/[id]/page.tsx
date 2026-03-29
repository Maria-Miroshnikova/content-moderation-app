


import DescriptionPanel from '../../components/DescriptionPanel';
import GalleryPanel from '../../components/GalleryPanel';
import ModerationHistoryPanel from '../../components/ModerationHistoryPanel';
import cl from '../../styles/PageCurrentAd.module.css';
import { ICard } from '../../types/local_types';
import { IAd, ISearchParams } from "../../types/server_types";
import { makeUrlWithParams, reconstructSearchParamsFromUrl } from "../../utils/makeUrlParamsFromLocalInterfaces";
import { mapAdToCard } from '../../utils/mapServerResponseOrUrlParamsToLocalInterfaces';

interface PageProps {
    id: string
}

async function CurrentAdPage({params}: {params: PageProps}) {
    const {id} = await params;
    //console.log(id)
    const adDetails: IAd = await getAdById(id)
    const card: ICard = mapAdToCard(adDetails)
    console.log(adDetails)

    return (
        <div className={cl.AdsDetailsPage_layout}>
            <div className={cl.gallery_and_history_layout}>
                <GalleryPanel images={adDetails.images}/>
                <ModerationHistoryPanel history={adDetails.moderationHistory}/>
            </div>
            <div className={cl.description}>
                <DescriptionPanel data={adDetails} />
            </div>
            
        </div>
    );
}

export default CurrentAdPage;

async function getAdById(id: string) {
    const url = `http://localhost:3001/api/v1/ads/${id}`

    const response = await fetch(url, {
        next: {
            revalidate: 60
        },

    })

    if (!response.ok) throw new Error("Unable to fetch ads")

    const response_json: IAd = await response.json()
    console.log(response_json)
    return response_json;
}

/*

const AdsDetailPage = () => {

    const navigate = useNavigate();

    const [adsData, setAdsData] = useState({})

    const params = useParams()

    const [fetchHistory, isLoadingHistory, errorHistory] = useFetching(async (id) => {
        const response = await Service.getAdsById(id)
        //console.log("form resp after fetch: ", response)
        setAdsData(response)
    })

    // для отслеживания нажатия на кнопки
    const [actionStatus, setAtionStatus] = useState(true)
    const [actionType, setActionType] = useState(-1)

    const [idLeft, setIdLeft] = useState(-1)
    const [idRight, setIdRight] = useState(-1)

    // загрузка карточек по бокам для возможности листать влево-вправо
    const [fetchSideCards, isLoadingSideCards, errorSideCards] = useFetching(async () => {
        if (idPage < totalItems) {
            let i = idPage + 1;
            const response = await Service.getAll(1, i, filter, sort)
            //console.log("right el: ", response.data.pagination)
            setIdRight(response.data.ads[0].id)
        }
        else
            setIdRight(-1)

        if (idPage > 1) {
            let i = idPage - 1;
            const response = await Service.getAll(1, i, filter, sort)
            //console.log("left el: ", response.data.pagination.page)
            setIdLeft(response.data.ads[0].id)
        }
        else
            setIdLeft(-1)
    })

    // загрузка карточек по бокам для возможности листать влево-вправо
    useEffect(() => {
        //    console.log("totalItems: ", totalItems)
        //console.log("id-page: ", idPage)
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

    const [postApprove, isLoadingApprove, errorApprove] = useFetching(async (id) => {
        const response = await Service.postApproveById(id)
        //console.log(response.data)
        setAtionStatus(!actionStatus)
    })

    const [modalVisibility, setModalVisibility] = useState(false)

    return (
        <div className={cl.AdsDetailsPage_layout}>
            <ModalView isVisible={modalVisibility} setIsVisible={setModalVisibility}>
                <RejectPanel actionType={actionType} actionStatus={actionStatus} setAtionStatus={setAtionStatus} id={params.id} setVisibility={setModalVisibility}/>
            </ModalView>

            <div className={cl.gallery_and_history_layout}>
                <GalleryPanel images={adsData.images} className={cl.gallery} />
                <ModerationHistoryPanel history={adsData.moderationHistory} className={cl.history} />
            </div>
            <div className={cl.description}>
                <DescriptionPanel data={adsData} />
            </div>
            <div className={cl.buttons_panel}>
                <button onClick={() => postApprove(params.id)}>
                    Одобрить
                </button>
                <button onClick={() => {
                    setActionType(STATUS_DECLINED);
                    setModalVisibility(true)
                }}
                >
                    Отклонить</button>
                <button onClick={() => {
                    setActionType(STATUS_DRAFT);
                    setModalVisibility(true)
                }}
                >
                    Доработка
                </button>
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

export default AdsDetailPage;*/