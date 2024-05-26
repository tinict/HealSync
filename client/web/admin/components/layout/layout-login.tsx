import React from "react";
import { NavbarWrapper } from "../navbar/navbar";

interface Props {
    children: React.ReactNode;
}

export const LayoutLogin = ({ children }: Props) => {
    return (
        <section>
            {children}
        </section>
    );
};
