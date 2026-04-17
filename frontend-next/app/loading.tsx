import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingAds() {
    return(
        <Box sx={{display:"flex", justifyContent: "center", background: "#f5f5f5", height: "100vh" }}>
            <CircularProgress aria-label="Loading…" sx={{mt: 4}}/>
        </Box>
    )
}