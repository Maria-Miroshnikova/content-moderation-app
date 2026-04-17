'use client';

import { Alert, AlertTitle, Box } from "@mui/material";

export default function ErrorWrapper({ error }: { error: Error }) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", background: "#f5f5f5",  alignItems: "center", height: "100vh" }}>
            <Alert severity="error" sx={{ display: "flex" }}>
                <AlertTitle>Error</AlertTitle>
                {error.message}</Alert>
        </Box>
    )
}