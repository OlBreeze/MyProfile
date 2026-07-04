import React from 'react';
import {Link} from "react-router-dom";

const NavItem = ({text, route}) => {
    return (
        <li className={"nav-item"}>
            <Link to={route}
                  className={"fs-3 lh-sm border border-light rounded-pill btn btn-danger mx-2 button"}>
                {text}
            </Link>
        </li>
    );
};

export default NavItem;
