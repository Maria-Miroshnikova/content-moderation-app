
import cl from "../styles/ModerationHistoryPanel.module.css"
import { IModerationHistoryItem } from "../types/server_types";
import { EStatus, STATUS_BY_SERVER_TITLE, STATUS_META } from "../types/enums";
import { Box, Chip, Paper, Typography } from "@mui/material";
import { getFormattedDate, getFormattedDateShort, getFormattedDurationString } from "../utils/date_formatting";
import { getStatusColor } from "../utils/color_formatting";

interface ModerationHistoryPanelProps {
    history: IModerationHistoryItem[]
}

const ModerationHistoryPanel = ({ history }: ModerationHistoryPanelProps) => {

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
            <Typography variant="h6" sx={{ mb: 1 }}>История модерации</Typography>
            {(history !== undefined) && history.map((h: IModerationHistoryItem) => {
                return (
                    <Paper key={h.id} sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 0.5}}>
                        <Typography variant="body1" color="info">{h.moderatorName}</Typography>
                        <Typography variant="body2"><b>Комментарий:</b> {h?.comment}</Typography>
                        {STATUS_BY_SERVER_TITLE[h.action] === EStatus.DECLINED &&
                            <Typography variant="body2"><b>Причина отклонения:</b> {h.reason}</Typography>
                        }
                        {STATUS_BY_SERVER_TITLE[h.action] === EStatus.DRAFT &&
                            <Typography variant="body2"><b>Причина возвращения:</b> {h.reason}</Typography>
                        }
                        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                            <Chip label={STATUS_META[STATUS_BY_SERVER_TITLE[h.action]].title} size="small" color="info" variant="filled" color={getStatusColor(STATUS_BY_SERVER_TITLE[h.action])} />
                            <Typography variant="caption" color="info" sx={{ textAlign: "right", display: "block", ml: "auto" }}>{getFormattedDateShort(h.timestamp)}</Typography>
                        </Box>
                    </Paper>)
            })}
        </Box>
    )
}

export default ModerationHistoryPanel;