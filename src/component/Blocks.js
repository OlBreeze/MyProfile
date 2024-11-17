import React from 'react';
import style from './Block.module.css';

const Blocks = () => {
    const handleClick = (url) => {
        window.open(url, "_blank");
    };

    return (
        <div className="main_container d-flex flex-row flex-wrap justify-content-around bd-highlight mb-3">
            <div className={`round ${style.round} ${style.r1}`} onClick={() => handleClick("https://olbreeze.github.io/Tictactoe/")}>
                <p className={style.p1}>Tic Tac Toe</p>
            </div>
            <div className={`round ${style.round} ${style.r2}`} onClick={() => handleClick("https://olbreeze.github.io/CardWar/")}>
                <p className={style.p2}>Card war</p>
            </div>

            <div className={`round ${style.round} ${style.r3}`} onClick={() => handleClick("https://olbreeze.github.io/appStarWars/")}>
            </div>

            <div className={`round ${style.round} ${style.r4}`}
                 onClick={() => handleClick("https://olbreeze.github.io/weather/")}>
            </div>

            <div className={`round ${style.round} ${style.r5}`}
                 onClick={() => handleClick("https://olbreeze.github.io/CatchChicken/")}>
            </div>
            <div className={`round ${style.round} ${style.r6}`}
                 //onClick={() => handleClick("")}
            >
            </div>
            <div className={`round ${style.round} ${style.r6}`}
                 //onClick={() => handleClick("")}
            >
            </div>
        </div>
    );
};

export default Blocks;