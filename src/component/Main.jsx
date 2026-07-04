import React from 'react';
import Home from "./Home";
import Header from "./Header";
import Blocks from "./Blocks";
import About from "./About";
import Gallery from "./Gallery";
import {navItems} from "../utils/constants";
import {Route, Routes, useLocation } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import MyPDFViewer from "./MyPDFViewer";
import Contacts from "./Contacts";

const Main = () => {
    const location = useLocation();
    const blocksRoutes = [`/${navItems[0].route}`, `/${navItems[1].route}`, `/${navItems[3].route}`];
    const showBlocks = blocksRoutes.includes(location.pathname);

    return (
        <main className={"container"}>
                <div className={"main_page d-flex flex-column"} style={{minHeight: '100vh'}}>
                    <Header/>
                    <Routes>
                        <Route path={'/'} element={<Home/>}>
                            <Route path={navItems[0].route} element={<Home/>}>
                            </Route>
                        </Route>
                        <Route path={`/${navItems[1].route}`} element={<About/>}></Route>
                        <Route path={`/${navItems[2].route}`} element={<MyPDFViewer/>}></Route>
                        <Route path={`/${navItems[3].route}`} element={<Gallery/>}></Route>
                        <Route path={`/email`} element={<Contacts/>}></Route>
                        <Route path={'*'} element={<ErrorPage/>}/>
                    </Routes>
                </div>
            {showBlocks && <Blocks/>}
        </main>
    );
}

export default Main;