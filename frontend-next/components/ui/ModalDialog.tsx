"use client"

import React, { FC, ReactNode } from "react";
import classes from "../../styles/ModalView.module.css"
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Dialog } from "@mui/material";

interface ModalDialogrops {
    isVisible: boolean,
    children?: ReactNode
}

const ModalDialog: FC<ModalDialogrops> = ({ isVisible, children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const rootClasses = [classes.myModalView]

    if (isVisible) {
        rootClasses.push(classes.active)
    }

    function handleChangeVisibility() {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("modalView");
        params.delete("action");
        router.replace(`?${params.toString()}`);
    }

    return (
        <Dialog open={isVisible} onClose={() => handleChangeVisibility()} PaperProps={{
            
        }}>
            {children}
        </Dialog>
    )
}

export default ModalDialog;
