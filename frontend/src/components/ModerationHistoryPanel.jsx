import { useEffect, useState } from "react";
import { STATUS_ACCEPTED, STATUS_DECLINED, STATUS_INPRROCESS } from "../pages/AdsPage";
import cl from "./ModerationHistoryPanel.module.css"

const ModerationHistoryPanel = ({ history }) => {

    const getDecision = (status) => {
        if (status === STATUS_ACCEPTED) {
            return "Одобрено"
        }
        else if (status === STATUS_DECLINED) {
            return "Отклонено"
        }
        else if (status === STATUS_INPRROCESS) {
            return "На модерации"
        }
        else {
            return "Возвращено"
        }
    }

    return (
        <div className={cl.history}>
            <p>История модерации</p>
            {(history !== undefined) &&history.map((h) => {
                return (
                    <div key={h.id} className={cl.episode}>
                        <p>{h.moderatorName}</p>
                        <p>{h.timestamp}</p>
                        <p><b>Комментарий:</b> {h.comment}</p>
                        <p><b>{getDecision(h.status)}</b></p>
                        {h.status === STATUS_DECLINED && <p><b>Причина отклонения:</b> {h.reason}</p>}
                    </div>)
            })}
        </div>
    )
}

export default ModerationHistoryPanel;