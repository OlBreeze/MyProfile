import React from 'react';
import {Link} from "react-router-dom";

const NavItem = ({text, route}) => {
    return <Link to={route}>
             <li className={"nav-item fs-3 lh-sm border border-light rounded-pill btn btn-danger mx-2 button"}>
                {text}
            </li>
    </Link>
};

export default NavItem;
