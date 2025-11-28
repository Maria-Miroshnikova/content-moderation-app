import { use, useEffect, useState } from "react"
import { STATUS_DECLINED } from "../pages/AdsPage"
import cl from "./RejectPanel.module.css"
import { isVisible } from "@testing-library/user-event/dist/utils"
import Service from "../API/Service"
import { useFetching } from "../hooks/useFetching"

const REASONS = ["Запрещенный товар", "Неверная категория", "Некорректное описание", "Проблемы с фото", "Подозрение на мошенничество", "Другое"]
const REASON_NOT_SELECTED = -1;
//const REASONS_DEFAULT = [false, false, false, false, false, false]

const RejectPanel = ({ actionType, actionStatus, setAtionStatus, id, setVisibility }) => {

    //   const [reasons, setReasons] = useState(REASONS_DEFAULT)
    const [reason, setReason] = useState(REASON_NOT_SELECTED)
    const [comment, setComment] = useState("")

    const [postReject, isLoadingReject, errorReject] = useFetching(async () => {
        const response = await Service.postRejectedById(id, comment, REASONS[reason])
        //console.log(response)
        setAtionStatus(!actionStatus)
    })

    const [postDraft, isLoadingDraft, errorDraft] = useFetching(async () => {
        const response = await Service.postDraftById(id, comment, REASONS[reason])
        //console.log(response)
        setAtionStatus(!actionStatus)
    })

    useEffect(() => {
        setComment("")
        setReason(REASON_NOT_SELECTED)
    }, [actionType])

    const getTitle = () => {
        if (actionType === STATUS_DECLINED)
            return "Отклонение"
        else
            return "Возвращение на доработку"
    }


    const handleClick = () => {
        if (reason !== REASON_NOT_SELECTED) {
            if (actionType === STATUS_DECLINED)
                postReject();
            else
                postDraft();
            setVisibility(false)
        }
    }

    return (
        <div className={cl.container}>
            <p><b>{getTitle()}</b></p>
            <div className={cl.inner_panel}>
                <p>Причина:</p>
                {REASONS.map((name, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            name="reason"       // важно: одинаковое имя для всей группы
                            value={index}       // можно хранить индекс или сам reason
                            checked={reason === index}
                            onChange={() => setReason(index)}
                        />
                        {name}
                    </label>
                ))}
            </div>
            <div className={cl.inner_panel}>
                <p>Комментарий:</p>
                <textarea rows={4} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Опишите подробно причину..."></textarea>
            </div>
            <button onClick={() => handleClick()}>Отправить</button>
        </div>
    )
}

export default RejectPanel;