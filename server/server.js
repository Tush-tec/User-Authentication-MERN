import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
import dotenv from 'dotenv';


dotenv.config();
connectDB();

const app = express()
app.use(express.json())
app.use(cors())


app.use('/api/auth', authRoutes)

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin : process.env.CLIENT_URL,
        method:['GET','POST']
    }
})

io.on('connection', (socket)=>{
    console.log(`User connected: ${socket.id}`);
    socket.on('sendMessage',(message)=>{
        console.log(`Message received: ${message}`);
        socket.broadcast.emit('receiveMessage',message)
    });

    socket.on('disconnect',()=>{
        console.log(`User disconnected: ${socket.id}`);
    });
})
const PORT = process.env.PORT || 8080;
server.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);  
})