"use client"

import React, { FC, ReactNode } from "react";
import classes from "../../styles/ModalView.module.css"
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface ModalViewProps {
    isVisible: boolean,
    children?: ReactNode
}

const ModalView: FC<ModalViewProps> = ({ isVisible, children }) => {
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
        <div className={rootClasses.join(' ')} onClick={() => handleChangeVisibility()}>
            <div className={classes.myModalViewContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default ModalView;
