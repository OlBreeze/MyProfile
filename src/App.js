import './App.css';
import Footer from "./component/Footer";
import Main from "./component/Main";
import React from "react";
import ChatBot from "./component/ChatBot";

function App() {

    return (
        <div className={"App container"}>
                <Main/>
                <Footer/>
                {/*<Contacts/>*/}
            {/* Чат-бот теперь всплывающий виджет */}
            <ChatBot/>
        </div>
    );
}

export default App;
