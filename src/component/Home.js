import React, {useState} from 'react';
import style from './Home.module.css';

const Home = () => {

    const [showFirstImage, setShowFirstImage] = useState(true);
    const toggleImage = () => {setShowFirstImage(!showFirstImage);};

    return (
        <section className="main_picture d-flex flex-row"
                 style={{ flex: '1', overflow: 'hidden' }} onClick={toggleImage}>

                <img className={`w-100 ${style.imgMain} ${showFirstImage ? style.visible : style.hidden}`}
                     style={{ height: '100%', objectFit: 'cover' }}
                     src={require('../images/main.jpg')}
                     alt="nature"
                />
        </section>
    );
};

export default Home;