import React, {useState} from 'react';
import style from './Home.module.css';
import mainImage from '../images/main.jpg';

const Home = () => {
    // Клик скрывает верхнюю картинку и показывает фоновое фото секции (mainMe.png)
    const [showFirstImage, setShowFirstImage] = useState(true);
    const toggleImage = () => setShowFirstImage(!showFirstImage);

    return (
        <section className="main_picture d-flex flex-row"
                 style={{ flex: '1', overflow: 'hidden' }} onClick={toggleImage}>

                <img className={`w-100 ${style.imgMain} ${showFirstImage ? style.visible : style.hidden}`}
                     style={{ height: '100%', objectFit: 'cover' }}
                     src={mainImage}
                     alt="nature"
                />
        </section>
    );
};

export default Home;
