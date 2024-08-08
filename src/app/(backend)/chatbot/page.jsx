import Chatbot from "@/components/Chatbot";
import React from 'react';

export default function Page(){

    return (
        <>
            <header>
                <h1 className='mb-2'>Chatbot</h1>
                <p>Welcome to your chatbot.</p>
            </header>
            <Chatbot />
        </>
    )
}