import React from 'react';
import {navItems} from "../utils/constants";
import NavItem from "./NavItem";

const Navigation = () => {
    return (
        <nav>
            <ul className={"nav fixed-top mt-1 ms-3"}>
                {
                    navItems.map((item) =>
                    <NavItem key={item.route} text={item.title} route={item.route}/>)
                }

            </ul>
        </nav>
    );
};

export default Navigation;