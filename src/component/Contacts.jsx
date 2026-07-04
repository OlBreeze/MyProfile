import style from "./contact.module.css";
import {useEffect, useRef, useState} from 'react';
import emailjs from 'emailjs-com';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_i8z4j6i';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_g12gmpa';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'gPCtbJp0vaWgcptHm';
// reCAPTCHA включается, когда задан ключ (и включена галочка в настройках шаблона EmailJS)
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

function Contacts() {
    const form = useRef();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    // 'idle' | 'sending' | 'success' | 'error'
    const [status, setStatus] = useState('idle');

    // Подгружаем скрипт reCAPTCHA, только если задан ключ
    useEffect(() => {
        if (!RECAPTCHA_SITE_KEY) return;
        if (document.querySelector('script[src*="recaptcha/api.js"]')) return;
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const sendEmail = (e) => {
        e.preventDefault();
        if (status === 'sending') return;
        setStatus('sending');

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY)
            .then(() => {
                setFormData({name: '', email: '', message: ''});
                setStatus('success');
                if (RECAPTCHA_SITE_KEY && window.grecaptcha) {
                    window.grecaptcha.reset();
                }
            }, (error) => {
                console.error('EmailJS error:', error);
                setStatus('error');
            });
    };

    const statusText = {
        success: "Your message has been sent successfully. 📬",
        error: "An error occurred (("
    };

    return (
        <div className={style.container}>
            <form ref={form} onSubmit={sendEmail}>
                <label htmlFor="name" className={style.label}>Name</label>
                <input type="text" id="name" name="name" value={formData.name} className={style.inpText}
                       autoComplete="name"
                       onChange={handleChange}
                       placeholder="Your name.."
                       required/>

                <label htmlFor="email" className={style.label}>Your email address</label>
                <input
                    type="email"
                    name="email"
                    className={style.inpText}
                    id="email"
                    value={formData.email}
                    placeholder="enter your email"
                    autoComplete="email"
                    onChange={handleChange}
                    required
                />

                <label htmlFor="message" className={style.label}>Message</label>
                <textarea className={style.inpText}
                          name="message"
                          id="message"
                          value={formData.message}
                          rows="5"
                          onChange={handleChange}
                          required
                ></textarea>

                {RECAPTCHA_SITE_KEY && (
                    <div className="g-recaptcha"
                         data-sitekey={RECAPTCHA_SITE_KEY}
                         style={{marginTop: '10px'}}></div>
                )}

                <div className={style.footer}>
                    <input type="submit"
                           value={status === 'sending' ? 'Sending...' : 'Submit'}
                           disabled={status === 'sending'}
                           className={style.button}/>
                    {statusText[status] && (
                        <h3 className={`${style.h3} ${status === 'success' ? style.success : style.failure}`}>
                            {statusText[status]}
                        </h3>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Contacts;
