import { Box, Paper, Rating, Typography } from "@mui/material";
import cl from "../styles/DescriptionPanel.module.css"
import { IAd } from "../types/server_types";
import { getFormattedDurationString } from "../utils/date_formatting";

interface DescriptionPanelProps {
    data: IAd
}

const DescriptionPanel = ({ data }: DescriptionPanelProps) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="h5">{data.title}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>Характеристики</Typography>
            <table style={{ width: "fit-content" }}>
                <tbody>
                    {Object.entries(data.characteristics).map((i, index) => {
                        return (
                            <tr key={index}>
                                <td style={{ paddingRight: 30 }}>
                                    <Typography color="textSecondary">
                                        {i[0]}
                                    </Typography>
                                </td>
                                <td>
                                    <Typography>
                                        {i[1]}
                                    </Typography>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Typography variant="h6" color="in" sx={{ mt: 2 }}>Полное описание</Typography>
            <Typography variant="body1">{data.description}</Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "right" }}>
                <Typography variant="body1" color="info">{data.seller.name}</Typography>
                <Rating value={Number(data.seller.rating)} sx={{ alignSelf: "center" }} readOnly />
            </Box>
            <Typography color="textSecondary" variant="caption" sx={{ml: "auto"}}> Объявлений: {data.seller.totalAds} | На сайте: {getFormattedDurationString(data.seller.registeredAt)}</Typography>
        </Box>
    )
}

export default DescriptionPanel;