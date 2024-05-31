import React from 'react';
import '../Styles/bootstrap.min.css';
import '../Styles/style-guide.css';
import '../Styles/plugins/fontawesome/css/all.min.css';
import '../Styles/plugins/fontawesome/css/fontawesome.min.css';
import { Link } from "react-router-dom";

function BreadCrumb() {
    return (
        <>
            <div class="breadcrumb-bar">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-12 col-12">
                            <h2 class="breadcrumb-title">Hồ sơ khám điện tử</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default BreadCrumb;