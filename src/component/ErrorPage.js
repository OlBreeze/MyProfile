import React from 'react';
import './errorPage.css';
import {useNavigate} from "react-router-dom";
const ErrorPage = () => {
    const nav = useNavigate();

    const returnHome = ()=>{
       nav('/home');
   }

    return (
        <div className="container404">
            <div className="stage" onClick={returnHome}>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
            </div>

            {/*<style>*/}
            {/*    * *, *::before, *::after {*/}
            {/*    animation - play - state: running !important;*/}
            {/*}*/}
            {/*</style>*/}
            {/*<script>window.setTimeout = null;</script>*/}
        </div>
    );
};

export default ErrorPage;