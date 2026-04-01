
import cl from "../styles/ModerationHistoryPanel.module.css"
import { IModerationHistoryItem } from "../types/server_types";
import { EStatus, STATUS_BY_SERVER_TITLE, STATUS_META } from "../types/enums";

interface ModerationHistoryPanelProps {
    history: IModerationHistoryItem[]
}

const ModerationHistoryPanel = ({ history }: ModerationHistoryPanelProps) => {

    return (
        <div className={cl.history}>
            <p>История модерации</p>
            {(history !== undefined) && history.map((h: IModerationHistoryItem) => {
                return (
                    <div key={h.id} className={cl.episode}>
                        <p>{h.moderatorName}</p>
                        <p>{h.timestamp}</p>
                        <p><b>Комментарий:</b> {h?.comment}</p>
                        <p><b>{STATUS_META[STATUS_BY_SERVER_TITLE[h.action]].title}</b></p>
                        {STATUS_BY_SERVER_TITLE[h.action] === EStatus.DECLINED && <p><b>Причина отклонения:</b> {h.reason}</p>}
                        {STATUS_BY_SERVER_TITLE[h.action] === EStatus.DRAFT && <p><b>Причина возвращения:</b> {h.reason}</p>}
                    </div>)
            })}
        </div>
    )
}

export default ModerationHistoryPanel;