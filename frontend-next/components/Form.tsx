"use client";

import { Container } from "@mui/material";
import { FC, ReactNode } from "react";


interface FormProps {
    children: ReactNode
}

const Form = ({ children }: FormProps) => {
    return (
        <Container sx={{mb: 4, background: "#e3f2fd", padding: 4}}>
            {children}
        </Container>
    )
}

export default Form;