import dotenv from "dotenv"
dotenv.config();
import { createServer } from "http";
import {Server} from 'socket.io';
import { broadcastMessage, disconnect, hostLiveTest, joinedTest, makeQuestionActive, revealAnswer, revealOptions, sendAnswerAnalytics, takeLiveTest } from "./controllers/testController.js";
const socketPort = process.env.PORT || 5500;
const allowedOrigins = process.env.ALLOWED_ORIGINS || "http://localhost:3000";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: allowedOrigins.split(','),
        methods: ['GET', 'POST'],
    },
});
  
io.on("connection", (socket) => {
    const test = socket.handshake.query.testId;
    // Invigilator Test Portal Joining Event
    hostLiveTest(socket,io);
    // Candidate Test Portal Joining Event
    takeLiveTest(socket,io);
    // Candidate Joined Event
    joinedTest(socket,io);
    // Question Active Via Invigilator
    makeQuestionActive(socket,io);
    // Question Options Revealed Via Invigilator
    revealOptions(socket,io);
    // reveal answer by invigilator
    revealAnswer(socket,io);
    // share answer analytics to user
    sendAnswerAnalytics(socket,io);
    // @desc broadcast Message in a room
    broadcastMessage(socket,io);
    // user disconnection
    // disconnect(socket,io);

    console.log("joined",socket.id);

});

httpServer.listen(socketPort,()=>{
    console.log("Socket is listening on port",socketPort);
});

export default io