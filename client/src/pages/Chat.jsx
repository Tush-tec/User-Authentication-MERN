import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000");

const Chat = () => {
    
    return (
    <h1>Chat</h1>
    );
};

export default Chat;