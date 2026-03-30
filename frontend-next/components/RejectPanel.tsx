"use client"

import { useEffect, useState } from "react"
import cl from "../styles/RejectPanel.module.css"
import { EReason, EStatus, REASONS_META, STATUS_META } from "../types/enums"
import { useRouter, useSearchParams } from "next/navigation"

interface RejectPanelProps {
    actionType: EStatus,
    id: string,
    isVisible: boolean,
    rejectPost: (data: FormData) => Promise<void>,
    draftPost: (data: FormData) => Promise<void>
}

const RejectPanel = ({ actionType, id, isVisible, rejectPost, draftPost }: RejectPanelProps) => {

    const [reason, setReason] = useState(EReason.OTHER)
    const [comment, setComment] = useState("")

    if (!isVisible)
        return null

    return (
        <form className={cl.container} action={(actionType == EStatus.DECLINED) ? rejectPost : draftPost}>
            <input type="hidden" name="cardId" value={id} />
            <p><b>{STATUS_META[actionType].movalView}</b></p>
            <div className={cl.inner_panel}>
                <p>Причина:</p>
                {Object.entries(REASONS_META).filter(([key]) => Number(key) !== EReason.NOT_SELECTED).map(([key, value]) => (
                    <label key={key}>
                        <input
                            type="radio"
                            name="reason"
                            value={key}
                            checked={reason === Number(key)}
                            onChange={() => setReason(Number(key))}
                        />
                        {value}
                    </label>
                ))}
            </div>
            <div className={cl.inner_panel}>
                <p>Комментарий:</p>
                <textarea name="comment" rows={4} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Опишите подробно причину..."></textarea>
            </div>
            <button type="submit">Отправить</button>
        </form>
    )
}

export default RejectPanel;