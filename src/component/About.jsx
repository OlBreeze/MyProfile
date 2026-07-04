import React from 'react';
import style from './AboutMe.module.css';
import meImage from '../images/me.jpg';

const About = () => {
    return (
        <div className={style.divAboutMe}>
            <div className={style.hi}>
                <div className={style.hiText}> 👋 Hi, I’m Olga. </div>
            </div>

            <div className={style.firstBlockAbout}>
                <img className={style.me}
                     src={meImage}
                     alt="Olga"
                />
                <div className={style.firstBlockText}>
                    <p>After finishing a humanities gymnasium, I entered an aviation university — and that’s where I
                        discovered programming. My first serious work was the full development cycle of financial
                        software for an energy company.</p>
                    <p>I then spent more than ten years as an Oracle database administrator. Later, I took on a large
                        project building accounting software on the 1C platform: I led and supported more than 20
                        companies and collected a lot of warm feedback along the way.</p>
                    <p>Today I develop software with Java, JavaScript, TypeScript, React and Redux.</p>
                </div>
            </div>

            <div className={style.secondBlock}>
                <p>Full Stack Developer specializing in Java, Spring (Boot, Security) and modern frontend technologies:
                    Next.js, React, Redux. Experienced in full-cycle development — from backend to UI — and in working
                    with both relational and NoSQL databases.</p>
            </div>
            <div className={style.thirdBlock}>
                <p className={style.blockFirst}>I’m looking for opportunities to collaborate on interesting projects
                    where I can grow my skills and put my knowledge into practice.</p>
                <p className={style.blockMiddle}>I’m passionate about creating and growing — both in tech and in life. My proudest creation? My family 💖</p>
                <p className={style.blockLast}>If you have any ideas or suggestions, I’d be happy to discuss them!</p>
            </div>
        </div>
    );
};

export default About;
