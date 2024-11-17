import style from "./contact.module.css";
import {useRef, useState} from 'react';
import emailjs from 'emailjs-com';

function Contacts() {
    const form = useRef();
    // const inputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        status: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value

        });
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_i8z4j6i', 'template_g12gmpa', form.current, 'gPCtbJp0vaWgcptHm')
            .then((result) => {
                console.log(result.text);
                // Очистка формы
                setFormData({
                    name: '',
                    email: '',
                    message: '',
                    status: "Your message has been sent successfully. 📬"
                });

            }, (error) => {
                console.log(error.text);
                setFormData({
                    ...formData,
                    status: "An error occurred (("
                });
            });
    };

    return (
        <div className={style.container}>
            <form ref={form} onSubmit={sendEmail}>
                <label htmlFor="name" className={style.label}>Name</label>
                <input type="text" id="name" name="name" value={formData.name}  className={style.inpText} autoComplete="on"
                       onChange={handleChange}
                       placeholder="Your name.."/>

                {/* <!-- email --> */}
                <label htmlFor="email" className={style.label}>Your email address</label>
                <input
                    type="email"
                    name="email"
                    className={style.inpText}
                    id="email"
                    value={formData.email}
                    placeholder="enter your email"
                    autoComplete="on"
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

                <div className={style.footer}>
                    <input type="submit" value="Submit" className={style.button}/>
                    {/* dispatch status  */}
                    {formData.status && (
                        <h3 className = {`${style.h3} ${formData.status.includes('success') ? style.success : style.failure}`}>
                            {formData.status}
                        </h3>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Contacts;



