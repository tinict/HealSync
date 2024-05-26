import React from "react";
import Header from "../Components/Header";
import { ChatComponent } from "../Components/ChatComponent";
import { useParams } from 'react-router-dom';

export function ChatPage() {
    let { thread } = useParams();

    return (
        <div>
            <Header />
            <ChatComponent key={thread} thread={thread}/>
        </div>
    );
};
