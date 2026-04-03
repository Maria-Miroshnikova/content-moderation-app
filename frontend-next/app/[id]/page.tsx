'use server';


import Link from 'next/link';
import DescriptionPanel from '../../components/DescriptionPanel';
import GalleryPanel from '../../components/GalleryPanel';
import ModerationHistoryPanel from '../../components/ModerationHistoryPanel';
import ModalView from '../../components/ui/ModalView';
import cl from '../../styles/PageCurrentAd.module.css';
import { ICard } from '../../types/local_types';
import { IAd, IAdResponse, ICurrentPageParams, IGetAdsAnswer, ISearchParams } from "../../types/server_types";
import { mapAdToCard, parseCurrentPageParams, parseSearchParams } from '../../utils/mapServerResponseOrUrlParamsToLocalInterfaces';
import { EReason, EStatus, REASONS_META, STATUS_BY_SERVER_TITLE, STATUS_META } from '../../types/enums';
import { revalidatePath } from 'next/cache';
import RejectPanel from '../../components/RejectPanel';
import { redirect } from 'next/navigation';
import { getCurrentCardUrl, makeUrlCurrentPageParams, makeUrlFromParamsCombo, makeUrlSearchParamsForServer, makeURLSearchParamsFromPageSearchParams, makeUrlSearchParamsNoDefault, reconstructSearchParamsFromUrl } from '../../utils/makeUrlParamsFromLocalInterfaces';


async function approvePost(data: FormData) {
    'use server';

    const { cardId } = Object.fromEntries(data);
    //const url_redirect: string = data.get('url') as string;

    const response = await fetch(`http://localhost:3001/api/v1/ads/${cardId}/approve?id=${cardId}`, {
        method: "POST"

    });

    const resp = await response.json();
    //console.log(resp);
    revalidatePath(`/${cardId}`)
    revalidatePath('/');
}


async function rejectPost(data: FormData) {
    'use server';

    const cardId: string = data.get('cardId') as string;
    const reason: EReason = Number(data.get('reason') as string);
    const reasotText: string = REASONS_META[reason];
    const comment: string = data.get('comment') as string;
    const url_redirect: string = data.get('url') as string;

    console.log(cardId, reason, comment);

    const response = await fetch(`http://localhost:3001/api/v1/ads/${cardId}/reject?id=${cardId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reason: reasotText,
            comment: comment
        })
    });

    const resp = await response.json();
    //console.log("ответ сервера reject: ", resp);

    revalidatePath('/');
    revalidatePath(`/${cardId}`);
    redirect(url_redirect);
}

async function draftPost(data: FormData) {
    'use server';

    const cardId: string = data.get('cardId') as string;
    const reason: EReason = Number(data.get('reason') as string);
    const reasotText: string = REASONS_META[reason];
    const comment: string = data.get('comment') as string;

    const url_redirect: string = data.get('url') as string;

    console.log(cardId, reason, comment);

    const response = await fetch(`http://localhost:3001/api/v1/ads/${cardId}/request-changes?id=${cardId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reason: reasotText,
            comment: comment
        })
    });

    const resp = await response.json();
    //console.log("ответ сервера reject: ", resp);

    revalidatePath('/');
    revalidatePath(`/${cardId}`);
    redirect(url_redirect);
}

export type ICurrentPageParamsFull = ICurrentPageParams & ISearchParams;

interface PageProps {
    params: {
        id: string
    }
    searchParams: ICurrentPageParamsFull
}

async function CurrentAdPage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const search = await searchParams;
    //const search: ICurrentPageParamsFull = await searchParams;
    // console.log("current page PARAMS: ", id, search)

    const adDetails: IAd = await getAdByIdAndFilter(search) // getAdById(id)
    if (adDetails.id !== Number(id))
    {
        const query = makeURLSearchParamsFromPageSearchParams(search);
        const url_query = query.toString()

        redirect(`/${adDetails.id}?${url_query}`)
    }

    function getRejectionPanelUrl(action: EStatus) {
        let newParams: ICurrentPageParamsFull = JSON.parse(JSON.stringify(search));
        //console.log("json: ", newParams)
        newParams.action = STATUS_META[action].server;
        newParams.modalView = true;
        reconstructSearchParamsFromUrl(newParams)
        let url = getCurrentCardUrl(newParams, id);
        return url;
    }

    function getAllAdsUrl() {
        let newParams: ICurrentPageParamsFull = JSON.parse(JSON.stringify(search));
        delete newParams.action;
        delete newParams.listId;
        delete newParams.modalView;
        delete newParams.totalItems;
        reconstructSearchParamsFromUrl(newParams);
        const url_params: URLSearchParams = makeUrlSearchParamsNoDefault(newParams);
        const url_with_params: string = makeUrlFromParamsCombo(url_params.toString(), '/')
        return url_with_params;
    }

    return (
        <div className={cl.AdsDetailsPage_layout}>
            <ModalView isVisible={search.modalView ?? false}>
                <RejectPanel params={search} actionType={STATUS_BY_SERVER_TITLE[search.action]} id={id} isVisible={search.modalView ?? false} rejectPost={rejectPost} draftPost={draftPost} />
            </ModalView>

            <div className={cl.gallery_and_history_layout}>
                <GalleryPanel images={adDetails.images} />
                <ModerationHistoryPanel history={adDetails.moderationHistory} />
            </div>
            <div className={cl.description}>
                <DescriptionPanel data={adDetails} />
            </div>
            <div className={cl.buttons_panel}>
                <form>
                    <input type="hidden" name="cardId" value={id} />
                    <input type="hidden" name="url" value={getCurrentCardUrl(search, id)} />
                    <button formAction={approvePost}>
                        Одобрить
                    </button>
                </form>
                <Link href={getRejectionPanelUrl(EStatus.DECLINED)}>
                    <button>Отклонить</button>
                </Link>
                <Link href={getRejectionPanelUrl(EStatus.DRAFT)}>
                    <button>Доработка</button>
                </Link>
            </div>
            <div className={cl.navigation_panel}>
                <Link href={getAllAdsUrl()}>К списку</Link>
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

    if (!response.ok) throw new Error("Unable to fetch current ad")

    const response_json: IAd = await response.json()
    //console.log(response_json)

    return response_json;
}

async function getAdByIdAndFilter(params: ICurrentPageParamsFull) {
    const url = `http://localhost:3001/api/v1/ads`

    let newParams: ISearchParams = JSON.parse(JSON.stringify(params));
    newParams.limit = "1";
    newParams.page = (params.listId).toString();
    reconstructSearchParamsFromUrl(newParams)
    //console.log("new params: ", newParams)
    const url_params: URLSearchParams = makeUrlSearchParamsForServer(newParams)
    const url_with_params: string = makeUrlFromParamsCombo(url_params.toString(), url)
    //console.log("server url: ", url_with_params)

    const response = await fetch(url_with_params, {
        next: {
            revalidate: 60
        },

    })

    if (!response.ok) throw new Error("Unable to fetch current ad")

    const response_json: IGetAdsAnswer = await response.json()
    //console.log("resp from server: ", response_json.ads[0])

    return response_json.ads[0];
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