'use client'
import React, { useState } from 'react';
import styles from '../styles/Dashboard.module.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! How can I help you today?' }]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);

    const response = await fetch('https://coding-academy-CloudCorpRecord.replit.app/send_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    setMessages([...messages, newMessage, { sender: 'bot', text: data.response }]);
    setInput('');
  };


  return (
    <div className="flex flex-col gap-5">

      <div className="bg-gray-200 rounded">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'bot' ? styles.botMessage : styles.userMessage}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="border p-8 rounded">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded"
        />
        <button onClick={handleSendMessage} className={styles.chatButton}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;