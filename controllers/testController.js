// @desc Invigilator Joinig Test Portal With Test Id -> Creating Room And Let Students Joining
const hostLiveTest = (socket,io)=>{
    const testId = socket.handshake.query.testId;
    socket.on('hostLiveTest', () => {
        socket.join(testId);
        socket.leave(socket.id);
        io.sockets.adapter.rooms.delete(socket.id);
        console.log(io.sockets.adapter.rooms);
        console.log("host test called by admin");
        // emit test started event on all joiners
        io.emit('joinLiveTest', testId);
    });
}
// @desc Candidates Joining Test Rooms if test is live by invigilator or get a event to retry after a time
const takeLiveTest = (socket,io)=>{
    const testId = socket.handshake.query.testId;
    socket.on('takeLiveTest', () => {
        // console.log('take test socket');
        const roomExists = io.sockets.adapter.rooms.has(testId); // is Test Live By admin
        if(roomExists){
            // emit test started to current socket
            console.log(socket.id);
            io.to(socket.id).emit('liveTestStarted', testId);
            socket.join(testId);
            // All Personal Rooms Will Be Working For Having one on One Chat
            // socket.leave(socket.id);
            // io.sockets.adapter.rooms.delete(socket.id);
            console.log(io.sockets.adapter.rooms);
        }else{
            io.to(socket.id).emit('liveTestNotStarted', testId);
            // socket should leave by itself and retry after a time
        }
    });
}
// @desc When User Joined Get Joinig Info
const joinedTest = (socket,io)=>{
    const testId = socket.handshake.query.testId;
    socket.on('joinedTest', (data) => {
        console.log("user joined test named",data);
        io.emit('candidateJoined', {
            id : socket.id, candidateName : data.candidateName , marks : data.marks
        });
    });
}
// @desc Activating Question form Invigilator Side
const makeQuestionActive = (socket,io)=>{
    const testId = socket.handshake.query.testId;
    socket.on('makeQuestionActive', (questionId) => {
        console.log("question active via admin",questionId);
        io.emit('checkActiveQuestion', questionId);
    });
}
// @desc reveal options for all users by admin
const revealOptions = (socket,io)=>{
    const testId = socket.handshake.query.testId;
    socket.on('revealOptions', (questionId) => {
        console.log("option reveal via admin   ",questionId);
        io.emit('checkOptionReveal', questionId);
    });
}
// @desc reveal answer by invigilator
const revealAnswer = (socket,io)=>{
    const testId = socket.handshake.query.testId;
    socket.on('revealAnswer', (questionId) => {
        console.log("answer reveal via admin   ",questionId);
        io.emit('checkAnswerReveal', questionId);
    });
}
// @desc get answer analytics from candidate to invigilator
const sendAnswerAnalytics = (socket,io)=>{
    const testId = socket.handshake.query.testId;
    socket.on('sendAnswerAnalytics', (data) => {
        console.log("answer analytics of user   ",data);
        io.emit('fetchAnswerAnalytics', data);
    });
}


export {hostLiveTest,takeLiveTest,joinedTest,makeQuestionActive,revealOptions,revealAnswer,sendAnswerAnalytics};