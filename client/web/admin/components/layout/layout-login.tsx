import React from "react";

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
