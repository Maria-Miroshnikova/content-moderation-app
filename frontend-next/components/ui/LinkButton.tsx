"use client";

import { Button } from "@mui/material"
import Link from "next/link"

interface LinkButtonProps {
    path: string,
    label: string
}

const LinkButton = ({path, label} : LinkButtonProps) => {
    return (
        <Button component={Link} href={path} sx={{ my: 2, color: 'inherit'}}>
            {label}
        </Button>
    )
}

export default LinkButton;