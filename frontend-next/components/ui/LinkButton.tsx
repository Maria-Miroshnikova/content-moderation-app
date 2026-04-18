"use client";

import { Button, ButtonProps } from "@mui/material"
import Link from "next/link"

interface LinkButtonPropsAdditional {
    path: string,
    label: string
}

type LinkButtonProps = ButtonProps & LinkButtonPropsAdditional

const LinkButton = ({path, label, ...props} : LinkButtonProps) => {
    return (
        <Button component={Link} href={path} {...props}>
            {label}
        </Button>
    )
}

export default LinkButton;