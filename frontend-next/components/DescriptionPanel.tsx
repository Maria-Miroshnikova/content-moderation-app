import { Box, Paper, Rating, Typography } from "@mui/material";
import cl from "../styles/DescriptionPanel.module.css"
import { IAd } from "../types/server_types";
import { getFormattedDurationString } from "../utils/date_formatting";

interface DescriptionPanelProps {
    data: IAd
}

const DescriptionPanel = ({ data }: DescriptionPanelProps) => {



    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
                <Typography variant="h6"><b>Продавец:</b> {data.seller.name}</Typography>
                <Rating value={Number(data.seller.rating)} sx={{ alignSelf: "center" }} readOnly />
            </Box>
            <Typography> Объявлений: {data.seller.totalAds} | На сайте: {getFormattedDurationString(data.seller.registeredAt)}</Typography>
            <Typography variant="h6">Характеристики</Typography>
            <table>
                <tbody>
                    {Object.entries(data.characteristics).map((i, index) => {
                        return (
                            <tr key={index}>
                                <td>{i[0]}</td>
                                <td>{i[1]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Typography variant="h6" color="in">Полное описание</Typography>
            <Typography variant="body1">{data.description}</Typography>
        </Box>
    )
}

export default DescriptionPanel;