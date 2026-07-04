import React from 'react';
import Navigation from "./Navigation";

const Header = () => {
    return (
         <header>
            <Navigation/>
            <h1 className={"fs-1"}>Welcome to my world!</h1>
        </header>
    );
};

export default Header;