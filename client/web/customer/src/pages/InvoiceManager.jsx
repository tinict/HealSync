import React from "react";
import InvoiceTable from "../Components/InvoiceTable";
import Header from "../Components/Header";

function InvoiceManager() {
    return (
        <div className="home-section">
            <Header />
            <InvoiceTable />
        </div>
    );
}

export default InvoiceManager;
