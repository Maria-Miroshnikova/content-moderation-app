"use client";

import { IconButton, IconButtonProps } from "@mui/material";
import Link from "next/link";

interface LinkItem {
    children: React.ReactNode,
    url: string
}

type LinkIconButtonProps = IconButtonProps & LinkItem;

const LinkIconButton = ({ children, url, ...props }: LinkIconButtonProps) => {
    return (
        <IconButton
            component={Link}
            href={url}
            {...props}
        >
            {children}
        </IconButton>
    )
}

export default LinkIconButton;