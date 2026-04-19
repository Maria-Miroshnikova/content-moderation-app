"use client"

import { useEffect, useState } from "react"
import cl from "../styles/RejectPanel.module.css"
import { EReason, EStatus, REASONS_META, STATUS_META } from "../types/enums"
import { useRouter, useSearchParams } from "next/navigation"
import { ICurrentPageParamsFull } from "../app/[id]/page"
import { getCurrentCardUrl, reconstructSearchParamsFromUrl } from "../utils/makeUrlParamsFromLocalInterfaces"
import { Box, Button, DialogActions, DialogContent, DialogTitle, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material"

interface RejectPanelProps {
    params: ICurrentPageParamsFull,
    actionType: EStatus,
    id: string,
    //  isVisible: boolean,
    rejectPost: (data: FormData) => Promise<void>,
    draftPost: (data: FormData) => Promise<void>
}

const RejectPanel = ({ params, actionType, id, rejectPost, draftPost }: RejectPanelProps) => {

    const [reason, setReason] = useState(EReason.OTHER)
    const [comment, setComment] = useState("")

    function handleCloseModalViewWhenPostAndGetRedirectUrl() {
        let newParams: ICurrentPageParamsFull = JSON.parse(JSON.stringify(params));
        //console.log("json: ", newParams)
        delete newParams.action;
        delete newParams.modalView;
        reconstructSearchParamsFromUrl(newParams);
        let url = getCurrentCardUrl(newParams, id);
        return url;
    }

    if (!actionType) return null;

    return (
        <form style={{padding: "16px"}} action={(actionType == EStatus.DECLINED) ? rejectPost : draftPost}>
            <input type="hidden" name="cardId" value={id} />
            <input type="hidden" name="url" value={handleCloseModalViewWhenPostAndGetRedirectUrl()} />
            <DialogTitle variant="h5">{STATUS_META[actionType].movalView}</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" color="textSecondary">Причина:</Typography>
                <RadioGroup
                    name="reason"
                    value={reason}
                    onChange={(e) => setReason(Number(e.target.value))}
                >
                    {Object.entries(REASONS_META).filter(([key]) => Number(key) !== EReason.NOT_SELECTED).map(([key, value]) => (
                        <FormControlLabel key={key} value={key} label={value} control={<Radio />}/>
                    ))}
                </RadioGroup>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" color="textSecondary">Комментарий</Typography>
                    <TextField name="comment" value={comment} multiline
                        rows={4} onChange={(e) => setComment(e.target.value)} fullWidth placeholder="Опишите подробно причину..."></TextField>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button type="submit">Отправить</Button>
            </DialogActions>
        </form >
    )
}

export default RejectPanel;