import React from 'react';
import style from './Block.module.css';

const projects = [
    {url: "https://olbreeze.github.io/Tictactoe/", styleClass: style.r1, title: "Tic Tac Toe", textClass: style.p1},
    {url: "https://olbreeze.github.io/CardWar/", styleClass: style.r2, title: "Card war", textClass: style.p2},
    {url: "https://olbreeze.github.io/appStarWars/", styleClass: style.r3, title: "Star Wars app"},
    {url: "https://olbreeze.github.io/weather/", styleClass: style.r4, title: "Weather app"},
    {url: "https://olbreeze.github.io/CatchChicken/", styleClass: style.r5, title: "Catch the chicken"},
];

const Blocks = () => {
    return (
        <div className="main_container d-flex flex-row flex-wrap justify-content-around bd-highlight mb-3">
            {projects.map((project) => (
                <a key={project.url}
                   href={project.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label={project.title}
                   className={`round d-block text-decoration-none ${style.round} ${project.styleClass}`}>
                    {project.textClass && <p className={project.textClass}>{project.title}</p>}
                </a>
            ))}

            {/* Плейсхолдеры под будущие проекты */}
            <div className={`round ${style.round} ${style.r6}`}></div>
            <div className={`round ${style.round} ${style.r6}`}></div>
        </div>
    );
};

export default Blocks;
