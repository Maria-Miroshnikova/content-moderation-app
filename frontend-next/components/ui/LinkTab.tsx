"use client";

import { Tab } from "@mui/material";
import Link from "next/link"

interface LinkTabProps {
    path: string,
    label: string
}

const LinkTab = ({path, label} : LinkTabProps) => {
    return (
        <Tab component={Link} href={path} label={label}/>
    )
}

export default LinkTab;