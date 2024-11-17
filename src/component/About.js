import React from 'react';
import style from './AboutMe.module.css';

const About = () => {
    return (
        <div className={style.divAboutMe}>
            <div className={style.hi}>
                <div className={style.hiText}>👋 Hi, I’m Olga.</div>
            </div>

            <div className={style.firstBlockAbout}>
                <img className={style.me}
                     src={require('../images/me.jpg')}
                     alt="me"
                />
                <div className={style.firstBlockText}>
                    <p>I graduated from a humanities gymnasium and entered the aviation university, after which I became
                        interested in programming and participated in the full cycle of project development for the
                        financial sector of an energy company.</p>
                    <p>Also I worked as an Oracle database administrator for more than ten years. At some point, I was
                        offered a large project for the development of accounting programs on 1C. I led and supported
                        more than 20 companies, received a huge number of thanks and positive reviews.</p>
                    <p>Currently, I am engaged in software development on Java, JavaScript, TypeScript, React,
                        Redux...</p>
                </div>
            </div>

            <div className={style.secondBlock}>
                <p>I'm currently learning course Full Stack Java at Tel-Ran. I'm excited about gaining hands-on
                    experience and deepening my understanding of software development processes.</p>
            </div>
            <div className={style.thirdBlock}>
                <p className={style.blockFirst}>I'm looking for opportunities to collaborate on interesting projects
                    that allow me to develop my skills
                    and apply my knowledge in practice.</p>
                <p className={style.blockMiddle}>I'm also interested in internships where I can gain valuable experience
                    and contribute to a team.</p>
                <p className={style.blockLast}>If you have any ideas or suggestions, I’d be happy to discuss!</p>
            </div>
        </div>
    );
};

export default About;