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
import { Box, Button, Container, IconButton, Paper } from '@mui/material';
import LinkButton from '../../components/ui/LinkButton';
import LinkIconButton from '../../components/ui/LinkIconButton';

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";


async function approvePost(data: FormData) {
    'use server';

    const { cardId } = Object.fromEntries(data);

    const response = await fetch(`http://localhost:3001/api/v1/ads/${cardId}/approve?id=${cardId}`, {
        method: "POST"

    });

    const resp = await response.json();
    revalidatePath(`/${cardId}`)
    revalidatePath('/');
    revalidatePath('/stats');
}


async function rejectPost(data: FormData) {
    'use server';

    const cardId: string = data.get('cardId') as string;
    const reason: EReason = Number(data.get('reason') as string);
    const reasotText: string = REASONS_META[reason];
    const comment: string = data.get('comment') as string;
    const url_redirect: string = data.get('url') as string;

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
    revalidatePath('/');
    revalidatePath('/stats');
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
    revalidatePath('/');
    revalidatePath(`/${cardId}`);
    revalidatePath('/stats');
    redirect(url_redirect);
}

export type ICurrentPageParamsFull = ICurrentPageParams & ISearchParams;

interface PageProps {
    params: {
        id: string
    }
    searchParams: ICurrentPageParamsFull
}

// TODO: сейчас страница обновляется сразу после модерации, сервер полагается на list Id
// если в фильтрах есть статус и статус объявления меняется на не входящий в фильтры,
// карточка сразу перелистнется на следующую!
// надо в будущем сделать контекст
async function CurrentAdPage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const search = await searchParams;

    const adDetails: IAd = await getAdByIdAndFilter(search) // getAdById(id)
    //console.log("ads response: ", adDetails)
    if (adDetails == undefined) {
        returnToFilteredList();
    }

    if (adDetails.id !== Number(id)) {
        const query = makeURLSearchParamsFromPageSearchParams(search);
        const url_query = query.toString()

        redirect(`/${adDetails.id}?${url_query}`)
    }

    function returnToFilteredList() {
        const query = makeURLSearchParamsFromPageSearchParams(search);
        query.delete("modalView")
        query.delete("action")
        query.delete("totalItems")
        query.delete("listId")
        const url_query = query.toString()
        redirect(`/?${url_query}`);
    }

    function getRejectionPanelUrl(action: EStatus) {
        let newParams: ICurrentPageParamsFull = JSON.parse(JSON.stringify(search));
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

    function getSideAdUrl(toLeft: boolean) {
        let newParams: ICurrentPageParamsFull = JSON.parse(JSON.stringify(search));
        if (toLeft) {
            let new_value = Number(search.listId) - 1;
            newParams.listId = new_value;
        }
        else {
            let new_value = Number(search.listId) + 1;
            newParams.listId = new_value;
        }
        delete newParams.action;
        delete newParams.modalView;
        reconstructSearchParamsFromUrl(newParams);

        const url_params_currend_ad: URLSearchParams = makeUrlCurrentPageParams(newParams);
        const url_params_search: URLSearchParams = makeUrlSearchParamsNoDefault(newParams);
        const fake_card_id = 0;
        const url_with_params: string = makeUrlFromParamsCombo([url_params_search.toString(), url_params_currend_ad.toString()], `/${fake_card_id}`)

        return url_with_params;
    }

    return (

        <Box sx={{ display: 'flex', paddingLeft: 2, paddingRight: 2, position: "relative" }} >

            <LinkIconButton url={getSideAdUrl(true)} sx={{
                backgroundColor: "white",
                boxShadow: 2,
                "&:hover": {
                    backgroundColor: "grey.100",
                },
                visibility: (Number(search.listId) > 1) ? "visible" : "hidden",
                alignSelf: 'center'
            }}>
                <ArrowBackIosNewIcon fontSize="small" />
            </LinkIconButton>


            <Paper sx={{ width: "60%", mx: "auto", display: 'flex', flexDirection: 'column', padding: 4, gap: 2 }}>
                <ModalView isVisible={search.modalView ?? false}>
                    <RejectPanel params={search} actionType={STATUS_BY_SERVER_TITLE[search.action]} id={id} isVisible={search.modalView ?? false} rejectPost={rejectPost} draftPost={draftPost} />
                </ModalView>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <GalleryPanel images={adDetails.images} />
                    <ModerationHistoryPanel history={adDetails.moderationHistory} />
                </Box>
                <Paper variant='outlined' sx={{ padding: 4 }}>
                    <DescriptionPanel data={adDetails} />
                </Paper>
                <Box sx={{ display: "flex", alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                    <form>
                        <input type="hidden" name="cardId" value={id} />
                        <input type="hidden" name="url" value={getCurrentCardUrl(search, id)} />
                        <Button formAction={approvePost} variant='outlined'>
                            Одобрить
                        </Button>
                    </form>
                    <LinkButton path={getRejectionPanelUrl(EStatus.DECLINED)} label='Отклонить' variant='outlined' />
                    <LinkButton path={getRejectionPanelUrl(EStatus.DRAFT)} label='Доработка' variant='outlined' />
                </Box>
                <div className={cl.navigation_panel}>
                    <Link href={getAllAdsUrl()}>К списку</Link>
                </div>
            </Paper>

            <LinkIconButton url={getSideAdUrl(false)}
                sx={{
                    backgroundColor: "white",
                    boxShadow: 2,
                    "&:hover": {
                        backgroundColor: "grey.100",
                    },
                    visibility: (Number(search.listId) < Number(search.totalItems)) ? "visible" : "hidden",
                    alignSelf: 'center'
                }}>
                <ArrowForwardIosIcon fontSize="small" />
            </LinkIconButton>
        </Box>
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
