import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className={"rounded-bottom-4 align-items-center row"}>
            <Link to={"email"}>
                <div className="col-2 border-light rounded-pill btn btn-danger  m-2 button">
                    <p className={"mb-0 py-2 fs-3 lh-sm"}> Send me <span className="email">email</span></p>
                </div>
            </Link>
        </footer>
    );
};

export default Footer;